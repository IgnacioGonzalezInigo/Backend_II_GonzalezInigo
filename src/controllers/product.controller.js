import productService from "../services/product.service.js";

// Obtener todos los productos
const getAll = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json({
            status: 'success',
            payload: products
        });
    } catch (error) {
        console.error({ error });
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Obtener producto por ID
const getById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productService.getById(pid);
        
        res.json({
            status: 'success',
            payload: product
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Producto no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Crear producto
const create = async (req, res) => {
    try {
        // Agregar el owner (usuario que crea el producto)
        const productData = {
            ...req.body,
            owner: req.user.id
        };
        
        const newProduct = await productService.create(productData);
        
        res.status(201).json({
            status: 'success',
            payload: newProduct
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'MISSING_REQUIRED_FIELDS') {
            return res.status(400).json({
                status: 'error',
                error: 'Todos los campos son obligatorios'
            });
        }
        
        if (error.message === 'INVALID_PRICE') {
            return res.status(400).json({
                status: 'error',
                error: 'El precio debe ser mayor o igual a 0'
            });
        }
        
        if (error.message === 'INVALID_STOCK') {
            return res.status(400).json({
                status: 'error',
                error: 'El stock debe ser mayor o igual a 0'
            });
        }
        
        if (error.message === 'PRODUCT_CODE_EXISTS') {
            return res.status(409).json({
                status: 'error',
                error: 'Ya existe un producto con ese código'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Actualizar producto
const update = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await productService.update(pid, req.body);
        
        res.json({
            status: 'success',
            payload: updatedProduct
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Producto no encontrado'
            });
        }
        
        if (error.message === 'INVALID_PRICE') {
            return res.status(400).json({
                status: 'error',
                error: 'El precio debe ser mayor o igual a 0'
            });
        }
        
        if (error.message === 'INVALID_STOCK') {
            return res.status(400).json({
                status: 'error',
                error: 'El stock debe ser mayor o igual a 0'
            });
        }
        
        if (error.message === 'PRODUCT_CODE_EXISTS') {
            return res.status(409).json({
                status: 'error',
                error: 'Ya existe un producto con ese código'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Eliminar producto
const deleteById = async (req, res) => {
    try {
        const { pid } = req.params;
        await productService.deleteById(pid);
        
        res.json({
            status: 'success',
            message: 'Producto eliminado'
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Producto no encontrado'
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
    update,
    deleteById
};
