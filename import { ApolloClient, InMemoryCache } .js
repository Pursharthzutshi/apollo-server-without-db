import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_ENDPOINT', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Example of customizing caching behavior for specific fields
          // Here, we specify that the "books" field should use a different
          // merge function (concatenateArrays) for caching arrays of data.
          books: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
      // Example of adding type policies for specific types
      Book: {
        keyFields: ['id'], // Specify the unique identifier field for Book objects
        // Optionally, you can add additional fields to customize caching behavior
        fields: {
          // Example of customizing caching behavior for specific fields within Book type
          title: {
            read(title, { variables }) {
              // Customize how the title field is read from the cache
              // For example, you might want to transform the title before returning it
              return title.toUpperCase();
            },
          },
        },
      },
    },
  }),
});

export default client;
