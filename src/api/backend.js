var Q = require('q');
var ajax = require('../util/ajax');

var lastSort = null;

exports.loadMoreItems = function() {
  var deferredItems = Q.defer();

  var uri;
  if (lastSort) {
    uri = '/api/items?first=' + lastSort;
  } else {
    uri = '/api/items';
  }

  ajax.get(uri).then(function(items) {
    if (!Array.isArray(items)) {
      var noArrayMsg = 'api did not return an array of items';
      return deferredItems.reject(new Error(noArrayMsg));
    }

    if (items.length < 1) {
      var emptyArrayMsg = 'api returned an empty array of items';
      return deferredItems.resolve(new Error(emptyArrayMsg));
    }

    var lastItem = items[items.length - 1];
    lastSort = lastItem._sort;
    deferredItems.resolve(items);
  });

  return deferredItems.promise;
};
