import mongoose from '../db';

const sessionSchema = new mongoose.Schema({
  name: String,
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
