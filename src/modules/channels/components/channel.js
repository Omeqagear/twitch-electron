import React, { PropTypes } from 'react'
import styles from './channel.css'

const Channel = (props) => {
  return (
    <div onClick={props.onClick.bind(this, props.data)} className={styles.className}>
      <img className={styles.bg} src={props.data.video_banner} />
      <p className={styles.title}>{props.data.name}</p>
    </div>
  )
}

Channel.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object
}

export default Channel
