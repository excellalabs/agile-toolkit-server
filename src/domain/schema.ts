import { merge } from 'lodash';
import { typeDefs as Session, resolvers as sessionResolvers } from './session/session';
import { typeDefs as Vote, resolvers as voteResolvers } from './vote/vote';
import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [ Query, Mutation, Vote, Session ],
  resolvers: merge(sessionResolvers, voteResolvers),
});
