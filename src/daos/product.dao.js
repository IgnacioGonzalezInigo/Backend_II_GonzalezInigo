import {Product} from "../models/product.model.js"

// Obtener todos los productos
export const getAll = async () => Product.find().lean();

// Obtener producto por ID
export const getById = async (id) => Product.findById(id).lean();

// Obtener producto por código
export const getByCode = async (code) => Product.findOne({ code }).lean();

// Crear producto
export const create = async (data) => Product.create(data);

// Actualizar producto
export const update = async (id, data) => Product.findByIdAndUpdate(id, data, { new: true }).lean();

// Eliminar producto
export const deleteById = async (id) => Product.findByIdAndDelete(id).lean();

// Actualizar stock
export const updateStock = async (id, newStock) => {
    return Product.findByIdAndUpdate(
        id, 
        { stock: newStock }, 
        { new: true }
    ).lean();
};