import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorMessage from '../../components/form/ErrorMessage';
import Input from '../../components/inputs/Input';
import useResetPasswordWithToken from '../../react-query/auth/useResetPasswordWithToken';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { resetPasswordWithTokenSchema } from '../../validation/auth.schema';

const ResetPasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(resetPasswordWithTokenSchema),
  });

  const { isLoading, isSuccess, resetPasswordWithToken, error } =
    useResetPasswordWithToken();

  const onSubmit = (data) => {
    resetPasswordWithToken(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error === 'The token is expired' && (
        <ErrorMessage errorMessage="Đường link thay đổi mật khẩu đã bị hết hạn" />
      )}
      <div>
        <Input
          type="password"
          {...register('newPassword')}
          placeholder="Mật khẩu mới"
        />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'newPassword')} />
      </div>
      <div>
        <Input
          type="password"
          {...register('confirmPassword')}
          placeholder="Xác nhận mật khẩu mới"
        />
        <ErrorMessage
          errorMessage={getErrorMessage(errors, 'confirmPassword')}
        />
      </div>
      <Button
        disabled={isLoading}
        className={`w-full ${isLoading ? 'opacity-50' : ''}`}
      >
        Đổi mật khẩu
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
