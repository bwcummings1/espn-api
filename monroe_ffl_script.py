from espn_api.football import League

# Replace 123456 with your actual league ID
# Replace 2023 with the current or desired season year
league = League(league_id=95050, year=2024)

# Print basic league info
print(f"League Name: {league.settings.name}")
print(f"Number of Teams: {len(league.teams)}")

# Print information about each team
for team in league.teams:
    print(f"\nTeam: {team.team_name}")
    print(f"Owner: {team.owners}")  # Changed from team.owner to team.owners
    print(f"Win-Loss: {team.wins}-{team.losses}")
