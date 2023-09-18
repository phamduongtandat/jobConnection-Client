import { MdModeEdit } from 'react-icons/md';
import Tooltip from '../tooltip/Tooltip';

const EditButton = ({ className, ...btnProps }) => {
  return (
    <Tooltip tooltip="Chỉnh sửa">
      <button {...btnProps} className={`hover:text-primary ${className}`}>
        <MdModeEdit size={22} />
      </button>
    </Tooltip>
  );
};

export default EditButton;
