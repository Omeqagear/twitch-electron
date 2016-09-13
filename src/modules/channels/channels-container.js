import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Channels, { actions } from './channels'
import { push } from 'react-router-redux'
import Loader from '../../shared/loader/loader'

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
        { this.props.loading ? (<Loader />) : (<Channels onClick={this.onChannelClick} channels={this.props.channels} />) }
      </div>
    )
  }
}

ChannelsContainer.propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.array,
  loading: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels.items,
    loading: state.channels.loading
  }
}

export default connect(mapStateToProps)(ChannelsContainer)
