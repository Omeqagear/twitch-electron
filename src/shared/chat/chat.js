import React, { PropTypes } from 'react'

const Chat = (props) => {
  return (
    <iframe frameBorder="0"
      scrolling="no"
      style={{position: 'absolute', right: 0}}
      id="chat_embed"
      src={`http://www.twitch.tv/${props.user}/chat`}
      height={props.height || '100%'}
      width={props.width || '300px'}
    >
    </iframe>
  )
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Chat
