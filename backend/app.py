from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from utils import parse_robot_data
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

# Load and cache robot data once at startup
robots, robot_data_map, min_time, max_time = parse_robot_data()

# API routes
@app.route("/robots")
def get_robots():
    return jsonify(robots)

@app.route("/robot_data")
def get_robot_data():
    return jsonify(robot_data_map)

@app.route("/time_range")
def get_time_range():
    return jsonify({
        "min_time": min_time,
        "max_time": max_time
    })

# Serve React static files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
