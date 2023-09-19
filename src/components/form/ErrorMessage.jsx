function ErrorMessage({ className, errorMessage }) {
  return (
    <p className={`text-sm text-error mt-1 ${className}`}> {errorMessage}</p>
  );
}

export default ErrorMessage;
