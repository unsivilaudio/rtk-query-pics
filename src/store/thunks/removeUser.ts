import axios from 'axios';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@/types/user';
import { UsersState } from '@/store/slices/usersSlice';

const removeUser = createAsyncThunk('users/remove', async (user: User) => {
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    return user;
});

const removeUserThunkReducer = (
    builder: ActionReducerMapBuilder<UsersState>
) => {
    builder.addCase(removeUser.pending, state => {
        state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(user => {
            return user.id !== action.payload.id;
        });
    });
    builder.addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
};

export { removeUser, removeUserThunkReducer };
