//import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import ErrorMessage from '../../../components/form/ErrorMessage';
import Label from '../../../components/form/Label';
import Input from '../../../components/inputs/Input';
import ModalTitle from '../../../components/modal/ModalTitle';
import useConfirmModal from '../../../hooks/useConfirmModal';
import useCreateOrUpdateModal from '../../../hooks/useCreateOrUpdateModal';

import useUpdateUser from '../../../react-query/users/useUpdateUser';
import { getErrorMessage } from '../../../utils/getErrorMessage';
//import {createNewAdminSchema, updateUserByIdSchema} from '../../../validation/user.schema';
import useGetField from '../../../react-query/fields/useGetField.js';
import useCreateNewField from './../../../react-query/fields/useCreateNewField';
import useUpdateField from './../../../react-query/fields/useUpdateField';

const CreateOrUpdateFieldForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { field, isSuccess, isError } = useGetField({
    id,
    query: { fields: 'name' },
  });
  const { isConfirmed } = useConfirmModal();

  const {
    handleSubmit,
    register,
    reset,    
    formState: { errors, isDirty },
  } = useForm({
    //resolver: yupResolver(id ? updateUserByIdSchema : createNewAdminSchema),
    defaultValues: {
      role: 'admin',
    },
  });

  useCreateOrUpdateModal({ isDirty });

  useEffect(() => {
    if (isSuccess) {
      reset(field);
    }
  }, [isSuccess]);

  //
  const { createNewField, error } = useCreateNewField();
  const { updateField } = useUpdateField({ id });

  const onSubmit = async (data) => {
    

    const confirm = await isConfirmed({
      confirmButtonText: 'Hoàn tất',
      cancelButtonText: 'Thôi',
      title: 'Quan trọng',
      subTitle: `Hãy xác nhận lại lĩnh vực mới: ${data.name}`,
    });

    if (confirm && !id) {
        createNewField(data);
    }

    if (confirm && id) {
        updateField(data);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ModalTitle>
        {id ? 'Cập nhập lĩnh vực' : 'Tạo mới lĩnh vực'}
      </ModalTitle>
      {isError && (
        <ErrorMessage errorMessage="Không thể lấy thông tin lĩnh vực" />
      )}

      <div>
        <Label>Tên lĩnh vực:</Label>
        <Input {...register('name')} placeholder="" />
        <ErrorMessage errorMessage={getErrorMessage(errors, 'name')} />
      </div>      
      <Button className="w-full">Hoàn tất</Button>
    </form>
  );
};

export default CreateOrUpdateFieldForm;
