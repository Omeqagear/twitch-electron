import React, { PropTypes } from 'react'
import styles from './header.css'
import AppBar from 'material-ui/AppBar'

export default function Header(props) {
  return (
      <AppBar style={{position: 'fixed',top: 0, display: !props.hide ? 'block' : 'none'}} className={styles.className} showMenuIconButton={false} />
  )
}

Header.propTypes = {
  hide: PropTypes.bool
}
