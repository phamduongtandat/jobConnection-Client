import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastSuccess, toastError } from '../../utils/toast';

const useRemoveCV = (id) => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal } = useModal();

    const mutationFn = async () => {
        await axios({
            method: 'delete',
            url: `/api/v1/jobs/${id}/applied`,

        });

        //return data;
    };

    const onError = () => {
        toastError(`Xin hãy hủy ứng tuyển lại`);
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries(['jobDetail']);
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            cancelButtonText: 'Ok',
            title: 'Thành công',
            subTitle: `Đã hủy ứng tuyển của bạn`,
            theme: 'success_modal',
        });

    };

    const mutation = useMutation({
        mutationFn,
        onSuccess,
        onError,
    });

    return {
        removeCV: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useRemoveCV;
