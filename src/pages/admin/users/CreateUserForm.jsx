import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import ErrorMessage from '../../../components/form/ErrorMessage';
import Label from '../../../components/form/Label';
import Input from '../../../components/inputs/Input';
import ModalTitle from '../../../components/modal/ModalTitle';
import useConfirmModal from '../../../hooks/useConfirmModal';
import useModal from '../../../hooks/useModal';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { createNewAdminSchema } from '../../../validation/user.schema';

const CreateUserForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isConfirmed } = useConfirmModal();
  const {
    handleDisableDefaultOnClose,
    handleEnableDefaultOnClose,
    currentOpenModalName,
  } = useModal();

  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
  } = useForm({
    resolver: yupResolver(createNewAdminSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    const confirm = await isConfirmed({
      confirmButtonText: 'Email đúng',
      cancelButtonText: 'Sửa lại email',
      title: 'Quan trọng',
      subTitle: `Xác nhận lại email của quản trị viên mới: ${data.email}`,
    });
  };

  useEffect(() => {
    if (isDirty) handleDisableDefaultOnClose();
    if (!isDirty) handleEnableDefaultOnClose();
  }, [isDirty]);

  useEffect(() => {
    if (!currentOpenModalName) {
      searchParams.delete('id');
      setSearchParams(searchParams);
    }
  }, [currentOpenModalName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ModalTitle>Tạo mới quản trị viên</ModalTitle>
      <div>
        <Label>Họ và tên:</Label>
        <Input {...register('name')} placeholder="Nguyễn Văn A" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'name')} />
      </div>
      <div>
        <Label>Email:</Label>
        <Input {...register('email')} placeholder="admin@gmail.com" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'email')} />
      </div>
      <div>
        <Label>Số điện thoại:</Label>
        <Input {...register('phone')} placeholder="Số điện thoại:" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'phone')} />
      </div>
      <div>
        <Label>Vai trò:</Label>
        <Input disabled placeholder="Quản trị viên" />
      </div>
      <Button className="w-full">Hoàn tất</Button>
    </form>
  );
};

export default CreateUserForm;
