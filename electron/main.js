const { app, BrowserWindow, Menu } = require("electron");
const path = require("node:path");
const express = require("express");

const APP_ROOT = path.join(__dirname, "..");
const RENDERER_DIST = path.join(APP_ROOT, ".output/public");
const VITE_DEV_SERVER = "http://localhost:3000";

const environment = process.env.ENVIRONMENT;
const PRODUCTION_SERVER_PORT = 3001;

let win;
let server;

// im kinda hacking this together, it's not meant to work like this lol
function startStaticServerAndLoad() {
  const staticApp = express();
  staticApp.use(express.static(RENDERER_DIST));
  server = staticApp.listen(PRODUCTION_SERVER_PORT, () => {
    console.log(
      `Static server running at http://localhost:${PRODUCTION_SERVER_PORT}`
    );
    win
      .loadURL(`http://localhost:${PRODUCTION_SERVER_PORT}`)
      .then(() => win.show())
      .catch((err) => {
        console.error("Failed to load static server:", err);
        app.quit();
      });
  });
}

app.whenReady().then(() => {
  win = new BrowserWindow({
    center: true,
    frame: true,
    title: "yukae",
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      devTools: environment === "development",
      nodeIntegration: true,
      contextIsolation: true,
      scrollBounce: true,
      allowRunningInsecureContent: false,
      webSecurity: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  if (environment === "production") {
    Menu.setApplicationMenu(null);
    startStaticServerAndLoad();
  } else
    win
      .loadURL(VITE_DEV_SERVER)
      .then(() => {
        win.show();
        win.webContents.openDevTools();
      })
      .catch((err) => {
        console.error("Failed to load dev server:", err);
        // fallback to production static server
        startStaticServerAndLoad();
      });

  // when window closed turn off server
  win.on("closed", () => {
    win = null;
    if (server) {
      server.close();
      server = null;
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    app.whenReady().then(() => {
      win = new BrowserWindow({
        center: true,
        frame: false,
        title: "yukae",
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
          devTools: environment === "development",
          nodeIntegration: false,
          contextIsolation: true,
          scrollBounce: true,
          allowRunningInsecureContent: false,
          webSecurity: true,
        },
      });

      if (environment === "production") {
        win.removeMenu();
        startStaticServerAndLoad();
      } else {
        win
          .loadURL(VITE_DEV_SERVER)
          .then(() => {
            win.show();
            win.webContents.openDevTools();
          })
          .catch((err) => {
            console.error("Failed to load dev server:", err);
            startStaticServerAndLoad();
          });
      }

      win.on("closed", () => {
        win = null;
        if (server) {
          server.close();
          server = null;
        }
      });
    });
  }
});
