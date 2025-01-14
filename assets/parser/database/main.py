import os
from assets.parser.database.database import Database

def work_with_database():
    db_path = os.path.join(os.getcwd(), "database", "config", "posts.db")

    db = Database(db_path)
    db.create_table()

    db.close()
