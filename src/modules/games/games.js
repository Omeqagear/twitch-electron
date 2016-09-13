import React, { PropTypes } from 'react'
import styles from './games.css'
import Twitch from '../../twitch'
import Game from './components/game'

export const GET_FOLLOWED_GAMES         = 'GET_FOLLOWED_GAMES'
export const GET_FOLLOWED_GAMES_SUCCESS = 'GET_FOLLOWED_GAMES_SUCCESS'
export const GET_FOLLOWED_GAMES_ERROR   = 'GET_FOLLOWED_GAMES_ERROR'

export const actions = {
  getFollowedGames: () => {
    return dispatch => {
      dispatch({ type: GET_FOLLOWED_GAMES })
      Twitch.api({url: 'games/top', params: {limit: 100}}).then(
        (res) => {
          dispatch({type: GET_FOLLOWED_GAMES_SUCCESS, data: res.data.top})
        },
        (err) => {
          dispatch({type: GET_FOLLOWED_GAMES_ERROR, data: err})
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
  case GET_FOLLOWED_GAMES:
    return {...initialState, ...state, loading: true}
  case GET_FOLLOWED_GAMES_SUCCESS:
    return {...initialState, ...state, items: action.data, loading: false}
  default:
    return {...initialState, ...state}
  }
}

const Games = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.className}>
        {props.games.map((data) => {
          return (<Game onClick={props.onClick} key={data.game._id} data={data} />)
        })}
      </div>
    </div>
  )
}

Games.propTypes = {
  games: PropTypes.array,
  onClick: PropTypes.func
}

export default Games
