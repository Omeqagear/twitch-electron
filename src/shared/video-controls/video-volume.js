import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Slider from 'material-ui/Slider'

export default function VideoVolume ({volume, onChange, muted}) {
  return (
    <MuiThemeProvider>
      <div style={{flex: 3, padding: '20px', display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <i style={{paddingRight: 20}} className='material-icons'>{volume > 0 && !muted ? 'volume_up' : 'volume_off'}</i>
        <Slider onChange={onChange} style={{flexGrow: 1, marginTop: 22}} min={0} max={1} value={muted ? 0 : volume} />
      </div>
    </MuiThemeProvider>
  )
}

VideoVolume.defaultProps = {
  current: 0,
  onChange: () => {}
}

VideoVolume.propTypes = {
  volume: PropTypes.number,
  muted: PropTypes.bool,
  onChange: PropTypes.func
}
