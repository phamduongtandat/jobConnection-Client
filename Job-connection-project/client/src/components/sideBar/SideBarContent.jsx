import { Link } from 'react-router-dom';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useSideBar from '../../hooks/useSideBar';
import useSignOut from '../../react-query/auth/useSignOut';
import OpenSignInFormBtn from '../auth/OpenSignInFormBtn';
import OpenSignUpFormBtn from '../auth/OpenSignUpFormBtn';
import Avatar from '../avatar/Avatar';
import Button from '../button/Button';
import SideBarDropDown from './SideBarDropdown';
import SideBarItem from './SideBarItem';

const SideBarContent = () => {
  const {
    isLoggedIn,
    isAdminAccount,
    isBusinessAccount,
    isPersonalAccount,
    user,
  } = useGetAuthInfo();

  const { handleCloseSideBar, isStaticSideBarOpen, handleToggleStaticSideBar } =
    useSideBar();
  const { signOut } = useSignOut();

  return (
    <div
      onClick={handleCloseSideBar}
      className="w-72 flex-shrink-0 p-6 flex flex-col h-screen gap-y-1 items-start text-text-light "
    >
      {isLoggedIn && (
        <Link
          to={isAdminAccount ? '/admin/users' : '/profile/user-info'}
          className="flex items-center gap-x-4 mb-6"
        >
          <Avatar className="!w-14 text-2xl" />
          <span className="font-medium text-text">
            {user?.name || user?.email}
          </span>
        </Link>
      )}
      <SideBarItem
        className="flex items-center gap-x-2 justify-between"
        to="/"
        isShowing={true}
      >
        Trang chủ
      </SideBarItem>
      {!isLoggedIn && (
        <>
          <OpenSignUpFormBtn className="mb-5">
            Tạo tài khoản mới
          </OpenSignUpFormBtn>
          <OpenSignInFormBtn className="bg-transparent py-2 !px-0 font-normal text-text-light hover:text-text" />
        </>
      )}
      <SideBarDropDown isShowing={!isAdminAccount}>
        <SideBarItem to="/sd">Lập trình website</SideBarItem>
        <SideBarItem to="/sd">Marketing</SideBarItem>
        <SideBarItem to="/sd">Thiết kế</SideBarItem>
        <SideBarItem to="/sd">Chạy quảng cáo</SideBarItem>
        <SideBarItem to="/sd">Wordpress</SideBarItem>
      </SideBarDropDown>
      <SideBarItem
        to="/profile/user-info"
        isShowing={isPersonalAccount || isBusinessAccount}
      >
        Thông tin tài khoản
      </SideBarItem>

      <SideBarItem to="../jobs/all-jobs/job-list" isShowing={isPersonalAccount}>
        Danh sách tuyển dụng
      </SideBarItem>

      <SideBarItem
        to={`/profile/applied-jobs/${user?._id}`}
        isShowing={isPersonalAccount}
      >
        Công việc đã ứng tuyển
      </SideBarItem>
      <SideBarItem to="/profile/posted-jobs" isShowing={isBusinessAccount}>
        Tin tuyển dụng đã đăng
      </SideBarItem>

      <SideBarItem
        className="flex items-center gap-x-2 justify-between"
        to="/admin/messages/direct"
        isShowing={isAdminAccount}
      >
        Tin nhắn
      </SideBarItem>
      <SideBarItem
        className="flex items-center gap-x-2 justify-between"
        to="/admin/messages/pending"
        isShowing={isAdminAccount}
      >
        Tin nhắn chờ
      </SideBarItem>
      <SideBarItem to="/admin/users" isShowing={isAdminAccount}>
        Quản lý người dùng
      </SideBarItem>
      <SideBarItem to="/admin/fields" isShowing={isAdminAccount}>
        Quản lý lĩnh vực
      </SideBarItem>
      <SideBarItem to="/admin/jobs" isShowing={isAdminAccount}>
        Quản lý tin tuyển dụng
      </SideBarItem>
      <SideBarItem to="/profile/update-password">Đổi mật khẩu</SideBarItem>
      {isLoggedIn && isAdminAccount && (
        <button className="py-2 hover:text-primary" onClick={signOut}>
          Đăng xuất
        </button>
      )}

      {isLoggedIn && !isAdminAccount && (
        <Button className="w-full mt-auto">Đăng xuất</Button>
      )}

      {isAdminAccount && (
        <Button
          className={`w-full mt-auto sticky bottom-4 ${isStaticSideBarOpen ? '!bg-dark' : ''
            }`}
          onClick={handleToggleStaticSideBar}
        >
          {isStaticSideBarOpen ? 'Ẩn sidebar' : 'Hiện sidebar'}
        </Button>
      )}
    </div>
  );
};

export default SideBarContent;
