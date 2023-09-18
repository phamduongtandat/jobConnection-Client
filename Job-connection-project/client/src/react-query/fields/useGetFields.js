import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetFields = ({ query }) => {
    const queryFn = async () => {
        const res = await axios({
            method: 'get',
            url: '/api/v1/fields',
            params: query,
        });

        return res.data;
    };

    const res = useQuery({
        queryFn,
        queryKey: ['fields', query],
        keepPreviousData: true,
    });

    return {
        fields: res.data?.data,
        pagination: res.data?.pagination,
        isLoading: res.isLoading,
        isSuccess: res.isSuccess,
        isError: res.isError,
    };
};

export default useGetFields;
