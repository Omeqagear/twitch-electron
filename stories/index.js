import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Chat from '../src/shared/chat/chat'
import Hls from '../src/shared/hls/hls'

storiesOf('Twitch-Electron', module)
.add('Chat', () => (
  <Chat
    user='monstercat'
    width='100%'
    height='100%'
    show={true}
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