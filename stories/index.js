import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Player from '../src/shared/player/player'

storiesOf('Twitch-Player', module)
.add('live stream', () => (
  <Player
    user='monstercat'
  />
))
.add('vod', () => (
  <Player
    user='cuda87'
    videoId={87149669}
  />
))