import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetJobDetail = ({ id }) => {
  const queryFn = async () => {
    const res = await axios({
      method: 'get',
      url: `/api/v1/jobs/${id}`,
      //params: query,
    });

    return res.data;
  };

  const res = useQuery({
    queryFn,
    enabled: !!id,
    queryKey: ['jobDetail', id],
  });

  return {
    jobDetail: res.data,
    isLoading: res.isLoading,
    isError: res.isError,
    isSuccess: res.isSuccess,
  };
};

export default useGetJobDetail;
