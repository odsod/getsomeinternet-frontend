var EventEmitter = require('events').EventEmitter;

module.exports = function(initialValue) {
  var emitter = new EventEmitter();
  var value = initialValue;

  var get = function() {
    return value;
  };

  var set = function(newValue) {
    var prevValue = value;
    value = newValue;
    if (prevValue !== newValue) {
      emitter.emit('update', newValue, prevValue);
    }
  };

  var subscribe = function(cb) {
    emitter.addListener('update', cb);
  };

  var unsubscribe = function(cb) {
    emitter.removeListener('update', cb);
  };

  return {
    get: get,
    set: set,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };
};
