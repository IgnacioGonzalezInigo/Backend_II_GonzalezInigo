import { Router } from "express";
import { User } from "../../models/user.model.js";
import { hashPassword, comparePassword } from "../../utils/crypto.js";
import { signJwt } from "../../utils/jwt.js";
import { passportCall } from "../../utils/passportCall.js";

const router = Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ status: "error", msg: "Todos los campos son obligatorios" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existeEmail = await User.findOne({ email: normalizedEmail }).lean();
    if (existeEmail) {
      return res.status(400).json({ status: "error", msg: `El email ${normalizedEmail} ya esta en uso` });
    }

    const passwordHasheada = await hashPassword(password);

    const created = await User.create({
      first_name,
      last_name,
      email: normalizedEmail,
      age,
      password: passwordHasheada
      // role default "user"
      // cart default null
    });

    return res.status(201).json({
      status: "success",
      msg: "Usuario creado con exito",
      user: {
        _id: created._id,
        first_name: created.first_name,
        last_name: created.last_name,
        email: created.email,
        age: created.age,
        role: created.role,
        cart: created.cart
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "error", msg: "Todos los campos son obligatorios" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).lean();
    if (!user) return res.status(401).json({ status: "error", msg: "Credenciales invalidas" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ status: "error", msg: "Credenciales invalidas" });

    const tokenPayload = {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age
      }
    };

    const token = signJwt(tokenPayload, process.env.JWT_SECRET, "1h");

    return res.status(200).json({
      status: "success",
      token,
      user: tokenPayload.user
    });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

router.get("/current", passportCall("jwt"), (req, res) => {
  return res.status(200).json({
    status: "success",
    user: req.user
  });
});

export default router;
