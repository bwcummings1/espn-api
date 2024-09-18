'use client';

import { useState, useEffect } from 'react';
import { fetchLeagueInfo, LeagueInfo } from '../lib/api';

export default function LeagueInfoCard() {
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeagueInfo()
      .then(setLeagueInfo)
      .catch(err => {
        console.error('Error fetching league info:', err);
        setError('Failed to load league info');
      });
  }, []);

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">League Info</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!leagueInfo) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">League Info</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">League Info</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">League Name:</span> {leagueInfo.name}</p>
        <p><span className="font-semibold">Number of Teams:</span> {leagueInfo.num_teams}</p>
        <p><span className="font-semibold">Current Week:</span> {leagueInfo.current_week}</p>
      </div>
    </div>
  );
}