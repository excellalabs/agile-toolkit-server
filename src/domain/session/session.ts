import { gql } from 'apollo-server';
import { getDb } from '../../db';
import { ObjectId } from 'mongodb';

export const typeDefs = gql`
  type Session {
    _id: String,
    data: String
  }

  extend type Query {
    session(id: String): Session,
    sessions: [Session]
  }

  extend type Mutation {
    createSession(data: String): Session
  }
`;

export const resolvers = {
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