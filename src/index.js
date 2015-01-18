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

var expPercentage = 0;

ui.setExpPercentage(0);

ui.on('next', function() {
  expPercentage = (expPercentage + 5) % 100;
  ui.setExpPercentage(expPercentage);
});

ui.on('upvote', showNextItemAndMaybeLoadMore);
ui.on('downvote', showNextItemAndMaybeLoadMore);

// initialize
api.loadMoreItems().then(function(items) {
  addItemsToQueue(items);
  showNextItemAndMaybeLoadMore();
});
