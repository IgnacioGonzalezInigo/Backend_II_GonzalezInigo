import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import { passportCall } from "../../utils/passportCall.js";

const router = Router();

// GET /api/users --> Obtener todos los usuarios
router.get("/", passportCall("jwt"), userController.getAll);

// GET /api/users/:uid --> Obtener usuario por ID
router.get("/:uid", passportCall("jwt"), userController.getById);

// POST /api/users --> Crear usuario (registro manual, sin login)
router.post("/", userController.create);

// PUT /api/users/:uid --> Actualizar usuario
router.put("/:uid", passportCall("jwt"), userController.update);

// DELETE /api/users/:uid --> Eliminar usuario
router.delete("/:uid", passportCall("jwt"), userController.deleteById);

export default router;