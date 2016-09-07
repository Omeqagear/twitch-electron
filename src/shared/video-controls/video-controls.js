import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Slider from 'material-ui/Slider'

const Progress = ({current, total}) => {
  return (
    <Slider min={0} max={total} value={current} />
  )
}

Progress.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
}

const VideoProgress = ({currentTime, duration}) => {
    return (
      <div style={{flex: 4, padding: '20px'}}>
        <Progress current={currentTime} total={duration} />
      </div>
    )
}

VideoProgress.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
}

const VideoVolume = ({current}) => {
  return (
    <div style={{flex: 1, padding: '20px'}}>
      <Slider min={0} max={1} value={current} />
    </div>
  )
}

VideoVolume.propTypes = {
  current: PropTypes.number
}

export default function VideoControls () {
    return (
      <MuiThemeProvider>
        <div style={{display: 'flex', width: '100%'}}>
          <VideoProgress currentTime={0.5} duration={1} />
          <VideoVolume current={0.5} />
        </div>
      </MuiThemeProvider>
    )
}
