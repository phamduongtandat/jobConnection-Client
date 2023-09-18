import { useLocation } from 'react-router-dom';
import useSocketSlice from '../../hooks/useSocketSlice';
import useCreateMessage from '../../react-query/messages/useCreateMessage';
import useEndSupportChat from '../../react-query/messages/useEndSupportChat';
import useGetMessagesWithOne from '../../react-query/messages/useGetMessagesWithOne';
import useGetUserPendingMessages from '../../react-query/messages/useGetUserPendingMessages';
import useStartSupportChat from '../../react-query/messages/useStartSupportChat';
import useGetUser from '../../react-query/users/useGetUser';
import Button from '../button/Button';
import Messages from './Messages';
import ReceiverList from './ReceiverList';
import SendMessageForm from './SendMessageForm';

const DirectChatContainer = () => {
  const receiverId = useLocation().pathname.split('/').pop();
  const pathname = useLocation().pathname;
  const { data: pendingMessages } = useGetUserPendingMessages(receiverId);
  const { data: directMessages } = useGetMessagesWithOne(receiverId);

  const { startSupportChat, isLoading: isStartingSupportChat } =
    useStartSupportChat();

  const { endSupportChat, isLoading: isEndingSupportChat } =
    useEndSupportChat();

  const handleStartSupportChat = () => {
    if (receiverId.length === 24) startSupportChat(receiverId);
  };

  const handleEndSupportChat = () => {
    if (receiverId.length === 24) endSupportChat(receiverId);
  };

  const messages = pathname.startsWith('/admin/messages/direct')
    ? directMessages
    : pendingMessages;

  // send message
  const { createMessage, isLoading: isSendingMessage } = useCreateMessage({
    sender: 'admin',
  });

  const onSubmit = (data) => {
    if (receiverId.length === 24) {
    }
    createMessage({
      ...data,
      to: receiverId,
    });
  };

  const { user, isLoading: isLoadingReceiver } = useGetUser({
    id: receiverId,
    query: { fields: 'name profileImage email' },
  });

  const { users } = useSocketSlice();
  const isOnline = users[receiverId] && users[receiverId].isOnline;

  return (
    <div className="flex">
      <ReceiverList
        className={receiverId.length === 24 ? 'hidden lg:block' : ''}
      />
      <div className="flex-grow px-8">
        {receiverId.length === 24 && (
          <div className="flex border flex-col max-w-5xl mx-auto pb-6 bg-white h-screen small-scrollbar">
            {pathname.startsWith('/admin/messages/pending') && (
              <div className="py-4 px-10 border-b space-y-2 bg-gray-50 flex justify-end">
                <Button onClick={handleStartSupportChat}>
                  Bắt đầu cuộc hội thoại
                </Button>
              </div>
            )}

            {pathname.startsWith('/admin/messages/direct') && (
              <div className="py-4 px-10 border-b space-y-2 bg-gray-50 flex justify-end">
                <Button onClick={handleEndSupportChat} className="bg-red-400">
                  Kết thúc hội thoại
                </Button>
              </div>
            )}
            <div className="flex items-center gap-x-6 p-4 border-b">
              {!isLoadingReceiver && (
                <>
                  <img
                    className="w-10 aspect-square"
                    src={user?.profileImage}
                  />
                  <div>
                    <div>{user?.name || user?.email}</div>
                    {isOnline === false ? (
                      <div className="text-sm text-text-light flex items-center gap-x-2">
                        <div>Hoạt động 15 phút trước</div>
                        <div className="w-2 aspect-square rounded-full bg-text-light"></div>
                      </div>
                    ) : (
                      <div className="text-sm text-primary flex items-center gap-x-2">
                        <div>Đang hoạt động</div>
                        <div className="w-2 aspect-square rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <Messages
              isSending={isSendingMessage}
              messages={messages}
              className="!px-10"
            />
            <SendMessageForm
              className="!px-10"
              disabled={pathname.startsWith('/admin/messages/pending')}
              isLoading={isSendingMessage}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectChatContainer;
