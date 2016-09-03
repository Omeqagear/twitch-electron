import React, { PropTypes } from 'react'
import Hls                  from '../../shared/hls/hls'
import { getPlaylist }      from '../../streamAPI'

export const GET_URL                = 'GET_URL'
export const GET_URL_SUCCESS        = 'GET_URL_SUCCESS'
export const GET_URL_ERROR          = 'GET_URL_ERROR'
export const CLEAR_URL              = 'CLEAR_URL'
export const UPDATE_VIDEO_TIMESTAMP = 'UPDATE_VIDEO_TIMESTAMP'
export const UPDATE_VOLUME          = 'UPDATE_VOLUME'

const initialState = {
	timestamps: JSON.parse(localStorage.getItem('timestamps')) || {},
	loading: false,
	volume: 0.5,
}

export const actions = {
	getUrl: (user, videoId) => {
		return dispatch => {
			dispatch({ type: GET_URL, data: {user, videoId} })
			if (videoId) {
				getPlaylist(user, videoId).then(
					(url) => {
						dispatch({ type: GET_URL_SUCCESS, data: url })
					}
				)
			} else {
				getPlaylist(user).then(
					(url) => {
						dispatch({ type: GET_URL_SUCCESS, data: url })
					}
				)
			}
		}
	},
	clearUrl: () => {
		return dispatch => {
			dispatch({type: CLEAR_URL})
		}
	},
	updateTimestamp: (videoId, timestamp) => {
		return dispatch => {
			dispatch({type: UPDATE_VIDEO_TIMESTAMP, data: {videoId, timestamp}})
		}
	},
	updateVolume: (volume) => {
		return dispatch => {
			dispatch({type: UPDATE_VOLUME, data: volume})
		}
	}
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
	case UPDATE_VIDEO_TIMESTAMP:
		localStorage.setItem('timestamps', JSON.stringify({...state.timestamps, [action.data.videoId]: action.data.timestamp}))
		return Object.assign({}, state, {timestamps: {...state.timestamps, [action.data.videoId]: action.data.timestamp}})
	case GET_URL:
		return Object.assign({}, state, {loading: true})
	case CLEAR_URL:
		return Object.assign({}, state, {url: null})
	case GET_URL_SUCCESS:
		return Object.assign({}, state, {url: action.data, loading: false})
	case UPDATE_VOLUME:
		return Object.assign({}, state, {volume: action.data})
	default:
		return Object.assign({}, state)
	}
}

export const Play = (props) => {
	return (
		<div id="play">
			{props.url && <Hls onTimeUpdate={props.onTimeUpdate} onVolumeChange={props.onVolumeChange} volume={props.volume} timestamp={props.timestamp} url={props.url} />}
		</div>
	)
}

Play.propTypes = {
	url: PropTypes.string,
	timestamp: PropTypes.number,
	volume: PropTypes.number,
	onTimeUpdate: PropTypes.func,
	onVolumeChange: PropTypes.func
}
