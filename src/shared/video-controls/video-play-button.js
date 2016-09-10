import React, { PropTypes } from 'react'
import styles from './video-play-button.css'

export default function VideoPlayButton ({playing, onClick}) {
  return (
      <div className={styles.button} onClick={onClick}>
        <i style={{width: 24}} className='material-icons'>{playing ? 'pause_arrow' : 'play_arrow'}</i>
      </div>
  )
}

VideoPlayButton.propTypes = {
  playing: PropTypes.bool,
  onClick: PropTypes.func
}
