const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const defaultMenu = require('electron-default-menu');
const { Menu, shell } = electron;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const globalShortcut = electron.globalShortcut


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({frame: true, width: 1340, height: 800})

  mainWindow.setResizable(true)
  mainWindow.setFullScreenable(false)
  mainWindow.setMenu(null)
  // and load the index.html of the app.
  //mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  globalShortcut.register('f6', function() {
      console.log('f6 is pressed');
      mainWindow.toggleDevTools();
  })

  globalShortcut.register('f5', function() {
    console.log('f5 is pressed')
    mainWindow.reload()
  })
  globalShortcut.register('CommandOrControl+R', function() {
    console.log('CommandOrControl+R is pressed')
    mainWindow.reload()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){

  // const menu = defaultMenu(app, shell);

  createWindow();

  // var template = [{
  //         label: "Edit",
  //         submenu: [
  //             { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
  //             { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
  //         ]}
  //     ];
  //
  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
