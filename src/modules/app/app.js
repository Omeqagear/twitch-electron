import React, { PropTypes } from 'react'
// import Sidebar from './components/sidebar'
import Header from './components/header'
// import WindowMenu from './components/window-menu'
import styles from './app.css'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Menu, MainButton, ChildButton } from 'react-mfb'

const HIDE_UI = 'HIDE_UI'

const initialState = {
  hideUi: false
}

export const actions = {
  hideUi: (val) => {
    return dispatch => {
      dispatch({type: HIDE_UI, data: val})
    }
  }
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
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div id="main">
        <Header hide={props.hideUi}></Header>
        <div className={styles.container}>
          <div className={styles.view}>
            {props.children}
          </div>
        </div>
        <div style={{display: !props.hideUi ? 'block' : 'none'}} >
          <Menu effect='slidein' position='br' method='click'>
            <MainButton iconResting="ion-plus-round" />
            <ChildButton
              icon="ion-monitor"
              label="Following"
              href="/#/channels" />
            <ChildButton
              icon="ion-monitor"
              label="Streams"
              href="/#/" />
            <ChildButton
              icon="ion-monitor"
              label="Games"
              href="/#/games" />
          </Menu>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  hideUi: PropTypes.bool,
  children: PropTypes.object,
  back: PropTypes.func,
  onMaximise: PropTypes.func,
  onMinimize: PropTypes.func,
  onClose: PropTypes.func,
  currentPath: PropTypes.string,
  onNavigate: PropTypes.func
}
