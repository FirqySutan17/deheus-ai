import React from 'react'

const names = {
  Activity: 'monitoring', AlertCircle: 'error_outline', ArrowUpRight: 'north_east', BarChart3: 'bar_chart',
  BookOpen: 'menu_book', Copy: 'content_copy', HelpCircle: 'help_outline', Menu: 'menu', MessageCircle: 'chat_bubble_outline',
  MessageSquare: 'chat_bubble', MoreHorizontal: 'more_horiz', Plus: 'add', Search: 'search', Send: 'send',
  Settings: 'settings', ShieldCheck: 'verified_user', Sparkles: 'auto_awesome', ThumbsDown: 'thumb_down',
  ThumbsUp: 'thumb_up', TrendingUp: 'trending_up', X: 'close',
  Eye: 'visibility',
  EyeOff: 'visibility_off',
  LockKeyhole: 'lock',
  Mail: 'mail',
  ArrowRight: 'arrow_forward',
}

export function makeIcon(componentName) {
  return function Icon({ size = 20, className = '', ...props }) {
    return <span className={`material-symbols-outlined ${className}`} style={{ fontSize: size, lineHeight: 1 }} aria-hidden="true" {...props}>{names[componentName]}</span>
  }
}

export const Activity = makeIcon('Activity')
export const AlertCircle = makeIcon('AlertCircle')
export const ArrowUpRight = makeIcon('ArrowUpRight')
export const BarChart3 = makeIcon('BarChart3')
export const BookOpen = makeIcon('BookOpen')
export const Copy = makeIcon('Copy')
export const HelpCircle = makeIcon('HelpCircle')
export const Menu = makeIcon('Menu')
export const MessageCircle = makeIcon('MessageCircle')
export const MessageSquare = makeIcon('MessageSquare')
export const MoreHorizontal = makeIcon('MoreHorizontal')
export const Plus = makeIcon('Plus')
export const Search = makeIcon('Search')
export const Send = makeIcon('Send')
export const Settings = makeIcon('Settings')
export const ShieldCheck = makeIcon('ShieldCheck')
export const Sparkles = makeIcon('Sparkles')
export const ThumbsDown = makeIcon('ThumbsDown')
export const ThumbsUp = makeIcon('ThumbsUp')
export const TrendingUp = makeIcon('TrendingUp')
export const X = makeIcon('X')
export const Eye = makeIcon('Eye')
export const EyeOff = makeIcon('EyeOff')
export const LockKeyhole = makeIcon('LockKeyhole')
export const Mail = makeIcon('Mail')
export const ArrowRight = makeIcon('ArrowRight')
