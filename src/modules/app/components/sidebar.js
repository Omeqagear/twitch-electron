import React, { PropTypes } from 'react'
import styles from './sidebar.css'

const matchesPath = (path, url) => {

  if (url == '/' && path.includes('/streams')) {
    return true
  }

  return path == url
}

const links = [
  {
    url: 'back',
    icon: 'arrow_back'
  },
  {
    url: '/search',
    icon: 'search'
  },
  {
    url: '/channels',
    icon: 'favorite'
  },
  {
    url: '/',
    icon: 'videocam'
  },
  {
    url: '/games',
    icon: 'videogame_asset'
  }
]

export default function Sidebar(props) {
  return (
    <div
      className={styles.container}
      style={{display: !props.show ? 'block' : 'none'}}>
      <div id="sidebar" className={styles.className}>
        <nav>
          <ul>
            {links.map((link) => {
              return (
                <li
                  className={matchesPath(props.currentPath, link.url) ? styles.activeClass : ''}
                  key={link.icon}
                  onClick={props.onClick.bind(this, link.url)}>
                  <i className='material-icons'>{link.icon}</i>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired
}
