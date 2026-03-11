import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
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
export default User;
