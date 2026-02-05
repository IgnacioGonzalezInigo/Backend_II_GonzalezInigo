// Tickets Router - Rutas de tickets

import { Router } from "express";
import ticketController from "../../controllers/ticket.controller.js";
import { passportCall } from "../../utils/passportCall.js";
import { authorization } from "../../middlewares/authorization.js";

const router = Router();

// GET /api/tickets -> Obtener todos los tickets -> ADMIN
router.get("/", 
    passportCall("jwt"), 
    authorization(['admin']), 
    ticketController.getAll
);

// GET /api/tickets/my-tickets -> Obtener mis tickets -> USUARIO
router.get("/my-tickets", 
    passportCall("jwt"), 
    authorization(['user']), 
    ticketController.getMyTickets
);

// GET /api/tickets/:tid -> Obtener ticket por ID -> ADMIN O DUENO DEL CARTITO
router.get("/:tid", 
    passportCall("jwt"), 
    authorization(['admin', 'user']), 
    ticketController.getById
);

export default router;