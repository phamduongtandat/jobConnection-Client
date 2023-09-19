import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastSuccess, toastError } from '../../utils/toast';

const useApplyForJob = (id) => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal } = useModal();

    const mutationFn = async (data) => {

        await axios({
            method: 'post',
            url: `/api/v1/jobs/${id}/applied`,
            data,
        });

        return data;
    };

    const onError = (data) => {
        toastError(`Xin hãy nộp lại CV`);
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries(['jobDetail']);
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            cancelButtonText: 'Ok',
            title: 'Thành công',
            subTitle: `Đã nhận CV của bạn`,
            theme: 'success_modal',
        });

    };

    const mutation = useMutation({
        mutationFn,
        onSuccess,
        onError,
    });

    return {
        applyForJob: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useApplyForJob;
