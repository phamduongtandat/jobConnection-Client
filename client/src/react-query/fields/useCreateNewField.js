import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastError } from '../../utils/toast';

const useCreateNewField = () => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal, handleEnableDefaultOnClose } = useModal();

    const mutationFn = async (data) => {
        const res = await axios({
            method: 'post',
            url: '/api/v1/fields',
            data,
        });

        return data;
    };

    const onSuccess = async (data) => {
        handleEnableDefaultOnClose();
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            title: 'Đã tạo lĩnh vực mới',
            subTitle: `Lĩnh vực mới là: ${data.name}`,
            cancelButtonText: 'Ok',
            theme: 'success_modal',
        });

        queryClient.invalidateQueries(['fields']);
    };

    const onError = (error) => {
        const message = error.response?.data?.message;
        if (message !== 'email already existed')
            toastError(`Đã tồn tại lĩnh vực này!!`);
    };

    const mutation = useMutation({
        mutationFn,
        onError,
        onSuccess,
    });

    return {
        createNewField: mutation.mutate,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        isLoading: mutation.isLoading,
        error: mutation.error?.response?.data?.message,
    };
};

export default useCreateNewField;
