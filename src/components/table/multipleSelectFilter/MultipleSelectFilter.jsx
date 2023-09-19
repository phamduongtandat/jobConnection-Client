import { Menu } from '@headlessui/react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import DropDownMenu from '../../dropdownMenu/DropDownMenu';
import MultipleSelectItem from './MultipleSelectItem';

const MultipleSelectFilter = ({ fieldName, options = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasParam = searchParams.has(fieldName);

  const removeFilter = () => {
    searchParams.delete(fieldName);
    setSearchParams(searchParams);
  };

  return (
    <Menu as="div" className="relative w-fit">
      <Menu.Button
        className={`flex justify-between items-center border px-4 py-1 border-dashed rounded-full bg-gray-50 hover:bg-gray-100 ${
          hasParam ? 'bg-primary text-white hover:bg-primary-focus' : ''
        }`}
      >
        <span>Loại tài khoản</span>
        <MdOutlineArrowDropDown size={20} />
      </Menu.Button>
      <DropDownMenu>
        <Menu.Items
          as="ul"
          className="absolute -bottom-1 translate-y-full bg-white px-2 py-4 shadow-md border rounded-sm"
        >
          {options.map((option) => (
            <MultipleSelectItem
              key={option.value}
              fieldName={fieldName}
              value={option?.value}
              name={option?.name}
            />
          ))}
          <Menu.Item
            disabled={!hasParam}
            as="button"
            className={`w-full mt-4 text-sm text-primary hover: ${
              !hasParam ? '!text-text-light pointer-events-none' : ''
            }`}
            onClick={removeFilter}
          >
            {({ active }) => (
              <span className={active ? 'underline' : ''}>Xóa bộ lọc</span>
            )}
          </Menu.Item>
        </Menu.Items>
      </DropDownMenu>
    </Menu>
  );
};

export default MultipleSelectFilter;
