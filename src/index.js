import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './index.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

if ( location.hash.includes( 'access_token' ) ) {
  localStorage.setItem(
    'AUTH_TOKEN',
    location.hash.replace('#/').split('=')[1].split('&')[0]
  )
  hashHistory.push('/')
}

const renderApp = () => {
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
}

renderApp()
