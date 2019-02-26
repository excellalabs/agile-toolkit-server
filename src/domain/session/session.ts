import { gql } from 'apollo-server';

const typeDefs = gql`
  type Session {
    _id: String
  }

  type Query {
    session (sessionId: String): Session,
    sessions: [Session]
  }

  type Mutation {
    createSession(data: String): Session
  }
`;