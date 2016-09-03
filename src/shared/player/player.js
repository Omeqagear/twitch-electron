import React, { Component, PropTypes } from 'react'
import { getPlaylist } from '../../streamAPI'
import Loader from 'react-loaders'
import Hls from '../hls/hls'

class Player extends Component {
 
  static propTypes = {
    user: PropTypes.string.isRequired,
    videoId: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = {
      url: null,
      loading: false
    }
  }

  componentDidMount () {

    const { user, videoId } = this.props
    this.setState({loading: true})

    if (videoId) {
      getPlaylist(user, videoId).then(
        (url) => {
          console.log(url)
          this.setState({
            url,
            loading: false
          })
        }
      )
    } else {
      getPlaylist(user).then(
        (url) => {
          this.setState({
            url,
            loading: false
          })
        }
      )
    }
  }

  render () {
    if (this.state.loading || !this.state.url) {
      return (
        <Loader type="ball-pulse-sync" />
      )
    }

    return (
      <Hls url={this.state.url} />
    )
  }

}

export default Player
