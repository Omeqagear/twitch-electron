import React, { Component, PropTypes } from 'react'
import Twitch from '../../twitch'
import styles from './search.css'

import Stream from '../streams/components/stream'
import Channel from '../following/components/channel'
import Game from '../games/components/game'

const GET_STREAMS          = 'GET_STREAMS'
const GET_STREAMS_SUCCESS  = 'GET_STREAMS_SUCCESS'
const GET_STREAMS_ERROR    = 'GET_STREAMS_ERROR'

const GET_CHANNELS         = 'GET_CHANNELS'
const GET_CHANNELS_SUCCESS = 'GET_CHANNELS_SUCCESS'
const GET_CHANNELS_ERROR   = 'GET_CHANNELS_ERROR'

const GET_GAMES            = 'GET_GAMES'
const GET_GAMES_SUCCESS    = 'GET_GAMES_SUCCESS'
const GET_GAMES_ERROR      = 'GET_GAMES_ERROR'

const initialState = {
	streams: [],
	channels: [],
	games: []
}

export const actions = {
	queryStreams: (query) => {
		return dispatch => {
			dispatch({ type: GET_STREAMS })
			Twitch.api({method: 'search/streams', params: {limit: 100, query}}, function(error, data) {
				if (error) {
					dispatch({type: GET_STREAMS_ERROR, data: error})
				} else {
					dispatch({type: GET_STREAMS_SUCCESS, data: data.streams})
				}
			})
		}
	},
	queryChannels: (query) => {
		return dispatch => {
			dispatch({ type: GET_CHANNELS })
			Twitch.api({method: 'search/channels', params: {limit: 100, query}}, function(error, data) {
				if (error) {
					dispatch({type: GET_CHANNELS_ERROR, data: error})
				} else {
					dispatch({type: GET_CHANNELS_SUCCESS, data: data.channels})
				}
			})
		}
	},
	queryGames: (query) => {
		return dispatch => {
			dispatch({ type: GET_GAMES })
			Twitch.api({method: 'search/games', params: {limit: 100, query, type: 'suggest'}}, function(error, data) {
				if (error) {
					dispatch({type: GET_GAMES_ERROR, data: error})
				} else {
					dispatch({type: GET_GAMES_SUCCESS, data: data.games})
				}
			})
		}
	}
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_STREAMS_SUCCESS:
			return {...state, streams: action.data}
		case GET_CHANNELS_SUCCESS:
			return {...state, channels: action.data}
		case GET_GAMES_SUCCESS:
			return {...state, games: action.data}
		default:
			return {...state}
	}
}

export class Search extends Component {

	static propTypes = {
		type: PropTypes.string,
		onTypeChange: PropTypes.func,
		onSearch: PropTypes.func,
		streams: PropTypes.array,
		channels: PropTypes.array,
		onClick: PropTypes.func,
		games: PropTypes.array
	}

	constructor (props) {
		super(props)
		this.state = {
			query: ''
		}

		this.queryUpdate = this.queryUpdate.bind(this)
	}

	queryUpdate (e) {
		this.setState({
			query: e.target.value
		})
	}

	render () {
		return (
			<div className={styles.wrapper}>
				<h1 style={{margin: '0 20px', borderBottom: '4px solid black', padding: '20px 0', textTransform: 'uppercase'}}>SEARCH</h1>
				<input type="text" placeholder="" className={styles.search} id="search" name="search" onChange={this.queryUpdate} />

				<select className={styles.type} value={this.props.type} onChange={this.props.onTypeChange}>
					<option value="streams">Streams</option>
					<option value="channels">Channels</option>
					<option value="games">Games</option>
				</select>
				
				<button className={styles.searchButton} onClick={this.props.onSearch.bind(this, this.state.query)}>OK</button>

				<div className={styles.className}>
					{this.props.type == 'streams' && this.props.streams.map((stream) => {
						return (
							<Stream key={stream._id} onClick={this.props.onClick} data={stream} />
						)
					})}
					{this.props.type == 'channels' && this.props.channels.map((channel) => {
						return (
							<Channel key={channel._id} onChannelClick={this.props.onClick} data={channel} />
						)
					})}
					{this.props.type == 'games' && this.props.games.map((game) => {
						return (
							<Game onClick={this.props.onClick} key={game._id} data={game} />
						)
					})}
				</div>
			</div>
		)
	}
}
