var Q = require('q');
var request = require('superagent');

//var testItems = [{
  //type: 'gif',
  //data: 'http://media.giphy.com/media/1Anamuv8XEimQ/giphy.gif',
  //score: 182
//}, {
  //type: 'soundcloud',
  //title: 'I\'ve been thinking about you (Dilemmachine Remix)',
  //data: '94160734',
  //score: 7
//}, {
  //type: 'youtube',
  //title: 'Everyone is not Jesus',
  //data: 'GllR1WyDzJc',
  //score: 81
//}, {
  //type: 'gif',
  //data: 'https://s3.amazonaws.com/giphymedia/media/d8qrbB7GKlhza/giphy.gif',
  //score: 12
//}, {
  //type: 'youtube',
  //title: 'Arnold\'s tank',
  //score: 9
//}];

var lastSort = null;

exports.loadMoreItems = function() {
  var deferredItems = Q.defer();
  var uri;
  if (lastSort) {
    uri = '/api/items?first=' + lastSort;
  } else {
    uri = '/api/items';
  }

  console.log('requesting', uri);
  request(uri, function(err, res) {
    if (err) {
      return deferredItems.reject(err);
    }

    var statusCode = res.xhr.status;
    if (statusCode < 200 || statusCode >= 300) {
      var statusCodeMsg = 'api returned status code ' + statusCode;
      return deferredItems.reject(new Error(statusCodeMsg));
    }

    var items = res.body;

    if (!Array.isArray(items)) {
      var noArrayMsg = 'api did not return an array of items';
      return deferredItems.reject(new Error(noArrayMsg));
    }

    if (items.length < 1) {
      var emptyArrayMsg = 'api returned an empty array of items';
      return deferredItems.resolve(new Error(emptyArrayMsg));
    }

    console.log('got items from backend', items);

    var lastItem = items[items.length - 1];
    lastSort = lastItem._sort;
    console.log('lastSort', lastSort);
    deferredItems.resolve(items);
  });

  return deferredItems.promise;
};
