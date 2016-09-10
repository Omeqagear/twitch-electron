import React, { PropTypes } from 'react'

export default function Chat(props) {
  return (
    <webview frameBorder="0"
      style={{position: 'absolute', right: 0, height: props.height || '100%', width: props.width || 300}}
      src={`http://www.twitch.tv/${props.user}/chat`}
      allowpopups={true}
    >
    </webview>
  )
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
}
