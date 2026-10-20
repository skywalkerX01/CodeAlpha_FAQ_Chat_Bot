from flask import Flask, render_template, request, jsonify
from chatbot import get_answer
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    answer = get_answer(user_message)
    return jsonify({
        "reply": answer
    })

if __name__ == "__main__":
    app.run(debug=True)