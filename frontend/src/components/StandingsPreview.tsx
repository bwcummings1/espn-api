'use client';

import { useState, useEffect } from 'react';
import { fetchStandings, Standing } from '../lib/api';

export default function StandingsPreview() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStandings()
      .then(setStandings)
      .catch(err => {
        console.error('Error fetching standings:', err);
        setError('Failed to load standings');
      });
  }, []);

  if (error) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">League Standings</h2>
        <p className="text-red-400 font-body">{error}</p>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">League Standings</h2>
        <p className="font-body">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">League Standings</h2>
      <table className="w-full">
        <thead>
          <tr className="font-header text-slate-300">
            <th className="text-left">Rank</th>
            <th className="text-left">Team</th>
            <th className="text-left">Record</th>
            <th className="text-left">Points For</th>
          </tr>
        </thead>
        <tbody className="font-body">
          {standings.map((team) => (
            <tr key={team.id}>
              <td>{team.rank}</td>
              <td>{team.name}</td>
              <td>{`${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`}</td>
              <td>{team.points_for.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}