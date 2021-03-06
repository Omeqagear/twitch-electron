import React, { PropTypes } from 'react'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import styles from './channel.css'

export default function ChannelCard (props) {
  return (
      <Card style={{width: '25%', flexGrow: 1, margin: '20px', minWidth: '400px'}}>
        <CardHeader
          title={props.data.name}
          subtitle={props.data.status}
          avatar={props.data.logo}
          style={{textAlign: 'left'}}
        />
        <CardMedia onClick={props.onClick.bind(this, props.data)} className={styles.cardMedia}>
          <img src={props.data.video_banner} />
        </CardMedia>
      </Card>
  )
}

ChannelCard.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object
}
