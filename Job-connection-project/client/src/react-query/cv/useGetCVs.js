import { useQuery } from '@tanstack/react-query';
import axios from '../../config/axios';
//import useGetAuthInfo from '../../hooks/useGetAuthInfo';

const useGetCVs = (id) => {


    const queryFn = async () => {
        const res = await axios({
            method: 'get',
            url: `/api/v1/users/CVs/${id}`,
            //params: query,
        });

        return res.data;
    };

    const res = useQuery({
        queryFn,
        //enabled: !!id,
        queryKey: ['CVs'],
    });

    return {
        CVs: res.data?.data,
        pagination: res.data?.pagination,
        isLoading: res.isLoading,
        isError: res.isError,
        isSuccess: res.isSuccess,
    };
};

export default useGetCVs;