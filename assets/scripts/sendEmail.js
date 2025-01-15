import { transport } from "../services/email.service.js"; 
import db from '../db/db.json' with {type :"json"}; 
import dotenv from 'dotenv'; 

dotenv.config(); 

export async function sendEmail(bot, email, chatId) {
    try { 
        try { 
            await transport.sendMail({ from: 
                "gidy@po-moscow.ru", to: email, 
                subject: "Экскурсия", text: 
                text.text
            });
        } catch (error) {
            console.error(error);
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
        for (let element in db) { 
             if (db[element].chatId === chatId) {
                const actualDateParts = db[element].actual_date.split('.'); 
                const actualDate = new Date(`${actualDateParts[2]}-${actualDateParts[1]}-${actualDateParts[0]}T00:00:00`); 
                const cronDate = new Date(`${triggerDate.getFullYear()}-${triggerDate.getMonth() + 1}-${triggerDate.getDate()}T${triggerDate.getHours()}:${triggerDate.getMinutes()}:00`); 
                if (cronDate > actualDate) {
                    const text = `Здравствуйте!
                
                    Напоминаем, что вы записаны на 
                    экскурсию 
                    "${db[element].text}", которая 
                    состоится - 
                    ${db[element].actual_date}
                
                    ⛳ Место встречи: Выход №2 - В 
                    сторону Каспийской улицы, 
                    Новоцарицынского шоссе и 
                    Бакинской улицы.
                
                    Вход на экскурсию свободный, 
                    чаевые приветствуются.
                
                    Все экскурсии нашего проекта 
                    начинаются строго в указанное 
                    время!!! Убедительная просьба 
                    не опаздывать, но если это 
                    произошло, вы можете догнать 
                    группу, в описании каждой 
                    экскурсии на сайте имеется 
                    подробный маршрут.
                
                    Экскурсовод оставляет за собой 
                    право отменить прогулку из-за 
                    неблагоприятных погодных 
                    условий, в этом случае вы 
                    получите уведомление по 
                    электронной почте не менее чем 
                    за два часа до начала 
                    экскурсии. Обязательно 
                    проверяйте свою почту перед 
                    выходом во избежание 
                    недоразумений или зайдите на 
                    наш сайт (в разделе Расписание 
                    напротив данной экскурсии 
                    будет надпись Отменена).
                
                    Желаем приятной прогулки! 
                    \uD83C\uDF38 \uD83C\uDF38 
                    \uD83C\uDF38`; await 
                    bot.sendMessage(chatId, text);
                }
            }
        }
        console.log("Email отправлен");
    } catch (err) {
        console.error("Ошибка при отправке email:", err);
    }
    console.log(process.env.EMAIL_USER); 
    console.log(process.env.EMAIL_PASS);
}
