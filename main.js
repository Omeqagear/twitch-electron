const electron      = require('electron')
const app           = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

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

	mainWindow.loadURL(`file://${__dirname}/public/index.html`)
	mainWindow.webContents.openDevTools()	

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