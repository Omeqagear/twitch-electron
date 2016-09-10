import React, { Component, PropTypes } from 'react'
import VideoProgress from './video-progress'
import VideoVolume from './video-volume'
import VideoPlayButton from './video-play-button'

export default class VideoControls extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const { duration, currentTime, volume, muted } = this.props

    return (
      <div className={this.props.className} style={{...this.props.style, display: 'flex', width: '100%', height: 50}}>
        <VideoPlayButton playing={this.props.playing} onClick={this.props.onStateChange} />
        <VideoProgress onChange={this.props.onProgressChange} currentTime={currentTime} duration={duration} />
        <VideoVolume onChange={this.props.onVolumeChange} volume={volume} muted={muted} />
      </div>
    )
  }

}

VideoControls.defaultProps = {
  style: {},
  className: 'video-controls'
}

VideoControls.propTypes = {
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  volume: PropTypes.number,
  muted: PropTypes.bool,
  playing: PropTypes.bool,
  onProgressChange: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onStateChange: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}
