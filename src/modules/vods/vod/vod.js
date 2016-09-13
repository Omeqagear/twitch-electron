import React, { PropTypes, Component } from 'react'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import moment from 'moment'
import styles from './vod.css'

export default class VodCard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hovering: false
    }
  }

  onMouseEnter = () => {
    this.setState({
      hovering: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      hovering: false
    })
  }

  getPreview () {
    return ( <img src={this.props.data.animated_preview} /> )
  }

  getDate () {
    return moment(this.props.data.recorded_at).fromNow()
  }

  render () {
    return (
      <Card style={{width: '25%', flexGrow: 1, margin: '20px', minWidth: '400px'}}>
        <CardHeader
          title={this.props.data.channel.name}
          subtitle={this.props.data.title}
          avatar={this.props.data.channel.logo}
          style={{textAlign: 'left'}}
        />
        <CardMedia
          className={styles.cardMedia}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          <div className={styles.playOverlay} onClick={this.props.onClick.bind(this, this.props.data)}>
            <i className={`material-icons ${styles.playIcon}`}>play_circle_filled</i>
          </div>
          {this.getPreview()}
        </CardMedia>
        <CardText style={{display: 'flex', flexWrap: 'wrap'}}>
          <Chip style={{margin: 4}}>
            <Avatar icon={<FontIcon color='black' className='material-icons'>videogame_asset</FontIcon>} />
            {this.props.data.game}
          </Chip>
          <Chip style={{margin: 4}}>
            <Avatar icon={<FontIcon color='black' className='material-icons'>access_time</FontIcon>} />
            {this.getDate()}
          </Chip>
        </CardText>
      </Card>
    )
  }
}

VodCard.propTypes = {
  preview: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func
}

export function Vod(props) {
  return (
    <div className={styles.className}>
      <img src={props.data.preview} />
      <div onClick={props.onClick.bind(this, props.data)}>
        <h3>{props.data.channel.name}</h3>
        <p>{props.data.title}</p>
      </div>
    </div>
  )
}

Vod.propTypes = {
  preview: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.object
}
