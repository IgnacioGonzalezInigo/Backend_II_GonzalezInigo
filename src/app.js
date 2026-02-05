import express from "express";
import dotenv from "dotenv";
import passport from "passport";

import { connectMongoDB } from "./config/db/connect.config.js";
import { initializePassport } from "./config/passport/passport.config.js";

import sessionsRouter from "./routes/api/sessions.router.js";
import usersRouter from "./routes/api/users.router.js";
import productsRouter from "./routes/api/products.router.js";  
import cartsRouter from "./routes/api/carts.router.js";        
import ticketsRouter from "./routes/api/tickets.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);        
app.use("/api/tickets", ticketsRouter); 


app.get("/", (req, res) => {
  res.status(200).json({ status: "success", msg: "API OK" });
});

await connectMongoDB();

app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
