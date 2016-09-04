import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './modules/app/app-container'
import PlayContainer from './modules/play/play-container'
import VodsContainer from './modules/vods/vods-container'
import StreamsContainer from './modules/streams/streams-container'
import FollowingContainer from './modules/following/following-container'
import GamesContainer from './modules/games/games-container'
import SearchContainer from './modules/search/search-container'

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={StreamsContainer} />
    <Route path="/play/:user(/:video)" component={PlayContainer} />
    <Route path="/vods/:user" component={VodsContainer} />
    <Route path="/following" component={FollowingContainer} />
    <Route path="/games" component={GamesContainer} />
    <Route path="/streams/:game" component={StreamsContainer} />
    <Route path="/search" component={SearchContainer} />
  </Route>
)
