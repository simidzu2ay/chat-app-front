import { ID } from 'graphql-ws';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';
import { ChatWithLastMessage } from '../../../graphql.api';
import styles from './ChatList.module.scss';

// TODO: take a last message && chat photo
interface Props {
  chats: Array<ChatWithLastMessage>;
  active?: ID;
}

const ChatList: React.FC<Props> = ({ chats, active }) => {
  const { user } = useAuth();

  return (
    <ul className={styles.chat_list_item}>
      {chats.map((chat, index) => (
        <li
          key={chat.id}
          className={
            styles.chat_list_item_main +
            (chat.id === active ? ' bg-gray-600' : '')
          }
        >
          <div className={styles.chat_list_item_avatar_wrapper}>
            <div className={styles.chat_list_item_avatar}>
              <Image
                src="https://github.com/simidzu2ay.png"
                layout="fill"
                objectFit="cover"
                priority={index < 10}
              />
            </div>
          </div>

          <div className={styles.chat_list_info}>
            <span className={styles.chat_item_name}>{chat.name}</span>
            <div className={styles.chat_item_info}>
              {chat.lastMessage ? (
                <>
                  <span className={styles.chat_item_username}>
                    {+chat.lastMessage.from.id === user.id
                      ? 'You'
                      : chat.lastMessage.from.username}
                    :{' '}
                    <span className={styles.chat_item_message}>
                      {chat.lastMessage.text}
                    </span>
                  </span>
                </>
              ) : (
                <span>No messages</span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
