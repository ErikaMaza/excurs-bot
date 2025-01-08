import os
import dotenv
from telethon import TelegramClient
from assets.parser.database.main import work_with_database

dotenv.load_dotenv()

api_id = int(os.getenv("API_ID"))
api_hash = os.getenv("API_HASH")

session_name = "telegram_session"

telegram_client = TelegramClient(session_name, api_id, api_hash)

channel_id = os.getenv("CHANNEL_ID")


async def main():
    async with telegram_client:
        channel = await telegram_client.get_entity(channel_id)
        print(f"Канал найден: {channel.title}")

        from channel_pars import pars
        work_with_database()
        await pars(telegram_client, channel)
