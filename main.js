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

expressApp.listen(6005)

let mainWindow


const getLoginURL = () => {
	return 'https://api.twitch.tv/kraken/oauth2/authorize?client_id=4qe04be53ecrr1ya356a65qq8ms1szf&redirect_uri=http%3A%2F%2Flocalhost%3A6005&response_type=token&scope=user_read+channel_read'
}

const createWindow = () => {
  const url = getLoginURL()
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

	mainWindow.loadURL(url)

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