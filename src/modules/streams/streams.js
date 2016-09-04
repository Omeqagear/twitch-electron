import React, { PropTypes } from 'react'
import Twitch from '../../twitch'
import styles from './streams.css'
import Stream from './components/stream'

export const GET_STREAMS         = 'GET_STREAMS'
export const GET_STREAMS_SUCCESS = 'GET_STREAMS_SUCCESS'
export const GET_STREAMS_ERROR   = 'GET_STREAMS_ERROR'

const initialState = []

export const actions = {
	getStreams: () => {
		return dispatch => {
			dispatch({ type: GET_STREAMS })
			Twitch.api({url: 'streams/followed'}).then(
				(res) => {
					dispatch({type: GET_STREAMS_SUCCESS, data: res.data.streams})
				},
				(err) => {
					dispatch({type: GET_STREAMS_SUCCESS, data: err.data})
				}
			)
		}
	},
	getStreamsForGame: (game) => {
		return dispatch => {
			dispatch({ type: GET_STREAMS })
			Twitch.api({url: 'streams', params: {game: game}}).then(
				(res) => {
					dispatch({type: GET_STREAMS_SUCCESS, data: res.data.streams})
				},
				() => {
					dispatch({type: GET_STREAMS_ERROR})
				}
			)
		}
	}
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_STREAMS_SUCCESS:
		return [].concat(action.data)
	default:
		return [].concat(state)
	}
}

const Streams = (props) => {
	return (
		<div className={styles.wrapper}>
			<h1 style={{margin: '0 20px', borderBottom: '4px solid black', padding: '20px 0', textTransform: 'uppercase'}}>STREAMS</h1>
			<div className={styles.className}>
				{props.streams.map((stream) => {
					return (
						<Stream key={stream._id} onClick={props.onClick} data={stream} />
					)
				})}
			</div>
		</div>
	)
}

Streams.propTypes = {
	streams: PropTypes.array,
	onClick: PropTypes.func
}

export default Streams