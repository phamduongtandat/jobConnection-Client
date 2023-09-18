import Avatar from '../../components/avatar/Avatar';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useSignOut from '../../react-query/auth/useSignOut';
import NavItem from './NavItem';

const ProfilePageNav = () => {
  const { user, isAdminAccount, isBusinessAccount, isPersonalAccount } =
    useGetAuthInfo();

  const { signOut } = useSignOut();

  return (
    <div className="py-6 bg-white w-80 px-6 min-h-[400px] rounded-sm hidden lg:block">
      <div className="my-6 mb-8">
        <Avatar />
      </div>
      <ul className="space-y-2">
        <NavItem
          isShowing={isPersonalAccount || isBusinessAccount}
          to="user-info"
        >
          {isBusinessAccount && 'Thông tin doanh nghiệp'}
          {isPersonalAccount && 'Thông tin cá nhân'}
        </NavItem>
        <NavItem isShowing={isAdminAccount} to="/admin/users">
          Quản lý người dùng
        </NavItem>
        <NavItem isShowing={isAdminAccount} to="/admin/fields">
          Quản lý lĩnh vực
        </NavItem>
        <NavItem isShowing={isAdminAccount} to="/admin/jobs">
          Quản lý tin tuyển dụng
        </NavItem>
        <NavItem isShowing={isBusinessAccount} to="/jobs/all-jobs/posted-jobs">
          Tin tuyển dụng đã đăng
        </NavItem>
        <NavItem isShowing={isPersonalAccount} to={`applied-jobs/${user._id}`}>
          Công việc đã ứng tuyển
        </NavItem>

        <NavItem isShowing={isPersonalAccount} to="../jobs/all-jobs/job-list">
          Danh sách tuyển dụng
        </NavItem>

        <NavItem to="/profile/update-password">Đổi mật khẩu</NavItem>
        <button
          onClick={signOut}
          className="px-4 py-2.5 hover:bg-base cursor-pointer rounded-sm text-start w-full"
        >
          Đăng xuất
        </button>
      </ul>
    </div>
  );
};

export default ProfilePageNav;
