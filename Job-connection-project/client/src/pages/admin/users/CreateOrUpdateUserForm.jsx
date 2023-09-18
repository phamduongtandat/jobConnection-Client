import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import ErrorMessage from '../../../components/form/ErrorMessage';
import Label from '../../../components/form/Label';
import Input from '../../../components/inputs/Input';
import Select from '../../../components/inputs/Select';
import ModalTitle from '../../../components/modal/ModalTitle';
import useConfirmModal from '../../../hooks/useConfirmModal';
import useCreateOrUpdateModal from '../../../hooks/useCreateOrUpdateModal';
import useCreateNewAdmin from '../../../react-query/users/useCreateNewAdmin';
import useGetUser from '../../../react-query/users/useGetUser';
import useUpdateUser from '../../../react-query/users/useUpdateUser';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import {
  createNewAdminSchema,
  updateUserByIdSchema,
} from '../../../validation/user.schema';

const CreateOrUpdateUserForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { user, isSuccess, isError } = useGetUser({
    id,
    query: { fields: 'name email phone role account_type' },
  });
  const { isConfirmed } = useConfirmModal();

  const {
    handleSubmit,
    register,
    reset,
    setError,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(id ? updateUserByIdSchema : createNewAdminSchema),
    defaultValues: {
      role: 'admin',
    },
  });

  useCreateOrUpdateModal({ isDirty });

  useEffect(() => {
    if (isSuccess) {
      reset(user);
    }
  }, [isSuccess]);

  //
  const { createNewAdmin, error } = useCreateNewAdmin();
  const { updateUser } = useUpdateUser({ id });

  const onSubmit = async (data) => {
    if (data.role === 'user' && id) {
      updateUser(data);
      return;
    }

    const confirm = await isConfirmed({
      confirmButtonText: 'Hoàn tất',
      cancelButtonText: 'Thôi',
      title: 'Quan trọng',
      subTitle: `Hãy xác nhận lại email của quản trị viên mới: ${data.email}`,
    });
 
    if (confirm && !id) {
      createNewAdmin(data);
    }

    if (confirm && id) {
      updateUser(data);
    }
  };

  useEffect(() => {
    if (error === 'email already existed') {
      setError('email', {
        message: 'Email đã tồn tại',
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ModalTitle>
        {id ? 'Cập nhập quản trị viên' : 'Tạo mới quản trị viên'}
      </ModalTitle>
      {isError && (
        <ErrorMessage errorMessage="Không thể lấy thông tin người dùng" />
      )}

      <div>
        <Label>Họ và tên:</Label>
        <Input {...register('name')} placeholder="Nguyễn Văn A" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'name')} />
      </div>
      <div>
        <Label>Email:</Label>
        <Input {...register('email')} disabled={!!id} />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'email')} />
      </div>
      <div>
        <Label>Số điện thoại:</Label>
        <Input {...register('phone')} placeholder="phone" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'phone')} />
      </div>
      <div>
        <Label>Vai trò:</Label>
        <Select disabled={!id} {...register('role')}>
          <option value="admin">Quản trị viên</option>
          <option value="user">Người dùng</option>
        </Select>
        <ErrorMessage errorMessage={getErrorMessage(errors, 'role')} />
      </div>
      <div>
        {watch('role') === 'user' && (
          <>
            <Label>Loại tài khoản:</Label>
            <Select {...register('account_type')}>
              <option value="personal">Người lao động</option>
              <option value="business">Nhà tuyển dụng</option>
            </Select>
            <ErrorMessage errorMessage={getErrorMessage(errors, 'role')} />
          </>
        )}
      </div>
      <Button className="w-full">Hoàn tất</Button>
    </form>
  );
};

export default CreateOrUpdateUserForm;
