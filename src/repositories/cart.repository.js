import * as cartDAO from "../daos/cart.dao.js";

// Obtener todos los carritos
const getAll = async () => cartDAO.getAll();

// Obtener carrito por ID
const getById = async (id) => {
    const cart = await cartDAO.getById(id);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

// Obtener carrito por usuario
const getByUserId = async (userId) => cartDAO.getByUserId(userId);

// Crear carrito
const create = async (data) => cartDAO.create(data);

// Actualizar carrito
const update = async (id, data) => {
    const cart = await cartDAO.update(id, data);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

// Eliminar carrito
const deleteById = async (id) => {
    const cart = await cartDAO.deleteById(id);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

// Agregar producto al carrito
const addProduct = async (cartId, productId, quantity) => {
    const cart = await cartDAO.addProduct(cartId, productId, quantity);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

// Eliminar producto del carrito
const removeProduct = async (cartId, productId) => {
    const cart = await cartDAO.removeProduct(cartId, productId);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

// Vaciar carrito
const clearCart = async (cartId) => {
    const cart = await cartDAO.clearCart(cartId);
    if (!cart) throw new Error("CART_NOT_FOUND");
    return cart;
};

export default {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    deleteById,
    addProduct,
    removeProduct,
    clearCart
};