import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const loaderStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    margin: 0
}

export default function Loader() {
  return (
    <CircularProgress style={loaderStyle} size={2} />
  )
}

Loader.propTypes = {
}
