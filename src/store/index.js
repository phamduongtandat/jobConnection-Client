import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { modalReducer } from './modalSlice';
import { sideBarReducer } from './sideBarSlice';
import { socketReducer } from './socketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sideBar: sideBarReducer,
    modal: modalReducer,
    socket: socketReducer,
  },
});
