import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Stream from './stream'

const mockData = {
  '_id': 23085463104,
  'game': 'Battlefield 1',
  'viewers': 32767,
  'created_at': '2016-09-04T16:19:48Z',
  'video_height': 720,
  'average_fps': 60.7238280301,
  'delay': 0,
  'is_playlist': false,
  '_links': {
    'self': 'https://api.twitch.tv/kraken/streams/lirik'
  },
  'preview': {
    'small': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lirik-80x45.jpg',
    'medium': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lirik-320x180.jpg',
    'large': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lirik-640x360.jpg',
    'template': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lirik-{width}x{height}.jpg'
  },
  'channel': {
    'mature': true,
    'status': 'Sewb Sewnday - Twitter: @LIRIK ',
    'broadcaster_language': 'en',
    'display_name': 'LIRIK',
    'game': 'Battlefield 1',
    'language': 'en',
    '_id': 23161357,
    'name': 'lirik',
    'created_at': '2011-06-27T18:34:45Z',
    'updated_at': '2016-09-04T19:05:18Z',
    'delay': null,
    'logo': 'https://static-cdn.jtvnw.net/jtv_user_pictures/lirik-profile_image-476e7a592cdfed74-300x300.png',
    'banner': null,
    'video_banner': 'https://static-cdn.jtvnw.net/jtv_user_pictures/lirik-channel_offline_image-af3bc6ef396c76ae-1920x1080.png',
    'background': null,
    'profile_banner': 'https://static-cdn.jtvnw.net/jtv_user_pictures/lirik-profile_banner-cd63be39a747b629-480.png',
    'profile_banner_background_color': '#221f1f',
    'partner': true,
    'url': 'https://www.twitch.tv/lirik',
    'views': 135087948,
    'followers': 1462927,
    '_links': {
      'self': 'https://api.twitch.tv/kraken/channels/lirik',
      'follows': 'https://api.twitch.tv/kraken/channels/lirik/follows',
      'commercial': 'https://api.twitch.tv/kraken/channels/lirik/commercial',
      'stream_key': 'https://api.twitch.tv/kraken/channels/lirik/stream_key',
      'chat': 'https://api.twitch.tv/kraken/chat/lirik',
      'subscriptions': 'https://api.twitch.tv/kraken/channels/lirik/subscriptions',
      'editors': 'https://api.twitch.tv/kraken/channels/lirik/editors',
      'teams': 'https://api.twitch.tv/kraken/channels/lirik/teams',
      'videos': 'https://api.twitch.tv/kraken/channels/lirik/videos'
    }
  }
}

test('renders without exploding', t => {
  const wrapper = shallow(
    <Stream
      data={mockData}
      onClick={() => {}} />
  );
  t.is(wrapper.length, 1)
})
