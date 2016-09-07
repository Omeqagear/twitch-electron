import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'
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
    this.onReady = this.onReady.bind(this)
    this.updateTimestamp = this.updateTimestamp.bind(this)
  }

  componentWillReceiveProps ( { muted, volume } ) {
    this.video.muted = muted
    this.video.volume = volume
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
    this.timeInterval = setInterval(this.updateTimestamp, 5000)
  }

  updateTimestamp () {
    this.props.onTimeUpdate(this.video.currentTime)
  }

  onReady () {
    this.video.volume = this.props.volume || 0.5
    this.video.play()
  }

  componentWillUnmount () {
    clearInterval(this.timeInterval)
    this.hls.destroy()
  }

  render () {
    return (
      <div className={styles.className}>
        <video onDurationChange={this.onChange} onVolumeChange={this.props.onVolumeChange} controls ref={(v) => { this.video = v } }></video>
      </div>
    )
  }

}
