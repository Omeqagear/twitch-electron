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
	}

	componentWillReceiveProps ( { muted, volume } ) {
		this.video.muted = muted
		this.video.volume = volume
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
		this.video.volume      = this.props.volume || 0.5
		this.video.currentTime = this.props.timestamp || 0
		this.video.muted       = this.props.muted || false
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
