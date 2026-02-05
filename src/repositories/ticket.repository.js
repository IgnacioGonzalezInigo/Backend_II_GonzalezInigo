import * as ticketDAO from "../daos/ticket.dao.js";

// Obtener todos los tickets
const getAll = async () => ticketDAO.getAll();

// Obtener ticket por ID
const getById = async (id) => {
    const ticket = await ticketDAO.getById(id);
    if (!ticket) throw new Error("TICKET_NOT_FOUND");
    return ticket;
};

// Obtener tickets por usuario
const getByUserId = async (userId) => ticketDAO.getByUserId(userId);

// Crear ticket
const create = async (data) => ticketDAO.create(data);

// Eliminar ticket
const deleteById = async (id) => {
    const ticket = await ticketDAO.deleteById(id);
    if (!ticket) throw new Error("TICKET_NOT_FOUND");
    return ticket;
};

export default {
    getAll,
    getById,
    getByUserId,
    create,
    deleteById
};