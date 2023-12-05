import { type SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchUsersThunkReducer } from '../thunks/fetchUsers';
import { addUserThunkReducer } from '../thunks/addUser';
import { removeUserThunkReducer } from '../thunks/removeUser';
import { User } from '@/types/user';

export type UsersState = {
    isLoading: boolean;
    data: User[];
    error: null | SerializedError;
};

const __INITIAL_STATE: UsersState = {
    isLoading: false,
    data: [],
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState: __INITIAL_STATE,
    reducers: {},
    extraReducers(builder) {
        fetchUsersThunkReducer(builder);
        addUserThunkReducer(builder);
        removeUserThunkReducer(builder);
    },
});

export default usersSlice.reducer;
