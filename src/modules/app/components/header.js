import React from 'react'
import styles from './header.css'
import AppBar from 'material-ui/AppBar'

export default function Header() {
  return (
      <AppBar className={styles.className} showMenuIconButton={false} />
  )
}

Header.propTypes = {
}
