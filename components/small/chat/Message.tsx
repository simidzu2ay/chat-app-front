import { FC } from 'react';
import { Message as ChatMessage } from '../../../graphql.api';
import Avatar from '../Avatar';

interface MessageProps {
  message: ChatMessage;
}

export const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div className="flex space-x-2">
      <Avatar size="small" src="https://github.com/simidzu2ay.png" />
      <div className="flex flex-col">
        <span>
          {message.from.username} (#{message.id})
        </span>
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default Message;
