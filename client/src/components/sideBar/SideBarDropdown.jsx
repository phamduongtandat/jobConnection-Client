import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

function SideBarDropDown({ children, isShowing }) {
  const [isShow, setIsShow] = useState(false);

  const toggleDropDown = () => setIsShow((prev) => !prev);

  if (!isShowing) return null;

  return (
    <div className="w-full py-2" onClick={(e) => e.stopPropagation()}>
      <div
        onClick={toggleDropDown}
        className="flex items-center justify-between cursor-pointer hover:text-text"
      >
        <button>Lĩnh vực kinh doanh</button>
        {isShow ? <BsChevronUp size={18} /> : <BsChevronDown size={18} />}
      </div>
      <Transition
        as={'ul'}
        show={isShow}
        enter="transform transition duration-[400ms]"
        enterFrom="h-0 opacity-0"
        enterTo="h-full opacity-100"
        leave="transform transition duration-[200ms] ease-in-out"
        leaveFrom="h-full opacity-100"
        leaveTo="h-0 opacity-0"
        className="pl-4 py-2"
      >
        {children}
      </Transition>
    </div>
  );
}

export default SideBarDropDown;
