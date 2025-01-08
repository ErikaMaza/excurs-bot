import os
import sqlite3

class Database:
    def __init__(self, db_path):
        self.db_name = db_path
        self.connection = None
        self.cursor = None
        self._connect()

    def _connect(self):
        os.makedirs(os.path.dirname(self.db_name), exist_ok=True)

        if not os.path.exists(self.db_name):
            open(self.db_name, 'w').close()

        self.connection = sqlite3.connect(self.db_name)
        self.cursor = self.connection.cursor()

    def create_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL
            )
        """)
        self.connection.commit()

    def insert_post(self, content):
        self.cursor.execute("INSERT INTO posts (content) VALUES (?)", (content,))
        self.connection.commit()

    def get_all_posts(self):
        self.cursor.execute("SELECT * FROM posts")
        return self.cursor.fetchall()

    def close(self):
        if self.connection:
            self.connection.close()
