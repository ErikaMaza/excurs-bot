import os
import datetime
from dotenv import load_dotenv
from telethon import TelegramClient, utils

load_dotenv()

api_id = int(os.getenv("API_ID"))
api_hash = os.getenv("API_HASH")
telegram_client = TelegramClient(str(datetime.time), api_id, api_hash)
real_id, peer_type = utils.resolve_id(os.getenv("CHANNEL_ID"))
