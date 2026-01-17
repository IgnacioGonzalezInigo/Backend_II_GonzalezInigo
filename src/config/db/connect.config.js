import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/backend_ii_gonzalezinigo");
    console.log("✅ Conectado a MongoDB de forma Exitosa.!!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
