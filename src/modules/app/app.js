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

const App= (props) => {
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
	hideUi: PropTypes.boolean,
	children: PropTypes.array,
	back: PropTypes.function,
	onMaximise: PropTypes.function,
	onMinimize: PropTypes.function,
	onClose: PropTypes.function,
}

export default App