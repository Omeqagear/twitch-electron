import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Hls from './hls'

const wrapper = shallow(
  <Hls
    url='http://example.com/example.m3u'
    onTimeUpdate={() => {}}
    onVolumeChange={() => {}} />
);

test('renders without exploding', t => {
  t.is(wrapper.length, 1)
})
