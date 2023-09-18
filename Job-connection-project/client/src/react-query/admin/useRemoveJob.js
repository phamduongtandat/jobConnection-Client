import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useModal from '../../hooks/useModal';
import { toastSuccess } from '../../utils/toast';

const useRemoveJob = ({ id }) => {
  const { handleCloseModal } = useModal();

  const mutationFn = async (data) => {
    await axios({
      method: 'put',
      url: `/api/v1/admin/jobs/${id}`,
      data,
    });
    return data;
  };
  const onError = () => {
    toastError('Đã xảy ra lỗi khi cập nhật tin tuyển dụng');
  };

  const onSuccess = async (data) => {
    queryClient.invalidateQueries(['jobs']);
    handleCloseModal({ ignoreWarning: true });
    toastSuccess('Đã cập nhật tin tuyển dụng');
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    isLoading: mutation.isLoading,
    removeJob: mutation.mutate,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useRemoveJob;
