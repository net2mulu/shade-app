import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "./mutations";
import { GraphQLError } from "graphql";

function isRefreshRequest(operation) {
  return operation.operationName === "refreshToken";
}

function returnTokenDependingOnOperation(operation) {
  if (isRefreshRequest(operation))
    return localStorage.getItem("refresh_token") || "";
  else return localStorage.getItem("access_token") || "";
}

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
});

const authLink = setContext((operation, { headers }) => {
  // Exempt certain queries from sending the authorization header
  const exemptedQueries = ["SIGN_IN_OSSC"];

  if (exemptedQueries.includes(operation.operationName)) {
    return {
      headers: {
        ...headers,
      },
    };
  }

  let token = returnTokenDependingOnOperation(operation);
  if (token) {
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
        "x-hasura-role": "anonymous",
        "x-real-ip": "123"
      },
    };
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "invalid-jwt": {
            if (operation.operationName === "refreshToken") return;

            const observable = new Observable((observer) => {
              (async () => {
                try {
                  const access_token = await refreshToken();

                  if (!access_token) {
                    throw new GraphQLError("Empty AccessToken");
                  }

                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${access_token}`,
                    },
                  });

                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  observer.error(err);
                }
              })();
            });

            return observable;
          }
          default:
            break;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({}),
});

const refreshToken = async () => {
  try {
    const refresh = await client.mutate({
      mutation: REFRESH_TOKEN,
    });

    const access_token = refresh.data.refreshToken.tokens.access_token;
    const refresh_token = refresh.data.refreshToken.tokens.refresh_token;

    localStorage.setItem("access_token", access_token || "");
    localStorage.setItem("refresh_token", refresh_token || "");
    localStorage.setItem("refreshed", true);
    return access_token;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

export const getTempClient = () => {
  const httpLinkTemp = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL,
  });

  const authLinkTemp = setContext((operation, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret": "3LcJH8gT4sZkYVnfpqkDwY130m4S2G",
      },
    };
  });

  const clientNew = new ApolloClient({
    link: ApolloLink.from([errorLink, authLinkTemp, httpLinkTemp]),
    cache: new InMemoryCache({}),
  });

  return clientNew;
};

export const resetClient = () => {
  const clientNew = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({}),
  });

  return clientNew
}
export default client;
