import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import axios from '../../config/axios';

const useGetMessagesWithOne = (receiverId) => {
  const { pathname } = useLocation();

  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: `/api/v1/messages/users/${receiverId}`,
    });

    return res.data.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['messages', 'direct', receiverId],
    enabled:
      receiverId &&
      receiverId.length === 24 &&
      pathname.startsWith('/admin/messages/direct'),
  });

  return {
    data: res.data,
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
  };
};

export default useGetMessagesWithOne;
