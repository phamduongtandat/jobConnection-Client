import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios from '../../config/axios';

const useGetPostedJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');

  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: '/api/v1/jobs/posted-jobs',
      query: {
        page,
        pageSize,
      },
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    queryKey: ['jobs', 'posted-jobs'],
  });

  return {
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
    data: res.data?.data,
    pagination: res.data?.pagination,
  };
};

export default useGetPostedJobs;
