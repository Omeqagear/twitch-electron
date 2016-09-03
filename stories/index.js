import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Chat from '../src/shared/chat/chat'
import Hls from '../src/shared/hls/hls'
import Play from '../src/modules/play/play'

storiesOf('Twitch', module)
.add('Player', () => {
  <Play
    url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}}
    user='cuda87'
    chat={true}
    volume={0.1}
  />
})
.add('Chat', () => (
  <Chat
    user='monstercat'
    width='100%'
    height='100%'
  />
))
.add('Hls', () => (
  <Hls
    url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}}
    volume={0.1}
  />
))