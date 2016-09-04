import React, { PropTypes } from 'react'
import styles from './channel.css'

const Channel = (props) => {
  return (
    <div onClick={props.onChannelClick.bind(this, props.data)} className={styles.className}>
      <img src={props.data.logo} />
      <p>{props.data.name}</p>
    </div>
  )
}

Channel.propTypes = {
  onChannelClick: PropTypes.func,
  data: PropTypes.object
}

export default Channel
