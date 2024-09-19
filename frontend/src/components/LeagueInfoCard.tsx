'use client';

import { useState, useEffect } from 'react';
import { fetchLeagueInfo, LeagueInfo } from '../lib/api';

export default function LeagueInfoCard() {
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeagueInfo()
      .then(data => {
        console.log('Received league info:', data);
        setLeagueInfo(data);
      })
      .catch(err => {
        console.error('Error fetching league info:', err);
        setError('Failed to load league info: ' + err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">League Info</h2>
        <p className="text-red-400 font-body">{error}</p>
      </div>
    );
  }

  if (!leagueInfo) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">League Info</h2>
        <p className="font-body">Loading league info...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">League Info</h2>
      <div className="space-y-2 font-body">
        <p><span className="font-semibold text-slate-300">League Name:</span> {leagueInfo.name}</p>
        <p><span className="font-semibold text-slate-300">Number of Teams:</span> {leagueInfo.num_teams}</p>
        <p><span className="font-semibold text-slate-300">Current Week:</span> {leagueInfo.current_week}</p>
      </div>
    </div>
  );
}