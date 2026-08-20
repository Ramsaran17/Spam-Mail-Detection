from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

# Allow React frontend to communicate with Flask backend
CORS(app)


# Load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)


# Load vectorizer
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


@app.route("/")
def home():
    return "Spam Mail Prediction API is running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    message = data.get("message", "")

    if not message.strip():
        return jsonify({
            "error": "Please enter a message"
        }), 400

    # Convert message into features
    message_features = vectorizer.transform([message])

    # Make prediction
    prediction = model.predict(message_features)[0]

    # Model: spam = 0, ham = 1
    if prediction == 1:
        result = "Ham Mail"
    else:
        result = "Spam Mail"

    return jsonify({
        "message": message,
        "prediction": result
    })


if __name__ == "__main__":
    app.run(debug=True)