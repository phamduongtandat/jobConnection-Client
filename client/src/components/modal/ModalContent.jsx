import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const ModalContent = ({ children, className }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            className={`transform bg-white text-left rounded-md transition-all ${className}`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default ModalContent;
