import { NavLink } from 'react-router-dom';
import useSideBar from '../../hooks/useSideBar';

const SideBarItem = ({ children, className, isShowing = true, to }) => {
  const { handleCloseSideBar } = useSideBar();

  if (!isShowing) return null;

  return (
    <NavLink
      className={({ isActive }) =>
        `text-text-light py-2 block w-full hover:text-text ${
          isActive ? 'font-medium !text-primary' : ''
        } ${className}`
      }
      to={to}
      onClick={handleCloseSideBar}
    >
      {children}
    </NavLink>
  );
};

export default SideBarItem;
