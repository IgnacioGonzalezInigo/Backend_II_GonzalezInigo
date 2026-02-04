import { Router } from "express";
import authController from "../../controllers/auth.controller.js";
import { passportCall } from "../../utils/passportCall.js";

const router = Router();

// POST /api/sessions/register - Registro de usuario
router.post("/register", authController.register);

// POST /api/sessions/login - Login de usuario
router.post("/login", authController.login);

// GET /api/sessions/current - Usuario actual (requiere autenticación)
router.get("/current", passportCall("jwt"), authController.current);

export default router;