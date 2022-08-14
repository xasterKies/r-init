#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

// utility package import
const files = require('./lib/files')
const inquirer = require('./lib/inquirer')
const github = require('./lib/github')


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
  try {
    // Retrieve and Set Authentication Token
    const token = await getGithubToken();
    github.githubAuth(token)

    // Create .gitignore file
    await repo.createGitignore()

    // Set up local repository and push to remote
    const done = await repo.setupRepo(url)
    if(done) {
      console.log(chalk.green('All done'));
    }

  } catch(err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(chalk.red('Couldn\'t log you in. Please provide correct credidentials/token.'))
          break
        case 422:
          console.log(chalk.red('There already exists a remote repository with the same name'))
          break
        default:
          console.log(err)
      }
    }
  }
  
}
run()

const getGithubToken = async () => {
  // Fetch token from config store
  let token = github.getStoredGithubToken();
  if (token) {
    return token
  }

  // No token found use credidential to access github access
  await github.setGithubCredidentials();

  // register new token
  token = await github.registerNewToken()
  return token
}