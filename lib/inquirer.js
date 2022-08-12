const inquirer = require('inquirer')
const files = require('./files')

module.exports = {
  
  askGithubCredidentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter you Github username or e-mail address:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.'
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter your password.'
          }
        }
      }

    ]
    // Ask the user the questions in the above array
    return inquirer.prompt(questions)

  },

  askRepoDetails: () => {
    const argv = require('minimist')
    (process.argv.slice(2))

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name of the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate : function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.'
          }
        }
      }, 
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private',
        choices: ['public', 'private'],
        default: 'public'
      }
    ]
    return inquirer.prompt(questions)
  }
}