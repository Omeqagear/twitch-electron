import React, { PropTypes } from 'react'
// import Sidebar from './components/sidebar'
import Header from './components/header'
// import WindowMenu from './components/window-menu'
import styles from './app.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


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
    <MuiThemeProvider>
      <div id="main">
        <Header show={props.hideUi}></Header>
        <div className={styles.container}>
          <div className={styles.view}>
            {props.children}
          </div>
        </div>
        <FloatingActionButton style={{position: 'fixed', bottom: 20, right: 20, zIndex: 1000}}>
          <ContentAdd />
        </FloatingActionButton>
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
