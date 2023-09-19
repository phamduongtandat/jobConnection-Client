import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';

const useCreateMessage = ({ sender } = { sender: 'user' }) => {
  const { isConfirmed } = useConfirmModal();

  const mutationFn = async (data) => {
    const res = await axios({
      method: 'post',
      url: '/api/v1/messages',
      data,
    });

    return res.data.data;
  };

  const onSuccess = async (data) => {
    if (sender === 'user') {
      queryClient.setQueryData(['messages', 'support-messages'], (messages) =>
        messages ? [...messages, data] : messages,
      );
    }

    if (sender === 'admin') {
      queryClient.setQueryData(
        ['messages', 'direct', data.to._id],
        (messages) => (messages ? [...messages, data] : messages),
      );
    }
  };

  const onError = async () => {
    await isConfirmed({
      cancelButtonText: 'Ok',
      title: 'Lỗi',
      subTitle: 'Đã có lỗi xảy ra khi gửi tin nhắn. Hãy thử lại sau',
    });
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return {
    createMessage: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useCreateMessage;
