import React, { PropTypes } from 'react'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import styles from './stream.css'

export default function StreamCard (props) {
  return (
    <Card style={{width: '25%', flexGrow: 1, margin: '20px', minWidth: '400px'}}>
      <CardHeader
        title={props.data.channel.name}
        subtitle={props.data.channel.status}
        avatar={props.data.channel.logo}
        style={{textAlign: 'left'}}
      />
      <CardMedia className={styles.cardMedia}>
        <div className={styles.playOverlay} onClick={props.onClick.bind(this, props.data)}>
          <i className={`material-icons ${styles.playIcon}`}>play_circle_filled</i>
        </div>
        <img src={props.data.preview.large} />
      </CardMedia>
      <CardText style={{display: 'flex', flexWrap: 'wrap'}}>
        <Chip style={{margin: 4}}>
          <Avatar icon={<FontIcon color='black' className='material-icons'>person</FontIcon>} />
          {props.data.viewers}
        </Chip>
        <Chip style={{margin: 4}}>
          <Avatar icon={<FontIcon color='black' className='material-icons'>videogame_asset</FontIcon>} />
          {props.data.game}
        </Chip>
      </CardText>
    </Card>
  )
}

StreamCard.propTypes = {
  preview: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func
}
