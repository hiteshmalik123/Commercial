import mongoose from "mongoose";

 


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Editor', 'Reader'], default: 'Reader' },
});


 export default mongoose.model('User' , userSchema) 

