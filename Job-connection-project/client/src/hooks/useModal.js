import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  disableDefaultOnClose,
  enableDefaultOnClose,
  openModal,
} from '../store/modalSlice';
import useConfirmModal from './useConfirmModal';

const useModal = () => {
  const { isConfirmed } = useConfirmModal();
  const dispatch = useDispatch();
  const { currentOpenModalName, defaultOnClose } = useSelector(
    (state) => state.modal,
  );

  const handleCloseModal = async ({ ignoreWarning } = {}) => {
    if (defaultOnClose || ignoreWarning) {
      dispatch(closeModal());
      return;
    }

    const confirm = await isConfirmed({
      confirmButtonText: 'Đóng lại',
      cancelButtonText: 'Thôi',
      title: 'Tất cả nội dung sẽ bị xóa',
      subTitle: 'Bạn có muốn đóng lại form?',
    });
    if (confirm) dispatch(closeModal());
  };

  const handleOpenModal = (modalName) => {
    dispatch(openModal(modalName));
  };

  const handleDisableDefaultOnClose = () => {
    dispatch(disableDefaultOnClose());
  };

  const handleEnableDefaultOnClose = () => {
    dispatch(enableDefaultOnClose());
  };

  //  ================
  const openCreateOrUpdateUserModal = () => {
    handleOpenModal('create_or_update_user');
  };

  return {
    currentOpenModalName,
    defaultOnClose,
    openCreateOrUpdateUserModal,
    handleCloseModal,
    handleEnableDefaultOnClose,
    handleDisableDefaultOnClose,
  };
};

export default useModal;
