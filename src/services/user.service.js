// Logica del negocio

import userRepository from "../repositories/user.repository.js"
import {hashPassword} from "../utils/crypto.js"

// Obtener los usuarios
const getAll = async () => userRepository.getAll();

// Obtener usuario por ID
const getById = async (id) => {
    const user = await userRepository.getById(id);
    if (!user) throw new Error ("USUARIO_NO_ENCONTRADO");
    return user
}

// Crear usuario
const create = async (data) => {
    const { first_name , last_name, email, age, password, role } = data;
    
    if (!first_name || !last_name || !email || !age || !password){
        throw new Error ("FALTA COMPLETAR CAMPOS")
    }

    const existeEmail = await userRepository.getByEmail(email.toLowerCase().trim())
    if(existeEmail){
        throw new Error ("YA EXISTE UN USUARIO CON ESTE EMAIL");
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUser = await userRepository.create ({
        first_name,
        last_name,
        email: email.toLowerCase().trim(),
        age,
        password: hashedPassword,
        role: role || "user",
        cart: null
    });

    return nuevoUser;
}

// Actualizar usuario
const update = async (id, data) => {
    const updatedUser = await userRepository.update(id, data);
    return updatedUser;
};

// Eliminar usuario
const deleteById = async (id) => {
    const deletedUser = await userRepository.deleteById(id);
    return deletedUser;
};

export default { 
    getAll, 
    getById, 
    create, 
    update, 
    deleteById 
};