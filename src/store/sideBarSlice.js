import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isStaticSideBarOpen: true,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.isOpen = true;
    },
    closeSideBar: (state) => {
      state.isOpen = false;
    },
    hideStaticSideBar: (state) => {
      state.isStaticSideBarOpen = false;
    },
    showStaticSideBar: (state) => {
      state.isStaticSideBarOpen = true;
    },
  },
});

export const sideBarReducer = sideBarSlice.reducer;
export const {
  openSideBar,
  closeSideBar,
  showStaticSideBar,
  hideStaticSideBar,
} = sideBarSlice.actions;
