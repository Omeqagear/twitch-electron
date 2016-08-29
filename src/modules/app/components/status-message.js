import React from 'react'

import styles from './status-message.css'

const StatusMessage = (props) => {
	return (
		<p className={styles.className}>{props.message}</p>
	)
}

export default StatusMessage
