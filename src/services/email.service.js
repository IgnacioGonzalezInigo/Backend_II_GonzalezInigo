// Email Service - Envío de correos

import { createMailer } from '../config/mailer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer template HTML
const readTemplate = (templateName) => {
    const templatePath = path.join(__dirname, '..', 'templates', templateName);
    return fs.readFileSync(templatePath, 'utf-8');
};

// Enviar email de recuperación de contraseña
const sendPasswordReset = async (to, firstName, resetLink) => {
    try {
        const html = readTemplate('reset-password.html')
            .replace('{{NOMBRE}}', firstName)
            .replaceAll('{{RESET_LINK}}', resetLink);
        
        const transporter = createMailer();
        
        const info = await transporter.sendMail({
            from: `"E-commerce" <${process.env.MAIL_USER}>`,
            to,
            subject: 'Recuperación de Contraseña',
            html
        });
        
        console.log('✅ Email enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        throw new Error('EMAIL_SEND_FAILED');
    }
};

export default { 
    sendPasswordReset 
};