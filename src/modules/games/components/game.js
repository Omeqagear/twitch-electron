import React, { PropTypes } from 'react'
import styles from './game.css'

const Game = (props) => {
  return (
    <div onClick={props.onClick.bind(this, props.data)} className={styles.className}>
      <img src={props.data.box.large} />
      <p>{props.data.name}</p>
    </div>
  )
}

Game.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default Game
