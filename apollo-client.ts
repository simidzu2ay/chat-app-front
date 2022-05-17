import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

export const createApolloClient = (accessToken?: string) => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql'
  });

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: 'ws://localhost:3000/graphql'
          })
        )
      : null;

  const splitLink = wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink!,
        httpLink
      )
    : httpLink;

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => {
      if (accessToken)
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`
          }
        };

      return {
        headers
      };
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, splitLink),
    cache: new InMemoryCache()
  });

  return client;
};
