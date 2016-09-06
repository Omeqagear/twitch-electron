import React, { PropTypes } from 'react'
import styles from './channel.css'

export default function Channel(props) {
  return (
    <div onClick={props.onClick.bind(this, props.data)} className={styles.className}>
      <div className={styles.bgWrapper}>
        <img className={styles.bg} src={props.data.video_banner} />
      </div>
      <p className={styles.title}>{props.data.name}</p>
    </div>
  )
}

Channel.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object
}
