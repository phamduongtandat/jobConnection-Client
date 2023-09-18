const OtherInfo = ({
  name,
  profileImage = 'https://cdn-icons-png.flaticon.com/512/552/552721.png',
}) => {
  return (
    <div className="flex items-center gap-x-2 !mb-0">
      <img src={profileImage} className="w-5 aspect-square rounded-full" />
      <span className="text-text-light text-sm">{name}</span>
    </div>
  );
};

export default OtherInfo;
