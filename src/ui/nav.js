var EventEmitter = require('events').EventEmitter;

var create = function(domElements) {
  var emitter = new EventEmitter();

  var next = function() {
    emitter.emit('next');
  };

  domElements.nextButton.addEventListener('click', function(e) {
    e.preventDefault();
    next();
  });

  return {
    next: next,
    on: emitter.on.bind(emitter)
  };
};

exports.create = create;
