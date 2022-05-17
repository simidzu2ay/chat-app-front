import { ID } from 'graphql-ws';
import Image from 'next/image';
import { Chat } from '../../../graphql.api';

// TODO: take a last message && chat photo
interface Props {
  chats: Array<Pick<Chat, 'id' | 'name'>>;
  active?: ID;
}

const ChatList: React.FC<Props> = ({ chats, active }) => {
  // TODO: make a rounded scrollbar
  return (
    <ul
      className="relative m-2
        mr-4 h-screen divide-y divide-gray-400 md:w-72 md:overflow-auto
      md:scrollbar-thin md:scrollbar-thumb-slate-300"
    >
      {/* pr-4 because of scrollbar */}
      {chats.map((chat, index) => (
        <li
          key={chat.id}
          className={
            'flex items-center gap-4 p-2 first:pt-0 last:pb-0 active:bg-gray-600' +
            (chat.id === active ? ' bg-gray-600' : '')
          }
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src="https://github.com/simidzu2ay.png"
              layout="fill"
              objectFit="cover"
              priority={index < 10}
            />
          </div>

          <div className="flex flex-col">
            <span>{chat.name}</span>
            <div className="text-sm">
              <span className="text-gray-400">You: </span>
              <span>TODO</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
