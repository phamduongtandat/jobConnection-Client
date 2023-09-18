import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetUser = ({ id, query }) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: `/api/v1/users/${id}`,
      params: query,
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    enabled: !!id,
    queryKey: ['users', id],
  });

  return {
    user: res.data?.data,
    isLoading: res.isLoading,
    isError: res.isError,
    isSuccess: res.isSuccess,
  };
};

export default useGetUser;
