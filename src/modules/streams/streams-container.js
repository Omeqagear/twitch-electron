import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Streams, { actions } from './streams'
import { actions as appActions } from '../app/app'
import { createWindow } from '../../window'
import keymaster from 'keymaster'
import Loader from '../../shared/loader/loader'

class StreamsContainer extends Component {

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.load    = this.load.bind(this)
    if (this.props.routeParams.access_token) {
      this.props.dispatch(appActions.setAccessToken(this.props.routeParams.access_token))
    }
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
    const { streams, loading } = this.props
    return (
      <div>
        {loading && <Loader />}
        <Streams onClick={this.onClick} streams={streams} />
      </div>
    )
  }
}

StreamsContainer.propTypes = {
  dispatch: PropTypes.func,
  streams: PropTypes.array,
  loading: PropTypes.bool,
  routeParams: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams.items,
    loading: state.streams.loading
  }
}

export default connect(mapStateToProps)(StreamsContainer)
