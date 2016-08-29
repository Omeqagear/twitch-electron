import React, { Component } from 'react'
import WindowMenu from './window-menu'
import StatusMessage from './status-message'

import styles from './header.css'

const Header = (props) => {
	return (
		<header style={{display: !props.show ? 'block' : 'none'}} className={styles.className} onDoubleClick={props.doubleClick}>
		</header>
	)
}

export default Header
