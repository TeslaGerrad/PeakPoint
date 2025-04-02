const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

contextBridge.exposeInMainWorld(
  'electron',
  {
    fs: {
      readFile: (filePath) => {
        try {
          return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.error('Read file error:', error);
          return null;
        }
      },
      writeFile: (filePath, data) => {
        try {
          fs.writeFileSync(filePath, data, 'utf8');
          return true;
        } catch (error) {
          console.error('Write file error:', error);
          return false;
        }
      },
      exists: (filePath) => {
        return fs.existsSync(filePath);
      },
      mkdir: (dirPath) => {
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          return true;
        } catch (error) {
          console.error('Mkdir error:', error);
          return false;
        }
      }
    },
    path: {
      join: (...args) => path.join(...args)
    },
    crypto: {
      hashPassword: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
      }
    },
    getUserDataPath: () => ipcRenderer.invoke('get-user-data-path')
  }
);