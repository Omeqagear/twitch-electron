import React, { PropTypes } from 'react'
import styles from './stream.css'

const zDepth = [
  'none',
  '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
  '0 12px 15px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'
]

export default function Stream(props) {
  return (
    <div style={{boxShadow: zDepth[1]}} className={styles.className} onClick={props.onClick.bind(this, props.data)}>
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
