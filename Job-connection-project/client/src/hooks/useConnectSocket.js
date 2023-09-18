import { useEffect } from 'react';
import socket from '../config/socketio';
import useGetAuthInfo from './useGetAuthInfo';

const useConnectSocketIo = () => {
  const { isLoggedIn } = useGetAuthInfo();

  useEffect(() => {
    if (isLoggedIn) socket.connect();
    if (!isLoggedIn) {
      socket.disconnect();
    }
  }, [isLoggedIn, socket]);
};

export default useConnectSocketIo;
