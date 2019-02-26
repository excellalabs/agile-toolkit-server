import { gql } from 'apollo-server';

const typeDefs = gql`
  type Topic {
    _id: String,
    name: String,
    value: String,
    votes: [String]
  }

  type Query {
    topic (topicId: String): Topic,
    topics: [Topic]
  }

  type Mutation {
    createTopic(): Topic
  }
`;