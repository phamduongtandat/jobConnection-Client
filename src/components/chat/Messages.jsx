import useGetAuthInfo from '../../hooks/useGetAuthInfo';
import MyMessages from './MyMessages';
import OtherMessages from './OtherMessages';

const Messages = ({ messages, isSending, className }) => {
  const { user } = useGetAuthInfo();

  function groupConsecutiveMessages(messages) {
    if (!messages) return [];
    const groupedMessages = [];
    let currentGroup = [];

    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      const previousMessage = currentGroup[currentGroup.length - 1];

      if (
        previousMessage &&
        previousMessage.from?._id === currentMessage.from?._id
      ) {
        currentGroup.push(currentMessage);
      } else {
        currentGroup = [currentMessage];
        groupedMessages.push(currentGroup);
      }
    }

    return groupedMessages;
  }

  const groupedMessages = groupConsecutiveMessages(messages);

  const receiver =
    (messages?.length &&
      messages[0].from &&
      messages[0].from._id !== user._id &&
      messages[0].from) ||
    (messages?.length &&
      messages[0].to &&
      messages[0].to._id !== user._id &&
      messages[0].to);

  return (
    <div
      className={`flex-grow px-4 gap-y-4 max-h-full overflow-auto small-scrollbar flex flex-col-reverse ${className}`}
    >
      <div>
        {groupedMessages.map((group) => {
          if (
            group[0].from?._id === user._id ||
            (!group[0].from && group[0].to && group[0].to._id !== user._id)
          )
            return <MyMessages key={group[0]._id} messages={group} />;
          return (
            <OtherMessages
              key={group[0]._id}
              messages={group}
              receiver={receiver}
            />
          );
        })}
        {isSending && (
          <>
            <p className="text-sm text-text-light text-end mb-3">Đang gửi...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
