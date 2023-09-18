import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetLastPendingMessages = () => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/messages/pending-messages',
    });

    return res.data.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['messages', 'pending-messages'],
  });

  return {
    data: res.data,
    isLoading: res.isLoading,
  };
};

export default useGetLastPendingMessages;
