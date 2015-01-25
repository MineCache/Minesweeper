import sqlite3

DB_NAME = ".db"

def init():
    return sqlite3.connect(DB_NAME)

def create(db):
    db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, username TEXT, password TEXT, points INTEGER);")
    db.commit()

def addUser(db, username, password):
    adding = getUser(db, username, password) == None
    if adding:
        db.execute("INSERT INTO users VALUES (NULL, ?, ?, 0);", (username, password))
        db.commit()
        return True
    else:
        return False

def getUser(db, username, password):
    query = db.execute("SELECT * FROM users WHERE username = ?;", (username,))
    user = query.fetchone()
    if user != None and user[2] == password:
        return user
    else:
        return None

def incUser(db, username, points):
    db.execute("UPDATE users SET points = ? WHERE username = ?;", (points, username))

def reset(db):
    db.execute("DROP TABLE users;")

if __name__ == "__main__":
    reset(init())
