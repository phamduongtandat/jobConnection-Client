import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import { toastSuccess, toastError } from '../../utils/toast';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';

const useDeleteCV = (id) => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal } = useModal();

    const mutationFn = async (data) => {
        await axios({
            method: 'put',
            url: `/api/v1/users/CVs/${id}`,
            data
        });

        //return data;
    };

    const onError = () => {
        toastError(`Xin hãy hủy ứng tuyển lại`);
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries(['CVs']);
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            cancelButtonText: 'Ok',
            title: 'Thành công',
            subTitle: `Đã xóa CV của bạn`,
            theme: 'success_modal',
        });

    };

    const mutation = useMutation({
        mutationFn,
        onSuccess,
        onError,
    });

    return {
        deleteCV: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useDeleteCV;
