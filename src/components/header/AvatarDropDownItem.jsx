import { Menu } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

const AvatarDropDownItem = ({ children, to, isShowing = true }) => {
  if (!isShowing) return null;

  return (
    <Menu.Item as="div" className="py-2 hover:text-primary">
      {({ active }) => (
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive || active ? 'text-primary' : ''
          }
        >
          {children}
        </NavLink>
      )}
    </Menu.Item>
  );
};

export default AvatarDropDownItem;
