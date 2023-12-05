import { UsersState } from '@/store/slices/usersSlice';
import { User } from '@/types/user';
import {
    createAsyncThunk,
    type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    // DEV ONLY!!!
    await pause(1000);

    return response.data as User[];
});

const fetchUsersThunkReducer = (
    builder: ActionReducerMapBuilder<UsersState>
) => {
    builder.addCase(fetchUsers.pending, state => {
        state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
};

// DEV ONLY!!!
const pause = (duration: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers, fetchUsersThunkReducer };
