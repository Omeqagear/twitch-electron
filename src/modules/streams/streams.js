import React from 'react'
import Twitch from '../../twitch'
import styles from './streams.css'
import Stream from './components/stream'

export const GET_STREAMS         = 'GET_STREAMS'
export const GET_STREAMS_SUCCESS = 'GET_STREAMS_SUCCESS'
export const GET_STREAMS_ERROR   = 'GET_STREAMS_ERROR'

const initialState = []

export const actions = {
	getStreams: (user) => {
		return dispatch => {
			dispatch({ type: GET_STREAMS })
			Twitch.api({url: 'streams/followed'}, (error, data) => {
				if (error) {
					dispatch({type: GET_STREAMS_ERROR})
				} else {
					dispatch({type: GET_STREAMS_SUCCESS, data: data.streams})
				}
			})
		}
	},
	getStreamsForGame: (game) => {
		const name = encodeURIComponent(game).replace(/\'/g, "%27")
		return dispatch => {
			dispatch({ type: GET_STREAMS })
			Twitch.api({url: 'streams', params: {game: name}}, (error, data) => {
				if (error) {
					dispatch({type: GET_STREAMS_ERROR})
				} else {
					dispatch({type: GET_STREAMS_SUCCESS, data: data.streams})
				}
			})
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

export const Streams = (props) => {
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
