import { Cart } from "../models/cart.model.js";

// Obtener todos los carritos
export const getAll = async () => Cart.find().populate('products.product').lean();

// Obtener carrito por ID
export const getById = async (id) => {
    return Cart.findById(id)
        .populate('products.product')
        .lean();
};

// Obtener carrito por usuario
export const getByUserId = async (userId) => {
    return Cart.findOne({ user: userId })
        .populate('products.product')
        .lean();
};

// Crear carrito
export const create = async (data) => Cart.create(data);

// Actualizar carrito
export const update = async (id, data) => {
    return Cart.findByIdAndUpdate(id, data, { new: true })
        .populate('products.product')
        .lean();
};

// Eliminar carrito
export const deleteById = async (id) => Cart.findByIdAndDelete(id).lean();

// Agregar producto al carrito
export const addProduct = async (cartId, productId, quantity) => {
    const cart = await Cart.findById(cartId);
    
    if (!cart) return null;
    
    const existingProduct = cart.products.find(
        item => item.product.toString() === productId
    );
    
    if (existingProduct) {
        // Si existe, aumentar la cantidad
        existingProduct.quantity += quantity;
    } else {
        // Si no existe agregar nuevo producto
        cart.products.push({ product: productId, quantity });
    }
    
    await cart.save();
    return cart.populate('products.product');
};

// Eliminar producto del carrito
export const removeProduct = async (cartId, productId) => {
    return Cart.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: productId } } },
        { new: true }
    ).populate('products.product').lean();
};

// Vaciar carrito
export const clearCart = async (cartId) => {
    return Cart.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
    ).lean();
};