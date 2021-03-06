/**
 * Module dependencies.
 */
var utils = require('./utils'),
    pjson = require('../package.json');

/**
 * Bootstrap DrupalGapManager.
 */
exports.bootstrap = function (commands, args, options) {
  if (options.v === true || options.version === true) {
    console.log(pjson.version);
  }
  else if (options.h === true || options.help === true) {
    exports.usage(commands);
  }
  else {
    if (!args.length) {
      exports.usage(commands);
    }
    else {
      var cmd = args.shift();
      if (cmd in commands) {
        commands[cmd].run(commands, args, options);
      }
      else {
        console.log('No such command: ' + cmd);
        exports.usage(commands);
      }
    }
  }
};

/**
 * Display usage of DrupalGapManager.
 *
 * @param commands
 */
exports.usage = function(commands) {
  console.log('Usage: dgm COMMAND [ARGS]');
  console.log('');
  console.log('Available commands:');
  var len = utils.longest(Object.keys(commands));
  for (var k in commands) {
    console.log(
      '  ' + utils.paddingRight(k, len) + '    ' + commands[k].summary
    );
  }
};
