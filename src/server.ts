import { ApolloServer } from 'apollo-server';
import { dbConnect } from './db';
import schema from './domain/schema';

/**
 * With type definitions and resolvers, we have everything we need to setup the
 * ApolloServer.
 */
const server = new ApolloServer({ schema });

/**
 * Now we can run the ApolloServer.
 */
server.listen().then(({ url }) => {
  console.log(`Connected to ${url}`);
  dbConnect();
}).catch(err => {
  console.log(err);
});
