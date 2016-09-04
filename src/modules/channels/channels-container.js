import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'
import { connect } from 'react-redux'
import Channels, { actions } from './channels'
import { push } from 'react-router-redux'

class ChannelsContainer extends Component {

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
      <div style={{height: '100%', position: 'relative'}}>
        { !this.props.channels.length ? (<Loader type="ball-pulse-sync" />) : (<Channels onClick={this.onChannelClick} channels={this.props.channels} />) }
      </div>
    )
  }
}

ChannelsContainer.propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels
  }
}

export default connect(mapStateToProps)(ChannelsContainer)
