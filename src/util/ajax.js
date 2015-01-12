var Q = require('q');

exports.get = function(url) {
  var request = new XMLHttpRequest();

  request.open('GET', url, true);

  var deferred = Q.defer();

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      deferred.resolve(data);
    } else {
      deferred.reject();
    }
  };

  request.onerror = function() {
    deferred.reject();
  };

  request.send();

  return deferred.promise;
};

exports.post = function() {
  // TODO: Implement me
};
