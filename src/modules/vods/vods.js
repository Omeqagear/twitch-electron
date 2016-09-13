import React, { PropTypes } from 'react'
import Vod from './vod/vod'
import Twitch from '../../twitch'
import styles from './vods.css'

export const GET_VODS         = 'GET_VODS'
export const GET_VODS_SUCCESS = 'GET_VODS_SUCCESS'
export const GET_VODS_ERROR   = 'GET_VODS_ERROR'

const initialState = {
}

export const actions = {
  getVods: (user) => {
    return dispatch => {
      dispatch({ type: GET_VODS, data: {user: user} })
      Twitch.api({url: `channels/${user}/videos`, params: {broadcasts: true}}).then(
        (res) => {
          dispatch({type: GET_VODS_SUCCESS, data: {user: user, videos: res.data.videos}})
        },
        () => {
          dispatch({type: GET_VODS_ERROR})
        }
      )
    }
  },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_VODS:
    return Object.assign({}, state, {[action.data.user]: {loading: true, items: []}})
  case GET_VODS_SUCCESS:
    return Object.assign({}, state, {[action.data.user]: {loading: false, items: action.data.videos}})
  default:
    return Object.assign({}, state)
  }
}

export const Vods = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.className}>
        {props.videos.map((vod) => {
          return (
            <Vod onClick={props.onVodClick} key={vod._id} data={vod} />
          )
        })}
      </div>
    </div>
  )
}

Vods.propTypes = {
  user: PropTypes.string,
  videos: PropTypes.array,
  onVodClick: PropTypes.func
}
