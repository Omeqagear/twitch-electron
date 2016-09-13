import React, { PropTypes, Component } from 'react'
import Twitch from '../../twitch'
import styles from './streams.css'
import Stream from './components/stream'

export const GET_STREAMS         = 'GET_STREAMS'
export const GET_STREAMS_SUCCESS = 'GET_STREAMS_SUCCESS'
export const GET_STREAMS_ERROR   = 'GET_STREAMS_ERROR'

const initialState = {
  loading: false,
  items: []
}

export const actions = {
  getStreams: () => {
    return dispatch => {
      dispatch({ type: GET_STREAMS })
      return Twitch.api({url: 'streams/followed', params: {limit: 100}}).then(
        (res) => {
          dispatch({type: GET_STREAMS_SUCCESS, data: res.data.streams})
          return res.data.streams
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
  case GET_STREAMS:
    return {...initialState, ...state, loading: true}
  case GET_STREAMS_SUCCESS:
    return {...initialState, ...state, items: action.data, loading: false}
  default:
    return {...state, ...state}
  }
}

class Streams extends Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.className}>
          {this.props.streams.map((stream) => {
            return (
              <Stream key={stream._id} onClick={this.props.onClick} data={stream} />
            )
          })}
        </div>
      </div>
    )
  }
}

Streams.propTypes = {
  streams: PropTypes.array,
  onClick: PropTypes.func
}

export default Streams
