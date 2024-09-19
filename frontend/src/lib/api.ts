import axios from 'axios';
import { setCache, getCache, clearCache } from '@/utils/cache';

const LEAGUE_ID = 95050;
const BASE_URL = 'http://localhost:5000/api';  // Adjust this to your backend URL

export const fetchLeagueInfo = async (forceRefresh = false) => {
  const cacheKey = `league_info_${LEAGUE_ID}`;
  if (!forceRefresh) {
    const cachedData = getCache<any>(cacheKey);
    if (cachedData) return cachedData;
  }

  const response = await axios.get(`${BASE_URL}/league-info/${LEAGUE_ID}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export const fetchTeams = async (forceRefresh = false) => {
  const cacheKey = `teams_${LEAGUE_ID}`;
  if (!forceRefresh) {
    const cachedData = getCache<any>(cacheKey);
    if (cachedData) return cachedData;
  }

  const response = await axios.get(`${BASE_URL}/teams/${LEAGUE_ID}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export const fetchTopPerformers = async (forceRefresh = false) => {
  const cacheKey = `top_performers_${LEAGUE_ID}`;
  if (!forceRefresh) {
    const cachedData = getCache<any>(cacheKey);
    if (cachedData) return cachedData;
  }

  const response = await axios.get(`${BASE_URL}/top-performers/${LEAGUE_ID}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export const fetchTeamScores = async (forceRefresh = false) => {
  const cacheKey = `team_scores_${LEAGUE_ID}`;
  if (!forceRefresh) {
    const cachedData = getCache<any>(cacheKey);
    if (cachedData) return cachedData;
  }

  const response = await axios.get(`${BASE_URL}/team-scores/${LEAGUE_ID}`);
  setCache(cacheKey, response.data);
  return response.data;
};

export const refreshAllData = async () => {
  await fetchLeagueInfo(true);
  await fetchTeams(true);
  await fetchTopPerformers(true);
  await fetchTeamScores(true);
};