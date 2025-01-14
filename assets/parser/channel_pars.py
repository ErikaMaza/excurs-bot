import json
import re
import os
from datetime import datetime
from telethon.tl.functions.messages import GetHistoryRequest
from assets.parser.database.Post import Post
from assets.parser.database.database import Database

def extract_date(text):

    date_pattern = r"Ближайшая дата.*?\n?(\d{1,2}\.\d{1,2}\.\d{2,4})"
    match = re.search(date_pattern, text, re.DOTALL)

    if match:
        date_str = match.group(1)
        return date_str
    return None

def load_json(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []

def save_json(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def is_date_future(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%d.%m.%Y")
        return date_obj > datetime.now()
    except ValueError:
        return False

async def pars(telegram_client, channel):
    db_path = os.path.join(os.getcwd(), "database", "config", "posts.db")
    db = Database(db_path)

    offset_id = 0
    limit = 100
    total_messages = 0
    json_file_path = "../db/db.json"

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
            existing_data = load_json(json_file_path)

            for message in messages:
                if message.message:
                    post_content = message.message
                    extracted_date = extract_date(post_content)
                    if extracted_date:
                        print(f"Дата сообщения: {extracted_date}")

                    updated = False

                    for record in existing_data:
                        name_to_find = record.get("name", "")
                        record_date = record.get("date", "")

                        print(f"Проверяем запись: {name_to_find}, дата в записи: {record_date}")

                        if name_to_find and name_to_find in post_content:
                            if is_date_future(extracted_date):
                                print(f"Обновляем запись для имени: {name_to_find} с датой: {extracted_date}")
                                record["actual_date"] = extracted_date
                                updated = True
                            else:
                                print(f"Дата не подходит для обновления (не будущая): {extracted_date}")
                        else:
                            print(f"Имя {name_to_find} не найдено в сообщении")

                    if updated:
                        save_json(existing_data, json_file_path)
                    else:
                        print("Изменений не найдено")

                    post = Post(post_content)
                    post.save(db)

            offset_id = messages[-1].id
            total_messages += len(messages)

        print(f"Парсинг завершён. Всего сообщений: {total_messages}")

    finally:
        db.close()
