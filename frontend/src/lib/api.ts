const API_BASE_URL = 'http://localhost:5000/api'

export async function fetchLeagueInfo() {
  const response = await fetch(`${API_BASE_URL}/league-info`)
  if (!response.ok) {
    throw new Error('Failed to fetch league info')
  }
  return response.json()
}

export async function fetchTeams() {
  const response = await fetch(`${API_BASE_URL}/teams`)
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }
  return response.json()
}