import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Games, actions } from './games'

class GamesContainer extends Component {

	constructor (props) {
		super(props)
		this.onGameClick = this.onGameClick.bind(this)
	}

	componentDidMount () {
		this.props.dispatch(actions.getFollowedGames())
	}

	onGameClick (game) {
		this.props.dispatch(push(`streams/${encodeURIComponent(game.name).replace(/\'/g, '%27')}`))
	}

	render () {
		return (
			<div className="games-wrapper" style={{height: '100%', position: 'relative'}}>
				{ !this.props.games.length ? (<Loader type="ball-pulse-sync" />) : (<Games onClick={this.onGameClick} games={this.props.games} />) }
			</div>
		)
	}
}

GamesContainer.propTypes = {
	dispatch: PropTypes.func,
	games: PropTypes.array
}

const mapStateToProps = (state) => {
	return {
		games: state.games
	}
}

export default connect(mapStateToProps)(GamesContainer)
