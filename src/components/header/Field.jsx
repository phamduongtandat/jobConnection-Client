import { NavLink } from 'react-router-dom';

const Field = ({ children, to }) => {
  return (
    <NavLink
      to="/"
      className="border-b-2 border-transparent hover:border-primary whitespace-nowrap"
    >
      {children}
    </NavLink>
  );
};

export default Field;
