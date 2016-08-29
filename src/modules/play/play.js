import React from 'react'
import axios from 'axios'
import Hls from '../../shared/hls/hls'

export const GET_URL = 'GET_URL'
export const GET_URL_SUCCESS = 'GET_URL_SUCCESS'
export const GET_URL_ERROR = 'GET_URL_ERROR'
export const CLEAR_URL = 'CLEAR_URL'
export const UPDATE_VIDEO_TIMESTAMP = 'UPDATE_VIDEO_TIMESTAMP'

const initialState = {
	timestamps: JSON.parse(localStorage.getItem('timestamps')) || {},
}

export const actions = {
	getUrl: (twitchUrl) => {
		return dispatch => {
			dispatch({ type: GET_URL, twitchUrl: twitchUrl })
			return axios.get(`/stream?url=${twitchUrl}&quality=best`)
			.then((res) => res )
			.then(
				(res) => {
					dispatch({type: GET_URL_SUCCESS, data: res.data.url})
				},
				(err) => {
					dispatch({type: GET_URL_ERROR})
				}
			)
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
	}
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
	case UPDATE_VIDEO_TIMESTAMP:
		let _timestamps = {...state.timestamps}
		_timestamps[action.data.videoId] = action.data.timestamp
		localStorage.setItem('timestamps', JSON.stringify(_timestamps))

		return Object.assign({}, state, {timestamps: _timestamps})
	case CLEAR_URL:
		return Object.assign({}, state, {url: null})
	case GET_URL_SUCCESS:
		return Object.assign({}, state, {url: action.data})
	default:
		return Object.assign({}, state)
	}
}

export const Play = (props) => {
	return (
		<div id="play">
			{props.url ? (
				<Hls reload={props.reload} goBack={props.goBack} user={props.user} onClose={props.onClose} timestamp={props.timestamp} videoId={props.videoId} url={props.url} />
			) : null}
		</div>
	)
}
