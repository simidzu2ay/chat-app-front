import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription
} from '@apollo/client';
import { MdSend } from 'react-icons/md';
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Message as ChatMessage } from '../../../graphql.api';
import Message from '../../small/chat/Message';
import Loader from '../../small/Loader';
import { useAuth } from '../../../context/AuthContext';
import { ID } from 'graphql-ws';
import { IoIosArrowBack } from 'react-icons/io';
import { BsChevronDown } from 'react-icons/bs';
import Avatar from '../../small/Avatar';
import styles from './ChatField.module.scss';

const GET_MESSAGES_LIST = gql`
  query GetMessagesList($chatId: Int!) {
    messages(chatId: $chatId) {
      id
      text
      from {
        id
        username
      }
      chat {
        id
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $chatId: Int!) {
    sendMessage(message: { chatId: $chatId, text: $text }) {
      id
      chat {
        id
      }
    }
  }
`;

// Move to Chat Page (for working notify)
const SUBSCRIBE_TO_NEW_MESSAGES = gql`
  subscription NewMessages($userId: Int!) {
    newMessage(userId: $userId) {
      id
      from {
        id
        username
      }
      text
      chat {
        id
      }
    }
  }
`;

interface Messages {
  messages: ChatMessage[];
}

interface SubscriptionMessages {
  newMessage: ChatMessage;
}

interface ChatFieldProps {
  chatId: ID;
  chatName: string;
  isChatOpen: boolean;
  hamburgerOnClick: MouseEventHandler<HTMLButtonElement>;
}

interface ChatNavProps {
  handler: MouseEventHandler<HTMLButtonElement>;
  name: string;
}

const ChatNav = ({ handler, name }: ChatNavProps) => {
  return (
    <div className={styles.chat_nav}>
      <button onClick={handler} className="md:hidden">
        <IoIosArrowBack />
      </button>

      <Avatar
        size="small"
        src="https://github.com/simidzu2ay.png"
        priority={true}
      />
      <div className="min-w-0 truncate">
        <span>{name}</span>
      </div>

      <button className="ml-auto">
        <BsChevronDown />
      </button>
    </div>
  );
};

export const ChatField: FC<ChatFieldProps> = ({
  chatId,
  chatName,
  isChatOpen,
  hamburgerOnClick
}) => {
  const [messageText, setMessageText] = useState('');
  const endOfMessages = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState(true);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user } = useAuth();
  const [fetchMessages] = useLazyQuery<Messages, { chatId: number }>(
    GET_MESSAGES_LIST
  );

  useEffect(() => {
    if (!chatId) return;

    fetchMessages({
      variables: {
        chatId: +chatId
      },
      fetchPolicy: 'cache-and-network',
      onCompleted: data => {
        if (data) {
          setMessages(data.messages);
          setLoading(false);
        }
      }
    });
  }, [chatId]);

  useSubscription<SubscriptionMessages>(SUBSCRIBE_TO_NEW_MESSAGES, {
    variables: {
      userId: user.id
    },
    onSubscriptionData: data => {
      const message = data.subscriptionData.data?.newMessage;
      if (message) {
        setMessages(messg => [...messg, message]);
      }
    }
  });

  useEffect(() => {
    if (+messages[messages.length - 1]?.from.id === user.id) {
      endOfMessages.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const sendMessage = () => {
    setMessageText('');
    return sendMessageMutation({
      variables: {
        text: messageText,
        chatId: +chatId
      }
    });
  };

  if (loading) {
    return (
      <div
        className={
          'flex h-screen w-full items-center justify-center' + !isChatOpen
            ? ' hidden'
            : ''
        }
      >
        <ChatNav handler={hamburgerOnClick} name={chatName} />

        <div className="flex flex-1 items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        'z-0 flex h-screen max-h-[100vh] w-full flex-1 flex-col' +
        (!isChatOpen ? ' hidden' : '')
      }
    >
      <ChatNav handler={hamburgerOnClick} name={chatName} />
      <div className="mt-[3.5rem] flex h-full min-h-0 flex-col p-4">
        <div className="flex min-h-0  flex-col space-y-4 overflow-y-scroll">
          {messages.map(m => (
            <Message key={m.id} message={m} />
          ))}
          <div ref={endOfMessages}></div>
        </div>

        <div className="mt-auto mb-4 h-10">
          <div className="my-3 flex h-full w-full items-stretch justify-center">
            <textarea
              value={messageText}
              onChange={event => setMessageText(event.target.value)}
              className="h-10 flex-1 resize-none rounded-l-lg bg-gray-500 p-2 placeholder-white outline-0"
            />
            {/* Separator */}
            <div className="w-1 bg-gray-900"> </div>
            <button
              onClick={sendMessage}
              disabled={!messageText.length}
              className="flex h-10 w-10 items-center justify-center rounded-r-lg bg-gray-800"
            >
              <MdSend className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
