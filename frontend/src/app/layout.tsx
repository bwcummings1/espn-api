import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fantasy Football Dashboard',
  description: 'Your personal fantasy football league dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            <div className="grid grid-cols-12 gap-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
