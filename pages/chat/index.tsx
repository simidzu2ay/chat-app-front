import { gql, useQuery } from '@apollo/client';
import { ID } from 'graphql-ws';
import { NextPage } from 'next';
import Loader from '../../components/Loader';
import ChatList from '../../components/pages/chat/ChatList';
import { Chat, ChatWithLastMessage } from '../../graphql.api';
import styles from '../../styles/pages/chat.module.scss';

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
      }
    }
  }
`;

interface GetListOfUsersChatResponse {
  chats: ChatWithLastMessage[];
}

const ChatPage: NextPage<Props> = ({ id }) => {
  const { error, data, loading } =
    useQuery<GetListOfUsersChatResponse>(GET_CHATS);

  if (loading) {
    return (
      <div className={styles.chat_list_loader_wrapper}>
        <Loader />
      </div>
    );
  }

  if (error) console.error(error);

  if (data) {
    return (
      <div>
        <ChatList chats={data.chats} active={id} />
      </div>
    );
  }
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
