import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Search, actions } from './search'
import { createWindow } from '../../window'

class SearchContainer extends Component {
  constructor (props) {
    super(props)
    this.onSearch     = this.onSearch.bind(this)
    this.onClick      = this.onClick.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)

    this.state = {
      type: 'streams'
    }
  }

  onSearch (query) {
    switch(this.state.type) {
      case 'streams':
        this.props.dispatch(actions.queryStreams(query))
        break
      case 'channels':
        this.props.dispatch(actions.queryChannels(query))
        break
      case 'games':
        this.props.dispatch(actions.queryGames(query))
        break

    }
  }

  onTypeChange (e) {
    this.setState({ type: e.target.value })
  }

  onClick (item, e) {
    e.preventDefault()
    switch(this.state.type) {
      case 'streams':
        if (e.altKey) {
          createWindow(`/play/${item.channel.name}/`)
        } else {
          this.props.dispatch(push(`/play/${item.channel.name}/`))
        }
        break
      case 'channels':
        if (e.altKey) {
          createWindow(`/vods/${item.name}/`)
        } else {
          this.props.dispatch(push(`/vods/${item.name}/`))
        }
        break
      case 'games':
        this.props.dispatch(push(`streams/${encodeURIComponent(item.name).replace(/\'/g, '%27')}`))
        break
    }
  }

  render () {
    return (<Search type={this.state.type} onTypeChange={this.onTypeChange} onClick={this.onClick} streams={this.props.streams} channels={this.props.channels} games={this.props.games} query={this.state.query} onSearch={this.onSearch} />)
  }
}

SearchContainer.propTypes = {
  dispatch: PropTypes.func,
  streams: PropTypes.array,
  games: PropTypes.array,
  channels: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    streams: state.search.streams,
    channels: state.search.channels,
    games: state.search.games
  }
}

export default connect(mapStateToProps)(SearchContainer)
