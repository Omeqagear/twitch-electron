import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import styles from './stream.css'

export default function StreamCard (props) {
  return (
    <Card style={{width: '25%', flexGrow: 1, margin: '10px', minWidth: '400px'}}>
      <CardHeader
        title={props.data.channel.name}
        subtitle={props.data.channel.status}
        avatar={props.data.channel.logo}
        style={{textAlign: 'left'}}
      />
      <CardMedia>
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

export function Stream(props) {
  return (
    <div className={styles.className} onClick={props.onClick.bind(this, props.data)}>
      <img className={styles.bg} src={props.data.preview.large} />
      <div className={styles.top}>
        <h3 className={styles.title}>{`${props.data.channel.name.toUpperCase()}: ${props.data.channel.status}`}</h3>
      </div>
      <div className={styles.bottom}>
        <div className={styles.viewers}>
          <i className='material-icons'>person</i>
          <span>{props.data.viewers}</span>
        </div>
        <div className={styles.game}>
          <i className='material-icons'>videogame_asset</i>
          <span>{props.data.game}</span>
        </div>
      </div>
    </div>
  )
}

Stream.propTypes = {
  preview: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func
}
