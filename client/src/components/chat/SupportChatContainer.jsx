import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import useAuthModal from '../../hooks/useAuthModal';
import useConfirmModal from '../../hooks/useConfirmModal';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useSocketSlice from '../../hooks/useSocketSlice';
import useCreateMessage from '../../react-query/messages/useCreateMessage';
import useGetUserSupportMessages from '../../react-query/messages/useGetUserSupportMessages';
import Messages from './Messages';
import SendMessageForm from './SendMessageForm';
import SupportChatHeader from './SupportChatHeader';

const SupportChatContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConfirmed } = useConfirmModal();
  const { isLoggedIn } = useGetAuthInfo();
  const { handleOpenSignInModal } = useAuthModal();
  const { isAdminOnline } = useSocketSlice();

  const openChat = async () => {
    if (!isLoggedIn) {
      const confirm = await isConfirmed({
        cancelButtonText: 'Thôi',
        confirmButtonText: 'Đăng nhập',
        title: 'Hãy đăng nhập để nhắn tin với support',
        subTitle:
          'Chào bạn, hãy đăng nhập hoặc đăng ký tài khoản mới để nhắn tin với support',
      });

      if (confirm) handleOpenSignInModal();
    }

    if (isLoggedIn) setIsOpen(true);
  };
  const closeChat = () => setIsOpen(false);

  // get support messages
  const { data, isFetching } = useGetUserSupportMessages({
    enabled: !!isLoggedIn,
  });

  // handle submit message
  const { createMessage, isSuccess, isLoading: isSending } = useCreateMessage();

  const onSubmit = (data) => {
    createMessage(data);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={openChat}
          className={`fixed z-50 bottom-4 right-4 rounded-full w-12 h-12 text-primary-content flex items-center justify-center group ${
            isAdminOnline ? 'bg-primary' : 'bg-text-light'
          }`}
        >
          <MdSend
            size={24}
            className="-rotate-90 group-hover:rotate-0 transition-all duration-75"
          />
          <span
            className={`absolute w-8 aspect-square animate-ping rounded-full -z-10 ${
              isAdminOnline ? 'bg-primary' : 'bg-text-light'
            }`}
          ></span>
        </button>
      )}
      <Transition
        show={isOpen && isLoggedIn}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="fixed bottom-4 right-4 z-40 w-96 h-[650px] px-1 bg-gray-50 max-w-full pb-4 flex flex-col border shadow-md"
      >
        <SupportChatHeader closeChat={closeChat} />
        {isLoggedIn && (
          <>
            <Messages messages={data} isSending={isSending} />
            <SendMessageForm
              onSubmit={onSubmit}
              isSuccess={isSuccess}
              isLoading={isSending}
            />
          </>
        )}
      </Transition>
    </>
  );
};

export default SupportChatContainer;
