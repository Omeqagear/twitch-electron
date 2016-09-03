import React, { Component, PropTypes } from 'react'
import Hls from 'hls.js'
import styles from './hls.css'
import Chat from '../chat/chat'

export default class HLS extends Component {

	static propTypes = {
		timestamp: PropTypes.number,
		videoId: PropTypes.number,
		url: PropTypes.string.isRequired,
		user: PropTypes.string,
		goBack: PropTypes.func,
		reload: PropTypes.func,
		onClose: PropTypes.func,
	}

	constructor (props) {
		super(props)

		this.state  = {
			volume: 0.5,
			playing: false,
			timestamp: props.timestamp || 0,
			chat: true
		}

		this.toggle         = this.toggle.bind(this)
		this.onReady        = this.onReady.bind(this)
		this.onError        = this.onError.bind(this)
		this.onChange       = this.onChange.bind(this)
		this.setVolume      = this.setVolume.bind(this)
		this.onKeyDown      = this.onKeyDown.bind(this)
		this.toggleMute     = this.toggleMute.bind(this)
		this.increaseVolume = this.increaseVolume.bind(this)
		this.decreaseVolume = this.decreaseVolume.bind(this)
		this.toggleChat     = this.toggleChat.bind(this)
	}

	componentDidMount () {
		this.hls = new Hls({
			debug: true,
			appendErrorMaxRetry: 10,
		})
		this.hls.loadSource(this.props.url)
		this.hls.attachMedia(this.video)
		this.hls.on(Hls.Events.MANIFEST_PARSED, this.onReady)
		this.hls.on(Hls.Events.ERROR, this.onError)
		document.addEventListener('keydown', this.onKeyDown)
	}

	onKeyDown (ev) {
		switch(ev.keyCode) {
			case 77:
				this.toggleMute()
				break
			case 48:
				this.increaseVolume()
				break
			case 57:
				this.decreaseVolume()
				break
			case 67:
				this.toggleChat()
				break
			case 8:
				this.props.goBack()
				break
			case 82:
				this.props.reload()
				break
		}
	}

	toggleChat () {
		this.setState({
			chat: !this.state.chat
		})
	}

	toggleMute () {
		this.video.muted = !this.video.muted
	}

	increaseVolume () {
		this.video.volume = Math.min(1, this.video.volume + 0.1)
		this.setState({volume: this.video.volume})
	}

	decreaseVolume () {
		this.video.volume = Math.max(0, this.video.volume - 0.1)
		this.setState({volume: this.video.volume})
	}

	onReady () {
		this.setState({playing: true})
		this.video.volume      = this.state.volume
		this.video.currentTime = this.state.timestamp
		this.video.play()
	}

	onChange (e) {
		this.setState({
			duration: e.target.duration,
			timestamp: e.target.currentTime
		})
	}

	onError (e, data) {
		if(data.fatal) {
			switch(data.type) {
				case Hls.ErrorTypes.NETWORK_ERROR:
					// try to recover network error
					this.hls.startLoad();
					break;
				case Hls.ErrorTypes.MEDIA_ERROR:
					this.hls.recoverMediaError()
					break;
				default:
					// cannot recover
					this.hls.destroy()
					window.location.reload()
					break;
			}
		}
	}

	componentWillUnmount () {
		if (this.props.videoId) {
			this.props.onClose(this.props.videoId, this.state.timestamp)
		}
		this.hls.destroy()
		document.removeEventListener('keydown', this.onKeyDown)
	}

	toggle () {
		if (this.video.paused || this.video.ended) {
			this.setState({playing: true})
			this.video.play()
		} else {
			this.setState({playing: false})
			this.video.pause()
		}
	}

	setVolume (e) {
		this.setState({volume: e.target.value})
		this.video.volume = e.target.value
	}

	render () {
		return (
			<div>
				<div className={this.state.chat ? styles.withChat : styles.className}>
					<video onDurationChange={this.onChange} onTimeUpdate={this.onChange} controls ref={(v) => { this.video = v } }></video>
					<i className="material-icons" onClick={this.props.goBack}>arrow_back</i>
					<div className={styles.controls}></div>
				</div>
				{this.props.user &&
					<div className={styles.chat}>
						<Chat user={this.props.user} show={this.state.chat} />
					</div>
				}
			</div>
		)
	}

}
