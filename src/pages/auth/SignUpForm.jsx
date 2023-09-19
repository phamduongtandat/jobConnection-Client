import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Input from '../../components/inputs/Input';
import Select from '../../components/inputs/Select';
import useSignUp from '../../react-query/auth/useSignUp';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { registerUserSchema } from '../../validation/auth.schema';

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerUserSchema),
    defaultValues: {
      email: 'test@test.com',
      confirmPassword: 'Matkhau1@',
      password: 'Matkhau1@',
      account_type: 'personal',
    },
  });

  const { signUp, error, isSuccess, isLoading } = useSignUp();

  const onSubmit = (data) => {
    signUp(data);
  };

  useEffect(() => {
    if (error === 'email already existed') {
      setError('email', {
        message: 'Địa chỉ email đã tồn tại',
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input placeholder="Email" {...register('email')} />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'email')} />
      </div>
      <div>
        <Input
          placeholder="Mật khẩu"
          {...register('password')}
          type="password"
        />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'password')} />
      </div>
      <div>
        <Input
          placeholder="Xác nhận mật khẩu"
          type="password"
          {...register('confirmPassword')}
        />
        <ErrorMessage
          errorMessage={getErrorMessage(errors, 'confirmPassword')}
        />
      </div>
      <div>
        <Select {...register('account_type')} defaultValue="">
          <option value="" disabled>
            Loại tài khoản
          </option>
          <option value="personal">Cá nhân</option>
          <option value="business">Doanh nghiệp</option>
        </Select>
        <ErrorMessage errorMessage={getErrorMessage(errors, 'account_type')} />
      </div>
      <Button
        disabled={isLoading}
        className={`w-full hover:bg-primary-focus ${
          isLoading ? 'opacity-50' : ''
        }`}
      >
        Đăng ký
      </Button>
    </form>
  );
};

export default SignUpForm;
