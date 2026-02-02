from flask import Flask, render_template, jsonify, request
import sqlite3
import requests
import os
from datetime import datetime

app = Flask(__name__)

# Constants
API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"  # Replace with actual key
DB_NAME = "weather_history.db"

def init_db():
    """Initialize the SQLite database for search history."""
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City is required"}), 400

    # Save to history
    try:
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO history (city) VALUES (?)", (city,))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Database error: {e}")

    # Fetch current weather
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"

    try:
        weather_res = requests.get(weather_url).json()
        forecast_res = requests.get(forecast_url).json()
        
        if weather_res.get('cod') != 200:
             return jsonify({"error": weather_res.get('message', 'Error fetching weather')}), 400

        return jsonify({
            "current": weather_res,
            "forecast": forecast_res
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/history')
def get_history():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT city, timestamp FROM history ORDER BY timestamp DESC LIMIT 10")
    data = c.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
