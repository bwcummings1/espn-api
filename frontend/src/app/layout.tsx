'use client';  // Add this line at the top

import './globals.css'
import Sidebar from '../components/Sidebar'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/pkh6fph.css" />
      </head>
      <body>
        <Provider store={store}>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4 overflow-auto">
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
