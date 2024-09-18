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
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">League Standings</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="bg-slate-800 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">League Standings</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">League Standings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-800">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-center">W</th>
              <th className="px-4 py-2 text-center">L</th>
              <th className="px-4 py-2 text-center">T</th>
              <th className="px-4 py-2 text-center">PF</th>
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, 12).map((team: Standing) => (
              <tr key={team.id} className="border-b">
                <td className="px-4 py-2">{team.rank}</td>
                <td className="px-4 py-2">{team.name}</td>
                <td className="px-4 py-2 text-center">{team.wins}</td>
                <td className="px-4 py-2 text-center">{team.losses}</td>
                <td className="px-4 py-2 text-center">{team.ties}</td>
                <td className="px-4 py-2 text-center">{team.points_for.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}