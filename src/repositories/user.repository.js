// User Repository

import * as userDAO from '../daos/user.dao.js';

// Obtener todos los usuarios
const getAll = async () => userDAO.getAll();

// Obtener usuario por ID
const getById = async (id) => {
    const user = await userDAO.getById(id);
    if (!user) throw new Error("USUARIO_NO_ENCONTRADO");
    return user;
};

// Obtener usuario por email
const getByEmail = async (email) => userDAO.getByEmail(email);

// Crear usuario
const create = async (data) => userDAO.create(data);

// Actualizar usuario
const update = async (id, data) => {
    const user = await userDAO.update(id, data);
    if (!user) throw new Error("USUARIO_NO_ENCONTRADO");
    return user;
};

// Eliminar usuario
const deleteById = async (id) => {
    const user = await userDAO.deleteById(id);
    if (!user) throw new Error("USUARIO_NO_ENCONTRADO");
    return user;
};

export default { 
    getAll, 
    getById, 
    getByEmail, 
    create, 
    update, 
    deleteById 
};