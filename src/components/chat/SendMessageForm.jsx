import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { createMessageSchema } from '../../validation/message.schema';

const SendMessageForm = ({ onSubmit, isLoading, className, disabled }) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, errors },
  } = useForm({
    resolver: yupResolver(createMessageSchema),
    mode: 'onChange',
  });

  const errorMessage = getErrorMessage(errors, 'content');

  useEffect(() => {
    if (isLoading) reset();
  }, [isLoading]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleFocusTextarea = () => {
    setFocus('content');
  };

  return (
    <form
      onClick={handleFocusTextarea}
      onSubmit={handleSubmit(onSubmit)}
      className={`sticky bottom-0 px-4 ${className} `}
    >
      <div className={`bg-white border p-4  ${disabled ? '!bg-gray-100' : ''}`}>
        <textarea
          type="text"
          className={`w-full h-12 outline-none  bg-transparent resize-none hidden-scrollbar`}
          {...register('content')}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          className={`bg-dark ml-auto right-3 bottom-3 self-end text-primary-content flex items-center justify-center w-9 aspect-square rounded-full ${
            !isDirty || errorMessage || isLoading || disabled
              ? 'opacity-50 pointer-events-none'
              : ''
          }`}
        >
          <MdSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default SendMessageForm;
