from flask import Flask, jsonify
from espn_api.football import League

app = Flask(__name__)

# Initialize the league object
league = League(league_id=95050, year=2024)


@app.route("/api/league-info")
def league_info():
    return jsonify({"name": league.settings.name, "num_teams": len(league.teams)})


@app.route("/api/teams")
def teams():
    return jsonify(
        [
            {
                "name": team.team_name,
                "owners": team.owners,
                "wins": team.wins,
                "losses": team.losses,
            }
            for team in league.teams
        ]
    )


if __name__ == "__main__":
    app.run(debug=True)
