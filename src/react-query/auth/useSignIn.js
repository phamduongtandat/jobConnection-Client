import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';
import { logUserIn } from '../../store/authSlice';

const useSignIn = () => {
  const { handleCloseAuthModal, handleOpenSignInModal } = useAuthModal();
  const { isConfirmed } = useConfirmModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutationFn = async (data) => {
    const res = await axios({
      method: 'post',
      url: '/api/v1/auth/sign-in',
      data,
    });

    return res.data;
  };

  const onSuccess = (data) => {
    const user = data.data;
    handleCloseAuthModal();
    dispatch(logUserIn(user));
    if (user?.role === 'user') {
      navigate('/jobs/all-jobs/job-list');
    }
  };

  const onError = async (error) => {
    const message = error?.response?.data?.message;
    if (message === 'Invalid email or password') return;

    handleCloseAuthModal();
    const confirm = await isConfirmed({
      title: 'Đăng nhập thất bại',
      subTitle: 'Đã có lỗi xảy ra khi đăng nhập. Hãy thử lại.',
      confirmButtonText: 'Thử lại',
      cancelButtonText: 'Thôi',
      theme: 'error_modal',
    });

    if (confirm) {
      handleOpenSignInModal();
    }
  };

  const mutation = useMutation({ mutationFn, onError, onSuccess });

  return {
    signIn: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error?.response?.data?.message,
  };
};

export default useSignIn;
