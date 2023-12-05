import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

import { Album } from '@/types/album';
import { Photo } from '@/types/photo';

const photosApi = createApi({
    reducerPath: 'photos',
    tagTypes: ['Photo', 'AlbumPhotos'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query<Photo[], Album>({
                providesTags: (result, _error, album) => {
                    const tags: {
                        type: 'Photo' | 'AlbumPhotos';
                        id: string;
                    }[] = (result as Photo[]).map((photo) => ({
                        type: 'Photo',
                        id: photo.id,
                    }));
                    tags?.push({ type: 'AlbumPhotos', id: album.id });
                    return tags;
                },
                query: (album) => ({
                    url: '/photos',
                    params: {
                        albumId: album.id,
                    },
                    method: 'GET',
                }),
            }),
            addPhoto: builder.mutation<Photo, Album>({
                invalidatesTags: (_result, _error, album) => {
                    return [{ type: 'AlbumPhotos', id: album.id }];
                },
                query: (album) => ({
                    url: '/photos',
                    method: 'POST',
                    body: {
                        albumId: album.id,
                        url: faker.image.abstract(150, 150, true),
                    },
                }),
            }),
            removePhoto: builder.mutation<Photo, Photo>({
                invalidatesTags: (_result, _error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                },
                query: (photo) => ({
                    method: 'DELETE',
                    url: `/photos/${photo.id}`,
                }),
            }),
        };
    },
});

export const {
    useAddPhotoMutation,
    useFetchPhotosQuery,
    useRemovePhotoMutation,
    middleware,
} = photosApi;
export default photosApi.reducer;
