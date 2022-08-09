const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

// utility package import
const files = require('./lib/files')


// Styles for the blank console
clear();
console.log(
  chalk.green(
    figlet.textSync('R-init', { horizontalLayout: 'full' })
  )
)

// Checks if a the particular repository exist already
if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}