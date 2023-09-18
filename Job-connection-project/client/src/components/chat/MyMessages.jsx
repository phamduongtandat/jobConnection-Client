export const MyMessage = ({ content }) => {
  return (
    <div className="flex justify-end">
      <span className="bg-primary px-6 py-0.5 text-white rounded-2xl">
        {content}
      </span>
    </div>
  );
};

const MyMessages = ({ messages }) => {
  return (
    <div className="space-y-2 py-4 text-end">
      {messages.map((message) => (
        <MyMessage content={message.content} key={message._id} />
      ))}
    </div>
  );
};

export default MyMessages;
