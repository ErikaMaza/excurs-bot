import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv'
import {questioning} from "./assets/scripts/questioning.js";
import {processAndScheduleEvents} from "./assets/scripts/reminder.js";
import {CronJob} from "cron";

dotenv.config()

const bot = new TelegramBot(process.env.TOKEN, {polling: true})

const job = new CronJob('0 12 * * *', async () => {
    try {
        console.log('Проверка событий и планирование напоминаний...');
        await processAndScheduleEvents(bot);
    } catch (error) {
        console.error("Ошибка при обработке напоминаний:", error);
    }
});

job.start();

bot.on('message', async msg => {
    if (msg.text === "/start"){
        await bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name} добро пожаловать на запись на экскурсию`)
        await questioning(bot, msg.chat.id)
    }
})

bot.on('polling_error', console.log)
