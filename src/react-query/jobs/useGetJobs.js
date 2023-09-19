import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetJobs = ({ query }) => {
    const queryFn = async () => {
        const res = await axios({
            method: 'get',
            url: "/api/v1/jobs",
            params: query,
        });

        return res.data;
    };

    const res = useQuery({
        queryFn,
        //enabled: !!id,
        queryKey: ['jobs', query],
    });

    return {
        jobs: res.data?.data,
        pagination: res.data?.pagination,
        isLoading: res.isLoading,
        isError: res.isError,
        isSuccess: res.isSuccess,
    };
};

export default useGetJobs;