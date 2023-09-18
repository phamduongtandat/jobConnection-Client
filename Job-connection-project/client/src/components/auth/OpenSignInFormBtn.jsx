import useAuthModal from '../../hooks/useAuthModal';
import Button from '../button/Button';

const OpenSignInFormBtn = ({ children = 'Đăng nhập', className }) => {
  const { handleOpenSignInModal } = useAuthModal();

  return (
    <Button className={className} onClick={handleOpenSignInModal}>
      {children}
    </Button>
  );
};

export default OpenSignInFormBtn;
