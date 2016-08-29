const { BrowserWindow } = require('electron').remote

export const createWindow = (url) => {
	const rootUrl = require('electron').remote.getCurrentWindow().webContents.getURL().split('#')
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
	win.loadURL(rootUrl[0] + '#' + url)
}
