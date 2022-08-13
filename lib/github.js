const octokit = require('@octokit/rest');
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
      },
      credidentials
      )
    )
  },

  registerNewToken : async () => {
    const status = new Spinner('Authenticating you, please wait...')
    status.start()

    try {
      const response = await octokit.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'r-inits, the command-line tool for initializing git repos'
      });
      const token = response.data.token;
      if(token) {
        conf.set('github.token', token)
        return token;
      } else {
        throw new Error("Missing Token", "Github token was not found in the response");
      }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },

  githubAuth : (token) => {
    octokit.authenticate({
      type: 'oauth',
      token: token
    })
  },
  
}

const status = new Spinner('Authenticating you, please wait...')
status.start()

status.stop()