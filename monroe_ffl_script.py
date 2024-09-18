from espn_api.football import League
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

league = League(league_id=95050, year=2024)


@app.route("/api/league-info")
def get_league_info():
    return jsonify(
        {
            "name": league.settings.name,
            "num_teams": league.settings.team_count,
            "current_week": league.current_week,
            "scoring_format": league.settings.scoring_format,
            "position_slot_counts": league.settings.position_slot_counts,
            "draft_settings": league.settings.draft_settings,
            "trade_settings": league.settings.trade_settings,
            "waiver_settings": league.settings.waiver_settings,
            "playoff_settings": league.settings.playoff_settings,
        }
    )


@app.route("/api/teams")
def get_teams():
    return jsonify(
        [
            {
                "id": team.team_id,
                "name": team.team_name,
                "owners": team.owners,
                "wins": team.wins,
                "losses": team.losses,
                "ties": team.ties,
                "points_for": team.points_for,
                "points_against": team.points_against,
                "acquisitions": team.acquisitions,
                "drops": team.drops,
                "trades": team.trades,
                "playoff_pct": team.playoff_pct,
                "draft_projected_rank": team.draft_projected_rank,
                "streak_length": team.streak_length,
                "streak_type": team.streak_type,
                "standing": team.standing,
                "final_standing": team.final_standing,
                "logo_url": team.logo_url,
                "division_id": team.division_id,
                "division_name": team.division_name,
                "schedule": [opp.team_id for opp in team.schedule],
                "scores": team.scores,
                "mov": team.mov,
            }
            for team in league.teams
        ]
    )


@app.route("/api/standings")
def get_standings():
    return jsonify(
        [
            {
                "id": team.team_id,
                "name": team.team_name,
                "wins": team.wins,
                "losses": team.losses,
                "ties": team.ties,
                "points_for": team.points_for,
                "points_against": team.points_against,
                "rank": team.standing,
                "playoff_pct": team.playoff_pct,
            }
            for team in sorted(league.teams, key=lambda x: x.standing)
        ]
    )


@app.route("/api/team/<int:team_id>/roster")
def get_team_roster(team_id):
    team = next((team for team in league.teams if team.team_id == team_id), None)
    if not team:
        return jsonify({"error": "Team not found"}), 404
    return jsonify(
        [
            {
                "name": player.name,
                "position": player.position,
                "pro_team": player.proTeam,
                "projected_points": player.projected_total_points,
                "actual_points": player.total_points,
                "eligible_slots": player.eligibleSlots,
                "acquisition_type": player.acquisitionType,
                "injury_status": player.injuryStatus,
                "percent_owned": player.percent_owned,
                "percent_started": player.percent_started,
                "stats": player.stats,
            }
            for player in team.roster
        ]
    )


@app.route("/api/matchups")
def get_matchups():
    week = request.args.get("week", default=league.current_week, type=int)
    matchups = league.box_scores(week)
    return jsonify(
        [
            {
                "week": week,
                "home_team": {
                    "id": matchup.home_team.team_id,
                    "name": matchup.home_team.team_name,
                    "score": matchup.home_score,
                    "projected": matchup.home_projected,
                },
                "away_team": {
                    "id": matchup.away_team.team_id,
                    "name": matchup.away_team.team_name,
                    "score": matchup.away_score,
                    "projected": matchup.away_projected,
                },
                "is_playoff": matchup.is_playoff,
                "matchup_type": matchup.matchup_type,
            }
            for matchup in matchups
        ]
    )


@app.route("/api/recent-activity")
def get_recent_activity():
    activities = league.recent_activity(size=25)
    return jsonify(
        [
            {
                "id": idx,
                "date": activity.date,
                "actions": [
                    {
                        "team": action[0].team_name if action[0] else None,
                        "action": action[1],
                        "player": action[2].name if action[2] else None,
                        "bid_amount": action[3] if len(action) > 3 else None,
                    }
                    for action in activity.actions
                ],
            }
            for idx, activity in enumerate(activities)
        ]
    )


@app.route("/api/power-rankings")
def get_power_rankings():
    rankings = league.power_rankings()
    return jsonify(
        [
            {"rank": idx + 1, "team_name": team.team_name, "power_score": float(score)}
            for idx, (score, team) in enumerate(rankings)
        ]
    )


@app.route("/api/free-agents")
def get_free_agents():
    position = request.args.get("position")
    week = request.args.get("week", default=league.current_week, type=int)
    free_agents = league.free_agents(week=week, position=position)
    return jsonify(
        [
            {
                "name": player.name,
                "position": player.position,
                "pro_team": player.proTeam,
                "projected_points": player.projected_points,
                "actual_points": player.points,
                "percent_owned": player.percent_owned,
                "percent_started": player.percent_started,
                "stats": player.stats,
            }
            for player in free_agents
        ]
    )


if __name__ == "__main__":
    print(f"League Name: {league.settings.name}")
    print(f"Number of Teams: {len(league.teams)}")
    for team in league.teams:
        print(f"\nTeam: {team.team_name}")
        print(f"Owner: {team.owners}")
        print(f"Win-Loss: {team.wins}-{team.losses}")
    app.run(debug=True, port=5000)
