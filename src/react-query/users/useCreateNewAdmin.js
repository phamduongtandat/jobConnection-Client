import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastError } from '../../utils/toast';

const useCreateNewAdmin = () => {
  const { isConfirmed } = useConfirmModal();
  const { handleCloseModal, handleEnableDefaultOnClose } = useModal();

  const mutationFn = async (data) => {
    const res = await axios({
      method: 'post',
      url: '/api/v1/users',
      data,
    });

    return data;
  };

  const onSuccess = async (data) => {
    handleEnableDefaultOnClose();
    handleCloseModal({ ignoreWarning: true });
    await isConfirmed({
      title: 'Đã tạo quản trị viên',
      subTitle: `Email của quản trị viên mới là: ${data.email}`,
      cancelButtonText: 'Ok',
      theme: 'success_modal',
    });

    queryClient.invalidateQueries(['users']);
  };

  const onError = (error) => {
    const message = error.response?.data?.message;
    if (message !== 'email already existed')
      toastError('Đã có lỗi xảy ra khi tạo quản trị viên');
  };

  const mutation = useMutation({
    mutationFn,
    onError,
    onSuccess,
  });

  return {
    createNewAdmin: mutation.mutate,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    isLoading: mutation.isLoading,
    error: mutation.error?.response?.data?.message,
  };
};

export default useCreateNewAdmin;
