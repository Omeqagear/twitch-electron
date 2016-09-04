import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'
import { connect } from 'react-redux'
import { Following, actions } from './following'
import { push } from 'react-router-redux'

class FollowingContainer extends Component {

  constructor (props) {
    super(props)
    this.onChannelClick = this.onChannelClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(actions.getFollowedChannels())
  }

  onChannelClick (channel) {
    this.props.dispatch(push(`vods/${channel.name}`))
  }

  render () {
    return (
      <div className="following-wrapper" style={{height: '100%', position: 'relative'}}>
        { !this.props.channels.length ? (<Loader type="ball-pulse-sync" />) : (<Following onClick={this.onChannelClick} channels={this.props.channels} />) }
      </div>
    )
  }
}

FollowingContainer.propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    channels: state.following
  }
}

export default connect(mapStateToProps)(FollowingContainer)
