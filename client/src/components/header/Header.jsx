import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import OpenSignInFormBtn from '../auth/OpenSignInFormBtn';
import OpenSignUpFormBtn from '../auth/OpenSignUpFormBtn';
import SectionContainer from '../container/SectionContainer';
import Logo from '../logo/Logo';
import OpenSideBarBtn from '../sideBar/OpenSideBarBtn';
import AvatarDropDown from './AvatarDropDown';
import FieldsSlider from './Fields';
import SearchBar from './SearchBar';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <header >
      <SectionContainer
        className=" flex gap-x-4 items-center justify-between"
        wrapperClassName="py-4 border-b"
      >
        <OpenSideBarBtn className="mr-4">
          <AiOutlineMenu size={24} />
        </OpenSideBarBtn>
        <Logo />
        <SearchBar className="hidden sm:flex" />
        {!isLoggedIn && (
          <div className={`flex items-center gap-x-4 `}>
            <OpenSignInFormBtn className="hidden sm:block bg-transparent text-text/80 whitespace-nowrap" />
            <OpenSignUpFormBtn className="whitespace-nowrap" />
          </div>
        )}
        {isLoggedIn && <AvatarDropDown />}
      </SectionContainer>
      <SectionContainer wrapperClassName="border-b bg-teal-50 md:block">
        <FieldsSlider />
      </SectionContainer>
    </header>
  );
};

export default Header;
