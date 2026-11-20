
import React, { useEffect, useRef, useState } from 'react'

import {
  Avatar,
  Icon,
  SearchInput,
  cx
} from './ui'

import './Layout.css'

export default function Topbar({
  activePage,
  currentUser,
  onLogout,
  onMenu,
  searchValue = '',
  onSearchChange = () => {}
}) {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  const pageLabels = {
    chat: 'AI Assistant',
    insights: 'Business Insights'
  }

  const displayName = currentUser?.name || 'Demo User'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const notifications = [
    {
      id: 1,
      title: 'Welcome to De Heus Sales Agent',
      description: 'Your demo workspace is ready to use.',
      time: 'Just now',
      unread: true
    }
  ]

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false)
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setNotificationOpen(false)
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const toggleNotification = () => {
    setNotificationOpen((value) => !value)
    setProfileOpen(false)
  }

  const toggleProfile = () => {
    setProfileOpen((value) => !value)
    setNotificationOpen(false)
  }

  return (
    <header className="app-topbar">

      {/* LEFT SECTION */}
      <div className="topbar-left">

        <button
          type="button"
          className="topbar-menu-button"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Icon name="menu" size={23} />
        </button>

        <div className="topbar-breadcrumb">
          <span className="breadcrumb-home">
            Home
          </span>

          <Icon
            name="chevron_right"
            size={17}
            className="breadcrumb-chevron"
          />

          <strong>
            {pageLabels[activePage] || 'AI Assistant'}
          </strong>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="topbar-actions">

        {/* SEARCH */}
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search conversations..."
          className="topbar-search"
        />

        {/* ENVIRONMENT */}
        <div className="topbar-environment">
          <span />
          POC Environment
        </div>

        {/* NOTIFICATIONS */}
        <div
          className="topbar-dropdown-wrapper"
          ref={notificationRef}
        >
          <button
            type="button"
            className={cx(
              'topbar-icon-button',
              notificationOpen && 'dropdown-active'
            )}
            onClick={toggleNotification}
            aria-label="Notifications"
            aria-expanded={notificationOpen}
          >
            <Icon name="notifications_none" size={23} />

            {unreadCount > 0 && (
              <span className="notification-indicator" />
            )}
          </button>

          {notificationOpen && (
            <div className="topbar-dropdown notification-dropdown">

              <div className="dropdown-heading">
                <div>
                  <strong>Notifications</strong>
                  <span>Your latest updates and activities</span>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificationOpen(false)}
                  aria-label="Close notifications"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              {notifications.map((item) => (
                <div
                  className="notification-item"
                  key={item.id}
                >
                  <div className="notification-item-icon">
                    <Icon name="info" size={20} />
                  </div>

                  <div className="notification-item-content">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}

              <div className="dropdown-footer">
                <span>All notifications</span>
              </div>

            </div>
          )}
        </div>

        <div className="topbar-divider" />

        {/* PROFILE */}
        <div
          className="topbar-dropdown-wrapper"
          ref={profileRef}
        >
          <button
            type="button"
            className="topbar-profile-button"
            onClick={toggleProfile}
            aria-expanded={profileOpen}
          >
            <Avatar initials={initials} />

            <span className="topbar-profile-name">
              {displayName}
            </span>

            <Icon
              name="expand_more"
              size={18}
              className={cx(
                'profile-chevron',
                profileOpen && 'rotate'
              )}
            />
          </button>

          {profileOpen && (
            <div className="topbar-dropdown profile-dropdown">

              <div className="profile-dropdown-info">
                <Avatar
                  initials={initials}
                  className="profile-dropdown-avatar"
                />

                <div>
                  <strong>{displayName}</strong>
                  <span>
                    {currentUser?.email || 'demo@deheus.com'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="profile-logout-button"
                onClick={onLogout}
              >
                <Icon name="logout" size={19} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

    </header>
  )
}
