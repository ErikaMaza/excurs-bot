import re
from dateutil.parser import parse
import os
from telethon.tl.functions.messages import GetHistoryRequest
from assets.parser.database.Post import Post
from assets.parser.database.database import Database

months_map = {
    "января": "January", "февраля": "February", "марта": "March",
    "апреля": "April", "мая": "May", "июня": "June",
    "июля": "July", "августа": "August", "сентября": "September",
    "октября": "October", "ноября": "November", "декабря": "December"
}

date_pattern = r"\b(\d{1,2}\.\d{1,2}\.\d{4}|\d{1,2}\s[а-яА-Я]+\s?-\s?\d{1,2}\s[а-яА-Я]+|\d{1,2}\s[а-яА-Я]+|\d{1,2}\.\d{1,2})"

def extract_date(text):
    matches = re.finditer(date_pattern, text)
    for match in matches:
        text_date = match.group(0)
        for ru_month, en_month in months_map.items():
            text_date = text_date.replace(ru_month, en_month)
        try:
            return parse(text_date, fuzzy=True).strftime("%d.%m.%Y")
        except ValueError:
            continue
    return None


async def pars(telegram_client, channel):
    db_path = os.path.join(os.getcwd(), "database", "config", "posts.db")

    db = Database(db_path)

    offset_id = 0
    limit = 100
    total_messages = 0
    total_count_limit = 0

    try:
        while True:
            history = await telegram_client(GetHistoryRequest(
                peer=channel,
                offset_id=offset_id,
                offset_date=None,
                add_offset=0,
                limit=limit,
                max_id=0,
                min_id=0,
                hash=0
            ))

            if not history.messages:
                break

            messages = history.messages

            for message in messages:
                if message.message:
                    extracted_date = extract_date(message.message)

                    post_content = message.message
                    if extracted_date:
                        post_content += f"\nExtracted date: {extracted_date}"

                    post = Post(post_content)
                    post.save(db)

            offset_id = messages[-1].id
            total_messages += len(messages)

            if total_count_limit != 0 and total_messages >= total_count_limit:
                break

        print(f"Парсинг завершён. Всего сообщений: {total_messages}")

    finally:
        db.close()
