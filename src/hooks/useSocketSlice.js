import { useDispatch, useSelector } from 'react-redux';
import {
  adminOffline,
  adminOnline,
  updateUserList,
} from '../store/socketSlice';

const useSocketSlice = () => {
  const dispatch = useDispatch();
  const { isAdminOnline, users } = useSelector((state) => state.socket);

  const handleAdminOnline = () => {
    dispatch(adminOnline());
    console.log('Admin is online');
  };
  const handleAdminOffline = () => {
    console.log('Admin is offline');
    dispatch(adminOffline());
  };
  const handleUpdateUserList = (users) => dispatch(updateUserList(users));
  return {
    isAdminOnline,
    users,
    handleAdminOnline,
    handleAdminOffline,
    handleUpdateUserList,
  };
};

export default useSocketSlice;
