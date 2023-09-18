import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import useConfirmModal from '../../hooks/useConfirmModal';
import { queryClient } from '../../config/react-query';
import useModal from '../../hooks/useModal';
import { toastError, toastSuccess } from '../../utils/toast';

const useAddCV = (id) => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal } = useModal();

    const mutationFn = async (data) => {

        await axios({
            method: 'post',
            url: `/api/v1/users/CVs/${id}`,
            data,
        });

        return data;
    };

    // const onError = (data) => {
    //     toastError(`Xin hãy nộp lại CV`);
    // };

    const onSuccess = async () => {
        queryClient.invalidateQueries(['CVs']);
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            cancelButtonText: 'Ok',
            title: 'Thành công',
            subTitle: `Đã thêm CV của bạn`,
            theme: 'success_modal',
        });

    };

    const mutation = useMutation({
        mutationFn,
        onSuccess,
        //onError,
    });

    return {
        addCV: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useAddCV;
