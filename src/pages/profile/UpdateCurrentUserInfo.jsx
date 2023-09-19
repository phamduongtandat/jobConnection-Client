import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Label from '../../components/form/Label';
import Input from '../../components/inputs/Input';
import ListBox from '../../components/inputs/ListBox';
import Textarea from '../../components/inputs/Textarea';
import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import useUpdateCurrentUser from '../../react-query/auth/useUpdateCurrentUser';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { updateCurrentUserSchema } from '../../validation/auth.schema';

const UpdateCurrentUserInfo = () => {
  const { isPersonalAccount, user, isAdminAccount } = useGetAuthInfo();
  const { updateCurrentUser, isLoading, updatedUser, isSuccess } =
    useUpdateCurrentUser();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateCurrentUserSchema),
    defaultValues: user,
  });

  const onSubmit = (data) => {
    updateCurrentUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset(updatedUser);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-2">
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input value={user?.email} disabled id="email" placeholder="Email" />
      </div>
      <div>
        <Label htmlFor="email">Loại tài khoản:</Label>
        <Input
          value={user?.account_type}
          disabled
          id="email"
          placeholder="Email"
        />
      </div>
      <div>
        <Label htmlFor="name">
          {isPersonalAccount ? 'Họ và tên:' : 'Tên doanh nghiệp:'}
        </Label>
        <Input
          {...register('name')}
          id="name"
          placeholder={
            isPersonalAccount
              ? 'Họ và tên của bạn có dấu'
              : 'Tên doanh nghiệp đầy đủ có dấu'
          }
        />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'name')} />
      </div>
      <div>
        <Label htmlFor="fields">Lĩnh vực kinh doanh:</Label>
        <ListBox
          fieldName="fields"
          control={control}
          multiple
          options={[
            {
              name: 'Thiết kế website',
              value: '507f191e810c19729de860ea',
            },
            {
              name: 'Lập trình website',
              value: '507f1f77bcf86cd799439011',
            },
          ]}
          placeholder="Click để lựa chọn lĩnh vực kinh doanh"
        />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'fields')} />
      </div>
      <div>
        <Label htmlFor="overview">
          {isPersonalAccount
            ? 'Mô tả thông tin cá nhân:'
            : 'Mô tả thông tin doanh nghiệp:'}
        </Label>
        <Textarea
          {...register('overview')}
          id="overview"
          placeholder={
            isPersonalAccount
              ? 'Giới thiệu tóm tắt về  bản thân của bạn'
              : 'Giới thiệu tóm tắt về doanh nghiệp của bạn'
          }
        />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'overview')} />
      </div>
      <div>
        <Label htmlFor="address">
          {isPersonalAccount ? 'Địa chỉ thường trú:' : 'Địa chỉ doanh nghiệp:'}
        </Label>
        <Input {...register('address')} id="address" placeholder="Địa chỉ" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'address')} />
      </div>
      <div>
        <Label htmlFor="phone">
          {isPersonalAccount
            ? 'Số điện thoại cá nhân:'
            : 'Số điện thoại doanh nghiệp:'}
        </Label>
        <Input id="phone" {...register('phone')} placeholder="09755295633" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'phone')} />
      </div>
      <Button
        type="submit"
        className={`w-full ${isLoading || !isDirty ? 'opacity-70' : ''}`}
        disabled={isLoading || !isDirty}
      >
        Cập nhật
      </Button>
    </form>
  );
};

export default UpdateCurrentUserInfo;
