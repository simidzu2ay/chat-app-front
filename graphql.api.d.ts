export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  lastMessage?: Maybe<Message>;
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
};

export type CreateChatInput = {
  members: Array<Scalars['Int']>;
  name: Scalars['String'];
};

export type JwtTokens = {
  __typename?: 'JwtTokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type LogInInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  createDate: Scalars['DateTime'];
  from: User;
  fromUser: User;
  id: Scalars['ID'];
  text: Scalars['String'];
  updateDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  logIn: JwtTokens;
  refresh: JwtTokens;
  sendMessage: Message;
  signUp: JwtTokens;
};

export type MutationCreateChatArgs = {
  chat: CreateChatInput;
};

export type MutationLogInArgs = {
  data: LogInInput;
};

export type MutationRefreshArgs = {
  data: RefreshTokenInput;
};

export type MutationSendMessageArgs = {
  message: SendMessageInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  messages: Array<Message>;
  searchChat: Array<Chat>;
  user: User;
  users: Array<User>;
};

export type QueryChatsArgs = {
  count?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type QueryMessagesArgs = {
  chatId: Scalars['Int'];
};

export type QuerySearchChatArgs = {
  query: Scalars['String'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RefreshTokenInput = {
  expiredToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type SendMessageInput = {
  chatId: Scalars['Int'];
  text: Scalars['String'];
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type SubscriptionNewMessageArgs = {
  userId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createDate: Scalars['DateTime'];
  id: Scalars['ID'];
  username: Scalars['String'];
};
