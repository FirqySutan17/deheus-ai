
import React from 'react'

export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Icon({
  name,
  size = 20,
  className = '',
  ...props
}) {
  return (
    <span
      className={cx('material-symbols-outlined ui-icon', className)}
      style={{ fontSize: size }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  )
}

export function Avatar({
  initials = 'DU',
  className = ''
}) {
  return (
    <div className={cx('ui-avatar', className)}>
      {initials}
    </div>
  )
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) {
  return (
    <div className={cx('ui-search', className)}>
      <Icon name="search" size={20} />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <Icon name="close" size={17} />
        </button>
      )}
    </div>
  )
}
