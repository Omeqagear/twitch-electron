import React, { PropTypes } from 'react'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import styles from './stream-list.css'

const StreamListItem = function (props) {
    return (
      <li className={styles.item}>
        <Card onClick={props.onClick.bind(this, props.data)}>
          <CardHeader
            title={props.data.channel.name}
            subtitle={props.data.channel.status}
            avatar={props.data.channel.logo}
            style={{textAlign: 'left'}}
          />
          <CardMedia>
            <img src={props.data.preview.medium} />
          </CardMedia>
        </Card>
      </li>
    )
}

StreamListItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default function StreamList (props) {
  return (
    <div style={{display: props.show ? 'block' : 'none'}} className={styles.container}>
      <div className={styles.list}>
        <ul>
          {props.streams.map((stream) => (
            <StreamListItem onClick={props.onClick} key={stream._id} data={stream} />
          ))}
        </ul>
      </div>
    </div>
  )
}

StreamList.propTypes = {
  streams: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool
}
