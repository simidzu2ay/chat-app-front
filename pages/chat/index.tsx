import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ID } from 'graphql-ws';
import { NextPage } from 'next';
import Loader from '../../components/small/Loader';
import ChatList from '../../components/pages/chat/ChatList';
import ChatField from '../../components/pages/chat/ChatField';
import { Chat } from '../../graphql.api';
import styles from '../../styles/pages/chat.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  id?: ID;
}

const GET_CHATS = gql`
  query GetListOfUsersChat {
    chats {
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

interface GetListOfUsersChatResponse {
  chats: Chat[];
}

const ChatPage: NextPage<Props> = ({ id }) => {
  const [fetchChatList, { error }] = useLazyQuery<GetListOfUsersChatResponse>(
    GET_CHATS,
    {
      fetchPolicy: 'cache-and-network'
    }
  );
  const [chatId, setChatId] = useState(id);
  const [isChatOpen, setOpenChat] = useState(!!id);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchChatList();
      if (data) setChatList(data.chats);
    };

    fetchData();
  }, []);

  if (error) console.error(error);

  if (chatList.length) {
    const currentChat = chatList.find(c => c.id === chatId);

    return (
      <>
        <div className={'flex' + (!isChatOpen ? ' space-x-4' : '')}>
          <ChatList
            chatState={isChatOpen}
            onChatClick={id => {
              if (id === chatId && isChatOpen) return;

              setChatId(id);
              setOpenChat(true);
              router.push(
                {
                  pathname: '/chat',
                  query: {
                    id
                  }
                },
                undefined,
                { shallow: true }
              );
            }}
            chats={chatList}
            active={chatId}
          />

          <ChatField
            isChatOpen={isChatOpen}
            chatName={currentChat?.name!}
            chatId={chatId!}
            hamburgerOnClick={e => {
              setOpenChat(false);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.chat_list_loader_wrapper}>
      <Loader />
    </div>
  );
};

ChatPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  if (Array.isArray(id)) {
    return {
      id: id[0]
    };
  }

  return {
    id
  };
};

export default ChatPage;
