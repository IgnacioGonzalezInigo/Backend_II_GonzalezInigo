import express from "express";
import dotenv from "dotenv";
import passport from "passport";

import { connectMongoDB } from "./config/db/connect.config.js";
import sessionsRouter from "./routes/api/sessions.router.js";
import { initializePassport } from "./config/passport/passport.config.js";
import usersRouter from "./routes/api/users.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", msg: "API OK" });
});

const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  });
};

await startServer();