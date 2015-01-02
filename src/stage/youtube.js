var Q = require('q');

var playerContainer = document.createElement('div');
playerContainer.className = 'youtube-player hidden';
document.getElementById('stage').appendChild(playerContainer);

var deferredPlayer = require('../api/youtube').then(function(YT) {
  var playerNode = document.createElement('div');
  playerContainer.appendChild(playerNode);
  var deferred = Q.defer();
  var player = new YT.Player(playerNode, {
    width: 560,
    height: 315,
    events: {
      onReady: function() {
        deferred.resolve(player);
      }
    }
  });
  return deferred.promise;
});

exports.prepare = function(item) {
};

exports.show = function(item) {
  deferredPlayer.then(function(player) {
    console.log(item.data);
    console.log(player);
    player.loadVideoById(item.data);
  });
  playerContainer.className = 'youtube-player';
};

exports.hide = function(item, nextItem) {
  deferredPlayer.then(function(player) {
    if (nextItem.type !== 'youtube') {
      player.stopVideo();
      playerContainer.className = 'youtube-player hidden';
    }
  });
};
