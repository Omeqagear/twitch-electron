import React, { PropTypes } from 'react'
import styles from './vod.css'

export default function Vod(props) {
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

Vod.propTypes = {
  preview: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.object
}
