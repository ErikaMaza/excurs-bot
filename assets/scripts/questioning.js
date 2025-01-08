import { waitForText } from "../utils/waitForText"
import { writeExcel } from "./writeExcel"

export async function questioning(bot, chatId){
    await bot.sendMessage(chatId, "Напишите название экскурсии на которую хотите записаться")

    const excursName = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите свой username telegram")

    const telegram = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите мне ваш email")

    const email = await waitForText(bot, chatId)

    await bot.sendMessage(chatId, "Пришлите мне ваш номер телефона")

    const phone = await waitForText(bot, chatId)

    const data = {
        name: excursName,
        contact: telegram,
        email: email,
        phone: phone
    }

    writeExcel(data)
}