import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Streams, { actions } from './streams'
import Loader from 'react-loaders'
import { createWindow } from '../../window'
import keymaster from 'keymaster'

class StreamsContainer extends Component {

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.load    = this.load.bind(this)
  }

  componentDidMount () {
    this.load()
    keymaster('r', this.load)
  }

  componentWillUnmount () {
    keymaster.unbind('r', this.load)
  }

  load () {
    if (this.props.routeParams.game) {
      this.props.dispatch(actions.getStreamsForGame(this.props.routeParams.game))
    } else {
      this.props.dispatch(actions.getStreams())
    }
  }

  onClick (stream, e) {
    if (e.altKey) {
      e.preventDefault()
      createWindow(`/play/${stream.channel.name}/`)
    } else {
      this.props.dispatch(push(`/play/${stream.channel.name}/`))
    }
  }

  render () {

    const { streams } = this.props

    return streams.length ? (<Streams onClick={this.onClick} streams={streams} />) : (<Loader type="ball-pulse-sync" />)
  }
}

StreamsContainer.propTypes = {
  dispatch: PropTypes.func,
  streams: PropTypes.array,
  routeParams: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams
  }
}

export default connect(mapStateToProps)(StreamsContainer)
