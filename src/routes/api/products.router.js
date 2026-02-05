import { Router } from "express";
import productController from "../../controllers/product.controller.js";
import { passportCall } from "../../utils/passportCall.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

// GET /api/products --> Obtener todos los productos --> CUALQ USUARI
router.get("/", productController.getAll);

// GET /api/products/:pid --> Obtener producto por ID --> CUAKLQ USUARIO
router.get("/:pid", productController.getById);

// POST /api/products --> Crear producto --> ADMIN
router.post("/", 
    passportCall("jwt"), 
    authorization(['admin']), 
    productController.create
);

// PUT /api/products/:pid --> Actualizar producto --> ADMIN
router.put("/:pid", 
    passportCall("jwt"), 
    authorization(['admin']), 
    productController.update
);

// DELETE /api/products/:pid --> Eliminar producto --> SOLO ADMIN
router.delete("/:pid", 
    passportCall("jwt"), 
    authorization(['admin']), 
    productController.deleteById
);

export default router;