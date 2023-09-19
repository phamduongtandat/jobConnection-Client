import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="font-bold text-4xl">
      <span>vjobs</span>
      <span className="text-primary">.</span>
    </Link>
  );
};

export default Logo;
