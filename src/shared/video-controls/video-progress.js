import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Slider from 'material-ui/Slider'
import numeral from 'numeral'

const formatDuration = (seconds) => {
  return numeral(seconds).format('00:00')
}

export default function VideoProgress ({currentTime, duration, onChange}) {
  return (
    <MuiThemeProvider>
      <div style={{flex: 10, padding: '20px', display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <span style={{fontWeight: 200, width: 150}}>{`${formatDuration(currentTime)} / ${formatDuration(duration)}`}</span>
        <Slider onChange={onChange} style={{flexGrow: 1, marginTop: 22}} min={0} max={duration} value={currentTime} />
      </div>
    </MuiThemeProvider>
  )
}

VideoProgress.defaultProps = {
  currentTime: 0.5,
  duration: 1,
  onChange: () => {}
}

VideoProgress.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  onChange: PropTypes.func
}
