import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: 'calc(100vh - 40px)',
    top: 40,
    left: 0,
    zIndex: 100000,
    backgroundColor: '#212121'
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    margin: 0
  }
}

export default function Loader() {
  return (
    <div style={styles.container}>
      <CircularProgress style={styles.loader} size={2} />
    </div>
  )
}

Loader.propTypes = {
}
