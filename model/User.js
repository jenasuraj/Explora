import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: false},
  u_id: { type: String, required: true, unique: true  },
  profileImg: { type: String, required: false },
  bannerImg: { type: String, required: false },
  about: { type: String, required: false},
  email:{type:String,required:false},
});

export default mongoose.models.User || mongoose.model('User', userSchema);