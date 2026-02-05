import cartService from "../services/cart.service";


// Obtener todos los carritos
const getAll = async (req, res) => {
    try {
        const carts = await cartService.getAll();
        res.json({
            status: 'success',
            payload: carts
        });
    } catch (error) {
        console.error({ error });
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Obtener carrito por ID
const getById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getById(cid);
        
        res.json({
            status: 'success',
            payload: cart
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'CART_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Carrito no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Crear carrito
const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const newCart = await cartService.create(userId);
        
        res.status(201).json({
            status: 'success',
            payload: newCart
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'USER_ALREADY_HAS_CART') {
            return res.status(409).json({
                status: 'error',
                error: 'El usuario ya tiene un carrito'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Agregar producto al carrito
const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        const updatedCart = await cartService.addProduct(cid, pid, quantity || 1);
        
        res.json({
            status: 'success',
            payload: updatedCart
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'CART_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Carrito no encontrado'
            });
        }
        
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Producto no encontrado'
            });
        }
        
        if (error.message === 'INSUFFICIENT_STOCK') {
            return res.status(400).json({
                status: 'error',
                error: 'Stock insuficiente'
            });
        }
        
        if (error.message === 'INVALID_QUANTITY') {
            return res.status(400).json({
                status: 'error',
                error: 'La cantidad debe ser mayor a 0'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Eliminar producto del carrito
const removeProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartService.removeProduct(cid, pid);
        
        res.json({
            status: 'success',
            payload: updatedCart
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'CART_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Carrito no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Finalizar compra
const purchase = async (req, res) => {
    try {
        const { cid } = req.params;
        const userId = req.user.id;
        
        const result = await cartService.purchase(cid, userId);
        
        res.json({
            status: 'success',
            ticket: result.ticket,
            productsNotPurchased: result.productsNotPurchased
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'CART_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Carrito no encontrado'
            });
        }
        
        if (error.message === 'CART_NOT_OWNED_BY_USER') {
            return res.status(403).json({
                status: 'error',
                error: 'Este carrito no te pertenece'
            });
        }
        
        if (error.message === 'EMPTY_CART') {
            return res.status(400).json({
                status: 'error',
                error: 'El carrito está vacío'
            });
        }
        
        if (error.message === 'NO_PRODUCTS_AVAILABLE') {
            return res.status(400).json({
                status: 'error',
                error: 'No hay stock disponible para ningún producto'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Eliminar carrito
const deleteById = async (req, res) => {
    try {
        const { cid } = req.params;
        await cartService.deleteById(cid);
        
        res.json({
            status: 'success',
            message: 'Carrito eliminado'
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'CART_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Carrito no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

export default {
    getAll,
    getById,
    create,
    addProduct,
    removeProduct,
    purchase,
    deleteById
};