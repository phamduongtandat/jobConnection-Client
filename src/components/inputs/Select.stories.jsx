import Select from './Select';

const meta = {
  component: Select,
  title: 'inputs/Select',
  tags: ['autodocs'],
};

export const Primary = {
  render: () => (
    <>
      <p className="mb-6">
        // Giống như html select nhưng thêm một số className vào
      </p>
      <Select className="" hasError={false}>
        <option value="" disabled>
          Loại tài khoản
        </option>
        <option value="personal">Cá nhân</option>
        <option value="business">Doanh nghiệp</option>
      </Select>
    </>
  ),
};
export default meta;
