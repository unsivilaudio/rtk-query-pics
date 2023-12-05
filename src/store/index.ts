import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import users from './slices/usersSlice';
import albums, {
    middleware as albumsApiMiddleware,
} from '@/store/apis/albumsApi';

export const store = configureStore({
    reducer: {
        users,
        albums,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(albumsApiMiddleware);
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} from '@/store/apis/albumsApi';
