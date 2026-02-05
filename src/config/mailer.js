// nodemailer

import nodemailer from 'nodemailer';

export const createMailer = () => {
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_APP_PASSWORD;
    const provider = process.env.MAIL_PROVIDER;

    if( !user || !pass) throw new Error("MAIL_USER / MAIL_APP_PASSWORD error");

    return nodemailer.createTransport({
        service: provider,
        auth: { user, pass }
    });
}