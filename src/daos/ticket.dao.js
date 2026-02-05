import { Ticket } from "../models/ticket.model.js";

// Obtener todos los tickets
export const getAll = async () => {
    return Ticket.find()
        .populate('purchaser', 'first_name last_name email')
        .populate('products.product')
        .lean();
};

// Obtener ticket por ID
export const getById = async (id) => {
    return Ticket.findById(id)
        .populate('purchaser', 'first_name last_name email')
        .populate('products.product')
        .lean();
};

// Obtener tickets por usuario
export const getByUserId = async (userId) => {
    return Ticket.find({ purchaser: userId })
        .populate('products.product')
        .lean();
};

// Crear ticket
export const create = async (data) => Ticket.create(data);

// Eliminar ticket
export const deleteById = async (id) => Ticket.findByIdAndDelete(id).lean();