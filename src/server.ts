import { ApolloServer, gql } from 'apollo-server';
import { getDb, dbConnect } from './db';
import { ObjectId } from 'mongodb';

/**
 * Types define shape of data returned by ApolloServer.
 *
 * They are also uses to specify "queries" (fetching data) and "mutations"
 * (changing data).
 */
const typeDefs = gql`
  type Session {
    _id: String,
    data: String
  }

  type Query {
    session(id: String): Session,
    sessions: [Session]
  }

  type Mutation {
    createSession(data: String): Session
  }
`;

/**
 * Resolvers contain the implementation details for how the ApolloServer will
 * respond to a GraphQL query.
 */
const resolvers = {
  Query: {
    session: async (root, { id }) => {
      return await getDb().collection('sessions').findOne({"_id": new ObjectId(id)});
    },
    sessions: async () => {
      return await getDb().collection('sessions').find().toArray();
    }
  },
  Mutation: {
    createSession: async (root, { data }) => {
      const result = await getDb().collection('sessions').insertOne({ data: data });
      return await getDb().collection('sessions').findOne({"_id": new ObjectId(result.insertedId)})
    },
  },
};

/**
 * With type definitions and resolvers, we have everything we need to setup the
 * ApolloServer.
 */
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

/**
 * Now we can run the ApolloServer.
 */
server.listen().then(({ url }) => {
  console.log(`Connected to ${url}`);
  dbConnect();
});