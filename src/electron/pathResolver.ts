import path from 'path';
import { app } from 'electron';
import { isDev } from './util.js';

export function getPreloadPath() {
    console.log("packaged? " + app.isPackaged)
    return path.join(app.getAppPath(), (isDev() || app.isPackaged) ? '.' : '..', '/dist-electron/preload.cjs')
}