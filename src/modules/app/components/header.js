import React, { PropTypes } from 'react'

import styles from './header.css'

const Header = (props) => {
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

export default Header
