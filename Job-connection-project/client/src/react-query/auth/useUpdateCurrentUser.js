import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import useConfirmModal from '../../hooks/useConfirmModal';

const useUpdateCurrentUser = () => {
  const { isConfirmed } = useConfirmModal();

  const mutationFn = async (data) => {
    const res = await axios({
      method: 'put',
      url: '/api/v1/auth/current-user',
      data,
    });
    return res.data;
  };

  const onSuccess = async (data) => {
    const user = data.data;

    await isConfirmed({
      title: 'Thành công',
      subTitle:
        user.account_type === 'personal'
          ? 'Thông tin cá nhân đã được cập nhật'
          : 'Thông tin doanh nghiệp đã được cập nhật',
      cancelButtonText: 'Ok',
      theme: 'success_modal',
    });
  };

  const onError = async () => {
    await isConfirmed({
      title: 'Đã có lỗi xảy ra.',
      subTitle: 'Không thể cập nhật thông tin. Hãy thử lại sau.',
      cancelButtonText: 'Ok',
      theme: 'error_modal',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    updateCurrentUser: mutation.mutate,
    isLoading: mutation.isLoading,
    updatedUser: mutation.data?.data,
    isSuccess: mutation.isSuccess,
  };
};

export default useUpdateCurrentUser;
