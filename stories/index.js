import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Chat from '../src/shared/chat/chat'

storiesOf('Twitch-Electron', module)
.add('Chat', () => (
  <Chat
    user='monstercat'
    width='100%'
    height='100%'
    show={true}
  />
))