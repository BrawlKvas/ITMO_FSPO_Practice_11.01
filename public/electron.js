const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

require(path.join(__dirname, "database/handlers"))()

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1024,

    minHeight: 768,
    icon: path.join(__dirname, 'logomini.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  })

  win.setMenuBarVisibility(false)

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, "../build/index.html")}`
  )

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})