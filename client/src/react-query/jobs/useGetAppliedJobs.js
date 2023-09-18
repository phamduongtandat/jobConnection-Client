import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetAppliedJobs = ({ id, query }) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: `/api/v1/jobs/applied-by/${id}`,
      params: query,
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    //enabled: !!id,
    queryKey: ['appliedJobs', query],
  });

  return {
    appliedJobs: res.data?.data,
    pagination: res.data?.pagination,
    isLoading: res.isLoading,
    isError: res.isError,
    isSuccess: res.isSuccess,
  };
};

export default useGetAppliedJobs;