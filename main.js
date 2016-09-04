const electron      = require('electron')
const express       = require('express')
const path          = require('path')
const expressApp    = express()
const app           = electron.app
const BrowserWindow = electron.BrowserWindow

expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

expressApp.use('/js', express.static(path.join(__dirname, 'public/js')))
expressApp.use('/styles', express.static(path.join(__dirname, 'public/styles')))

expressApp.listen(process.env.ENV == 'development' ? 3002 : 6005)

let mainWindow

const getLoginURL = (clientId, port) => {
  return `https://api.twitch.tv/kraken/oauth2/authorize?client_id=${clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A${port}&response_type=token&scope=user_read+channel_read`
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    moveable: true,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
    },
  })

  mainWindow.loadURL(
    getLoginURL(
      process.env.ENV == 'development' ? '9itztcf66hbjxkud5i9ypfvrcmo5suw' : '4qe04be53ecrr1ya356a65qq8ms1szf',
      process.env.ENV == 'development' ? 3002 : 6005
    )
  )

  if (process.env.ENV == 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
