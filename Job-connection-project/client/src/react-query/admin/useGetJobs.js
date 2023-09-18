import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetJobs = ({ query }) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/admin/jobs',
      params: query,
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['jobs', query],
    keepPreviousData: true,
  });

  return {
    jobs: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
    isError: res.isError,
  };
};

export default useGetJobs;
