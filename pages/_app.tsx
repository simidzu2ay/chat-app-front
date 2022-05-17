import { ApolloProvider } from '@apollo/client';
import cookie from 'cookie';
import { IncomingMessage } from 'http';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { createApolloClient } from '../apollo-client';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps,
  cookie
}: AppProps & {
  cookie: Record<string, string>;
}) => {
  const apolloClient = createApolloClient(cookie.token);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
};

function parseCookies(req?: IncomingMessage) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

// @ts-ignore
MyApp.getInitialProps = async ctx => {
  const cookie = parseCookies(ctx.ctx.req);

  return {
    cookie,
    ...(await App.getInitialProps(ctx))
  };
};

export default MyApp;
