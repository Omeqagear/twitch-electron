import React, { Component, PropTypes } from 'react'
import Loader from '../../shared/loader/loader'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Play, { actions } from './play'
import { actions as appActions } from '../app/app'
import keymaster from 'keymaster'

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
    keymaster('r', this.fetchUrl)
    keymaster('m', this.toggleMute)
    keymaster('0', this.increaseVolume)
    keymaster('9', this.decreaseVolume)
    keymaster('c', this.toggleChat)
  }

  componentWillUnmount () {
    this.props.dispatch(appActions.hideUi(false))
    keymaster.unbind('r', this.fetchUrl)
    keymaster.unbind('m', this.toggleMute)
    keymaster.unbind('0', this.increaseVolume)
    keymaster.unbind('9', this.decreaseVolume)
    keymaster.unbind('c', this.toggleChat)
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

  render () {

    const { video, user } = this.props.params
    const timestamp = this.props.timestamps[video]
    const { url, muted, volume, chat, loading } = this.props

    return (
      <div style={{height: '100%', position: 'relative'}}>
        { loading ? (
          <Loader />
        ) : (<Play onBack={this.onBack} onTimeUpdate={this.onTimeUpdate} onVolumeChange={this.onVolumeChange} volume={volume} timestamp={timestamp} url={url} muted={muted} chat={chat} user={user} />) }
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
