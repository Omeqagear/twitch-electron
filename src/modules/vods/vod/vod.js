import React from 'react'

import styles from './vod.css'

const Vod = (props) => {
	return (
		<div className={styles.className}>
			<img src={props.data.preview} />
			<div onClick={props.onClick.bind(this, props.data)}>
				<h3>{props.data.channel.name}</h3>
				<p>{props.data.title}</p>
			</div>
		</div>
	)
}

export default Vod
