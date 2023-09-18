import useSideBar from '../../hooks/useSideBar';

const OpenSideBarBtn = ({ children, className }) => {
  const { handleOpenSideBar } = useSideBar();

  return (
    <button className={className} onClick={handleOpenSideBar}>
      {children}
    </button>
  );
};

export default OpenSideBarBtn;
