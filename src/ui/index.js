var ko = require('knockout');

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var ui = {};

ui.score = ko.observable(null);
ui.title = ko.observable(null);

ui.onNextClick = function() {
  emitter.emit('next');
};

ui.onUpvoteClick = function() {
  emitter.emit('upvote');
};

ui.onDownvoteClick = function() {
  emitter.emit('downvote');
};

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 39) { // left key
    emitter.emit('next');
    e.preventDefault();
  }
});

ko.applyBindings(ui);

var show = function(item) {
  console.log('ui show', item);
  ui.score(item.score);
  ui.title(item.title);
};

module.exports = {
  show: show,
  on: emitter.on.bind(emitter)
};
