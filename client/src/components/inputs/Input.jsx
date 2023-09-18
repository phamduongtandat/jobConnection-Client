import React from 'react';

const Input = React.forwardRef((props, ref) => {
  const { className, label, hasError, ...inputProps } = props;

  return (
    <div>
      <input
        {...inputProps}
        className={`px-3 h-10 border border-border rounded-md w-full ${
          hasError ? 'border-error outline-none' : 'outline-dark '
        } ${className} ${inputProps.disabled ? 'bg-gray-200 font-medium' : ''}`}
        ref={ref}
      />
    </div>
  );
});
export default Input;
