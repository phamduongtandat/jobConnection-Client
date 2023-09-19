import OtherInfo from './OtherInfo';

const OtherMessage = ({ content }) => {
  return (
    <div className="w-2/3">
      <div className="bg-gray-200 px-4 py-0.5 rounded-2xl whitespace-break-spaces break-all w-fit">
        {content}
      </div>
    </div>
  );
};

const OtherMessages = ({ messages, receiver }) => {
  return (
    <div className="space-y-2 py-4">
      <OtherInfo
        profileImage={receiver?.profileImage}
        name={receiver?.name || receiver?.email || 'Admin'}
      />
      {messages?.map((message) => (
        <OtherMessage key={message._id} content={message.content} />
      ))}
    </div>
  );
};

export default OtherMessages;
