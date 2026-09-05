from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import joblib
from crime_data import crime_data

app = Flask(__name__)
CORS(app)

# Load the trained AI model
model = joblib.load("safety_model.pkl")


# Home Route
@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "project": "SafeCity AI Backend"
    })


# AI Safety Score Prediction
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json(silent=True) or {}

    # Demo values (replace with real GPS data later)
    hour = datetime.now().hour
    lighting = 1 if hour < 19 else 0
    cctv = 1
    crowd = 2 if hour < 20 else 0
    incidents = 5

    prediction = model.predict([[
        hour,
        lighting,
        cctv,
        crowd,
        incidents
    ]])[0]

    score = int(round(prediction))

    if score >= 80:
        risk = "Low Risk Area"

    elif score >= 70:
        risk = "Moderate Risk Area"

    else:
        risk = "High Risk Area"

    return jsonify({
        "score": score,
        "risk": risk,
        "factors": [
            f"Current hour: {hour}:00",
            f"Street lighting: {'Yes' if lighting else 'No'}",
            f"CCTV nearby: {'Yes' if cctv else 'No'}",
            f"Crowd density level: {crowd}",
            f"Nearby incidents: {incidents}"
        ]
    })


# Crime Heatmap Data
@app.route("/crime-data")
def get_crime_data():
    return jsonify(crime_data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)