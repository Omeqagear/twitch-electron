import React from 'react'
import styles from './channel.css'

const Channel = (props) => {
	return (
		<div onClick={props.onChannelClick.bind(this, props.data)} className={styles.className}>
			<img src={props.data.logo} />
			<p>{props.data.name}</p>
		</div>
	)
}

export default Channel
