import { waitForText } from "../utils/waitForText.js"
import { writeExcel } from "./writeExcel.js"
import db from '../db/db.json' with {type: "json"}
import * as fs from 'fs'
import {sendEmail} from "./sendEmail.js";
import {startParser} from "./requests.js";

export async function questioning(bot, chatId){
    const excelData = []
    await bot.sendMessage(chatId, "Напишите название экскурсии на которую хотите записаться")
    const excursName = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите свой username telegram")
    const telegram = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите мне ваш email")
    const email = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите мне ваш номер телефона")
    const phone = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите мне дату проведения мироприятия")
    const date = await waitForText(bot, chatId)

    const data = {
        chatId: chatId,
        name: excursName,
        telegram: telegram,
        email: email,
        phone: phone,
        date: date,
        actual_date: "",
        createat_at: Date.now()
    }

    db.push(data)
    excelData.push(data)
    fs.writeFileSync("./assets/db/db.json", JSON.stringify(db, null, '\t'))
    await sendEmail(bot, email, chatId)
    await writeExcel(excelData)
    await startParser();
    return bot.sendMessage(chatId, "Вы были записаны на экскурсию")
}
