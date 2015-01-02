var api = require('./api/items');
var ui = require('./ui');
var stage = require('./stage');

var queuedItems = [];

var addItemsToQueue = function(items) {
  console.log('add items to queue', items);
  items.forEach(stage.prepare);
  queuedItems = queuedItems.concat(items);
};

var show = function(item) {
  ui.show(item);
  stage.show(item);
};

var showNextItem = function() {
  show(queuedItems.shift());
  if (queuedItems.length < 5) {
    api.loadMoreItems().then(addItemsToQueue);
  }
};

ui.on('next', showNextItem);
ui.on('upvote', showNextItem);
ui.on('downvote', showNextItem);

// initialize
api.loadMoreItems().then(function(items) {
  addItemsToQueue(items);
  showNextItem();
});
