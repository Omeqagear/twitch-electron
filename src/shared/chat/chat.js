import React, { PropTypes, Component } from 'react'
import styles from './chat.css'

export default class Chat extends Component {

  constructor (props) {
    super(props)
  }

  onRef = (_webview) => {
    if (_webview) {
      this.webview = _webview
      this.webview.addEventListener('new-window', this.props.onNewWindow)
    }
  }

  componentWillUnmount () {
    if (this.webview) {
      this.webview.removeEventListener('new-window', this.props.onNewWindow)
    }
  }

  render () {
    return (
      <div className={styles.chat} style={{display: this.props.show ? 'block' : 'none'}}>
        <webview
          frameBorder="0"
          ref={this.onRef}
          style={{position: 'absolute', right: 0, height: this.props.height || '100%', width: this.props.width || 350}}
          src={`http://www.twitch.tv/${this.props.user}/chat`}>
        </webview>
      </div>
    )
  }
}

Chat.propTypes = {
  onNewWindow: PropTypes.func,
  user: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  show: PropTypes.bool
}
