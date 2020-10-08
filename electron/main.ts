import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 210,
    height: 156,
    webPreferences: {
      nodeIntegration: true
    },
    minimizable:false,
    alwaysOnTop: true,
    resizable: false,
    maximizable:false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    title: 'uixLol', 
  })
  mainWindow.setAlwaysOnTop(true, 'normal', 1);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    }
  })
app.allowRendererProcessReuse = true
