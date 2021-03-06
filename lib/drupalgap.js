/**
 * Module dependencies.
 */
var utils = require('./utils'),
    fs = require('fs-extra'),
    vm = require('vm');

/**
 * Initialize DrupalGap context.
 */
exports.init = function (callback) {
  // Create DrupalGap sandbox.
  var drupalGapSandbox = {
    Drupal: {
      settings: {
        cache: {
          entity: {},
          views: {}
        }
      },
      modules: {
        contrib: {},
        custom: {}
      }
    },
    drupalgap: {
      settings: {}
    },
    menu_popup_get_default_options: function() {}
  };

  // Create DrupalGap context based on the sandbox data.
  var drupalGapContext = vm.createContext(drupalGapSandbox);

  // If current directory is DrupalGap SDK.
  if (utils.isDrupalGapDir()) {
    var content = fs.readFileSync('app/settings.js');
    vm.runInContext(content, drupalGapContext);
    callback(drupalGapContext);
  }
  else {
    console.log('Please run command from DrupalGapSDK directory.');
    process.exit(1);
  }
};
