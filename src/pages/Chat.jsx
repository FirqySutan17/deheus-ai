
import React, { useEffect, useMemo, useState } from 'react'

import {
  Icon,
  Avatar
} from '../components/ui'

import './Chat.css'

const SUGGESTIONS = [
  {
    icon: 'receipt_long',
    title: 'Customer Aging',
    description: 'Show me customers with overdue invoices.',
    prompt: 'Show me the customer aging report.'
  },
  {
    icon: 'trending_up',
    title: 'Sales Performance',
    description: 'Analyze sales performance by business unit.',
    prompt: 'Show me the latest sales performance.'
  },
  {
    icon: 'groups',
    title: 'Customer Overview',
    description: 'Give me an overview of our customers.',
    prompt: 'Give me an overview of our customers.'
  },
  {
    icon: 'payments',
    title: 'Outstanding Invoices',
    description: 'Find invoices that are still outstanding.',
    prompt: 'Show me outstanding customer invoices.'
  }
]

const DEMO_RESPONSE = {
  intro: 'Here is a sample overview based on the demo customer aging dataset. The figures below are illustrative and are not connected to the live business database.',
  metrics: [
    {
      label: 'Total Outstanding',
      value: 'IDR 12.85B'
    },
    {
      label: 'Overdue Amount',
      value: 'IDR 4.25B'
    },
    {
      label: 'Overdue Customers',
      value: '28'
    }
  ],
  rows: [
    {
      customer: 'PT Sumber Rejeki',
      business: 'Poultry',
      amount: 'IDR 850M',
      aging: '61–90 days',
      status: 'High'
    },
    {
      customer: 'CV Berkah Ternak',
      business: 'Poultry',
      amount: 'IDR 425M',
      aging: '31–60 days',
      status: 'Medium'
    },
    {
      customer: 'PT Mina Sejahtera',
      business: 'Aqua',
      amount: 'IDR 280M',
      aging: '1–30 days',
      status: 'Low'
    }
  ]
}

function Welcome({ onPrompt }) {
  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 18
        ? 'Good afternoon'
        : 'Good evening'

  return (
    <div className="chat-welcome">

      <div className="chat-welcome-icon">
        <Icon name="auto_awesome" size={27} />
      </div>

      <div className="chat-eyebrow">
        DE HEUS SALES INTELLIGENCE
      </div>

      <h1>
        {greeting}, welcome to Sales Agent.
      </h1>

      <p className="chat-welcome-description">
        Your business data, one conversation away.
        <br />
        What would you like to explore today?
      </p>

      <div className="chat-suggestion-grid">

        {SUGGESTIONS.map((item) => (
          <button
            type="button"
            key={item.title}
            className="chat-suggestion-card"
            onClick={() => onPrompt(item.prompt)}
          >
            <span className="chat-suggestion-icon">
              <Icon name={item.icon} size={21} />
            </span>

            <span className="chat-suggestion-content">
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>

            <Icon
              name="north_east"
              size={17}
              className="chat-suggestion-arrow"
            />
          </button>
        ))}

      </div>

      <div className="chat-welcome-note">
        <Icon name="verified_user" size={16} />
        Answers are based on approved De Heus business data and your access permissions.
      </div>

    </div>
  )
}

function UserMessage({ message }) {
  return (
    <div className="chat-user-message">
      <div className="chat-user-bubble">
        {message}
      </div>

      <Avatar
        initials="DU"
        className="chat-user-avatar"
      />
    </div>
  )
}

