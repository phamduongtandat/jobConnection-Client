import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';

const useGetField = ({ id, query }) => {
    const queryFn = async () => {
        const res = await axios({
            method: 'get',
            url: `/api/v1/fields/${id}`,
            params: query,
        });

        return res.data;
    };

    const res = useQuery({
        queryFn,
        enabled: !!id,
        queryKey: ['fields', id],
    });

    return {
        field: res.data?.data,
        isLoading: res.isLoading,
        isError: res.isError,
        isSuccess: res.isSuccess,
    };
};

export default useGetField;
