// Password Service - Lógica de recuperación de contraseña

import userRepository from '../repositories/user.repository.js';
import * as passwordResetDAO from '../daos/passwordReset.dao.js';
import emailService from './email.service.js';
import { hashPassword, comparePassword } from '../utils/crypto.js';
import crypto from 'crypto';

// Generar token único
const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Solicitar recuperación de contraseña
const forgotPassword = async (email) => {
    // Buscar usuario por email
    const user = await userRepository.getByEmail(email.toLowerCase().trim());
    
    if (!user) {
        // Por seguridad, no revelar si el email existe o no
        throw new Error('USER_NOT_FOUND');
    }
    
    // Generar token único
    const token = generateResetToken();
    
    // Crear fecha de expiración (1 hora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    // Eliminar tokens anteriores del usuario
    await passwordResetDAO.deleteByUserId(user._id);
    
    // Crear nuevo token de reset
    await passwordResetDAO.create({
        userId: user._id,
        token,
        expiresAt,
        used: false
    });
    
    // Construir link de reset
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    // Enviar email
    await emailService.sendPasswordReset(user.email, user.first_name, resetLink);
    
    return { message: 'Email de recuperación enviado' };
};

// Resetear contraseña
const resetPassword = async (token, newPassword) => {
    // Buscar token
    const resetToken = await passwordResetDAO.getByToken(token);
    
    if (!resetToken) {
        throw new Error('INVALID_TOKEN');
    }
    
    // Verificar que no esté usado
    if (resetToken.used) {
        throw new Error('TOKEN_ALREADY_USED');
    }
    
    // Verificar que no haya expirado
    if (new Date() > new Date(resetToken.expiresAt)) {
        throw new Error('TOKEN_EXPIRED');
    }
    
    // Obtener usuario
    const user = await userRepository.getById(resetToken.userId);
    
    if (!user) {
        throw new Error('USER_NOT_FOUND');
    }
    
    // Verificar que la nueva contraseña sea diferente a la anterior
    const isSamePassword = await comparePassword(newPassword, user.password);
    
    if (isSamePassword) {
        throw new Error('SAME_PASSWORD');
    }
    
    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword);
    
    // Actualizar contraseña del usuario
    await userRepository.update(user._id, { password: hashedPassword });
    
    // Marcar token como usado
    await passwordResetDAO.markAsUsed(token);
    
    return { message: 'Contraseña actualizada correctamente' };
};

export default { 
    forgotPassword, 
    resetPassword 
};