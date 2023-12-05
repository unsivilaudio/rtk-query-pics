import { Album } from '@/types/album';
import { User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    reducerPath: 'albums',
    tagTypes: ['Album', 'UserAlbums'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // REMOVE FOR PRODUCTION
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation<Album, Album>({
                invalidatesTags: (_result, _error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => ({
                    url: `/albums/${album.id}`,
                    method: 'DELETE',
                }),
            }),
            addAlbum: builder.mutation<Album, User>({
                invalidatesTags: (_result, _err, arg) => {
                    return [{ type: 'UserAlbums', id: arg.id }];
                },
                query: (user) => ({
                    url: '/albums',
                    method: 'POST',
                    body: {
                        userId: user.id,
                        title: faker.commerce.productName(),
                    },
                }),
            }),
            fetchAlbums: builder.query<Album[], User>({
                providesTags: (result, _err, arg) => {
                    const tags: { type: 'Album' | 'UserAlbums'; id: string }[] =
                        (result as Album[]).map((album) => ({
                            type: 'Album',
                            id: album.id,
                        }));
                    tags.push({ type: 'UserAlbums', id: arg.id });
                    return tags;
                },
                query: (user: User) => ({
                    url: '/albums',
                    params: {
                        userId: user.id,
                    },
                    method: 'GET',
                }),
            }),
        };
    },
});

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
    middleware,
} = albumsApi;
export default albumsApi.reducer;
