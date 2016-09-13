import React, { PropTypes } from 'react'
import styles from './channels.css'
import Twitch from '../../twitch'
import Channel from './components/channel'

export const GET_FOLLOWED_CHANNELS         = 'GET_FOLLOWED_CHANNELS'
export const GET_FOLLOWED_CHANNELS_SUCCESS = 'GET_FOLLOWED_CHANNELS_SUCCESS'
export const GET_FOLLOWED_CHANNELS_ERROR   = 'GET_FOLLOWED_CHANNELS_ERROR'

export const actions = {
  getFollowedChannels: () => {
    return dispatch => {
      dispatch({ type: GET_FOLLOWED_CHANNELS })
      Twitch.api({url: 'channel'}).then(
        (userRes) => {
          Twitch.api({url: `/users/${userRes.data.name}/follows/channels`, params: {limit: 100}}).then(
            (res) => {
              dispatch({type: GET_FOLLOWED_CHANNELS_SUCCESS, data: res.data.follows})
            },
            () => {
              dispatch({type: GET_FOLLOWED_CHANNELS_ERROR})
            }
          )
        },
        (err) => {
          dispatch({type: GET_FOLLOWED_CHANNELS_ERROR, data: err.data})
        }
      )
    }
  },
}

const initialState = {
  items: [],
  loading: false
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_FOLLOWED_CHANNELS:
    return {...initialState, ...state, loading: true}
  case GET_FOLLOWED_CHANNELS_SUCCESS:
    return {...initialState, ...state, items: action.data, loading: false}
  default:
    return {...initialState, ...state}
  }
}

const Channels = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.className}>
        {props.channels.map((data) => {
          return (<Channel onClick={props.onClick} key={data.channel._id} data={data.channel} />)
        })}
      </div>
    </div>
  )
}

Channels.propTypes = {
  channels: PropTypes.array,
  onClick: PropTypes.func
}

export default Channels
