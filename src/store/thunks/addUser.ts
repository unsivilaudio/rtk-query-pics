import {
    type ActionReducerMapBuilder,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { User } from '@/types/user';
import { UsersState } from '@/store/slices/usersSlice';

const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.name.fullName(),
    });

    return response.data as User;
});

const addUserThunkReducer = (builder: ActionReducerMapBuilder<UsersState>) => {
    builder.addCase(addUser.pending, state => {
        state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
};

export { addUser, addUserThunkReducer };
