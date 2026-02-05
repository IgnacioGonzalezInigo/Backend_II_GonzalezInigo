// Password Controller - Maneja recuperación de contraseña

import passwordService from '../services/password.service.js';

// POST /api/sessions/forgot-password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                status: 'error',
                error: 'El email es obligatorio'
            });
        }
        
        await passwordService.forgotPassword(email);
        
        // Respuesta genérica por seguridad (no revelar si el email existe)
        res.status(200).json({
            status: 'success',
            message: 'Si el email existe, recibirás un correo con instrucciones'
        });
        
    } catch (error) {
        console.error({ error });
        
        // Respuesta genérica incluso en error (seguridad)
        res.status(200).json({
            status: 'success',
            message: 'Si el email existe, recibirás un correo con instrucciones'
        });
    }
};

// POST /api/sessions/reset-password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.status(400).json({
                status: 'error',
                error: 'Token y nueva contraseña son obligatorios'
            });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({
                status: 'error',
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }
        
        const result = await passwordService.resetPassword(token, newPassword);
        
        res.status(200).json({
            status: 'success',
            message: result.message
        });
        
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'INVALID_TOKEN') {
            return res.status(400).json({
                status: 'error',
                error: 'Token inválido'
            });
        }
        
        if (error.message === 'TOKEN_ALREADY_USED') {
            return res.status(400).json({
                status: 'error',
                error: 'Este enlace ya fue utilizado'
            });
        }
        
        if (error.message === 'TOKEN_EXPIRED') {
            return res.status(400).json({
                status: 'error',
                error: 'El enlace ha expirado. Solicita uno nuevo.'
            });
        }
        
        if (error.message === 'SAME_PASSWORD') {
            return res.status(400).json({
                status: 'error',
                error: 'La nueva contraseña no puede ser igual a la anterior'
            });
        }
        
        if (error.message === 'USER_NOT_FOUND') {
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
    forgotPassword, 
    resetPassword 
};