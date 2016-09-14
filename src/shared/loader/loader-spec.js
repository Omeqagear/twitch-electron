import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Loader from './loader'

const wrapper = shallow(
  <Loader />
);

test('renders without exploding', t => {
  t.is(wrapper.length, 1)
})
