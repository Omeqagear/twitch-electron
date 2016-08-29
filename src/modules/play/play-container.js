import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'
import { connect } from 'react-redux'
import { Play, actions } from './play'
import { actions as appActions } from '../app/app'
import { goBack } from 'react-router-redux'

const TwitchStreams = require('twitch-get-stream')

class PlayContainer extends Component {

	constructor (props) {
		super(props)
		this.state = {
			loading: false
		}
		this.onClose = this.onClose.bind(this)
		this.fetchUrl = this.fetchUrl.bind(this)
		this.goBack = this.goBack.bind(this)
		this.reload = this.reload.bind(this)
	}

	fetchUrl () {
		const { user, video } = this.props.params

		this.setState({loading: true})

		if (video) {
			TwitchStreams.get(user, video).then(
				(levels) => {
					this.setState({
						url: levels[0].url,
						loading: false
					})
				},
				(err) => {
					this.setState({loading: true, err: err})
					setTimeout(this.fetchUrl, 60000)
				}
			)
		} else {
			TwitchStreams.get(user).then(
				(levels) => {
					this.setState({
						url: levels[0].url,
						loading: false
					})
				},
				(err) => {
					this.setState({loading: true, err: err})
					setTimeout(this.fetchUrl, 60000)
				}
			)
		}
	}

	goBack () {
		this.props.dispatch(goBack())
	}

	componentDidMount () {
		this.fetchUrl()
		this.props.dispatch(appActions.hideUi(true))
	}

	componentWillUnmount () {
		this.props.dispatch(appActions.hideUi(false))
	}

	onClose (videoId, timestamp) {
		this.props.dispatch(actions.updateTimestamp(videoId, timestamp))
	}

	reload () {
		this.fetchUrl()
	}

	render () {

		const { video, user } = this.props.params
		const timestamp = this.props.timestamps[video]

		return (
			<div className="play-wrapper" style={{height: '100%', position: 'relative'}}>
				{ this.state.loading ? (<Loader type="ball-pulse-sync" />) : (<Play reload={this.reload} goBack={this.goBack} onClose={this.onClose} user={user} timestamp={timestamp} videoId={video} url={this.state.url} />) }
			</div>
		)
	}
}

PlayContainer.propTypes = {
	dispatch: PropTypes.func,
	params: PropTypes.object,
	timestamps: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		timestamps: state.play.timestamps
	}
}

export default connect(mapStateToProps)(PlayContainer)
