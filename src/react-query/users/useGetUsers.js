import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetUsers = ({ query }) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/users',
      params: query,
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['users', query],
    keepPreviousData: true,
  });

  return {
    users: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
    isError: res.isError,
  };
};

export default useGetUsers;
