import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Chat from './chat'

const wrapper = shallow(
  <Chat user='cuda87' />
);

test('renders without exploding', t => {
  t.is(wrapper.length, 1)
})
