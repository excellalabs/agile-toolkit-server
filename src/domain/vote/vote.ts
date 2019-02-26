import { gql } from 'apollo-server';

const typeDefs = gql`
  type Vote {
    _id: String,
    value: String
  }

  type Query {
    vote (voteId: String): Vote,
    votes: [Vote]
  }

  type Mutation {
    createVote(): Vote
  }
`;