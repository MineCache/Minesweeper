from flask import Flask, render_template, redirect, request, url_for, flash, session

import mine_sqlite3

app = Flask(__name__)
app.secret_key = 'dont_tell'

@app.route("/home", methods = ['GET','POST'])
def home():
    if request.method == 'GET':
        return render_template("home.html")
    else:
        return redirect(url_for('about'))


@app.route("/about", methods = ['GET','POST'])
def about():
        return render_template("about.html")

@app.route("/test", methods = ['GET', 'POST'])
def test():
    if request.method == "POST":
        request.form["points"]
        return redirect(url_for("/"))
    if "user" in session:
        return render_template("test.html", user=session["user"])
    else:
        return render_template("test.html")

@app.route("/", methods = ['GET','POST'])
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
        elif action == "Login":
            username = request.form["l_username"]
            password = request.form ["l_password"]
            session["user"] = mine_sqlite3.getUser(db, username, password)
            user = session["user"]
            if user == None:
                db.close()
                flash("That user is not registered!")
                return redirect(url_for('login'))
            else:
                return render_template("home.html")
        elif action == "Logout":
            session.pop("user")
    if "user" in session:
        return render_template("login.html", user=session["user"])
    else:
        return render_template("login.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html")
    
if __name__ == "__main__":
    app.debug = True
    app.run()
    
