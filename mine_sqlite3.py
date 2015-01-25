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
        print "adding user " + username + " (" + password + ")"
        db.execute("INSERT INTO users VALUES (NULL, ?, ?);", (username, password))
        db.commit()
        return True
    else:
        return False

def getUser(db, username, password):
    query = db.execute("SELECT * FROM users WHERE username = ?;", (username,))
    user = query.fetchone()
    return user
    
def reset():
    db.execute("DROP TABLE users;")
