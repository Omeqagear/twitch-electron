import React from 'react'
import Api from './mockAPI'
import { storiesOf } from '@kadira/storybook'
import Chat from '../src/shared/chat/chat'
import Hls from '../src/shared/hls/hls'
import Play from '../src/modules/play/play'
import Stream from '../src/modules/streams/components/stream'
import Header from '../src/modules/app/components/header'
import Sidebar from '../src/modules/app/components/sidebar'
import WindowMenu from '../src/modules/app/components/window-menu'

storiesOf('Components', module)
.add('Header', () => (
  <Header />
))
.add('Sidebar', () => (
  <Sidebar
    currentPath='/'
    onClick={() => {}}
  />
))
.add('WindowMenu', () => (
  <Header>
    <WindowMenu
      show={true}
    />
  </Header>
))
.add('Stream', () => (
  <Stream
    data={Api.getStream()}
    onClick={() => {}}
  />
))
.add('Chat', () => (
  <Chat
    user='monstercat'
    width='100%'
    height='100%'
  />
))
.add('HLS', () => (
  <Hls
    url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}}
    volume={0.1}
  />
))

storiesOf('Player', module)
.add('Player with chat', () => (
  <Play
    url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}}
    volume={0.1}
    timestamp={0}
    muted={false}
    chat={true}
    user='cuda87'
  />
))
.add('Player without chat', () => (
  <Play
    url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}}
    volume={0.1}
    timestamp={0}
    muted={false}
    chat={false}
    user='cuda87'
  />
))