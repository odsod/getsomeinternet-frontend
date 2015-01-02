var api = require('./api/items');
var ui = require('./ui');
var stage = require('./stage');

var queuedItems = [];

var addItemsToQueue = function(items) {
  console.log('adding items to queue', items);
  items.forEach(stage.prepare);
  queuedItems = queuedItems.concat(items);
  console.log('new queue', queuedItems);
};

var show = function(item) {
  console.log('showing', item);
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
  console.log('initial items', items);
  addItemsToQueue(items);
  showNextItem();
});
