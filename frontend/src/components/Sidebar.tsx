import Link from 'next/link'

const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li className="mb-4">
          <Link href="/" className="text-xl font-bold">Home</Link>
        </li>
        <li className="mb-4">
          <span className="text-xl font-bold">The League</span>
          <ul className="ml-4 mt-2">
            <li><Link href="/the-league">Overview</Link></li>
            <li><Link href="/the-league/standings">Standings</Link></li>
            <li><Link href="/the-league/schedule">Schedule</Link></li>
          </ul>
        </li>
        <li className="mb-4">
          <span className="text-xl font-bold">My Team</span>
          <ul className="ml-4 mt-2">
            <li><Link href="/my-team">Dashboard</Link></li>
            <li><Link href="/my-team/roster">Roster</Link></li>
            <li><Link href="/my-team/matchups">Matchups</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar