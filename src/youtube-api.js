var Q = require('q');
var loadScript = require('load-script');

loadScript('https://www.youtube.com/iframe_api');

var deferredApi = Q.defer();

window.onYouTubeIframeAPIReady = function() {
  deferredApi.resolve(window.YT);
}

module.exports = deferredApi.promise;
