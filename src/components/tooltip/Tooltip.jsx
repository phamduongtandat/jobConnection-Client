const Tooltip = ({ children, tooltip = 'Đừng quên thêm tooltip' }) => {
  return (
    <div
      className="inline-block"
      data-tooltip-content={tooltip}
      data-tooltip-id="tooltip"
    >
      {children}
    </div>
  );
};

export default Tooltip;
