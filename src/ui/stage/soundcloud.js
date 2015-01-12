var Q = require('q');
var futureSC = require('../../api/soundcloud');

var PLACEHOLDER_SONG = 'http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538';
var WIDGET_URL = 'https://w.soundcloud.com/player/?url=' + PLACEHOLDER_SONG;

var createFutureWidget = function(iframeElement) {
  return futureSC.then(function(SC) {
    iframeElement.src = WIDGET_URL;
    iframeElement.width = '500px';
    var widget = new SC.Widget(iframeElement);
    var deferred = Q.defer();
    widget.bind(SC.Widget.Events.READY, function() {
      deferred.resolve(widget);
    });
    return deferred.promise;
  });
};

var create = function(domElement) {
  var iframeElement = domElement.firstChild;
  if (!iframeElement || iframeElement.tagName !== 'IFRAME') {
    throw new Error('Expected <iframe> as first child of',
                    domElement, 'but was', iframeElement);
  }
  var futureWidget = createFutureWidget(iframeElement);

  domElement.classList.add('hidden');

  var showItem = function(item) {
    futureWidget.then(function(widget) {
      widget.load('http://api.soundcloud.com/tracks/' + item.data, {
        show_artwork: true,
        auto_play: true
      });
    });
    domElement.classList.remove('hidden');
  };

  var hideItem = function(item, nextItem) {
    if (nextItem.type !== 'soundcloud') {
      futureWidget.then(function(widget) {
        widget.pause();
      });
      domElement.classList.add('hidden');
    }
  };

  return {
    preloadItem: function() {},
    showItem: showItem,
    hideItem: hideItem
  };
};

exports.create = create;
