import React, { PropTypes } from 'react'
import Hls                  from '../../shared/hls/hls'
import Chat                 from '../../shared/chat/chat'
import StreamList           from '../../shared/stream-list/stream-list'
import { getPlaylist }      from '../../streamAPI'
import styles               from './play.css'

export const GET_URL                = 'GET_URL'
export const GET_URL_SUCCESS        = 'GET_URL_SUCCESS'
export const GET_URL_ERROR          = 'GET_URL_ERROR'
export const CLEAR_URL              = 'CLEAR_URL'
export const UPDATE_VIDEO_TIMESTAMP = 'UPDATE_VIDEO_TIMESTAMP'
export const UPDATE_VOLUME          = 'UPDATE_VOLUME'
export const TOGGLE_MUTE            = 'TOGGLE_MUTE'
export const INCREASE_VOLUME        = 'INCREASE_VOLUME'
export const DECREASE_VOLUME        = 'DECREASE_VOLUME'
export const TOGGLE_CHAT            = 'TOGGLE_CHAT'
export const TOGGLE_LIST            = 'TOGGLE_LIST'

const initialState = {
  timestamps: JSON.parse(localStorage.getItem('timestamps')) || {},
  loading: false,
  volume: 0.5,
  chat: true,
  list: false
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
  toggleChat: () => {
    return dispatch => {
      dispatch({type: TOGGLE_CHAT})
    }
  },
  toggleList: () => {
    return dispatch => {
      dispatch({type: TOGGLE_LIST})
    }
  },
  updateVolume: (volume) => {
    return dispatch => {
      dispatch({type: UPDATE_VOLUME, data: volume})
    }
  },
  toggleMute: () => {
    return dispatch => {
      dispatch({type: TOGGLE_MUTE})
    }
  },
  increaseVolume: () => {
    return dispatch => {
      dispatch({type: INCREASE_VOLUME})
    }
  },
  decreaseVolume: () => {
    return dispatch => {
      dispatch({type: DECREASE_VOLUME})
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
  case INCREASE_VOLUME:
    return Object.assign({}, state, {volume: Math.min(1.0, state.volume + 0.1) })
  case DECREASE_VOLUME:
    return Object.assign({}, state, {volume: Math.max(0.0, state.volume - 0.1) })
  case TOGGLE_MUTE:
    return Object.assign({}, state, {muted: !state.muted})
  case TOGGLE_CHAT:
    return Object.assign({}, state, {chat: !state.chat})
  case TOGGLE_LIST:
    return Object.assign({}, state, {list: !state.list})
  default:
    return Object.assign({}, state)
  }
}

export default function Play (props) {
  return (
    <div className={styles.container}>
      <StreamList show={props.list} streams={props.streams} onClick={props.onListItemClick} />
      <div className={styles.play}>
        {props.url && <Hls {...props} />}
        <div className={styles.back} onClick={props.onBack}>
          <i className='material-icons'>arrow_back</i>
        </div>
      </div>
      <Chat onNewWindow={props.onNewWindow} show={props.chat} user={props.user} />
    </div>
  )
}

Play.propTypes = {
  url: PropTypes.string,
  timestamp: PropTypes.number,
  volume: PropTypes.number,
  onTimeUpdate: PropTypes.func,
  onVolumeChange: PropTypes.func,
  user: PropTypes.string,
  chat: PropTypes.bool,
  list: PropTypes.bool,
  onBack: PropTypes.func,
  streams: PropTypes.array,
  onListItemClick: PropTypes.func,
  onNewWindow: PropTypes.func
}
