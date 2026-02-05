import cartRepository from '../repositories/cart.repository.js';
import productRepository from '../repositories/product.repository.js';
import ticketRepository from '../repositories/ticket.repository.js';
import crypto from 'crypto';

const generarCodigoTicket = () => {
    // Esta logica me ayudo la IA para generar una buena practica.
    return `TICKET-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

// Obtener todos los carritos
const getAll = async () => cartRepository.getAll();

// Obtener carrito por ID
const getById = async (id) => cartRepository.getById(id);

// Obtener carrito por usuario
const getByUserId = async (userId) => cartRepository.getByUserId(userId);

// Crear carrito
const create = async (userId) => {
    const existingCart = await cartRepository.getByUserId(userId);
    if (existingCart) {
        throw new Error("USER_ALREADY_HAS_CART");
    }
    
    const newCart = await cartRepository.create({
        user: userId,
        products: []
    });
    
    return newCart;
};

// Agregar producto al carrito
const addProduct = async (cartId, productId, quantity = 1) => {
    if (quantity <= 0) {
        throw new Error("INVALID_QUANTITY");
    }
    
    const product = await productRepository.getById(productId);
    
    if (product.stock < quantity) {
        throw new Error("INSUFFICIENT_STOCK");
    }
    
    const updatedCart = await cartRepository.addProduct(cartId, productId, quantity);
    return updatedCart;
};

// Eliminar producto del carrito
const removeProduct = async (cartId, productId) => {
    const updatedCart = await cartRepository.removeProduct(cartId, productId);
    return updatedCart;
};

// Vaciar carrito
const clearCart = async (cartId) => cartRepository.clearCart(cartId);

// Finalizar compra
const purchase = async (cartId, userId) => {
    const cart = await cartRepository.getById(cartId);
    
    if (cart.user.toString() !== userId) {
        throw new Error("CART_NOT_OWNED_BY_USER");
    }
    
    if (cart.products.length === 0) {
        throw new Error("EMPTY_CART");
    }
    
    const productsNotPurchased = [];
    const productsToPurchase = [];
    let totalAmount = 0;
    
    for (const item of cart.products) {
        const product = await productRepository.getById(item.product._id);
        
        if (product.stock >= item.quantity) {
            productsToPurchase.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            
            totalAmount += product.price * item.quantity;
        
            await productRepository.updateStock(
                product._id, 
                product.stock - item.quantity
            );
        } else {
            productsNotPurchased.push({
                product: item.product._id,
                requestedQuantity: item.quantity,
                availableStock: product.stock
            });
        }
    }
    
    if (productsToPurchase.length === 0) {
        throw new Error("NO_PRODUCTS_AVAILABLE");
    }
    
    // Generar ticket
    const ticket = await ticketRepository.create({
        code: generarCodigoTicket(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: userId,
        products: productsToPurchase
    });
    

    const remainingProducts = cart.products.filter(item => 
        productsNotPurchased.some(p => p.product.toString() === item.product._id.toString())
    );
    
    await cartRepository.update(cartId, { products: remainingProducts });
    
    return {
        ticket,
        productsNotPurchased
    };
};

// Eliminar carrito
const deleteById = async (id) => cartRepository.deleteById(id);

export default {
    getAll,
    getById,
    getByUserId,
    create,
    addProduct,
    removeProduct,
    clearCart,
    purchase,
    deleteById
};