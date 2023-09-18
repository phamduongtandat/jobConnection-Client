import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useModal from './useModal';

const useCreateOrUpdateModal = ({ isDirty }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleDisableDefaultOnClose,
    handleEnableDefaultOnClose,
    currentOpenModalName,
  } = useModal();

  useEffect(() => {
    if (isDirty) handleDisableDefaultOnClose();
    if (!isDirty) handleEnableDefaultOnClose();
  }, [isDirty]);

  useEffect(() => {
    if (!currentOpenModalName) {
      setTimeout(() => {
        searchParams.delete('id');
        setSearchParams(searchParams);
      }, 200);
    }
  }, [currentOpenModalName]);
};

export default useCreateOrUpdateModal;
