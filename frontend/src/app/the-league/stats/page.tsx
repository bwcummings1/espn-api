'use client';  // Add this line at the top

import React from 'react';
import dynamic from 'next/dynamic';

// Import components (to be created)
import LeagueOverview from '@/components/LeagueOverview';
import TopPerformers from '@/components/TopPerformers';
import PointsDistribution from '@/components/PointsDistribution';
import TeamComparison from '@/components/TeamComparison';

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), { ssr: false });

export default function LeagueStats() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center font-header">League Statistics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-body">Error loading league overview</div>}>
            <LeagueOverview />
          </ErrorBoundary>
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-body">Error loading top performers</div>}>
            <TopPerformers />
          </ErrorBoundary>
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-body">Error loading team comparison</div>}>
            <TeamComparison />
          </ErrorBoundary>
        </div>
        <div className="space-y-6">
          <ErrorBoundary fallback={<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-body">Error loading points distribution</div>}>
            <PointsDistribution />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
