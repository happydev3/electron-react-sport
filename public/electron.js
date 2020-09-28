require('electron-reload')(__dirname,{ignored: /data|[\/\\]\./});

const {app, BrowserWindow} = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

async function createWindow() {
    mainWindow = new BrowserWindow({
		width: 992, 
		height: 630,
		frame: false,
		darkTheme: true,
		backgroundColor: "#03213a",
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		}
    });
    mainWindow.on("ready-to-show", async () => {
        mainWindow.show();
    });
    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("activate", () => {
    if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

