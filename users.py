import sqlite3

DB_NAME = ".db"

def init():
    return sqlite3.connect(DB_NAME)

def create(db):
    db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, username text, password text)")

def addUser(db, username, password):
    db.execute("INSERT INTO users VALUES (NULL, ?, ?)", (username, password))

    out = {}
    for x in db.execute("SELECT * FROM users"):
        out[x[0]] = (x[1], x[2])
    print out


