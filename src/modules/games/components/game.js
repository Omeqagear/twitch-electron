import React, { PropTypes } from 'react'
import styles from './game.css'

const Game = (props) => {
  return (
    <div onClick={props.onClick.bind(this, props.data)} className={styles.className}>
      <img className={styles.bg} src={props.data.game.box.large} />
      <p className={styles.title}>{props.data.game.name}</p>
      <p className={styles.viewers}>{props.data.viewers}</p>
    </div>
  )
}

Game.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default Game
