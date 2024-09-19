'use client';  // Add this line at the top

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store'; // Assuming you have set up Redux store
import { setLeagueInfo } from '@/store/leagueSlice';
import { fetchLeagueInfo } from '@/lib/api';

const LeagueOverview = () => {
  const dispatch = useDispatch();
  const leagueInfo = useSelector((state: RootState) => state.league.info);
  const [isLoading, setIsLoading] = useState(false);

  const getLeagueInfo = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const data = await fetchLeagueInfo(forceRefresh);
      dispatch(setLeagueInfo(data));
    } catch (error) {
      console.error('Failed to fetch league info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeagueInfo();
  }, [dispatch]);

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">League Overview</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-400">League Name</p>
            <p className="text-lg font-semibold">{leagueInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Teams</p>
            <p className="text-lg font-semibold">{leagueInfo.num_teams}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Current Week</p>
            <p className="text-lg font-semibold">{leagueInfo.current_week}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Season</p>
            <p className="text-lg font-semibold">{leagueInfo.year}</p>
          </div>
        </div>
      )}
      <button 
        onClick={() => getLeagueInfo(true)} 
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default LeagueOverview;