const NotificationCount = ({ quantity }) => {
  return (
    <span className="bg-error text-white px-2 rounded-full text-sm">
      {quantity > 99 ? '99+' : quantity}
    </span>
  );
};

export default NotificationCount;
