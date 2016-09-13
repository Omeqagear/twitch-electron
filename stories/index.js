import GamesJSON from './games.json'
import ChannelsJSON from './channels.json'
import StreamsJSON from './streams.json'

import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';

if (!window.tapInject) {
  injectTapEventPlugin()
  window.tapInject = true;
}

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { storiesOf, action } from '@kadira/storybook'
import Chat from '../src/shared/chat/chat'
import Hls from '../src/shared/hls/hls'
import Play from '../src/modules/play/play'
import Streams from '../src/modules/streams/streams'
import Stream from '../src/modules/streams/components/stream'
import Channels from '../src/modules/channels/channels'
import Channel from '../src/modules/channels/components/channel'
import Games from '../src/modules/games/games'
import Game from '../src/modules/games/components/game'
import Header from '../src/modules/app/components/header'
import Sidebar from '../src/modules/app/components/sidebar'
import WindowMenu from '../src/modules/app/components/window-menu'
import VideoControls from '../src/shared/video-controls/video-controls'

const videoElement = (
  <video>
    <source src='http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4' type='video/mp4' />
  </video>
)

storiesOf('Streams', module)
.add('List', () => (
  <MuiThemeProvider>
    <Streams
      streams={StreamsJSON.streams}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))
.add('Component', () => (
  <MuiThemeProvider>
    <Stream
      data={StreamsJSON.streams[0]}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))

storiesOf('Games', module)
.add('List', () => (
  <Games
    games={GamesJSON.top}
    onClick={action('clicked')}
  />
))
.add('Component', () => (
  <Game
    data={GamesJSON.top[0]}
    onClick={action('clicked')}
  />
))

storiesOf('Channels', module)
.add('List', () => (
  <Channels
    channels={ChannelsJSON.follows}
    onClick={action('clicked')}
  />
))
.add('Component', () => (
  <Channel
    data={ChannelsJSON.follows[5].channel}
    onClick={action('clicked')}
  />
))

storiesOf('Components', module)
.add('Header', () => (
  <MuiThemeProvider>
    <Header />
  </MuiThemeProvider>
))
.add('Sidebar', () => (
  <Sidebar
    currentPath='/'
    onClick={action('clicked')}
  />
))
.add('WindowMenu', () => (
  <Header>
    <WindowMenu
      show={true}
      onMinimize={action('minimize')}
      onMaximise={action('maximize')}
      onClose={action('close')}
    />
  </Header>
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
.add('VideoControls', () => (
  <VideoControls duration={1} currentTime={0.5} volume={0.5} />
))
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
