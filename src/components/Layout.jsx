
import React, { useEffect, useState } from 'react'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

import './Layout.css'

export default function Layout({
  children,
  activePage = 'chat',
  onNavigate,
  recentChats = [],
  currentUser,
  onLogout,
  searchValue,
  onSearchChange
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [activePage])

  return (
    <div className="app-layout">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onNavigate={onNavigate}
        recentChats={recentChats}
        currentUser={currentUser}
        onLogout={onLogout}
        searchValue={searchValue}
        />

      <div className="app-main">

        <Topbar
          activePage={activePage}
          currentUser={currentUser}
          onLogout={onLogout}
          onMenu={() => setSidebarOpen(true)}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />

        <main className="app-content">
          <div className="app-content-inner">
            {children}
          </div>
        </main>

      </div>

    </div>
  )
}
