import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useConfirmModal from '../../hooks/useConfirmModal';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';

const LinkNotFound = () => {
  const navigate = useNavigate();
  const { isConfirmed } = useConfirmModal();
  const { isAdminAccount } = useGetAuthInfo();

  const openErrorModal = async () => {
    await isConfirmed({
      title: '404',
      cancelButtonText: 'Đóng',
      subTitle: 'Đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị gỡ bỏ',
      theme: 'error_modal',
    });
  };

  useEffect(() => {
    if (isAdminAccount) navigate('/admin/messages/direct');
    else navigate('/');
    openErrorModal();
  }, []);

  return null;
};

export default LinkNotFound;
