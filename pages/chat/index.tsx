import { gql, useQuery } from '@apollo/client';
import { ID } from 'graphql-ws';
import { NextPage } from 'next';
import ChatList from '../../components/pages/chat/ChatList';
import { Chat, ChatWithLastMessage } from '../../graphql.api';

const chats: Array<Pick<Chat, 'id' | 'name'>> = [
  {
    id: '1',
    name: 'Test'
  },
  {
    id: '2',
    name: 'Test'
  },
  {
    id: '3',
    name: 'Test'
  },
  {
    id: '4',
    name: 'Test'
  },
  {
    id: '5',
    name: 'Test'
  },
  {
    id: '6',
    name: 'Test'
  },
  {
    id: '7',
    name: 'Test'
  },
  {
    id: '8',
    name: 'Test'
  },
  {
    id: '9',
    name: 'Test'
  },
  {
    id: '10',
    name: 'Test'
  },
  {
    id: '11',
    name: 'Test'
  },
  {
    id: '12',
    name: 'Test'
  },
  {
    id: '13',
    name: 'Test'
  }
];

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
    // TODO: make loader
    return <span></span>;
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
