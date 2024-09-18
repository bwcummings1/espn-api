const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'

export interface LeagueInfo {
  name: string;
  num_teams: number;
  current_week: number;
}

export interface Team {
  id: number;
  name: string;
  owners: string[];
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
}

export interface Standing extends Team {
  rank: number;
}

export interface Player {
  name: string;
  position: string;
  pro_team: string;
  projected_points: number;
  actual_points: number;
}

export interface Matchup {
  week: number;
  home_team: {
    id: number;
    name: string;
    score: number;
  };
  away_team: {
    id: number;
    name: string;
    score: number;
  };
}

export interface ActivityAction {
  team: string | null;
  action: string;
  player: string | null;
  bid_amount: number | null;
}

export interface Activity {
  id: number;
  date: string;
  actions: ActivityAction[];
}

export async function fetchLeagueInfo(): Promise<LeagueInfo> {
  console.log('Fetching from URL:', `${API_BASE_URL}/league-info`);
  try {
    const response = await fetch(`${API_BASE_URL}/league-info`)
    if (!response.ok) {
      console.error('Failed to fetch league info. Status:', response.status);
      console.error('Response:', await response.text());
      throw new Error(`Failed to fetch league info: ${response.status}`);
    }
    return response.json()
  } catch (error) {
    console.error('Error in fetchLeagueInfo:', error);
    throw error;
  }
}

export async function fetchTeams(): Promise<Team[]> {
  const response = await fetch(`${API_BASE_URL}/teams`)
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }
  return response.json()
}

export async function fetchStandings(): Promise<Standing[]> {
  const response = await fetch(`${API_BASE_URL}/standings`)
  if (!response.ok) {
    throw new Error('Failed to fetch standings')
  }
  return response.json()
}

export async function fetchTeamRoster(teamId: number): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/team/${teamId}/roster`)
  if (!response.ok) {
    throw new Error('Failed to fetch team roster')
  }
  return response.json()
}

export async function fetchMatchups(): Promise<Matchup[]> {
  const response = await fetch(`${API_BASE_URL}/matchups`)
  if (!response.ok) {
    throw new Error('Failed to fetch matchups')
  }
  return response.json()
}

export async function fetchRecentActivity(): Promise<Activity[]> {
  const response = await fetch(`${API_BASE_URL}/recent-activity`)
  if (!response.ok) {
    throw new Error('Failed to fetch recent activity')
  }
  return response.json()
}