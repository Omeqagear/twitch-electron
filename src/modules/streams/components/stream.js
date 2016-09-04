import React, { PropTypes } from 'react'
import styles from './stream.css'

const Stream = (props) => {

  const getExcerpt = (str, len, end) => {
    if (str.length <= len) {
      return str
    }
    return str.substr(0, len) + end
  }

  return (
    <div className={styles.className} onClick={props.onClick.bind(this, props.data)}>
      <img className={styles.bg} src={props.data.preview.large} />
      <div className={styles.top}>
        <h3 className={styles.title}>{`${props.data.channel.name.toUpperCase()}: ${props.data.channel.status}`}</h3>
      </div>
      <div className={styles.bottom}>
        <div className={styles.viewers}>
          <i className='material-icons'>person</i>
          <span>{props.data.viewers}</span>
        </div>
        <div className={styles.game}>
          <i className='material-icons'>videogame_asset</i>
          <span>{props.data.game}</span>
        </div>
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
