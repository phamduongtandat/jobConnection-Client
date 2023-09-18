import { useDispatch, useSelector } from 'react-redux';
import {
  closeSideBar,
  hideStaticSideBar,
  openSideBar,
  showStaticSideBar,
} from '../store/sideBarSlice';

const useSideBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sideBar.isOpen);
  const isStaticSideBarOpen = useSelector(
    (state) => state.sideBar.isStaticSideBarOpen,
  );

  const handleOpenSideBar = () => {
    dispatch(openSideBar());
  };

  const handleCloseSideBar = () => {
    dispatch(closeSideBar());
  };

  const handleToggleStaticSideBar = () => {
    if (isStaticSideBarOpen) dispatch(hideStaticSideBar());
    else if (!isStaticSideBarOpen) dispatch(showStaticSideBar());
  };

  return {
    isOpen,
    isStaticSideBarOpen,
    handleOpenSideBar,
    handleCloseSideBar,
    handleToggleStaticSideBar,
  };
};

export default useSideBar;
