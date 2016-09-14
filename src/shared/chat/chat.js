import React, { PropTypes } from 'react'
import styles from './chat.css'

export default function Chat(props) {
  return (
    <div className={styles.chat} style={{display: props.show ? 'block' : 'none'}}>
      <webview frameBorder="0"
        style={{position: 'absolute', right: 0, height: props.height || '100%', width: props.width || 350}}
        src={`http://www.twitch.tv/${props.user}/chat`}
      >
      </webview>
    </div>
  )
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  show: PropTypes.bool
}
