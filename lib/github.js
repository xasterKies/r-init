const octokit = require('@octokit/rest')();
const ConfigStore = require('configstore')
const pkg = require('../package.json')
const lodash = require('loadash')
const CLI = require('clui')
const Spinner = CLI.Spinner;
const chalk = require('chalk')

const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name)

module.exports = {

  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken : () => {
    return conf.get('github.token')
  }, 

  setGithubCredidentials : async () => {
    const credidentials = await inquirer.askGithubCredidentials()
    octokit.authenticate(
      _.extend({
        type: 'basic'
      })
    )
  },

  registerNewToken : async () => {

  }
}

const status = new Spinner('Authenticating you, please wait...')
status.start()

status.stop()