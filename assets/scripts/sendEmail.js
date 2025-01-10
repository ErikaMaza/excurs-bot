import { transport } from "../services/email.service.js";
import text from '../db/text.json' with {type: "json"}
import dotenv from 'dotenv'

dotenv.config()

export async function sendEmail(email) {
    try {
        try {
            await transport.sendMail({
                from: "gidy@po-moscow.ru",
                to: email,
                subject: "Экскурсия",
                text: text.text
            });
    
        } catch (error) {
            console.error(error)
        }

        await transport.sendMail({
            from: "gidy@po-moscow.ru",
            to: "gidy@po-moscow.ru",
            subject: "Для себя",
            text: "asd",
            attachments: [
                {
                    filename: "Запись на экскурсию.xlsx",
                    path: "./assets/db/data.xlsx",
                }
            ]
        });

        console.log("Email отправлен");

    } catch (err) {
        console.error("Ошибка при отправке email:", err);
    }

    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
}