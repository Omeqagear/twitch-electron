const { BrowserWindow } = require('electron').remote

export const createWindow = (url) => {
  const win = new BrowserWindow({
    show: true,
    width: 1024,
    moveable: true,
    frame: false,
    titleBarStyle: 'hidden',
    height: 728,
    webPreferences: {
      webSecurity: false,
    },
  })
  win.loadURL(`http://localhost:${process.env.ENV == 'development' ? 3002 : 6005}/#${url}`)
}
