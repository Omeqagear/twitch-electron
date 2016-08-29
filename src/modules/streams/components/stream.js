import React from 'react'
import styles from './stream.css'

const Stream = (props) => {
	return (
		<div className={styles.className}>
			<img src={props.data.preview.large} />
			<div onClick={props.onClick.bind(this, props.data)}>
				<h3>{props.data.channel.name}</h3>
				<p>{props.data.channel.status}</p>
			</div>
		</div>
	)
}

export default Stream
