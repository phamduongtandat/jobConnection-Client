import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';

const useEndSupportChat = () => {
  const { isConfirmed } = useConfirmModal();
  const navigate = useNavigate();

  const mutationFn = async (receiverId) => {
    await axios({
      method: 'put',
      url: `/api/v1/messages/end-support-chat/${receiverId}`,
    });

    return receiverId;
  };

  const onSuccess = (receiverId) => {
    queryClient.invalidateQueries(['messages', 'last-messages']);
    queryClient.invalidateQueries(['messages', 'pending-messages']);
    navigate('/admin/messages/direct');
  };

  const onError = async () => {
    await isConfirmed({
      cancelButtonText: 'Ok',
      title: 'Lỗi',
      subTitle: 'Đã có lỗi xảy ra khi bắt đầu cuộc hội thoại. Hãy thử lại sau',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onError,
    onSuccess,
  });

  return {
    endSupportChat: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};

export default useEndSupportChat;
