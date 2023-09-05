import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // Apollo Server Location
    uri: "https://phase3-challenge2.nickodsss.live",
    // Auto caching from Apollo
    cache: new InMemoryCache(),
});

// export it
export default client;
