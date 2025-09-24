import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  post:   { type: Object, required: true },
  place:  { type: String, required: true },
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);