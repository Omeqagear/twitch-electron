import React, { PropTypes } from 'react'
import format from 'format-number'
import styles from './game.css'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'

export default function GameCard (props) {
  return (
    <Card style={{width: '15%', flexGrow: 1, margin: 20, minWidth: 200, cursor: 'pointer'}} className={styles.card}>
      <CardHeader title={props.data.game.name} style={{fontWeight: 200}} subtitle={format()(props.data.viewers) + ' viewers'} avatar={props.data.game.box.small} />
      <CardMedia className={styles.cardMedia} onClick={props.onClick.bind(this, props.data.game)}>
        <img src={props.data.game.box.large} />
      </CardMedia>
    </Card>
  )
}

GameCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
}
