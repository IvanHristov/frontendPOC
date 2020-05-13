import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";

const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 1500);
    })
);

const cache = new InMemoryCache();
const http = new HttpLink({
  uri: "http://localhost:4000/"
});

const link = ApolloLink.from([delay, http]);

const client = new ApolloClient({
  cache,
  link
});

export default client;
