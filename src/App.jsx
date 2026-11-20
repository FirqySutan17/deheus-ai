
import React, { useState } from 'react'

import Login from './pages/Login'
import Chat from './pages/Chat'
import Insights from './pages/Insights'
import Layout from './components/Layout'

export default function App() {
  // AUTHENTICATION
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // NAVIGATION
  const [activePage, setActivePage] = useState('chat')
  const [selectedChatId, setSelectedChatId] = useState(null)

  // CHAT DATA
  const [recentChats, setRecentChats] = useState([])

  // SEARCH
  const [searchValue, setSearchValue] = useState('')

  const handleLogin = (user) => {
    setCurrentUser({
      ...user,
      role: 'Sales Agent User'
    })

    setAuthenticated(true)
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setCurrentUser(null)
    setActivePage('chat')
    setSelectedChatId(null)
    setRecentChats([])
  }

  const handleNavigate = (
    page,
    newChat = false,
    chatId = null
  ) => {
    setActivePage(page)

    if (newChat) {
      setSelectedChatId(null)
      setSearchValue('')
      window.dispatchEvent(
        new Event('sales-agent:new-chat')
      )
      return
    }

    if (chatId) {
      setSelectedChatId(chatId)
    }
  }

  if (!authenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Layout
      activePage={activePage}
      onNavigate={handleNavigate}
      recentChats={recentChats}
      currentUser={currentUser}
      onLogout={handleLogout}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    >
      {activePage === 'chat' ? (
        <Chat
          recentChats={recentChats}
          setRecentChats={setRecentChats}
          selectedChatId={selectedChatId}
          searchValue={searchValue}
          currentUser={currentUser}
        />
      ) : (
        <Insights />
      )}
    </Layout>
  )
}
