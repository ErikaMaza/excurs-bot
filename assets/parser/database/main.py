import os
from assets.parser.database.database import Database

def work_with_database():
    db_path = os.path.join(os.getcwd(), "database", "config", "posts.db")

    db = Database(db_path)
    db.create_table()

    posts = db.get_all_posts()

    for post in posts:
        print(f"ID: {post[0]}, Контент: {post[1]}")

    db.close()
