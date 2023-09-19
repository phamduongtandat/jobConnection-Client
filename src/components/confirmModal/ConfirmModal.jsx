import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import useConfirmModal from '../../hooks/useConfirmModal';

// muốn hiện ra confirmModal thì dùng useConfirmModal hook
// chạy function isConfirmed từ useConfirmModal hook
// const {isConfirm} = useConfirmModal()
// const confirm = await isConfirm({thêm các properties vào đây})

export default function ConfirmModal() {
  const {
    title,
    subTitle,
    isOpen = false,
    resolve,
    reject,
    confirmButtonText,
    cancelButtonText = 'cancel',
    theme,
  } = useConfirmModal();

  return (
    <Transition className="z-50" appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => reject()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle mb-12 shadow-xl transition-all">
                <div className="flex gap-x-3">
                  <div className="mt-0.5">
                    {theme === 'error_modal' && (
                      <RiErrorWarningFill size={20} className="text-error" />
                    )}
                    {theme === 'success_modal' && (
                      <AiFillCheckCircle className="text-success" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div>
                      <h3 className="font-medium text-md leading-6 text-text">
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-text-light">{subTitle}</p>
                      </div>
                    </div>
                    <div className="mt-6 pb-0.5 flex justify-between">
                      {confirmButtonText && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary hover:brightness-95 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-focus"
                          onClick={resolve}
                        >
                          {confirmButtonText}
                        </button>
                      )}
                      <button
                        type="button"
                        className="ml-auto inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-1.5 text-sm font-medium hover:bg-slate-200"
                        onClick={reject}
                      >
                        {cancelButtonText}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="absolute top-2 right-2 rounded-full bg-base-300 p-1.5 text-gray-500 hover:text-neutral"
                  type="button"
                  onClick={reject}
                >
                  <IoCloseSharp size={20} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
