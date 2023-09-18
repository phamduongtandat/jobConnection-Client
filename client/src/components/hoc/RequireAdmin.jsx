import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import LinkNotFound from '../linkNotFound/LinkNotFound';

const RequireAdmin = ({ children }) => {
  const { isAdminAccount } = useGetAuthInfo();

  if (!isAdminAccount) return <LinkNotFound />;
  return <>{children}</>;
};

export default RequireAdmin;