function AssistantMessage() {
  return (
    <div className="chat-assistant-message">

      <div className="chat-assistant-avatar">
        <Icon name="auto_awesome" size={18} />
      </div>

      <div className="chat-assistant-body">

        <div className="chat-assistant-heading">
          <strong>Sales Agent</strong>
          <span>Just now</span>
        </div>

        <p className="chat-response-intro">
          {DEMO_RESPONSE.intro}
        </p>

        <div className="chat-metric-grid">

          {DEMO_RESPONSE.metrics.map((metric) => (
            <div
              className="chat-metric-card"
              key={metric.label}
            >
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}

        </div>

        <div className="chat-table-container">

          <table className="chat-data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Business Unit</th>
                <th>Outstanding</th>
                <th>Aging</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {DEMO_RESPONSE.rows.map((row) => (
                <tr key={row.customer}>
                  <td className="chat-customer-name">
                    {row.customer}
                  </td>

                  <td>{row.business}</td>
                  <td>{row.amount}</td>
                  <td>{row.aging}</td>

                  <td>
                    <span
                      className={`chat-risk-badge ${row.status.toLowerCase()}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className="chat-source-note">
          <Icon name="description" size={16} />
          <span>
            Source: Demo customer aging dataset · Illustrative data
          </span>
        </div>

        <div className="chat-response-actions">

          <button type="button" title="Copy response">
            <Icon name="content_copy" size={16} />
            Copy
          </button>

          <button type="button" title="Helpful">
            <Icon name="thumb_up" size={16} />
          </button>

          <button type="button" title="Not helpful">
            <Icon name="thumb_down" size={16} />
          </button>

        </div>

      </div>

    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="chat-typing">
      <div className="chat-assistant-avatar">
        <Icon name="auto_awesome" size={18} />
      </div>

      <div className="chat-typing-content">
        <span />
        <span />
        <span />
        <small>Sales Agent is thinking...</small>
      </div>
    </div>
  )
}

function ChatComposer({
  value,
  onChange,
  onSend,
  loading
}) {
  return (
    <div className="chat-composer-area">

      <form
        className="chat-composer"
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
      >

        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault()
              onSend()
            }
          }}
          placeholder="Ask anything about your customers, sales, or invoices..."
          rows={2}
          disabled={loading}
        />

        <div className="chat-composer-footer">

          <div className="chat-composer-hint">
            <span>Enter</span> to send
            <span className="composer-hint-divider">·</span>
            Shift + Enter for new line
          </div>

          <button
            type="submit"
            className="chat-send-button"
            disabled={!value.trim() || loading}
            aria-label="Send message"
          >
            <Icon name="send" size={18} />
          </button>

        </div>

      </form>

      <p className="chat-disclaimer">
        AI-generated responses may contain errors. Please verify important business information against the source data.
      </p>

    </div>
  )
}

export default function Chat({
  recentChats = [],
  setRecentChats,
  searchValue = '',
  selectedChatId = null,
  currentUser
}) {
  const [input, setInput] = useState('')
  const [activeChatId, setActiveChatId] = useState(null)
  const [loading, setLoading] = useState(false)

  const activeChat = useMemo(
    () => recentChats.find((chat) => chat.id === activeChatId),
    [recentChats, activeChatId]
  )

  const messages = activeChat?.messages || []

  const filteredChats = useMemo(() => {
    if (!searchValue.trim()) return recentChats

    return recentChats.filter((chat) =>
      chat.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [recentChats, searchValue])

  useEffect(() => {
    if (selectedChatId) {
      setActiveChatId(selectedChatId)
    }
  }, [selectedChatId])

  useEffect(() => {
    const handleNewChat = () => {
      setActiveChatId(null)
      setInput('')
      setLoading(false)
    }

    window.addEventListener(
      'sales-agent:new-chat',
      handleNewChat
    )

    return () => {
      window.removeEventListener(
        'sales-agent:new-chat',
        handleNewChat
      )
    }
  }, [])

  const updateConversation = (chatId, updater) => {
    setRecentChats?.((previous) =>
      previous.map((chat) =>
        chat.id === chatId
          ? updater(chat)
          : chat
      )
    )
  }

  const sendMessage = (text = input) => {
    const question = text.trim()

    if (!question || loading || !setRecentChats) return

    const now = Date.now()

    let conversationId = activeChatId

    if (!conversationId) {
      conversationId = now

      const newConversation = {
        id: conversationId,
        title: question.length > 42
          ? `${question.slice(0, 42)}...`
          : question,
        createdAt: now,
        messages: []
      }

      setRecentChats((previous) => [
        newConversation,
        ...previous
      ])

      setActiveChatId(conversationId)
    }

    const userMessage = {
      id: now,
      role: 'user',
      content: question
    }

    updateConversation(
      conversationId,
      (chat) => ({
        ...chat,
        messages: [
          ...(chat.messages || []),
          userMessage
        ],
        updatedAt: now
      })
    )

    setInput('')
    setLoading(true)

    // Dummy response simulation.
    window.setTimeout(() => {
      updateConversation(
        conversationId,
        (chat) => ({
          ...chat,
          messages: [
            ...(chat.messages || []),
            {
              id: Date.now(),
              role: 'assistant',
              content: 'demo-response'
            }
          ],
          updatedAt: Date.now()
        })
      )

      setLoading(false)
    }, 1000)
  }

  const visibleChats = filteredChats

  return (
    <div className="chat-page">

      <div className="chat-conversation-area">

        {messages.length === 0 ? (
          <Welcome onPrompt={sendMessage} />
        ) : (
          <div className="chat-conversation">

            <div className="chat-date-divider">
              <span>Today</span>
            </div>

            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'user' ? (
                  <UserMessage
                    message={message.content}
                  />
                ) : (
                  <AssistantMessage />
                )}
              </div>
            ))}

            {loading && <TypingIndicator />}

          </div>
        )}

      </div>

      <ChatComposer
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        loading={loading}
      />

    </div>
  )
}
