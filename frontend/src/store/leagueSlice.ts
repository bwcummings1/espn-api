import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopPerformer {
  name: string;
  position: string;
  team: string;
  points: number;
  week: number;
}

interface Team {
  id: number;
  name: string;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  streak: string;
}

interface LeagueState {
  info: {
    name: string;
    num_teams: number;
    current_week: number;
    year: number;
  };
  topPerformers: TopPerformer[];
  teamScores: number[];
  teams: Team[];
}

const initialState: LeagueState = {
  info: {
    name: '',
    num_teams: 0,
    current_week: 0,
    year: 0,
  },
  topPerformers: [],
  teamScores: [],
  teams: [],
};

const leagueSlice = createSlice({
  name: 'league',
  initialState,
  reducers: {
    setLeagueInfo: (state, action: PayloadAction<LeagueState['info']>) => {
      state.info = action.payload;
    },
    setTopPerformers: (state, action: PayloadAction<TopPerformer[]>) => {
      state.topPerformers = action.payload;
    },
    setTeamScores: (state, action: PayloadAction<number[]>) => {
      state.teamScores = action.payload;
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
  },
});

export const { setLeagueInfo, setTopPerformers, setTeamScores, setTeams } = leagueSlice.actions;
export default leagueSlice.reducer;