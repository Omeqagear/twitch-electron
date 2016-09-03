import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'
import styles from './hls.css'

export default class HLS extends Component {

	static propTypes = {
		timestamp: PropTypes.number,
		volume: PropTypes.number,
		url: PropTypes.string.isRequired,
		onTimeUpdate: PropTypes.func.isRequired,
		onVolumeChange: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props)

		this.state  = {
			volume: props.volume || 0.5,
			timestamp: props.timestamp || 0,
		}

		this.onReady = this.onReady.bind(this)
	}

	componentDidMount () {

		this.hls = new Hls({
			debug: true,
			appendErrorMaxRetry: 10,
		})

		this.hls.loadSource(this.props.url)
		this.hls.attachMedia(this.video)
		this.hls.on(Hls.Events.MANIFEST_PARSED, this.onReady)
	}

	onReady () {
		this.video.volume      = this.state.volume
		this.video.currentTime = this.state.timestamp
		this.video.play()
	}

	componentWillUnmount () {
		this.hls.destroy()
	}

	render () {
		return (
			<div className={styles.className}>
				<video onDurationChange={this.onChange} onTimeUpdate={this.props.onTimeUpdate} onVolumeChange={this.props.onVolumeChange} controls ref={(v) => { this.video = v } }></video>
			</div>
		)
	}

}
