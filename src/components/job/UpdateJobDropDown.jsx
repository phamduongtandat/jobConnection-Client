import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoSettings } from 'react-icons/io5';

const UpdateJobDropDown = () => {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button as="button">
        <IoSettings size={24} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute left-0 top-16 w-40 origin-top-right divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <Menu.Item as="li">
            <button className="py-3 px-6 w-full text-start hover:bg-gray-100">
              Chỉnh sửa
            </button>
          </Menu.Item>
          <Menu.Item as="li">
            <button className="py-3 px-6 w-full text-start hover:bg-gray-100">
              Xóa
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UpdateJobDropDown;
