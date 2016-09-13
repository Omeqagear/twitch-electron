import React, { Component, PropTypes } from 'react'
import Loader from '../../shared/loader/loader'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Play, { actions } from './play'
import { actions as appActions } from '../app/app'
import KeyBinding from 'react-keybinding-component'

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

  render () {

    const { video, user } = this.props.params
    const timestamp = this.props.timestamps[video]
    const { url, muted, volume, chat, loading } = this.props

    return (
      <div style={{height: '100%', position: 'relative'}}>
        { loading ? (
          <Loader />
        ) : (<Play
              onBack={this.onBack}
              onTimeUpdate={this.onTimeUpdate}
              onVolumeChange={this.onVolumeChange}
              volume={volume}
              timestamp={timestamp}
              url={url}
              muted={muted}
              chat={chat}
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
  chat: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    timestamps: state.play.timestamps,
    loading: state.play.loading,
    url: state.play.url,
    muted: state.play.muted,
    volume: state.play.volume,
    chat: state.play.chat
  }
}

export default connect(mapStateToProps)(PlayContainer)
