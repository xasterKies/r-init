const fs = require('fs')
const path = require('path')

module.exports = {
  getCurrentDirectoryBase : () => {
    // Return the current working directory
    return path.basename(process.cwd())
  },

  directoryExists : (filePath) => {
    try {
      // Getting if the information of filePath is a directory
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false
    }
  }
}