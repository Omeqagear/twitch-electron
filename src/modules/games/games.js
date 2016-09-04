import React, { PropTypes } from 'react'
import styles from './games.css'
import Twitch from '../../twitch'
import Game from './components/game'

export const GET_FOLLOWED_GAMES         = 'GET_FOLLOWED_GAMES'
export const GET_FOLLOWED_GAMES_SUCCESS = 'GET_FOLLOWED_GAMES_SUCCESS'
export const GET_FOLLOWED_GAMES_ERROR   = 'GET_FOLLOWED_GAMES_ERROR'

export const actions = {
	getFollowedGames: () => {
		return dispatch => {
			dispatch({ type: GET_FOLLOWED_GAMES })
			Twitch.api({url: 'games/top', params: {limit: 100}}).then(
				(res) => {
					dispatch({type: GET_FOLLOWED_GAMES_SUCCESS, data: res.data.top})
				},
				(err) => {
					dispatch({type: GET_FOLLOWED_GAMES_ERROR, data: err})
				}
			)
		}
	},
}

const initialState = []


export const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_FOLLOWED_GAMES_SUCCESS:
		return [].concat(action.data)
	default:
		return [].concat(state)
	}
}

export const Games = (props) => {
	return (
		<div className={styles.wrapper}>
			<h1 style={{margin: '0 20px', borderBottom: '4px solid black', padding: '20px 0', textTransform: 'uppercase'}}>GAMES</h1>
			<div className={styles.className}>
				{props.games.map((data) => {
					return (<Game onClick={props.onClick} key={data.game._id} data={data.game} />)
				})}
			</div>
		</div>
	)
}

Games.propTypes = {
	games: PropTypes.array,
	onClick: PropTypes.func
}
