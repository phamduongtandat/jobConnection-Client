import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetLastMessages = () => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/messages/last-messages',
    });

    return res.data.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['messages', 'last-messages'],
  });

  return {
    data: res.data,
    isLoading: res.isLoading,
  };
};

export default useGetLastMessages;
