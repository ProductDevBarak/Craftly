import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  HTML: {
    type: String,
  },
  CSS: {
    type: String,
  },
},
{ timestamps: true });

export default mongoose.model("Code", codeSchema);
