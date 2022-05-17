import { ID } from 'graphql-ws';
import { NextPage } from 'next';
import ChatList from '../../components/pages/chat/ChatList';
import { Chat } from '../../graphql.api';

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

const ChatPage: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <ChatList chats={chats} active={id} />
    </div>
  );
};

ChatPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  if (Array.isArray(id)) return {};

  return {
    id
  };
};

export default ChatPage;
