import { AiOutlineMenu } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useSideBar from '../../hooks/useSideBar';
import SupportChatContainer from '../chat/SupportChatContainer';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import OpenSideBarBtn from '../sideBar/OpenSideBarBtn';
import SideBarContent from '../sideBar/SideBarContent';

const Layout = (props) => {
  const { isAdminAccount } = useGetAuthInfo();
  const { pathname } = useLocation();
  const { isStaticSideBarOpen } = useSideBar();

  return (
    <div className="max-w-full overflow-hidden">
      {!isAdminAccount && <SupportChatContainer />}
      {!pathname.startsWith('/admin') && <Header />}
      <div className="flex">
        {isAdminAccount &&
          isStaticSideBarOpen &&
          pathname.startsWith('/admin') && <SideBarContent />}
        {!isStaticSideBarOpen && (
          <OpenSideBarBtn className="fixed top-3 left-3">
            <AiOutlineMenu size={24} />
          </OpenSideBarBtn>
        )}

        <div className="min-h-screen flex-grow">{props.children}</div>
      </div>
      {!pathname.startsWith('/admin') && <Footer />}
    </div>
  );
};

export default Layout;
