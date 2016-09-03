import React, { PropTypes } from 'react'
import Hls                  from '../../shared/hls/hls'
import { getPlaylist }      from '../../streamAPI'

export const GET_URL                = 'GET_URL'
export const GET_URL_SUCCESS        = 'GET_URL_SUCCESS'
export const GET_URL_ERROR          = 'GET_URL_ERROR'
export const CLEAR_URL              = 'CLEAR_URL'
export const UPDATE_VIDEO_TIMESTAMP = 'UPDATE_VIDEO_TIMESTAMP'

const initialState = {
	timestamps: JSON.parse(localStorage.getItem('timestamps')) || {},
	loading: false
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
	default:
		return Object.assign({}, state)
	}
}

export const Play = (props) => {
	return (
		<div id="play">
			{props.url && <Hls reload={props.reload} goBack={props.goBack} user={props.user} onClose={props.onClose} timestamp={props.timestamp} videoId={props.videoId} url={props.url} />}
		</div>
	)
}

Play.propTypes = {
	url: PropTypes.string,
	reload: PropTypes.func,
	goBack: PropTypes.func,
	user: PropTypes.string,
	onClose: PropTypes.func,
	timestamp: PropTypes.number,
	videoId: PropTypes.number 
}
