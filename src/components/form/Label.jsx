const Label = ({ children, className, ...labelProps }) => {
  return (
    <label
      {...labelProps}
      className={`block mb-1 text-sm cursor-pointer ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
