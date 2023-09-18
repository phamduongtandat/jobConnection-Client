import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useSocketSlice from '../../hooks/useSocketSlice';
import useGetLastMessages from '../../react-query/messages/useGetLastMessages';
import useGetLastPendingMessages from '../../react-query/messages/useGetLastPendingMessages';

const Receiver = ({ from, to, content, currentUserId, isRead }) => {
  const [read, setRead] = useState(isRead);
  const receiverId = useLocation().pathname.split('/').pop();

  const sender = from && from._id === currentUserId ? 'me' : 'other';
  let receiver;

  if (!from) {
    receiver = to;
  }

  if (!to) {
    receiver = from;
  }

  if (from && to) {
    if (from._id === currentUserId) receiver = to;
    if (to._id === currentUserId) receiver = from;
  }

  const { users } = useSocketSlice();
  const isOnline = users[receiver._id] && users[receiver._id].isOnline;

  useEffect(() => {
    if (receiverId === receiver._id) {
      setRead(true);
    }
  }, [receiverId]);

  return (
    <NavLink
      to={receiver._id}
      className={({ isActive }) =>
        `flex gap-x-4 py-3 hover:bg-gray-100 cursor-pointer px-4 ${
          isActive ? 'bg-gray-100' : ''
        } `
      }
      onClick={() => setRead(true)}
    >
      <div className="relative">
        <img
          src={receiver?.profileImage}
          className="w-12 h-12 object-cover object-center rounded-full"
        />
        <span
          className={`right-0 top-0 absolute w-3 aspect-square rounded-full ${
            isOnline ? 'bg-primary' : 'bg-text-light'
          }`}
        ></span>
      </div>
      <div className="flex flex-col justify-between">
        <div>{receiver.name || receiver.email}</div>
        <div className="text-text-light text-sm">
          <span className={read ? '' : 'font-semibold text-black'}>
            {sender === 'me' ? `Bạn: ${content}` : content}
          </span>
        </div>
      </div>
    </NavLink>
  );
};

const ReceiverList = ({ className }) => {
  const pathname = useLocation().pathname;
  const { user } = useGetAuthInfo();
  const { data: lastMessages, isLoading: isLoadingLastMessages } =
    useGetLastMessages();
  const { data: pendingMessages, isLoadingLastPendingMessages } =
    useGetLastPendingMessages();

  const { users } = useSocketSlice();

  let messages = [];

  if (pathname.startsWith('/admin/messages/direct')) {
    messages = lastMessages;
  }

  if (pathname.startsWith('/admin/messages/pending')) {
    messages = pendingMessages;
  }

  return (
    <div
      className={`w-96 bg-white border-l h-screen flex-shrink-0 ${className}`}
    >
      {!isLoadingLastMessages &&
        !isLoadingLastPendingMessages &&
        !messages?.length && (
          <div className="px-4 py-4">Không có tin nhắn nào được tìm thấy</div>
        )}
      {messages?.map((message) => (
        <Receiver
          key={message._id}
          content={message.content}
          from={message.from}
          to={message.to}
          currentUserId={user._id}
          users={users}
          isRead={message.isRead}
        />
      ))}
    </div>
  );
};

export default ReceiverList;
