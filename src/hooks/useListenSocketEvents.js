import { useEffect } from 'react';
import { queryClient } from '../config/react-query';
import socket from '../config/socketio';
import useSocketSlice from './useSocketSlice';

const useListenSocketEvents = () => {
  const { handleAdminOffline, handleAdminOnline, handleUpdateUserList } =
    useSocketSlice();

  // admin to user
  const handleNewSupportMessage = (data) => {
    queryClient.setQueryData(['messages', 'support-messages'], (messages) =>
      messages ? [...messages, data] : messages,
    );
  };

  // user to admin
  const handleNewDirectMessage = (message) => {
    queryClient.invalidateQueries(['messages', 'last-messages']);

    queryClient.setQueryData(
      ['messages', 'direct', message.from._id],
      (messages) => (messages ? [...messages, message] : messages),
    );
  };

  const handleNewPendingMessage = (message) => {
    queryClient.invalidateQueries(['messages', 'pending-messages']);

    queryClient.setQueryData(
      ['messages', 'pending', message.from._id],
      (messages) => (messages ? [...messages, message] : messages),
    );
  };

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('admin_online', handleAdminOnline);
      socket.on('admin_offline', handleAdminOffline);
      socket.on('user_list', handleUpdateUserList);
      socket.on('new_support_message', handleNewSupportMessage);
      socket.on('new_direct_message', handleNewDirectMessage);
      socket.on('new_pending_message', handleNewPendingMessage);
    });
    socket.on('disconnect', () => {
      socket.removeAllListeners();
    });
  }, []);
};

export default useListenSocketEvents;
