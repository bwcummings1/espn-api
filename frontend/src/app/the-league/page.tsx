import LeagueInfoCard from '@/components/LeagueInfoCard'
import StandingsPreview from '@/components/StandingsPreview'
import RecentActivityFeed from '@/components/RecentActivityFeed'

export default function LeagueOverview() {
  return (
    <>
      <div className="col-span-12">
        <h1 className="text-2xl font-bold mb-4">League Overview</h1>
      </div>
      <div className="col-span-4">
        <LeagueInfoCard />
      </div>
      <div className="col-span-8">
        <StandingsPreview />
      </div>
      <div className="col-span-12">
        <RecentActivityFeed />
      </div>
    </>
  )
}