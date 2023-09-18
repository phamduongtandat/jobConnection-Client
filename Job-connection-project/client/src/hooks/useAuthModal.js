import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  closeAuthModal,
  openForgotPasswordModal,
  openResetPasswordModal,
  openSignInModal,
  openSignUpModal,
  toggleAuthForm,
} from '../store/authSlice';

const useAuthModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.isOpen);
  const currentForm = useSelector((state) => state.auth.currentForm);
  const [searchParams, setSearchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get('resetPasswordToken');

  const handleCloseAuthModal = () => {
    dispatch(closeAuthModal());
  };

  const handleOpenSignInModal = () => {
    dispatch(openSignInModal());
  };

  const handleOpenSignUpModal = () => {
    dispatch(openSignUpModal());
  };

  const handleOpenForgotPasswordModal = () => {
    dispatch(openForgotPasswordModal());
  };

  const handleToggleAuthForm = () => {
    dispatch(toggleAuthForm());
  };

  useEffect(() => {
    if (resetPasswordToken) {
      dispatch(openResetPasswordModal(resetPasswordToken));
      searchParams.delete('resetPasswordToken');
      setSearchParams(searchParams);
    }
  }, [resetPasswordToken]);

  return {
    isOpen,
    currentForm,
    handleCloseAuthModal,
    handleOpenSignInModal,
    handleOpenSignUpModal,
    handleToggleAuthForm,
    handleOpenForgotPasswordModal,
  };
};

export default useAuthModal;
