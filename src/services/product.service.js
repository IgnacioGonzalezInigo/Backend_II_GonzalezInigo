import productRepository from "../repositories/product.repository.js";

// Obtener todos los productos
const getAll = async () => productRepository.getAll();

// Obtener producto por ID
const getById = async (id) => productRepository.getById(id);

// Crear producto
const create = async (data) => {
    const { title, description, code, price, stock, category } = data;
    
    if (!title || !description || !code || price === undefined || stock === undefined || !category) {
        throw new Error("MISSING_REQUIRED_FIELDS");
    }
    
    if (price < 0) throw new Error("INVALID_PRICE");
    if (stock < 0) throw new Error("INVALID_STOCK");
    
    const existingProduct = await productRepository.getByCode(code);
    if (existingProduct) {
        throw new Error("PRODUCT_CODE_EXISTS");
    }
    
    const newProduct = await productRepository.create(data);
    return newProduct;
};

// Actualizar producto
const update = async (id, data) => {
    if (data.code) {
        const existingProduct = await productRepository.getByCode(data.code);
        if (existingProduct && existingProduct._id.toString() !== id) {
            throw new Error("PRODUCT_CODE_EXISTS");
        }
    }
    
    if (data.price !== undefined && data.price < 0) {
        throw new Error("INVALID_PRICE");
    }
    if (data.stock !== undefined && data.stock < 0) {
        throw new Error("INVALID_STOCK");
    }
    
    const updatedProduct = await productRepository.update(id, data);
    return updatedProduct;
};

// Eliminar producto
const deleteById = async (id) => productRepository.deleteById(id);

export default {
    getAll,
    getById,
    create,
    update,
    deleteById
};