import React, { PropTypes } from 'react'
import NumberFormat from 'react-number-format'
import styles from './game.css'

const Game = (props) => {
  return (
    <div onClick={props.onClick.bind(this, props.data)} className={styles.className}>
      <img className={styles.bg} src={props.data.game.box.large} />
      <p className={styles.title}>{props.data.game.name}</p>
      <div className={styles.bottom}>
        <div className={styles.viewers}>
          <i className='material-icons'>person</i>
          <NumberFormat value={props.data.viewers} displayType={'text'} thousandSeperator={true} />
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default Game
