import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL no está definida en el .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};