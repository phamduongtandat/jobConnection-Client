import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Input from '../../components/inputs/Input';
import useSignIn from '../../react-query/auth/useSignIn';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { signInSchema } from '../../validation/auth.schema';

const SignInForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: 'admin@gmail.com',
      password: 'Matkhau1@',
    },
  });

  const { error, isError, isLoading, isSuccess, signIn } = useSignIn();

  const onSubmit = (data) => {
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {error === 'Invalid email or password' && (
        <ErrorMessage errorMessage="Email hoặc mật khẩu không đúng" />
      )}

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
      <Button className="font-semibold w-full hover:bg-primary-focus">
        Đăng nhập
      </Button>
    </form>
  );
};

export default SignInForm;
