import userService from '../services/user.service.js';

// Obtener todos los usuarios
const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json({
            status: 'success',
            payload: users
        });
    } catch (error) {
        console.error({ error });
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Obtener usuario por ID
const getById = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userService.getById(uid);
        
        res.json({
            status: 'success',
            payload: user
        });
    } catch (error) {
        console.error({ error });
        if (error.message === "USUARIO_NO_ENCONTRADO") {
            return res.status(404).json({
                status: 'error',
                error: 'Usuario no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Crear usuario
const create = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        
        res.status(201).json({
            status: 'success',
            payload: {
                id: newUser._id,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === "FALTA COMPLETAR CAMPOS") {
            return res.status(400).json({
                status: 'error',
                error: 'Todos los campos son obligatorios'
            });
        }
        
        if (error.message === "YA EXISTE UN USUARIO CON ESTE EMAIL") {
            return res.status(409).json({
                status: 'error',
                error: 'El email ya está en uso'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Actualizar usuario
const update = async (req, res) => {
    try {
        const { uid } = req.params;
        const updatedUser = await userService.update(uid, req.body);
        
        res.json({
            status: 'success',
            payload: updatedUser
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === "USUARIO_NO_ENCONTRADO") {
            return res.status(404).json({
                status: 'error',
                error: 'Usuario no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Eliminar usuario
const deleteById = async (req, res) => {
    try {
        const { uid } = req.params;
        await userService.deleteById(uid);
        
        res.json({
            status: 'success'
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === "USUARIO_NO_ENCONTRADO") {
            return res.status(404).json({
                status: 'error',
                error: 'Usuario no encontrado'
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