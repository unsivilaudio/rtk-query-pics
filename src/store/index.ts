import { configureStore } from '@reduxjs/toolkit';
import users from './slices/usersSlice';

export const store = configureStore({
    reducer: {
        users,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
