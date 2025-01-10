import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    host: "smtp.timeweb.ru",
    port: 25,
    secure: false,
    auth: {
        user: "gidy@po-moscow.ru", 
        pass: "02AIlBRlC" 
    }
});
