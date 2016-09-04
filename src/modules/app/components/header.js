import React, { PropTypes } from 'react'
import styles from './header.css'

export default function Header(props) {
  return (
    <header style={{display: !props.show ? 'block' : 'none'}} className={styles.className} onDoubleClick={props.doubleClick}>
      {props.children}
    </header>
  )
}

Header.propTypes = {
  show: PropTypes.bool,
  doubleClick: PropTypes.func,
  children: PropTypes.object
}
