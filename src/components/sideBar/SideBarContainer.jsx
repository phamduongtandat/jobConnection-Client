import { Transition } from '@headlessui/react';
import useSideBar from '../../hooks/useSideBar';
import SideBarContent from './SideBarContent';

function SideBarContainer({ children }) {
  const { isOpen, handleCloseSideBar } = useSideBar();

  return (
    <Transition
      show={isOpen}
      className="fixed top-0 left-0 w-screen h-screen z-50"
    >
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="h-screen w-full bg-black/60 "
        onClick={handleCloseSideBar}
      ></Transition.Child>
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="h-screen bg-white absolute left-0 top-0 z-10"
      >
        <SideBarContent />
      </Transition.Child>
    </Transition>
  );
}

export default SideBarContainer;
