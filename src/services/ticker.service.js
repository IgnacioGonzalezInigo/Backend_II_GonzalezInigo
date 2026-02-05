import ticketRepository from '../repositories/ticket.repository.js';

// Obtener todos los tickets
const getAll = async () => ticketRepository.getAll();

// Obtener ticket por ID
const getById = async (id) => ticketRepository.getById(id);

// Obtener tickets por usuario
const getByUserId = async (userId) => ticketRepository.getByUserId(userId);

export default {
    getAll,
    getById,
    getByUserId
};