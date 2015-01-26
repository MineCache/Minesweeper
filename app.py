from flask import Flask, render_template, redirect, request, url_for, flash, session
import math

import mine_sqlite3

app = Flask(__name__)
app.secret_key = 'dont_tell'

@app.route("/", methods = ['GET','POST'])
@app.route("/index", methods = ['GET','POST'])
def home():
    if request.method == "POST" and request.form["submit"] == "Login":
        return redirect(url_for('login'))
    else:
        #if 'user' in session:
        return render_template("home.html")
        #else:
        #    return redirect(url_for('login'))
    

@app.route("/about", methods = ['GET','POST'])
def about():
        return render_template("about.html")

@app.route("/test", methods = ['GET', 'POST'])
def test():
    if request.method == "POST":
        if "user" in session:
            db = mine_sqlite3.init()
            mine_sqlite3.create(db)
            #same number of characters????
            mine_sqlite3.incUser(db, session["user"][1], request.form["points"])
            db.commit()
            session["user"] = mine_sqlite3.getUser(db, session["user"][1], session["user"][2]);
            db.close()
            #WHAT IS THIS BULLSHIT
        return redirect(url_for("about")) #THIS LINE WORKS
        #return redirect(url_for("index")) #AND THIS ONE DOESN'T
        #I WANNA GO BACK TO C
    elif "user" in session:
        return render_template("test.html", user=session["user"], 
                               size=int(math.log10(session["user"][3] + 1)) + 1) #length of number
    else:
        return render_template("test.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    db = mine_sqlite3.init()
    mine_sqlite3.create(db)
    if request.method == "POST":
        action = request.form["submit"]
        if action == "Register":
            username = request.form["r_username"]
            password = request.form ["r_password"]
            confirm = request.form ["r_confirm"]            
            if password != confirm:
                db.close()
                flash("Passwords don't match! D:")
                return redirect(url_for('login'))
            added = mine_sqlite3.addUser(db, username, password)
            if not added:
                db.close()
                flash("You're already a user!")
                return redirect(url_for('login'))
            session["user"] = mine_sqlite3.getUser(db, username, password)
        elif action == "Login":
            username = request.form["l_username"]
            password = request.form ["l_password"]
            session["user"] = mine_sqlite3.getUser(db, username, password)
            if session["user"] == None:
                db.close()
                flash("That user is not registered!")
                return redirect(url_for('login'))
        elif action == "Logout":
            session.pop("user")

    if "user" in session:
            return render_template("login.html", user=session['user'])
    else:
        return render_template("login.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
    
