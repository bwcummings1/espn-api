import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TopPerformers = () => {
  const topPerformers = useSelector((state: RootState) => state.league.topPerformers);

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">Top Performers</h2>
      <div className="space-y-4">
        {topPerformers.map((player, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{player.name}</p>
              <p className="text-sm text-slate-400">{player.position} - {player.team}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{player.points} pts</p>
              <p className="text-sm text-slate-400">Week {player.week}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;