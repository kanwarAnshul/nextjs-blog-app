import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "approved_admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
    blogs:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Blog"
    }]
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
