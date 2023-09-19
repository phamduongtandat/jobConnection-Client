import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetUserPendingMessages = (receiverId) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: `/api/v1/messages/pending/users/${receiverId}`,
    });

    return res.data.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['messages', 'pending', receiverId],
    enabled: receiverId && receiverId.length === 24,
  });

  return {
    data: res.data,
    isLoading: res.isLoading,
    isError: res.isError,
    isSuccess: res.isSuccess,
  };
};

export default useGetUserPendingMessages;
