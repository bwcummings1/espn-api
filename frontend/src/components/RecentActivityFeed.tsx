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
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((activity: Activity) => (
          <li key={activity.id} className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-1">
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
                {action.team && <span className="font-semibold">{action.team} </span>}
                {action.action}
                {action.player && <span className="font-semibold"> {action.player}</span>}
                {action.bid_amount && <span> (Bid: ${action.bid_amount})</span>}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}