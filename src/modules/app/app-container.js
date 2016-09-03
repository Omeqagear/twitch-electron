const remote = require('electron').remote

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { App } from './app'
import { goBack, push } from 'react-router-redux'
import keymaster from 'keymaster'

class AppContainer extends Component {

	constructor (props) {
		super(props)
		
		this.onMinimize = this.onMinimize.bind(this)
		this.onMaximise = this.onMaximise.bind(this)
		this.onClose    = this.onClose.bind(this)
		this.navigate   = this.navigate.bind(this)
	}

	componentDidMount () {
		keymaster('backspace', this.back)
	}

	componentWillUnmount () {
		keymaster.unbind('backspace', this.back)
	}

	onMinimize () {
		let window = remote.getCurrentWindow()
		window.minimize()
	}

	onMaximise () {
		let window = remote.getCurrentWindow()
		if (!window.isMaximized()) {
			window.maximize()
		} else {
			window.unmaximize()
		}
	}

	onClose () {
		window.close()
	}

	navigate (url) {

		if (url == 'back') {
			this.props.dispatch(goBack())
			return
		}

		this.props.dispatch(push(url))
	}

	render () {
		return (
			<App
				onNavigate={this.navigate}
				currentPath={this.props.location.pathname}
				hideUi={this.props.app.hideUi}
				children={this.props.children}
				doubleClick={this.onMaximise}
				onClose={this.onClose}
				onMinimize={this.onMinimize}
				onMaximise={this.onMaximise}
			/>
		)
	}
}

AppContainer.propTypes = {
	dispatch: PropTypes.func,
	app: PropTypes.object,
	children: PropTypes.object,
	location: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		app: state.app
	}
}

export default connect(mapStateToProps)(AppContainer)
