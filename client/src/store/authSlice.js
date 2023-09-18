import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: null,
  user: {},
  isOpen: false,
  currentForm: 'sign_in',
  resetPasswordToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logUserOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    openSignInModal: (state) => {
      state.isOpen = true;
      state.currentForm = 'sign_in';
    },
    openSignUpModal: (state) => {
      state.isOpen = true;
      state.currentForm = 'sign_up';
    },
    openForgotPasswordModal: (state) => {
      state.isOpen = true;
      state.currentForm = 'forgot_password';
    },
    openResetPasswordModal: (state, action) => {
      state.isOpen = true;
      state.currentForm = 'reset_password';
      state.resetPasswordToken = action.payload;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
    toggleAuthForm: (state) => {
      if (state.currentForm === 'sign_in') state.currentForm = 'sign_up';
      else if (state.currentForm === 'sign_up') state.currentForm = 'sign_in';
      else state.currentForm = 'sign_in';
    },
  },
});

export const {
  logUserIn,
  logUserOut,
  openSignInModal,
  openSignUpModal,
  closeAuthModal,
  toggleAuthForm,
  openForgotPasswordModal,
  openResetPasswordModal,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
