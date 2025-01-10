import { transport } from "../services/email.service.js";
import eventsDb from '../db/db.json' with { type: "json" };
import text from '../db/text.json' with { type: "json" };
import { CronJob } from 'cron';

const scheduledJobs = new Map();

export async function processAndScheduleEvents(bot) {
    try {
        eventsDb.forEach((event, index) => {
            const eventDate = new Date(event.date);
            const triggerDate = new Date(eventDate);
            triggerDate.setDate(triggerDate.getDate() - 1);

            if (triggerDate < new Date()) {
                return console.log(`Событие "${event.name}" уже прошло или слишком поздно для напоминания.`);
            }

            if (scheduledJobs.has(index)) {
                return console.log(`Задача для события "${event.name}" уже запланирована.`);
            }

            const cronExpression = `${triggerDate.getMinutes()} ${triggerDate.getHours()} ${triggerDate.getDate()} ${triggerDate.getMonth() + 1} *`;

            const job = new CronJob(cronExpression, async () => {
                try {
                    console.log(`Запуск напоминания для события: ${event.name}`);

                    await transport.sendMail({
                        from: process.env.EMAIL_USER,
                        to: event.email,
                        subject: "Напоминание о событии",
                        text: text.text,
                    });

                    await bot.sendMessage(event.chatId, text.text);

                } catch (error) {
                    return console.error(`Ошибка при выполнении напоминания для события "${event.name}":`, error);
                }
            });

            scheduledJobs.set(index, job);
            console.log(`Напоминание для события "${event.name}" запланировано на ${triggerDate}`);
            job.start();
        });
    } catch (error) {
        console.error("Ошибка при обработке событий:", error);
    }
}
