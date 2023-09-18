import { NavLink } from "react-router-dom";

const NavItem = ({ children, className, to = "/", isShowing = true }) => {
  if (!isShowing) return null;

  return (
    <li className={` ${className}`}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block px-4 py-2.5 hover:bg-base cursor-pointer rounded-sm ${
            isActive ? "font-medium bg-base" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
