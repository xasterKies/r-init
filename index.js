const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

// utility package import
const files = require('./lib/files')
const inquirer = require('./lib/inquirer')


const Configstore = require('configstore')
const conf = new Configstore('r-init')


// Styles for the blank console
clear();
console.log(
  chalk.yellow(
    figlet.textSync('R-init', { horizontalLayout: 'full' })
  )
)

// Checks if a the particular repository exist already
if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'));
  process.exit();
}

const run = async () => {
  const credidentials = await inquirer.askGithubCredidentials()
  console.log(credidentials)
}

run()