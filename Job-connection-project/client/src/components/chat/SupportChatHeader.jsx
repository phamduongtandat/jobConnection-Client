import { IoMdClose } from 'react-icons/io';
import useSocketSlice from '../../hooks/useSocketSlice';

const SupportChatHeader = ({ closeChat }) => {
  const { isAdminOnline } = useSocketSlice();

  return (
    <div className="relative bg-white px-4 py-4 border-b">
      <h3 className="text-2xl font-semibold">Nhắn tin với support</h3>
      {isAdminOnline ? (
        <div className="flex items-center gap-x-2">
          <div className="text-primary text-sm font-medium">online</div>
          <div className="w-2 aspect-square bg-primary rounded-full"></div>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <div className="text-sm text-text-light">offline</div>
          <div className="w-2 aspect-square bg-text-light rounded-full"></div>
        </div>
      )}
      <button
        onClick={closeChat}
        className="absolute right-2 top-2 text-text-light hover:text-error"
      >
        <IoMdClose size={30} />
      </button>
    </div>
  );
};

export default SupportChatHeader;
