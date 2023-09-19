import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';
import { logUserIn } from '../../store/authSlice';

const useSignUp = () => {
  const navigate = useNavigate();
  const { handleCloseAuthModal } = useAuthModal();
  const dispatch = useDispatch();
  const { isConfirmed } = useConfirmModal();

  const mutationFn = async (data) => {
    const res = await axios({
      method: 'post',
      url: '/api/v1/auth/register',
      data,
    });

    return res.data;
  };

  const onSuccess = async (data) => {
    const user = data.data;
    handleCloseAuthModal();
    dispatch(logUserIn(user));
    navigate('/profile/user-info');
  };

  const onError = async (error) => {
    const message = error.response?.data?.message;

    if (message !== 'email already existed') {
      handleCloseAuthModal();
      await isConfirmed({
        theme: 'error_modal',
        cancelButtonText: 'Đóng',
        title: 'Đăng ký thất bại',
        subTitle:
          'Đã có lỗi xảy ra trong quá trình đăng ký tài khoản. Hãy liên hệ với support nếu lỗi vẫn tiếp tục xảy ra.',
        confirmButtonText: 'Liên hệ với support',
      });
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    signUp: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isErrror: mutation.isError,
    error: mutation.error?.response?.data?.message,
  };
};

export default useSignUp;
