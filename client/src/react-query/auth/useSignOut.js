import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import useConfirmModal from '../../hooks/useConfirmModal';
import { logUserOut } from '../../store/authSlice';

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isConfirmed } = useConfirmModal();
  const mutationFn = async () => {
    await axios({
      method: 'delete',
      url: '/api/v1/auth/sign-out',
    });
  };

  const onSuccess = async () => {
    navigate('/');
    setTimeout(() => {
      dispatch(logUserOut());
    }, 300);
  };

  const onError = async () => {
    await isConfirmed({
      cancelButtonText: 'Đóng',
      title: 'Lỗi',
      subTitle: 'Đã có lỗi xảy ra khi đăng xuất tài khoản. Hãy thử lại.',
      theme: 'error_modal',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    signOut: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useSignOut;
