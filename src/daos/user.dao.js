// User DAO (Data Access Object)

import {User} from "../models/user.model.js"

// Obtengo todos los usuarios 
export const getAll = async () => User.find().lean();

// Obtengo usuario por su ID
export const getById = async (id) => User.findById(id).lean();

// Obtengo usuario por su email
export const getByEmail = async (email) =>  User.findOne({ email }).lean();

// Crear usuario
export const create = async (data) => User.create( data );

// Eliminar usuario por ID
export const deleteById = async (id) => User.findOneAndDelete(id);

// Actualizar usuario por ID
export const update = async (id, data) => User.findByIdAndUpdate(id, data, { new: true }).lean();