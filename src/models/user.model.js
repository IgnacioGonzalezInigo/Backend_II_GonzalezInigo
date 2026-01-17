import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },

    last_name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },

    password: {
      type: String,
      required: true
    },
    
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
      default: null
    },

    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);