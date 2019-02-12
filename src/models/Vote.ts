import mongoose, { Schema } from '../db';

const voteSchema = new Schema({
  value: String,
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
