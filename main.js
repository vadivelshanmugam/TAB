const electron = require('electron');
//const AutoLaunch = require('auto-launch');

const { app, BrowserWindow } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
//let autoLaunch


console.log("onload", app.isReady()) // false

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    setSkipTaskbar: true,
    icon: __dirname +  '/icon.icns'
  })
  win.setFullScreen(true);
  // and load the index.html of the app.
  win.loadFile('index.html')
  app.dock.show()
  app.dock.setBadge('T.A.B')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
    app.dock.hide()

    /*console.log("Closed", app.isReady())
    app.dock.hide()

    if(app.isReady()){
      setTimeout(() => {
        console.log("Inside Closed !!!")
        createWindow()
      }, 5000);
    }*/
  })

  /*electron.powerMonitor.on('lock-screen', () => {
    console.log('Lock Screen Create window')
    //win.hide()
    //app.exit(0)
  })

  electron.powerMonitor.on('unlock-screen', () => {
    console.log('Unlock Screen Create window !!!')
    //app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  })

  electron.powerMonitor.on('on-battery', () => {
    console.log('On Battery Create window !!!')
  })

  electron.powerMonitor.on('on-ac', () => {
    console.log('On AC Create window !!!')
  })*/

  win.on('minimize', function (event) {
    app.dock.hide()
    setTimeout(() => {
      createWindow()
    }, 5000);     
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  /*autoLaunch = new AutoLaunch({
    name: 'Your app name goes here',
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });*/

  //console.log("Path", app.getPath('exe'))

  setTimeout(() => {
      createWindow()
  }, 5000);
  //clearTimeout(myVar);
  //createWindow()
  console.log("Ready", app.isReady())
  electron.powerMonitor.on('lock-screen', () => {
    console.log('Lock Screen Ready !!!', app.isReady())
    if(win) {
      win.close()
    }
  })

  electron.powerMonitor.on('unlock-screen', () => {
    console.log('Unlock Screen Ready !!!', app.isReady())
    //createWindow()
    if(app.isReady()) {
      setTimeout(() => {
        console.log('Inside Unlock Screen !!!')
        createWindow()
      }, 5000);
    }
  })

  electron.powerMonitor.on('on-battery', () => {
    console.log('On Battery Ready !!!')
  })

  electron.powerMonitor.on('on-ac', () => {
    console.log('On AC Ready !!!')
  })

  electron.powerMonitor.on('resume', () => {
    console.log('On Resume Ready !!!')
  })

  electron.powerMonitor.on('suspend', () => {
    console.log('On Suspend Ready !!!')
  })

  electron.powerMonitor.on('shutdown', () => {
    console.log('On Shutdown Ready !!!')
  })

  //createWindow()
  idleStateCheck()
})

function idleStateCheck() {
  electron.powerMonitor.querySystemIdleState(5, (idleState) => {
    //console.log('idle State !!!', idleState)
  })

  setTimeout(() => {
    idleStateCheck()
  }, 1000);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  console.log("Quit", app.isReady())
})

/*app.on('before-quit', () => {
  win.removeAllListeners('close');
  win.close();
});*/

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.