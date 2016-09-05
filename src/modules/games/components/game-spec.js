import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Game from './game'

const mockData = {
  game: {
    name: 'League of Legends',
    popularity: 232370,
    _id: 21779,
    giantbomb_id: 24024,
    box: {
      large: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-272x380.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-136x190.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-52x72.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg'
    },
    logo: {
      large: 'https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-240x144.jpg',
      medium: 'https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-120x72.jpg',
      small: 'https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-60x36.jpg',
      template: 'https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-{width}x{height}.jpg'
    },
    _links: {}
  },
  viewers: 235090,
  channels: 2021
}

const wrapper = shallow(
  <Game
    data={mockData}
    onClick={() => {}} />
);

test('renders without exploding', t => {
  t.is(wrapper.length, 1)
})
