const inquirer = require('inquirer')
const touch = require('touch')
const files = require('./files')

module.exports = {
  
  askGithubCredentials: () => {
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

  getTwoFactorAuthenticationCode: () => {
    return inquirer.prompt({
      name: 'twoFactorAuthenticationCode',
      type: 'input',
      message: 'Enter your two-factor authentication code:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your two-factor authentication code.';
        }
      }
    });
  },

  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: [ 'public', 'private' ],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  }, 

  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'igonore',
        message: 'Select the files and/or folders you wish to ignore:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ]
    return inquirer.prompt(questions)
  }, 

  createGitignore: async () => {
    const filelist = 
    _.without(fs.readdirSync('.'), '.git', '.gitignore')

    if (filelist.length) {
      const answers = await inquirer.askIgnoreFiles(filelist)
      if (answers.ignore.length) {
        fs.writeFileSync('.gitignore', answers.ignore.join( '\n'))
      } else {
        touch( '.gitignore' )
      }
    } else {
      touch('.gitignore')
    }
  },

  
}

