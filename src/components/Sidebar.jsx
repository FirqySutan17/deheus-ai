
import React from 'react'

import { Avatar, Icon, cx } from './ui'
import './Layout.css'

const NAV_ITEMS = [
  {
    id: 'chat',
    label: 'Tanya OMNIA',
    icon: 'forum'
  }
]

export default function Sidebar({
  open,
  onClose,
  activePage,
  onNavigate,
  recentChats = [],
  currentUser,
  onLogout,
  searchValue = ''
}) {
  const displayName = currentUser?.name || 'Demo User'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  // FILTER RECENT CHATS
  const filteredChats = recentChats.filter((chat) =>
    (chat.title || '')
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  )

  return (
    <>
      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={cx(
          'app-sidebar',
          open && 'app-sidebar-open'
        )}
      >

        {/* LOGO */}
        <div className="sidebar-logo">
          <img
            src="/logo/de-heus-one-logo-hd.png"
            alt="De Heus"
          />
        </div>

        {/* NEW CHAT */}
        <div className="sidebar-action">
          <button
            type="button"
            className="new-chat-button"
            onClick={() => {
              onNavigate('chat', true)
              onClose()
            }}
          >
            <Icon name="add" size={21} />
            <span>New chat</span>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-navigation">

          <div className="sidebar-section-label">
            WORKSPACE
          </div>

          <div className="sidebar-nav-list">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  onClose()
                }}
                className={cx(
                  'sidebar-nav-item',
                  activePage === item.id && 'active'
                )}
              >
                <Icon
                  name={item.icon}
                  size={25}
                  className="sidebar-nav-icon"
                />

                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* RECENT CHATS */}
          <div className="sidebar-history">

            <div className="sidebar-history-heading">
              <span>RECENT CHATS</span>
              <span className="recent-chat-count">
                {filteredChats.length}
              </span>
            </div>

            <div className="sidebar-history-list">

              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <button
                    type="button"
                    key={chat.id}
                    className="sidebar-history-item"
                    onClick={() => {
                      onNavigate('chat', false, chat.id)
                      onClose()
                    }}
                  >
                    <Icon
                      name="chat_bubble_outline"
                      size={17}
                    />

                    <span>{chat.title}</span>
                  </button>
                ))
              ) : (
                <div className="sidebar-history-empty">
                  {searchValue
                    ? 'No matching conversations'
                    : 'No recent conversations'}
                </div>
              )}

            </div>
          </div>

        </nav>

        {/* USER PROFILE */}
        <div className="sidebar-profile">

          <div className="sidebar-profile-info">

            <Avatar
              initials={initials}
              className="sidebar-avatar"
            />

            <div className="sidebar-profile-text">
              <strong>{displayName}</strong>

              <span>
                {currentUser?.role || 'Sales Agent User'}
              </span>
            </div>

          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={onLogout}
            title="Logout"
            aria-label="Logout"
          >
            <Icon name="logout" size={22} />
          </button>

        </div>

      </aside>
    </>
  )
}
