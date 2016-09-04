import React, { PropTypes } from 'react'
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

Stream.propTypes = {
  preview: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default Stream
