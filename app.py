from flask import Flask, render_template, redirect, request, url_for,flash

app = Flask(__name__)
app.secret_key = 'dont_tell'

@app.route("/", methods = ['GET','POST'])
def home():
    if request.method == 'GET':
        return render_template("index.html")
    else:
        return redirect(url_for('about'))

@app.route("/about", methods = ['GET','POST'])
def about():
    if request.method == 'GET':
        return render_template("about.html")
    else:
        return redirect(url_for('home'))

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        action = request.form["submit"]
        if action == "Register":
            username = request.form["r_username"]
            password = request.form ["r_password"]
            confirm = request.form ["r_confirm"]
            return "registering"
        elif action == "Login":
            username = request.form["l_username"]
            password = request.form ["l_password"] 
            return "loggin in"
    return render_template("login.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html")
    
if __name__ == "__main__":
    app.debug = True
    app.run()
    
