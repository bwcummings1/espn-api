import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PointsDistribution = () => {
  const teamScores = useSelector((state: RootState) => state.league.teamScores);

  const options = {
    chart: {
      type: 'histogram',
      background: 'transparent',
    },
    xaxis: {
      categories: ['0-50', '51-100', '101-150', '151-200', '201+'],
    },
    yaxis: {
      title: {
        text: 'Number of Teams',
      },
    },
    colors: ['#38bdf8'],
    title: {
      text: 'Points Distribution',
      align: 'center',
      style: {
        color: '#f1f5f9',
      },
    },
  };

  const series = [{
    name: 'Teams',
    data: calculateDistribution(teamScores),
  }];

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 font-header">Points Distribution</h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

function calculateDistribution(scores: number[]): number[] {
  const distribution = [0, 0, 0, 0, 0];
  scores.forEach(score => {
    if (score <= 50) distribution[0]++;
    else if (score <= 100) distribution[1]++;
    else if (score <= 150) distribution[2]++;
    else if (score <= 200) distribution[3]++;
    else distribution[4]++;
  });
  return distribution;
}

export default PointsDistribution;