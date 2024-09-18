import React from 'react';
import dynamic from 'next/dynamic';
import StandingsPreview from '../components/StandingsPreview';
import LeagueInfoCard from '../components/LeagueInfoCard';
import RecentActivityFeed from '../components/RecentActivityFeed';

const ErrorBoundary = dynamic(() => import('../components/ErrorBoundary'), { ssr: false });

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Fantasy Football Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error loading standings</div>}>
            <StandingsPreview />
          </ErrorBoundary>
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error loading recent activity</div>}>
            <RecentActivityFeed />
          </ErrorBoundary>
        </div>
        <div className="space-y-6">
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error loading league info</div>}>
            <LeagueInfoCard />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
