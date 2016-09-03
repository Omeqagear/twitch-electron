import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'
import { connect } from 'react-redux'
import { Play, actions } from './play'
import { actions as appActions } from '../app/app'

class PlayContainer extends Component {

	constructor (props) {
		super(props)
    this.fetchUrl       = this.fetchUrl.bind(this)
    this.reload         = this.reload.bind(this)
    this.onTimeUpdate   = this.onTimeUpdate.bind(this)
    this.onVolumeChange = this.onVolumeChange.bind(this)
	}

	fetchUrl () {
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

	reload () {
		this.fetchUrl()
	}

  onTimeUpdate (e) {
    if (this.props.params.video) {
      this.props.dispatch(actions.updateTimestamp(this.props.params.video, e.target.currentTime))
    }
  }

  onVolumeChange (e) {
    this.props.dispatch(actions.updateVolume(e.target.volume))
  }

	render () {

		const { video } = this.props.params
		const timestamp = this.props.timestamps[video]

		return (
			<div className="play-wrapper" style={{height: '100%', position: 'relative'}}>
				{ this.props.loading ? (
          <Loader type="ball-pulse-sync" />
        ) : (<Play onTimeUpdate={this.onTimeUpdate} onVolumeChange={this.onVolumeChange} timestamp={timestamp} url={this.props.url} />) }
			</div>
		)
	}
}

PlayContainer.propTypes = {
	dispatch: PropTypes.func,
	params: PropTypes.object,
	timestamps: PropTypes.object,
  loading: PropTypes.bool,
  url: PropTypes.string
}

const mapStateToProps = (state) => {
	return {
		timestamps: state.play.timestamps,
    loading: state.play.loading,
    url: state.play.url
	}
}

export default connect(mapStateToProps)(PlayContainer)
