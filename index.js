#!node
var program = require('commander');
var fs = require("fs");
var exec = require('child_process').exec;
var path = require('path');
var url = require ('url');
var chalk = require('chalk');
var taskFile = "";
var pwd = "";

program
  .version('1.0.0')
  .arguments('<cmd>')
  .option('-h, --html <html>','your index.html file directory. default is current directory')
  .option('-a, --app <app>','javascript/css root directory. default is current directry')
  .option('-d, --dest <dest>','build file destination. default is directry named dist')
  .action(function (cmd) {
     cmdValue = cmd;
     html = program.html?program.html:'';
     app = program.app?program.app:'';
     dest = program.dest?program.dest:'dist';
  })
  .parse (process.argv);
  if (typeof cmdValue === 'undefined') {
     console.log (chalk.red("Command missing.") + " run => " + chalk.cyan(" spa build-dev -h app -a app -d dist ") + chalk.dim("or look for help by running => ") + chalk.cyan(" spa --help"));
     process.exit(1);
  }
console.log (chalk.cyan("==============Starting build====================="));

//looking for the enviroment and prepare task file
switch (cmdValue) {
  case "build-dev":
    taskFile = "gulpfile_dev.js";
    break;
  case "build-prod":
    taskFile = "gulpfile_prod.js";
    break;
  default:
    console.log (chalk.red("\n" + "================No such command found!=========================="));
    process.exit(1);
}

try {
  prepareTaskFile ();
  executeGulp (path.resolve(__dirname, 'gulpfile_updated.js'));
} catch (e) {
  console.log ("\n" + chalk.red("=====================build failed. Please look for the logs.===================="));
  console.log ("\n" + chalk.red(e));
}

//preparing task file
function prepareTaskFile () {
  pwd = path.resolve(process.cwd());

  console.log ("\n" + chalk.yellow("================Customizing gulp==============="));

  var data = fs.readFileSync(path.resolve(__dirname, taskFile), 'utf-8');
  data = data.replace ("var htmlDir = '';", "var htmlDir = '" + url.resolve(pwd + "/", html) + "';");
  data = data.replace ("var appDir = '';", "var appDir = '" + url.resolve(pwd + "/", app) + "';");
  data = data.replace ("var dist = '';", "var dist = '" + url.resolve(pwd + "/", dest) + "';");

  fs.writeFileSync(path.resolve(__dirname, 'gulpfile_updated.js'), data, 'utf-8');

  console.log ("\n" + chalk.green("===================gulp files customized!!=================="));
}


//executing task file
function executeGulp (path) {
  console.log ("\n" + chalk.cyan("====================running build======================"));
  var child = exec("gulp --gulpfile " + path, function(error, stdout, stderr) {
    // handle error
    if (stderr) {
      console.log (chalk.red(stderr));
      process.exit(1);
    }

    console.log (stdout);
    if (error) {
        console.log ("\n" + chalk.red("=====================build failed. Please look for the logs.===================="));
        console.log ("\n" + chalk.red(error));
    } else {
      console.log ("\n" + chalk.green("=====================build complete. Destination directry is: " + url.resolve(pwd + "/", dest)));
    }
  });
}
