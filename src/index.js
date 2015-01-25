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

var level = 1;
ui.setLevel(level);

// TODO(poscar): Write this code properly
ui.on('next', function() {
  ui.scrollToTop();
  expPercentage = (expPercentage + 5) % 100;
  if (expPercentage === 0) {
    ui.hideHeader().then(function() {
      level += 1;
      ui.setLevel(level);
      ui.showHeader();
    });
  }
  ui.setExpPercentage(expPercentage);
  showNextItemAndMaybeLoadMore();
});

// initialize
api.loadMoreItems().then(function(items) {
  addItemsToQueue(items);
  showNextItemAndMaybeLoadMore();
});
