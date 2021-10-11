const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { readFileSync } = require('fs');

(async () => {
  const resolvers = {
    Query: {
      hello: (_, __, ctx) => {
        console.log('ctx', JSON.stringify(ctx, null, 2));
        return {
          world: 'Hello world!',
          number: Math.floor(Math.random() * 100),
        };
      },
    },
  };

  const context = ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  };

  const typeDefs = readFileSync('./schema.graphql').toString('utf-8');
  const server = new ApolloServer({ typeDefs, resolvers, context });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath),
  );
})();
