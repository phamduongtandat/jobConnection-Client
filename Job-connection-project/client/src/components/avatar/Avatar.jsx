const Avatar = ({ className = 'w-32 text-7xl', content = 'L' }) => {
  return (
    <div
      className={`bg-purple-600 aspect-square mx-auto rounded-full flex items-center text-white justify-center ${className}`}
    >
      {content}
    </div>
  );
};

export default Avatar;
