// DAO password reset

import {PasswordReset } from "../models/passwordReset.model.js";

// Crear token de reset
export const create = async (data) => PasswordReset.create(data);

// Obtener token
export const getByToken = async (token) => PasswordReset.findOne({token}).lean();

// Marcar token como usado
export const markAsUsed = async (token) => {
    return PasswordReset.findOneAndUpdate(
        { token },
        { used: true },
        { new: true }
    ).lean();
};

// Eliminar tokens de un usuario
export const deleteByUserId = async (userId) => {
    return PasswordReset.deleteMany({ userId });
};