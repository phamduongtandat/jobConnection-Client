import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetAllFields = () => {
    const queryFn = async () => {
        const res = await axios({
            method: 'get',
            url: '/api/v1/fields/all',
        });

        return res.data;
    };

    const res = useQuery({
        queryFn,
        queryKey: ['allFields'],
        keepPreviousData: true,
    });

    return {
        allFields: res.data?.data,
        pagination: res.data?.pagination,
        isLoading: res.isLoading,
        isSuccess: res.isSuccess,
        isError: res.isError,
    };
};

export default useGetAllFields;
