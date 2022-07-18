import { ID } from 'graphql-ws';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';
import { Chat } from '../../../graphql.api';
import Avatar from '../../small/Avatar';
import styles from './ChatList.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiSearch } from 'react-icons/hi';
import Input from '../../small/Input';
import Button from '../../small/Button';
import { useEffect, useState, useTransition } from 'react';
import classNames from 'classnames';
import { gql, useLazyQuery } from '@apollo/client';

interface Props {
  chats: Array<Chat>;
  active?: ID;
  onChatClick?: (id: ID) => any;
  chatState: boolean;
}

const QUERY_SEARCH_CHAT = gql`
  query SeachChat($query: String!) {
    searchChat(query: $query) {
      id
      name
      lastMessage {
        id
        text
        from {
          id
          username
        }
        chat {
          id
          name
        }
      }
    }
  }
`;

interface SearchChatResponse {
  searchChat: Chat[];
}

// TODO: Split in smaller components
const ChatList: React.FC<Props> = ({
  chats: chatList,
  active,
  chatState,
  onChatClick = id => {}
}) => {
  const { user } = useAuth();
  const [chats, setChats] = useState(chatList);
  const [search, setSearch] = useState('');
  const [startSearch, { called }] =
    useLazyQuery<SearchChatResponse>(QUERY_SEARCH_CHAT);

  const searchChats = async (chatName: string) => {
    const { data } = await startSearch({
      variables: {
        query: chatName
      }
    });

    setChats(data?.searchChat || []);
  };

  useEffect(() => {
    if (!called && !search) return;

    const searchTimeout = setTimeout(searchChats, 450, search);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  const handleSearch = async (value: string) => {
    setSearch(value);
  };

  return (
    <div
      className={classNames(
        'fixed z-10 flex h-screen flex-col transition-transform duration-500 bg-primary md:static md:w-72',
        chatState
          ? ' -translate-x-full md:flex md:translate-x-0'
          : ' translate-x-0'
      )}
    >
      <div className="flex h-12 min-w-0 flex-1 items-center justify-between gap-4 p-2">
        <Button>
          <AiOutlinePlus />
        </Button>
        <Input value={search} onChange={e => handleSearch(e.target.value)} />
        <Button onClick={() => searchChats(search)}>
          <HiSearch />
        </Button>
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
