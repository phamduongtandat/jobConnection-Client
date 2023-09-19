import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminOnline: false,
  users: {},
};

const socketIoSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    adminOnline: (state) => {
      state.isAdminOnline = true;
    },
    adminOffline: (state) => {
      state.isAdminOnline = false;
    },
    updateUserList: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { adminOffline, adminOnline, updateUserList } =
  socketIoSlice.actions;
export const socketReducer = socketIoSlice.reducer;
