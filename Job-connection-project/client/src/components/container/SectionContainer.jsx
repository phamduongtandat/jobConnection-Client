const SectionContainer = ({ className, wrapperClassName, children }) => {
  return (
    <section className={`px-4 xl:px-0 ${wrapperClassName}`}>
      <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
    </section>
  );
};

export default SectionContainer;
