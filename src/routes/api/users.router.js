import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import { passportCall } from "../../utils/passportCall.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

// GET /api/users --> Obtener todos los usuarios --> SOLO ADMIN
router.get("/", passportCall("jwt"), authorization(['admin']), userController.getAll);

// GET /api/users/:uid --> Obtener usuario por ID --> ADMIN O MISMO USUARIO
router.get("/:uid", passportCall("jwt"), authorization (['admin','user']),userController.getById);

// POST /api/users --> Crear usuario (registro manual, sin login) --> PUBLICO
router.post("/", userController.create);

// PUT /api/users/:uid --> SOLO ADMIN
router.put("/:uid", passportCall("jwt"),authorization(['admin']), userController.update);

// DELETE /api/users/:uid --> Eliminar usuario --> SOLO ADMIN
router.delete("/:uid", passportCall("jwt"), authorization(['admin']), userController.deleteById);

export default router;