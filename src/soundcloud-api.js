var Q = require('q');
var loadScript = require('load-script');

var deferredApi = Q.defer();

loadScript('https://w.soundcloud.com/player/api.js', function(err) {
  if (!err) {
    deferredApi.resolve(window.SC);
  } else {
    deferredApi.reject(err);
  }
});

module.exports = deferredApi.promise;
