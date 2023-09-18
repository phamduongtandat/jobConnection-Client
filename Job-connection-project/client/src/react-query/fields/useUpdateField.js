import { useMutation } from '@tanstack/react-query';
import axios from '../../config/axios';
import { queryClient } from '../../config/react-query';
import useConfirmModal from '../../hooks/useConfirmModal';
import useModal from '../../hooks/useModal';
import { toastSuccess, toastError } from '../../utils/toast';

const useUpdateField = ({ id }) => {
    const { isConfirmed } = useConfirmModal();
    const { handleCloseModal } = useModal();

    const mutationFn = async (data) => {
        await axios({
            method: 'put',
            url: `/api/v1/fields/${id}`,
            data,
        });

        return data;
    };

    const onError = (data) => {
        toastError(`Lĩnh vực này đã tồn tại!!`);
    };

    const onSuccess = async (data) => {
        queryClient.invalidateQueries(['fields']);
        handleCloseModal({ ignoreWarning: true });
        await isConfirmed({
            cancelButtonText: 'Ok',
            title: 'Thành công',
            subTitle: `Đã cập nhật lĩnh vực: ${data.name}`,
            theme: 'success_modal',
        });

    };

    const mutation = useMutation({
        mutationFn,
        onSuccess,
        onError,
    });

    return {
        updateField: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useUpdateField;
