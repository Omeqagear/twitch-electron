const remote = require('electron').remote

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from './app'
import { goBack, push } from 'react-router-redux'
import keymaster from 'keymaster'
import { actions as streamActions } from '../streams/streams'
import { filter, find } from 'lodash'

class AppContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      streams: null
    }
  }

  componentDidMount () {
    keymaster('backspace', this.back)
    this.pollStreams()
  }

  componentWillUnmount () {
    keymaster.unbind('backspace', this.back)
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
