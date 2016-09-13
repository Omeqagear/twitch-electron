import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'
import VideoControls from '../video-controls/video-controls'
import styles from './hls.css'

export default class HLS extends Component {

  static propTypes = {
    timestamp: PropTypes.number,
    volume: PropTypes.number,
    url: PropTypes.string.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    muted: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      duration: 1,
      currentTime: 0,
      volume: this.props.volume,
      playing: false,
      muted: false
    }
  }

  componentWillReceiveProps ( { muted, volume } ) {
    this.video.muted = muted
    this.video.volume = volume
    this.setState({
      volume: volume,
      muted: muted
    })
  }

  componentDidMount () {
    this.hls = new Hls({
      debug: false,
      appendErrorMaxRetry: 10,
      startPosition: this.props.timestamp || -1
    })

    this.hls.loadSource(this.props.url)
    this.hls.attachMedia(this.video)
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.onReady)
  }

  onChange = () => {
    this.setState({
      duration: this.video.duration,
      currentTime: this.video.currentTime
    })
  }

  onPlay = () => {
    this.setState({
      playing: true
    })
  }

  onPause = () => {
    this.setState({
      playing: false
    })
  }

  onVolumeChange = (ev, val) => {
      this.setState({
        volume: val
      })
      this.video.volume = val
  }

  onProgressChange = (ev, val) => {
      this.setState({
        currentTime: val
      })
      this.video.currentTime = val
  }

  onStateChange = () => {
    if (this.state.playing) {
      this.video.pause()
    } else {
      this.video.play()
    }
  }

  onReady = () => {
    this.video.volume = this.props.volume || 0.5
    this.video.play()
    this.setState({playing: true})
  }

  componentWillUnmount () {
    this.hls.destroy()
  }

  render () {
    return (
      <div className={styles.className}>
        <video
          onPause={this.onPause}
          onPlay={this.onPlay}
          onTimeUpdate={this.onChange}
          onLoadedMetadata={this.onChange}
          onDurationChange={this.onChange}
          onVolumeChange={this.props.onVolumeChange}
          ref={(v) => { this.video = v } }>
        </video>
        <VideoControls
          className={styles.controls}
          muted={this.state.muted}
          playing={this.state.playing}
          onStateChange={this.onStateChange}
          onProgressChange={this.onProgressChange}
          onVolumeChange={this.onVolumeChange}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          volume={this.state.volume} />
      </div>
    )
  }

}
