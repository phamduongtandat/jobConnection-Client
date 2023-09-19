import { useState } from 'react';
import { ConfirmModalContextProvider } from '../../contexts/ConfirmModalContextProvider';
import useConfirmModal from '../../hooks/useConfirmModal';
import Component from './ConfirmModal';

// muốn dùng confirmModal thì làm theo OpenModal ở dưới
const OpenModal = () => {
  const [selection, setSelection] = useState();
  const { isConfirmed } = useConfirmModal();

  const handleConfirm = async (theme) => {
    const confirm = await isConfirmed({
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      title: 'Do you want to continue?',
      subTitle: 'This is subtitle',
      theme,
    });

    if (confirm) setSelection(true);
    if (!confirm) setSelection(false);
  };

  return (
    <div className="flex flex-col items-start gap-y-4">
      <p>
        Để sử dụng ConfirmModal thì phải dùng useConfirmModal hook. Import
        useConfirmModal ở src/hooks.
      </p>
      <button
        onClick={() => handleConfirm('confirm_modal')}
        className="px-4 py-1.5 bg-dark text-dark-content"
      >
        Open confirm modal
      </button>
      <button
        onClick={() => handleConfirm('success_modal')}
        className="px-4 py-1.5 bg-success text-dark-content"
      >
        Open success modal
      </button>
      <button
        onClick={() => handleConfirm('error_modal')}
        className="px-4 py-1.5 bg-error text-dark-content"
      >
        Open error modal
      </button>

      <p>
        {selection && 'You chose to continue'}
        {selection === false && 'You canceled the action'}
      </p>
    </div>
  );
};

const meta = {
  title: 'components/ConfirmModal',
  component: Component,
  decorators: [
    (ConfirmModal) => {
      return (
        <ConfirmModalContextProvider>
          <ConfirmModal />
          <OpenModal />
        </ConfirmModalContextProvider>
      );
    },
  ],
};

// stories
export const ConfirmModal = {};
export default meta;
