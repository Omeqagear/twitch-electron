const remote = require('electron').remote

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from './app'
import { goBack, push } from 'react-router-redux'
import { actions as streamActions } from '../streams/streams'
import { filter, find } from 'lodash'
import KeyBinding from 'react-keybinding-component'

class AppContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      streams: null
    }
  }

  componentDidMount () {
    setTimeout(this.pollStreams, 60000)
  }

  onKeyDown = (e) => {
    if (e.target.tagName == 'WEBVIEW') {
      return
    }
    
    switch(e.keyCode) {
      case 8:
        this.back()
        break;
    }
  }

  onMinimize = () => {
    let window = remote.getCurrentWindow()
    window.minimize()
  }

  onMaximise () {
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  notify = (title, body, icon, url) => {
    let notification = new Notification(title, {body, icon})
    notification.onclick = () => {
      this.props.dispatch(push(url))
    }
    return notification
  }

  pollStreams = () => {

    this.props.dispatch(streamActions.getStreams()).then((streams) => {

      if (this.state.streams !== null) {
        const diff = filter(streams, (stream) => !find(this.state.streams, {_id: stream._id}))
        diff.forEach((stream) => {
            this.notify(`${stream.channel.name} has started streaming!`, stream.channel.status, stream.preview.small, 'play/' + stream.channel.name)
        })
      }

      this.setState({streams})
    })

    setTimeout(this.pollStreams, 60000)
  }

  onClose = () => {
    window.close()
  }

  back = () => {
    this.props.dispatch(goBack())
  }

  navigate = (url) => {

    if (url == 'back') {
      this.props.dispatch(goBack())
      return
    }

    this.props.dispatch(push(url))
  }

  render () {
    return (
      <div>
        <KeyBinding onKey={this.onKeyDown} />
        <App
          onNavigate={this.navigate}
          currentPath={this.props.location.pathname}
          hideUi={this.props.app.hideUi}
          children={this.props.children}
          doubleClick={this.onMaximise}
          onClose={this.onClose}
          onMinimize={this.onMinimize}
          onMaximise={this.onMaximise}
        />
      </div>
    )
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func,
  app: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(AppContainer)
