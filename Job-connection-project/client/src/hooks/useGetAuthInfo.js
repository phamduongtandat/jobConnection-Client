import { useSelector } from 'react-redux';

const useGetAuthInfo = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  //console.log(' user:', user)
  const isAdminAccount = isLoggedIn && user?.role === 'admin';

  const isPersonalAccount =
    isLoggedIn && user?.role !== 'admin' && user?.account_type === 'personal';

  const isBusinessAccount =
    isLoggedIn && user?.role !== 'admin' && user?.account_type === 'business';

  return {
    isLoggedIn,
    isPersonalAccount,
    isBusinessAccount,
    isAdminAccount,
    user,
  };
};

export default useGetAuthInfo;
