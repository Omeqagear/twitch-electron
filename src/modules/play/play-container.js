import React, { Component, PropTypes } from 'react'
import Loader from '../../shared/loader/loader'
import { connect } from 'react-redux'
import { goBack, push } from 'react-router-redux'
import Play, { actions } from './play'
import { actions as streamActions } from '../streams/streams'
import { actions as appActions } from '../app/app'
import KeyBinding from 'react-keybinding-component'
const {shell} = require('electron')

class PlayContainer extends Component {

  constructor (props) {
    super(props)
  }

  fetchUrl = () => {
    const { user, video } = this.props.params
    this.props.dispatch(actions.clearUrl())
    this.props.dispatch(actions.getUrl(user, video))
  }

  componentDidMount () {
    this.fetchUrl()
    this.props.dispatch(appActions.hideUi(true))
  }

  componentWillUnmount () {
    this.props.dispatch(appActions.hideUi(false))
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params.user !== this.props.params.user && !this.props.loading) {
      this.fetchUrl()
    }
  }

  toggleMute = () => {
    this.props.dispatch(actions.toggleMute())
  }

  onTimeUpdate = (currentTime) => {
    if (this.props.params.video) {
      this.props.dispatch(actions.updateTimestamp(this.props.params.video, currentTime))
    }
  }

  onVolumeChange = (e) => {
    this.props.dispatch(actions.updateVolume(e.target.volume))
  }

  increaseVolume = () => {
    this.props.dispatch(actions.increaseVolume())
  }

  decreaseVolume = () => {
    this.props.dispatch(actions.decreaseVolume())
  }

  toggleChat = () => {
    this.props.dispatch(actions.toggleChat())
  }

  toggleList = () => {
    if (this.props.streams.length === 0) {
      this.props.dispatch(streamActions.getStreams())
    }
    this.props.dispatch(actions.toggleList())
  }

  onListItemClick = (stream) => {
    this.props.dispatch(push('play/' + stream.channel.name))
  }

  onBack = () => {
    this.props.dispatch(goBack())
  }

  onKeyDown = (e) => {
    if (e.target.tagName == 'WEBVIEW') {
      return
    }
    switch(e.keyCode) {
      case 82:
        this.fetchUrl()
        break;
      case 76:
        this.toggleList()
        break;
      case 77:
        this.toggleMute()
        break;
      case 67:
        this.toggleChat()
        break;
      case 57:
        this.decreaseVolume()
        break;
      case 48:
        this.increaseVolume()
        break;
    }
  }

  onNewWindow = (e) => {
    const protocol = require('url').parse(e.url).protocol
    if (protocol === 'http:' || protocol === 'https:') {
      shell.openExternal(e.url)
    }
  }

  render () {

    const { video, user } = this.props.params
    const timestamp = this.props.timestamps[video]
    const { url, muted, volume, chat, loading, streams, list } = this.props

    return (
      <div style={{height: '100vh', position: 'fixed', top: 0}}>
        { loading ? (
          <Loader />
        ) : (<Play
              streams={streams}
              onBack={this.onBack}
              onTimeUpdate={this.onTimeUpdate}
              onVolumeChange={this.onVolumeChange}
              onListItemClick={this.onListItemClick}
              onNewWindow={this.onNewWindow}
              volume={volume}
              timestamp={timestamp}
              url={url}
              muted={muted}
              chat={chat}
              list={list}
              user={user} />) }
        <KeyBinding onKey={this.onKeyDown} />
      </div>
    )
  }
}

PlayContainer.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  timestamps: PropTypes.object,
  loading: PropTypes.bool,
  url: PropTypes.string,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  chat: PropTypes.bool,
  list: PropTypes.bool,
  streams: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    timestamps: state.play.timestamps,
    loading: state.play.loading,
    url: state.play.url,
    muted: state.play.muted,
    volume: state.play.volume,
    chat: state.play.chat,
    list: state.play.list,
    streams: state.streams.items
  }
}

export default connect(mapStateToProps)(PlayContainer)
