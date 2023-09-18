import useAuthModal from '../../hooks/useAuthModal';
import Button from '../button/Button';

const OpenSignUpFormBtn = ({ children = 'Đăng ký', className }) => {
  const { handleOpenSignUpModal } = useAuthModal();

  return (
    <Button className={className} onClick={handleOpenSignUpModal}>
      {children}
    </Button>
  );
};

export default OpenSignUpFormBtn;
