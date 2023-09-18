import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Label from '../../components/form/Label';
import Input from '../../components/inputs/Input';
import useUpdateCurrentUserPassword from '../../react-query/auth/useUpdateCurrentUserPassword';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { updatePasswordSchema } from '../../validation/auth.schema';

const UpdatePassword = () => {
  const { updatePassword, error } = useUpdateCurrentUserPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = (data) => {
    updatePassword(data);
  };

  useEffect(() => {
    if (error === 'Your password is not correct') {
      setError('oldPassword', {
        message: 'Mật khẩu cũ không chính xác',
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="oldPassword">Mật khẩu cũ:</Label>
        <Input type="password" {...register('oldPassword')} id="oldPassword" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'oldPassword')} />
      </div>
      <div>
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <Input type="password" {...register('newPassword')} id="newPassword" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'newPassword')} />
      </div>
      <div>
        <Label htmlFor="newPasswordConfirm">Xác nhận mật khẩu mới:</Label>
        <Input
          type="password"
          {...register('newPasswordConfirm')}
          id="newPasswordConfirm"
        />
        <ErrorMessage
          errorMessage={getErrorMessage(errors, 'newPasswordConfirm')}
        />
      </div>
      <Button className="w-full">Đổi mật khẩu</Button>
    </form>
  );
};

export default UpdatePassword;
