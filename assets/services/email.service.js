import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: 2525,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})