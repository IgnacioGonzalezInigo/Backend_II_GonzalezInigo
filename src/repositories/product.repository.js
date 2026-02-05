import * as productDAO from "../daos/product.dao.js"

// Obtener todos los productos
const getAll = async () => productDAO.getAll();

// Obtener producto por ID
const getById = async (id) => {
    const product = await productDAO.getById(id);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    return product;
};

// Obtener producto por código
const getByCode = async (code) => productDAO.getByCode(code);

// Crear producto
const create = async (data) => productDAO.create(data);

// Actualizar producto
const update = async (id, data) => {
    const product = await productDAO.update(id, data);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    return product;
};

// Eliminar producto
const deleteById = async (id) => {
    const product = await productDAO.deleteById(id);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    return product;
};

// Actualizar stock
const updateStock = async (id, newStock) => {
    const product = await productDAO.updateStock(id, newStock);
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    return product;
};

export default {
    getAll,
    getById,
    getByCode,
    create,
    update,
    deleteById,
    updateStock
};