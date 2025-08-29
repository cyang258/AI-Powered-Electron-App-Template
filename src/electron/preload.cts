const { contextBridge, ipcRenderer } = require("electron");
// const USERDB = require('./database/user');

// Expose the API to the renderer process
contextBridge.exposeInMainWorld("API", {
  ollama: {
    sendCommand: (text: string) => ipcRenderer.send("chat:send", text),
    onChatReply: (callback: (event: any, data: any) => void) => {
      ipcRenderer.on("chat:reply", (event: any, data: any) => callback(event, data));
    },
    stopChat: () => ipcRenderer.send("chat:stop"),
    loadDocument: () => ipcRenderer.send("doc:load"),
    onDocumentLoaded: (callback: (event: any, data: any) => void) => {
      ipcRenderer.on("doc:load", (event: any, data: any) => callback(event, data));
    },
    serveOllama: () => ipcRenderer.send("ollama:serve"),
    onOllamaServe: (callback: (event: any, data: any) => void) => {
      ipcRenderer.on("ollama:serve", (event: any, data: any) => callback(event, data));
    },
    runOllama: () => ipcRenderer.send("ollama:run"),
    onOllamaRun: (callback: (event: any, data: any) => void) => {
      ipcRenderer.on("ollama:run", (event: any, data: any) => callback(event, data));
    },
    getModel: () => ipcRenderer.send("model:get"),
    onModelGet: (callback: (event: any, data: any) => void) => {
      ipcRenderer.on("model:get", (event: any, data: any) => callback(event, data));
    },
    setModel: (model: string) => ipcRenderer.send("model:set", model),
  },
  // db: {
  //   initDB: () => ipcRenderer.send("db:init"),
  //   onDBInitiated: (callback: (event: any, data: any) => void) => {
  //     ipcRenderer.on("db:init", (event: any, data: any) => callback(event, data));
  //   },
  //   // user: {
  //   //   getAllUsers: () => ipcRenderer.send("allUser:get")
  //   // }
  // }
});
