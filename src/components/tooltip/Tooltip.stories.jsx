import { Tooltip as TooltipContainer } from 'react-tooltip';
import Tooltip from './Tooltip';

const meta = {
  title: 'components/Tooltip',
};

export const Primary = {
  name: 'Tooltip',
  render: () => (
    <>
      <p className="mb-4">
        Tìm component Tooltip ở trong folder component để dùng
      </p>
      <TooltipContainer id="tooltip" />
      <Tooltip tooltip="Đây là tooltip">
        <button className="bg-black px-2 py-1 text-white">Hover để xem</button>
      </Tooltip>
    </>
  ),
};

export default meta;
