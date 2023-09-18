import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetUserSupportMessages = ({ enabled }) => {
  const queryFn = async () => {
    const res = await axios({
      url: '/api/v1/messages/support-messages',
      method: 'get',
    });

    return res.data.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['messages', 'support-messages'],
    enabled,
  });

  return {
    isLoading: res.isLoading,
    isFetching: res.isFetching,
    isSuccess: res.isSuccess,
    isError: res.isError,
    data: res.data,
  };
};

export default useGetUserSupportMessages;
