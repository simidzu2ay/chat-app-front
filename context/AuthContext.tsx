import { gql, useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { JwtTokens, Mutation, MutationLogInArgs, User } from '../graphql.api';

const AuthContext = createContext<AuthProps>({} as AuthProps);

type LogIn = (username: string, password: string) => Promise<void>;

export interface AuthUser {
  id: number;
}

interface AuthProps {
  user: AuthUser;
  logIn: LogIn;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const MUTATE_LOG_IN = gql`
  mutation LogIn($data: LogInInput!) {
    logIn(data: $data) {
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
        data: {
          password,
          username
        }
      }
    });
    const logInData = data?.logIn!;

    Cookies.set('token', logInData.accessToken);
    Cookies.set('refresh', logInData.refreshToken);

    setUser({
      id: +JSON.parse(atob(logInData.accessToken.split('.')[1])).id
    });
    setLoading(false);
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      const token = Cookies.get('token')!;

      setUser({
        id: +JSON.parse(atob(token.split('.')[1])).id
      });
    }
  }, []);

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
