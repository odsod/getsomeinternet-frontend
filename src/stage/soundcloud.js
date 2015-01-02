var Q = require('q');

var playerContainer = document.createElement('div');
playerContainer.className = 'soundcloud-player hidden';
document.getElementById('stage').appendChild(playerContainer);

var deferredPlayer = require('../api/soundcloud').then(function(SC) {
  var playerNode = document.createElement('iframe');
  playerNode.src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true';
  playerNode.width = '500px';
  playerContainer.appendChild(playerNode);
  var widget = new SC.Widget(playerNode);
  var deferred = Q.defer();
  widget.bind(SC.Widget.Events.READY, function() {
    deferred.resolve(widget);
  });
  return deferred.promise;
});

exports.prepare = function(item) {
};

exports.show = function(item) {
  deferredPlayer.then(function(player) {
    player.load('http://api.soundcloud.com/tracks/' + item.data, {
      show_artwork: true,
      auto_play: true
    });
  });
  playerContainer.className = 'soundcloud-player';
};

exports.hide = function(item, nextItem) {
  deferredPlayer.then(function(player) {
    player.pause();
  });
  playerContainer.className = 'soundcloud-player hidden';
};
