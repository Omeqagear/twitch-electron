import React, { PropTypes } from 'react'
import styles from './window-menu.css'

const iconStyle = {
  width: '20px',
  height: '20px'
}

export default function WindowMenu(props) {
  return (
    <nav
      className={props.show ? styles.windowMenu : styles.windowMenuHidden}
      onDoubleClick={props.onMaximise}>
      <ul>
        <li onClick={props.onMinimize}>
          <svg style={iconStyle} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M20,14H4V10H20" />
          </svg>
        </li>
        <li onClick={props.onMaximise}>
          <svg style={iconStyle} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M4,4H20V20H4V4M6,8V18H18V8H6Z" />
          </svg>
        </li>
        <li onClick={props.onClose}>
          <svg style={iconStyle} viewBox="0 0 24 24">
            <path fill="#ffffff" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
          </svg>
        </li>
      </ul>
    </nav>
  )
}

WindowMenu.propTypes = {
    show: PropTypes.bool,
    onMaximise: PropTypes.func,
    onMinimize: PropTypes.func,
    onClose: PropTypes.func
}
