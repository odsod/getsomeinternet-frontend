var Q = require('q');
var futureYT = require('../../api/youtube');

var createFuturePlayer = function(domElement) {
  return futureYT.then(function(YT) {
    var deferred = Q.defer();
    var player = new YT.Player(domElement, {
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
};

var create = function(domElement) {
  var playerElement = domElement.firstChild;
  if (!playerElement || playerElement.tagName !== 'DIV') {
    throw new Error('Expected <div> as first child of',
                    domElement, 'but was', playerElement);
  }
  var futurePlayer = createFuturePlayer(playerElement);

  domElement.classList.add('hidden');

  var showItem = function(item) {
    futurePlayer.then(function(player) {
      player.loadVideoById(item.data);
    });
    domElement.classList.remove('hidden');
  };

  var hideItem = function(item, nextItem) {
    futurePlayer.then(function(player) {
      if (nextItem.type !== 'youtube') {
        player.stopVideo();
      }
    });
    domElement.classList.add('hidden');
  };

  return {
    preloadItem: function() {},
    showItem: showItem,
    hideItem: hideItem
  };
};

exports.create = create;
