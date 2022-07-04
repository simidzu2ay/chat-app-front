import { ID } from 'graphql-ws';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';
import { Chat } from '../../../graphql.api';
import Avatar from '../../small/Avatar';
import styles from './ChatList.module.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiSearch } from 'react-icons/hi';

interface Props {
  chats: Array<Chat>;
  active?: ID;
  onChatClick?: (id: ID) => any;
  chatState: boolean;
}

// TODO: Split in smaller components
const ChatList: React.FC<Props> = ({
  chats,
  active,
  chatState,
  onChatClick = id => {}
}) => {
  const { user } = useAuth();

  return (
    <div
      className={
        'fixed z-10 flex h-screen flex-col transition-transform duration-500 bg-primary md:static' +
        (chatState
          ? ' -translate-x-full md:flex md:translate-x-0'
          : ' translate-x-0')
      }
    >
      <div className="flex items-center justify-end gap-4 p-2">
        <div className="flex items-center justify-center">
          <input type="text" />
          <HiSearch />
        </div>
      </div>
      <ul className={styles.chat_list_item}>
        {chats.map((chat, index) => (
          <li
            key={chat.id}
            onClick={() => onChatClick(chat.id)}
            className={
              styles.chat_list_item_main +
              (chat.id === active ? ' bg-gray-600' : '')
            }
          >
            <Avatar
              size="medium"
              src="https://github.com/simidzu2ay.png"
              priority={index < 10}
            />

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
    </div>
  );
};

export default ChatList;
