import React, { createContext, useState } from 'react';

const defaultConfirmFnProps = {
  title: 'Confirmation',
  subTitle: 'Do you want to continue?',
  confirmButtonText: 'Continue',
  cancelButtonText: 'Cancel',
  theme: 'confirm_modal',
};

const ConfirmContext = createContext(null);

const ConfirmModalContextProvider = (props) => {
  const { children } = props;

  const [confirm, setConfirm] = useState({
    isOpen: false,
    resolve: null,
    reject: null,
    ...defaultConfirmFnProps,
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export { ConfirmModalContextProvider, ConfirmContext, defaultConfirmFnProps };
