import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Vods, actions } from './vods'
import Loader from '../../shared/loader/loader'

class VodsContainer extends Component {

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(actions.getVods(this.props.params.user))
  }

  onClick (vod) {
    this.props.dispatch(push(`/play/${vod.channel.name}/${vod._id.replace('v', '')}`))
  }

  render () {

    const { user } = this.props.params
    const videos  = this.props.vods[user] ? this.props.vods[user].items : []
    const loading = this.props.vods[user] ? this.props.vods[user].loading : []

    return !loading ? (<Vods onVodClick={this.onClick} user={user} videos={videos} />) : (<Loader type="ball-pulse-sync" />)
  }
}

VodsContainer.propTypes = {
  vods: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    vods: state.vods || {}
  }
}

export default connect(mapStateToProps)(VodsContainer)
