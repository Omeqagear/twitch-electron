import React, { Component, PropTypes } from 'react'
import Loader from '../../shared/loader/loader'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Games, { actions } from './games'

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
    return this.props.loading ? (<Loader />) : (<Games onClick={this.onGameClick} games={this.props.games} />)
  }
}

GamesContainer.propTypes = {
  dispatch: PropTypes.func,
  games: PropTypes.array,
  loading: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    games: state.games.items,
    loading: state.games.loading
  }
}

export default connect(mapStateToProps)(GamesContainer)
