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
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
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
import StreamList from '../src/shared/stream-list/stream-list'

storiesOf('Streams', module)
.add('List', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Streams
      streams={StreamsJSON.streams}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))
.add('Component', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Stream
      data={StreamsJSON.streams[0]}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))

storiesOf('Games', module)
.add('List', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Games
      games={GamesJSON.top}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))
.add('Component', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Game
      data={GamesJSON.top[0]}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))

storiesOf('Channels', module)
.add('List', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Channels
      channels={ChannelsJSON.follows}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))
.add('Component', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Channel
      data={ChannelsJSON.follows[5].channel}
      onClick={action('clicked')}
    />
  </MuiThemeProvider>
))

storiesOf('Components', module)
.add('StreamList', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <StreamList streams={StreamsJSON.streams} onClick={action('clicked')} />
  </MuiThemeProvider>
))
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
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Header>
      <WindowMenu
        show={true}
        onMinimize={action('minimize')}
        onMaximise={action('maximize')}
        onClose={action('close')}
      />
    </Header>
  </MuiThemeProvider>
))
.add('Chat', () => (
  <Chat
    user='monstercat'
    width='100%'
    height='100%'
  />
))
.add('HLS', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Hls
      url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8'
      onTimeUpdate={() => {}}
      onVolumeChange={() => {}}
      volume={0.1}
    />
  </MuiThemeProvider>
))

storiesOf('Player', module)
.add('VideoControls', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <VideoControls duration={1} currentTime={0.5} volume={0.5} />
  </MuiThemeProvider>
))
.add('Player with chat', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
  </MuiThemeProvider>
))
.add('Player without chat', () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
  </MuiThemeProvider>
))
