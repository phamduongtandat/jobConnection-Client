import { useForm } from 'react-hook-form';
import Component from './ListBox';

const meta = {
  component: Component,
  title: 'inputs/ListBox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Cái props control là được lấy ra từ useForm của react-hook-form',
      },
    },
  },
};

const Template = (args) => {
  const { control } = useForm();
  return <Component {...args} control={control} />;
};

// single select
export const SingleSelect = Template.bind({});
SingleSelect.args = {
  options: [
    { name: 'Cá nhân', value: 'personal' },
    { name: 'Doanh nghiệp', value: 'business' },
  ],
  fieldName: 'fields',
  placeholder: 'Chọn loại tài khoản',
  hasError: false,
};

// multiple select
export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  options: [
    { name: 'Lập trình website', value: 'code' },
    { name: 'Viết content marketing', value: 'copywritting' },
  ],
  fieldName: 'fields',
  placeholder: 'Chọn một hoặc nhiều lĩnh vực',
  multiple: true,
  hasError: false,
};

export default meta;
