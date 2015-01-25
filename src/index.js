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

// TODO(poscar): Write this code properly
var hasUpgradedOnce = false;
ui.on('next', function() {
  ui.scrollToTop();
  expPercentage = (expPercentage + 5) % 100;
  if (expPercentage === 0 && !hasUpgradedOnce) {
    ui.hideHeader().then(function() {
      ui.enableVoting();
      hasUpgradedOnce = true;
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
