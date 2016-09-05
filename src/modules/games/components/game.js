import React, { PropTypes } from 'react'
import format from 'format-number'
import styles from './game.css'

export default function Game(props) {
  return (
    <div
      onClick={props.onClick.bind(this, props.data.game)}
      className={styles.className}>
      <img className={styles.bg} src={props.data.game.box.large} />
      <p className={styles.title}>{props.data.game.name}</p>
      <div className={styles.bottom}>
        <div className={styles.viewers}>
          <i className='material-icons'>person</i>
          <span>{format(props.data.viewers)}</span>
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}
