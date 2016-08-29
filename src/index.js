import React from 'react';
import Twitch from './twitch'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './index.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const renderApp = () => {
	render(
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>,
		document.getElementById('root')
	);
}

let twitchConfig = {
	clientId: '1ln3u11tdno201adrtee2ydy90cmhiv',
	electron: true,
}

if (localStorage.getItem('auth')) {
	twitchConfig.session = JSON.parse(localStorage.getItem('auth'))
}

Twitch.init(twitchConfig, ( error ) => {
	if (!error) {
		Twitch.login({
			scope: ['user_read', 'channel_read']
		})
		Twitch.events.addListener('auth.login', function(status) {
			localStorage.setItem('auth', JSON.stringify(status))
			renderApp()
		})
	}
})
