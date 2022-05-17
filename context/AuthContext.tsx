import { gql, useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react';
import { JwtTokens, Mutation, MutationLogInArgs, User } from '../graphql.api';

const AuthContext = createContext<AuthProps>({} as AuthProps);

type LogIn = (username: string, password: string) => Promise<void>;

export interface AuthUser {
  id: number;
  username: string;
}

interface AuthProps {
  user: AuthUser;
  logIn: LogIn;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

const MUTATE_LOG_IN = gql`
  mutation LogIn($input: LogInInput!) {
    logIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

// TODO: Errors handler, SignUp, Refresh, GetUser
export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const client = useApolloClient();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const logIn: LogIn = async (username, password) => {
    const { data, errors } = await client.mutate<
      Pick<Mutation, 'logIn'>,
      MutationLogInArgs
    >({
      mutation: MUTATE_LOG_IN,
      variables: {
        input: {
          password,
          username
        }
      }
    });
    const logInData = data?.logIn!;

    Cookies.set('token', logInData.accessToken);
    Cookies.set('refresh', logInData.refreshToken);

    const { data: user } = await client.query<User>({
      query: GET_CURRENT_USER,
      context: {
        headers: {
          authorization: `Bearer ${logInData!.accessToken}`
        }
      }
    });

    setUser({
      id: +user.id,
      username: user.username
    });
    setLoading(false);
  };

  const memorized = useMemo(
    () => ({
      user: user!,
      logIn
    }),
    [user]
  );

  return !loading ? (
    <AuthContext.Provider value={memorized}>{children}</AuthContext.Provider>
  ) : (
    <></>
  );
};
