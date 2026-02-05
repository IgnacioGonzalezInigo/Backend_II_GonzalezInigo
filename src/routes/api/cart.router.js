import { Router } from "express";
import cartController from "../../controllers/cart.controller.js";
import { passportCall } from "../../utils/passportCall.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

// GET /api/carts --> Obtener todos los carritos --> ADMINS
router.get("/", 
    passportCall("jwt"), 
    authorization(['admin']), 
    cartController.getAll
);

// GET /api/carts/:cid --> Obtener carrito por ID --> ADMIN O EL USUARIO QUE TIENE EL CRT
router.get("/:cid", 
    passportCall("jwt"), 
    authorization(['admin', 'user']), 
    cartController.getById
);

// POST /api/carts --> Crear carrito --> SOLO EL USUARIO
router.post("/", 
    passportCall("jwt"), 
    authorization(['user']), 
    cartController.create
);

// POST /api/carts/:cid/products/:pid --> Agregar producto al carrito --> USUARIO
router.post("/:cid/products/:pid", 
    passportCall("jwt"), 
    authorization(['user']), 
    cartController.addProduct
);

// DELETE /api/carts/:cid/products/:pid --> Eliminar producto del carrito _-> USUARIO
router.delete("/:cid/products/:pid", 
    passportCall("jwt"), 
    authorization(['user']), 
    cartController.removeProduct
);

// POST /api/carts/:cid/purchase -> Finalizar compra -> USUARIO
router.post("/:cid/purchase", 
    passportCall("jwt"), 
    authorization(['user']), 
    cartController.purchase
);

// DELETE /api/carts/:cid --> Eliminar carrito --> ADMIKN O DUENO DE CART
router.delete("/:cid", 
    passportCall("jwt"), 
    authorization(['admin', 'user']), 
    cartController.deleteById
);

export default router;