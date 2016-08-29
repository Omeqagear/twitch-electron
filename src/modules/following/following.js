import React, { PropTypes } from 'react'
import styles from './following.css'
import Twitch from '../../twitch'
import Channel from './components/channel'

export const GET_FOLLOWED_CHANNELS         = 'GET_FOLLOWED_CHANNELS'
export const GET_FOLLOWED_CHANNELS_SUCCESS = 'GET_FOLLOWED_CHANNELS_SUCCESS'
export const GET_FOLLOWED_CHANNELS_ERROR   = 'GET_FOLLOWED_CHANNELS_ERROR'

export const actions = {
	getFollowedChannels: () => {
		return dispatch => {
			dispatch({ type: GET_FOLLOWED_CHANNELS })
			Twitch.api({method: 'channel'}, function(error, user) {
				if (error) {
					dispatch({type: GET_FOLLOWED_CHANNELS_ERROR})
				}
				Twitch.api({url: `/users/${user.name}/follows/channels`, params: {limit: 100}}, function(error, data) {
					if (error) {
						dispatch({type: GET_FOLLOWED_CHANNELS_ERROR})
					} else {
						dispatch({type: GET_FOLLOWED_CHANNELS_SUCCESS, data: data.follows})
					}
				})
			});
		}
	},
}

const initialState = []


export const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_FOLLOWED_CHANNELS_SUCCESS:
		return [].concat(action.data)
	default:
		return [].concat(state)
	}
}

export const Following = (props) => {
	return (
		<div className={styles.wrapper}>
			<h1 style={{margin: '0 20px', borderBottom: '4px solid black', padding: '20px 0', textTransform: 'uppercase'}}>FOLLOWING</h1>
			<div className={styles.className}>
				{props.channels.map((data) => {
					return (<Channel onChannelClick={props.onChannelClick} key={data.channel._id} data={data.channel} />)
				})}
			</div>
		</div>
	)
}

Following.propTypes = {
	channels: PropTypes.array,
	onChannelClick: PropTypes.func
}