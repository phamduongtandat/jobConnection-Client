import { useContext } from 'react';
import { ConfirmContext } from '../contexts/ConfirmModalContextProvider';

const useConfirmModal = () => {
  const confirmContext = useContext(ConfirmContext);

  const [confirm, setConfirm] = confirmContext || [];

  const isConfirmed = (
    { confirmButtonText, subTitle, title, cancelButtonText, theme } = {
      confirmButtonText: 'Hãy thêm confirmButtonText',
      subTitle: 'Hãy thêm subTittle',
      title: 'Hãy thêm title',
      cancelButtonText: 'Hãy thêm cancelButtonText',
      theme: 'confirm_modal',
    },
  ) => {
    if (!setConfirm) {
      console.log('there is no setConfirm');
      return;
    }

    const promise = new Promise((resolve, reject) => {
      setConfirm({
        title,
        subTitle,
        isOpen: true,
        resolve,
        reject,
        confirmButtonText,
        cancelButtonText,
        theme,
      });
    });

    const reset = () => {
      if (confirm)
        setConfirm({
          confirmButtonText,
          subTitle,
          title,
          cancelButtonText,
          resolve: null,
          reject: null,
          isOpen: false,
          theme,
        });
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      },
    );
  };

  if (!confirm)
    return {
      isConfirmed,
    };

  return {
    isConfirmed,
    resolve: confirm.resolve,
    reject: confirm.reject,
    isOpen: confirm.isOpen,
    title: confirm.title,
    subTitle: confirm.subTitle,
    confirmButtonText: confirm.confirmButtonText,
    cancelButtonText: confirm.cancelButtonText,
    theme: confirm.theme,
  };
};

export default useConfirmModal;
