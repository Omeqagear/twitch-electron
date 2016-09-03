import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Hls from '../src/shared/hls/hls'


storiesOf('Hls', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
