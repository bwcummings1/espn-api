import LeagueInfoCard from '@/components/LeagueInfoCard'
import StandingsPreview from '@/components/StandingsPreview'
import RecentActivityFeed from '@/components/RecentActivityFeed'

export default function LeagueOverview() {
  return (
    <>
      <div className="col-span-8">
        <h1 className="text-2xl font-bold mb-4 font-header">League Overview</h1>
      </div>
      <div className="col-span-8">
        <LeagueInfoCard />
      </div>
      <div className="col-span-8 row-auto">
        <StandingsPreview />
      </div>
      <div className="col-span-4 row-">
        <RecentActivityFeed />
      </div>
    </>
  )
}