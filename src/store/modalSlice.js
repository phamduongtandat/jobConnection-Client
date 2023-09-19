import { createSlice } from '@reduxjs/toolkit';

/**
 * This slice manage which modal is open except for confirmModal & authModal
 */
const initialState = {
  currentOpenModalName: null,
  defaultOnClose: true, // false means not close when click outside or press 'esc'
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.currentOpenModalName = action.payload;
    },
    closeModal: (state) => {
      state.currentOpenModalName = null;
      state.defaultOnClose = true;
    },
    enableDefaultOnClose: (state) => {
      state.defaultOnClose = true;
    },
    disableDefaultOnClose: (state) => {
      state.defaultOnClose = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  disableDefaultOnClose,
  enableDefaultOnClose,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
