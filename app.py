from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/league-info")
def league_info():
    # Replace this with your actual data
    return jsonify({"name": "My Fantasy League", "num_teams": 10, "current_week": 5})


# Add similar routes for other API endpoints

if __name__ == "__main__":
    app.run(debug=True)
