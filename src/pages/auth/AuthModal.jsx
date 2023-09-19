import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Backdrop from '../../components/modal/Backdrop';
import ModalContent from '../../components/modal/ModalContent';
import useAuthModal from '../../hooks/useAuthModal';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthModal() {
  const {
    isOpen,
    currentForm,
    handleCloseAuthModal,
    handleToggleAuthForm,
    handleOpenForgotPasswordModal,
  } = useAuthModal();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseAuthModal}>
        <Backdrop />
        <ModalContent className="p-9 max-w-md w-full">
          <div className="mb-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900 text-center mb-8">
              {currentForm === 'sign_in' && 'Đăng nhập'}
              {currentForm === 'sign_up' && 'Đăng ký'}
              {currentForm === 'forgot_password' && 'Quên mật khẩu'}
              {currentForm === 'reset_password' && 'Đổi mật khẩu'}
            </h3>
            {currentForm === 'sign_in' && <SignInForm />}
            {currentForm === 'sign_up' && <SignUpForm />}
            {currentForm === 'forgot_password' && <ForgotPasswordForm />}
            {currentForm === 'reset_password' && <ResetPasswordForm />}

            {currentForm === 'sign_in' && (
              <button
                type="button"
                className="text-primary mt-2 text-sm text-end w-full hover:underline"
                onClick={handleOpenForgotPasswordModal}
              >
                Quên mật khẩu?
              </button>
            )}
          </div>
          {currentForm !== 'reset_password' && (
            <div className="border-t pt-4 flex justify-center gap-x-3">
              <span className="text-sm text-text-light">
                {currentForm === 'sign_in'
                  ? 'Chưa có tài khoản?'
                  : 'Đã có tài khoản?'}
              </span>
              <span
                className="text-primary cursor-pointer hover:underline text-sm"
                onClick={handleToggleAuthForm}
              >
                {currentForm === 'sign_in' ? 'Đăng ký' : 'Đăng nhập'}
              </span>
            </div>
          )}
        </ModalContent>
      </Dialog>
    </Transition>
  );
}
