import { ApolloServer, gql } from 'apollo-server';
import Session from './models/Session';

/**
 * This is some dummy planning poker session data that will be used to set up
 * the ApolloServer
 */
const sessions = [
  {
    id: 0,
    points: ['1', '2', '5', '2', '3'],
  },
  {
    id: 1,
    points: ['2', '2', '3', 'coffee', '3'],
  },
];

/**
 * Types define shape of data returned by ApolloServer.
 *
 * They are also uses to specify "queries" (fetching data) and "mutations"
 * (changing data).
 */
const typeDefs = gql`
  type Session {
    id: Int,
    points: [String]
  }

  type Query {
    session: Session,
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
    sessions: () => sessions,
  },
  Mutation: {
    createSession: (root, { data }) => {
      console.log("TEST", data);
      Session.create({ name: data }, function (err, small) {
        return 'TESTTEST';
        // saved!
      });
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
  console.log(`Server ready at ${url}`);
}).catch(err => {
  console.log(err);
});
