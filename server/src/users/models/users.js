import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String,
  },
  prompts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Code",
    },
  ],
},
{ timestamps: true });

export default mongoose.model("Users", userSchema);
