import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { reducer as appReducer } from './modules/app/app'
import { reducer as vodsReducer } from './modules/vods/vods'
import { reducer as playReducer } from './modules/play/play'
import { reducer as streamsReducer } from './modules/streams/streams'
import { reducer as followingReducer } from './modules/following/following'
import { reducer as gamesReducer } from './modules/games/games'
import { reducer as searchReducer }  from './modules/search/search'

export default combineReducers({
  vods: vodsReducer,
  play: playReducer,
  streams: streamsReducer,
  following: followingReducer,
  games: gamesReducer,
  search: searchReducer,
  app: appReducer,
  routing
})
