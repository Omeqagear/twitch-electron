import React, { PropTypes } from 'react'
import Sidebar from './components/sidebar'
import Header from './components/header'
import WindowMenu from './components/window-menu'

const HIDE_UI = 'HIDE_UI'

const initialState = {
	hideUi: false
}

export const actions = {
	hideUi: (val) => {
		return dispatch => {
			dispatch({type: HIDE_UI, data: val})
		}
	},
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case HIDE_UI:
			return {...state, hideUi: action.data}
		default:
			return {...state}
	}
}

export const App = (props) => {
	return (
		<div id="main">
			<WindowMenu show={process.platform !== 'darwin'} onMaximise={props.onMaximise} onMinimize={props.onMinimize} onClose={props.onClose} />
			<Header show={props.hideUi} />
			<Sidebar show={props.hideUi} back={props.back} />
			<div id="view">
				{props.children}
			</div>
		</div>
	)
}

App.propTypes = {
	hideUi: PropTypes.bool,
	children: PropTypes.object,
	back: PropTypes.func,
	onMaximise: PropTypes.func,
	onMinimize: PropTypes.func,
	onClose: PropTypes.func,
}