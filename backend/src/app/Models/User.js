
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    googleId: {
      type: String,

      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password minimal is 6 characters"],
      required: function () {
        return !this.googleId;
      },
      trim: true,
      minlength: [6, "Password minimal length is 6 characters"],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);


const User = mongoose.model("User", userSchema);
export default User