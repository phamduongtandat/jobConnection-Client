import { useState } from 'react';
import Tooltip from '../../../components/tooltip/Tooltip';
import useToggleUserStatus from '../../../react-query/users/useToggleUserStatus';

const ToggleUserStatusBtn = ({ status, role, userId }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const { updateUser, isLoading } = useToggleUserStatus();
  const disabled = isLoading || role === 'admin';

  const handleToggleUserStatus = () => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    setCurrentStatus(newStatus);

    updateUser({
      status: newStatus,
      _id: userId,
    });
  };

  if (role === 'admin') return null;

  return (
    <Tooltip tooltip={status === 'active' ? 'Khóa' : 'Mở khóa'}>
      <button
        className={` ${
          currentStatus === 'active'
            ? 'text-text'
            : 'text-red-400 bg-red-50 px-6 py-0.5 rounded-full font-medium'
        }
      ${disabled ? 'opacity-50 pointer-events-none' : ''}
      
      `}
        onClick={handleToggleUserStatus}
        disabled={disabled}
      >
        {currentStatus === 'active' ? (
          <div className="flex items-center gap-x-1">
            <span>Hoạt động</span>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <span>Tạm dừng</span>
          </div>
        )}
      </button>
    </Tooltip>
  );
};

export default ToggleUserStatusBtn;
