const Button = (props) => {
  const { className, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={`px-4 py-2 bg-primary font-medium outline-dark text-primary-content rounded-md ${className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
