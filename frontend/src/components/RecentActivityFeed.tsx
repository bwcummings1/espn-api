'use client';

import { useState, useEffect } from 'react';
import { fetchRecentActivity, Activity, ActivityAction } from '../lib/api';

export default function RecentActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentActivity()
      .then(setActivities)
      .catch(err => {
        console.error('Error fetching recent activity:', err);
        setError('Failed to load recent activity');
      });
  }, []);

  if (error) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">Recent Activity</h2>
        <p className="text-red-400 font-body">{error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-header">Recent Activity</h2>
        <p className="font-body">Loading recent activity...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">Recent Activity</h2>
      <ul className="space-y-2">
        {activities.map((activity: Activity) => (
          <li key={activity.id} className="font-body">
            <p className="text-xs text-slate-400 mb-1">
              {new Date(activity.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            {activity.actions.map((action: ActivityAction, index: number) => (
              <p key={index} className="text-sm">
                {action.team && <span className="font-semibold text-slate-300">{action.team} </span>}
                {action.action}
                {action.player && <span className="font-semibold text-slate-300"> {action.player}</span>}
                {action.bid_amount && <span className="text-slate-300"> (Bid: ${action.bid_amount})</span>}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}