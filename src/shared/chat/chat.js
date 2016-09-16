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
      <div className={styles.chat} style={{height: this.props.height, width: this.props.width, display: this.props.show ? 'block' : 'none'}}>
        <webview
          frameBorder="0"
          ref={this.onRef}
          style={{position: 'absolute', right: 0, bottom: 0, height: '100%', width: '100%'}}
          src={`http://www.twitch.tv/${this.props.user}/chat`}>
        </webview>
      </div>
    )
  }
}

Chat.defaultProps = {
  width: 350,
  height: '100%'
}

Chat.propTypes = {
  onNewWindow: PropTypes.func,
  user: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  show: PropTypes.bool
}
