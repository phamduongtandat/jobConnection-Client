import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import useModal from '../../hooks/useModal';
import Backdrop from './Backdrop';
import ModalContent from './ModalContent';

function Modal({ children, modalName, className = 'w-96 h-full' }) {
  const { currentOpenModalName, handleCloseModal, defaultOnClose } = useModal();

  const isOpen = currentOpenModalName === modalName;

  const onClose = () => {
    // handleCloseModal();
    if (defaultOnClose) handleCloseModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Backdrop />
        <ModalContent className={`p-9 ${className}`}>
          <div>{children}</div>
          <button
            className="absolute text-text/50 right-2 top-2 hover:text-error"
            type="button"
            onClick={handleCloseModal}
          >
            <IoCloseSharp size={30} />
          </button>
        </ModalContent>
      </Dialog>
    </Transition>
  );
}

export default Modal;
