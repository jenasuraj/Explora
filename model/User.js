import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  u_name: { type: String, required: true},
  name: { type: String, required: true},
  u_id: { type: String, required: true, unique: true  },
  profileImg: { type: String, required: false, unique: true },
  bannerImg: { type: String, required: false,unique: true  },
  about: { type: String, required: false},
  linkedin: { type: String, required: false},
  github: { type: String, required: false},
  twitter: { type: String, required: false},
  facebook: { type: String, required: false},
  instagram: { type: String, required: false},
});

export default mongoose.models.User || mongoose.model('User', userSchema);


