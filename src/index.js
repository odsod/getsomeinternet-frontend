var api = require('./api/backend-mock');
var ui = require('./ui');

var queuedItems = [];

var addItemsToQueue = function(items) {
  items.forEach(ui.preloadItem);
  queuedItems = queuedItems.concat(items);
};

var showNextItemAndMaybeLoadMore = function() {
  ui.showItem(queuedItems.shift());
  if (queuedItems.length < 5) {
    api.loadMoreItems().then(addItemsToQueue);
  }
};

ui.on('next', showNextItemAndMaybeLoadMore);
ui.on('upvote', showNextItemAndMaybeLoadMore);
ui.on('downvote', showNextItemAndMaybeLoadMore);

// initialize
api.loadMoreItems().then(function(items) {
  addItemsToQueue(items);
  showNextItemAndMaybeLoadMore();
});
