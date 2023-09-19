import React from 'react';

const Textarea = React.forwardRef((props, ref) => {
  const { className, label, hasError, ...inputProps } = props;

  return (
    <div>
      <textarea
        {...inputProps}
        className={`px-3 -mb-1 py-2 h-36 border border-border rounded-md w-full ${
          hasError
            ? 'border-error outline-none placeholder:text-error'
            : 'outline-dark '
        } ${className}`}
        ref={ref}
      />
    </div>
  );
});
export default Textarea;
