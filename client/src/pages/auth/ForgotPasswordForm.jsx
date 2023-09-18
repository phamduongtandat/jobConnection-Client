import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Input from '../../components/inputs/Input';
import useCreateResetPasswordToken from '../../react-query/auth/useCreateResetPasswordToken';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { createResetPasswordTokenSchema } from '../../validation/auth.schema';

const ForgotPasswordForm = () => {
  const {
    formState: { errors },
    setError,
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createResetPasswordTokenSchema),
  });

  const { error, createResetPasswordToken } = useCreateResetPasswordToken();

  const onSubmit = (data) => {
    createResetPasswordToken(data);
  };

  useEffect(() => {
    if (error === 'Can not find user with provided email') {
      setError('email', {
        message: 'Email không tồn tại ở trên hệ thống',
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input {...register('email')} placeholder="Địa chỉ email" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'email')} />
      </div>
      <Button className="w-full mt-2">Gửi mail</Button>
    </form>
  );
};

export default ForgotPasswordForm;
