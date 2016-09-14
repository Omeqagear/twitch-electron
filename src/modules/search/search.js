import React, { Component, PropTypes } from 'react'
import Twitch from '../../twitch'
import styles from './search.css'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import Stream from '../streams/components/stream'
import Channel from '../channels/components/channel'
import Game from '../games/components/game'

const GET_STREAMS          = 'GET_STREAMS'
const GET_STREAMS_SUCCESS  = 'GET_STREAMS_SUCCESS'
const GET_STREAMS_ERROR    = 'GET_STREAMS_ERROR'

const GET_CHANNELS         = 'GET_CHANNELS'
const GET_CHANNELS_SUCCESS = 'GET_CHANNELS_SUCCESS'
const GET_CHANNELS_ERROR   = 'GET_CHANNELS_ERROR'

const GET_GAMES            = 'GET_GAMES'
const GET_GAMES_SUCCESS    = 'GET_GAMES_SUCCESS'
const GET_GAMES_ERROR      = 'GET_GAMES_ERROR'

const initialState = {
  streams: [],
  channels: [],
  games: []
}

export const actions = {
  queryStreams: (query) => {
    return dispatch => {
      dispatch({ type: GET_STREAMS })
      Twitch.api({url: 'search/streams', params: {limit: 100, query}}).then(
        (res) => {
          dispatch({type: GET_STREAMS_SUCCESS, data: res.data.streams})
        },
        (err) => {
          dispatch({type: GET_STREAMS_ERROR, data: err.data})
        }
      )
    }
  },
  queryChannels: (query) => {
    return dispatch => {
      dispatch({ type: GET_CHANNELS })
      Twitch.api({url: 'search/channels', params: {limit: 100, query}}).then(
        (res) => {
          dispatch({type: GET_CHANNELS_SUCCESS, data: res.data.channels})
        },
        (err) => {
          dispatch({type: GET_CHANNELS_ERROR, data: err.data})
        }
      )
    }
  },
  queryGames: (query) => {
    return dispatch => {
      dispatch({ type: GET_GAMES })
      Twitch.api({url: 'search/games', params: {limit: 100, query, type: 'suggest'}}).then(
        (res) => {
          dispatch({type: GET_GAMES_SUCCESS, data: res.data.games})
        },
        (err) => {
          dispatch({type: GET_GAMES_ERROR, data: err.data})
        }
      )
    }
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STREAMS_SUCCESS:
      return {...state, streams: action.data}
    case GET_CHANNELS_SUCCESS:
      return {...state, channels: action.data}
    case GET_GAMES_SUCCESS:
      return {...state, games: action.data}
    default:
      return {...state}
  }
}

export class Search extends Component {

  static propTypes = {
    type: PropTypes.string,
    onTypeChange: PropTypes.func,
    onSearch: PropTypes.func,
    streams: PropTypes.array,
    channels: PropTypes.array,
    onClick: PropTypes.func,
    games: PropTypes.array
  }

  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }

    this.queryUpdate = this.queryUpdate.bind(this)
  }

  queryUpdate (e, val) {
    this.setState({
      query: val
    })
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <TextField hintText='Search...' name='query' className={styles.search} onChange={this.queryUpdate} />
          <SelectField style={{width: 100, marginLeft: 20}} value={this.props.type} onChange={this.props.onTypeChange}>
            <MenuItem value='streams' primaryText="Streams" />
            <MenuItem value='channels' primaryText="Channels" />
            <MenuItem value='games' primaryText="Games" />
          </SelectField>
          <RaisedButton label="Search" primary={true} style={{marginLeft: 20}} onClick={this.props.onSearch.bind(this, this.state.query)} />
        </div>
        <div className={styles.className}>
          {this.props.type == 'streams' && this.props.streams.map((stream) => {
            return (
              <Stream key={stream._id} onClick={this.props.onClick} data={stream} />
            )
          })}
          {this.props.type == 'channels' && this.props.channels.map((channel) => {
            return (
              <Channel key={channel._id} onClick={this.props.onClick} data={channel} />
            )
          })}
          {this.props.type == 'games' && this.props.games.map((game) => {
            return (
              <Game onClick={this.props.onClick} key={game._id} data={game} />
            )
          })}
        </div>
      </div>
    )
  }
}
