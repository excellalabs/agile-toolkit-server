import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/agiletoolkit';

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log(`Connected to mongo at ${url}`);
});

export default mongoose;
