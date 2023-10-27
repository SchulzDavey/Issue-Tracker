import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@prisma/client';
import axios from 'axios';

type initialStateProps = {
  value: userProps;
};

type userProps = {
  users: User[];
  isLoading: boolean;
  error: string;
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios.get(`/api/users`).then((response) => response.data);
});

const initialState = {
  value: {
    error: '',
    isLoading: false,
    users: [],
  },
} as initialStateProps;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.value.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => {
        state.value.isLoading = false;
        state.value.users = payload;
        state.value.error = '';
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.value.isLoading = false;
      state.value.users = [];
      state.value.error = action.error.message || 'Something went wrong';
    });
  },
});

export default user.reducer;
