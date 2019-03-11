import { gql } from 'apollo-server';
import { getDb } from '../../db';
import { ObjectId } from 'mongodb';

export const typeDefs = gql`
  type Vote {
    value: String
  }

  extend type Query {
    vote (voteId: String): Vote,
    votes: [Vote]
  }

  extend type Mutation {
    createVote(sessionId: String, value: String): Session
  }
`;

export const resolvers = {
  Query: {
    vote: async (root, { id }) => {
      return getDb().collection('votes').findOne({ '_id': new ObjectId(id) });
    },
    votes: async () => {
      return getDb().collection('votes').find().toArray();
    },
  },
  Mutation: {
    createVote: async (root, { sessionId, value }) => {
      const session = await getDb().collection('sessions').updateOne({ '_id': new ObjectId(sessionId) }, { $push: { 'votes': { value: value } } });
      return getDb().collection('sessions').findOne({ '_id': new ObjectId(sessionId) });
    },
  },
};
