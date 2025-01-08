# assets/parser/database/Post.py
class Post:
    def __init__(self, content):
        self.content = content

    def save(self, db):
        db.insert_post(self.content)
