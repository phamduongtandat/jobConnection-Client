import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';

const RequireLogin = ({ children }) => {
  const { isConfirmed } = useConfirmModal();
  const navigate = useNavigate();
  const { isLoggedIn } = useGetAuthInfo();
  const { handleOpenSignInModal } = useAuthModal();

  const openErrorModal = async () => {
    const confirm = await isConfirmed({
      title: 'Nội dung chỉ dành cho thành viên',
      subTitle: 'Hãy đăng nhập để truy cập vào đường dẫn',
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Đóng',
      theme: 'error_modal',
    });

    if (confirm) handleOpenSignInModal();
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/');
      openErrorModal();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
};

export default RequireLogin;
