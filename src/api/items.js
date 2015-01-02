var Q = require('q');
var request = require('superagent');

var testItems = [
  {type: 'gif', data: 'http://media.giphy.com/media/1Anamuv8XEimQ/giphy.gif', score: 182},
  {title: 'I\'ve been thinking about you (Dilemmachine Remix)', type: 'soundcloud', data: '94160734', score: 7},
  {title: 'Everyone is not Jesus', type: 'youtube', data: 'GllR1WyDzJc', score: 81},
  {type: 'gif', data: 'https://s3.amazonaws.com/giphymedia/media/d8qrbB7GKlhza/giphy.gif', score: 12},
  {title: 'Arnold\'s tank', type: 'youtube', data: 'jVs5kgvA_Ow', score: 9}
  //{type: 'gif', data: 'https://s3.amazonaws.com/giphymedia/media/QUDH4Aepdq4U0/giphy.gif', score: 13},
  //{type: 'gif', data: 'https://s3.amazonaws.com/giphymedia/media/hzN96x2i8R2GQ/giphy.gif', score: 14},
  //{type: 'gif', data: 'https://s3.amazonaws.com/giphymedia/media/GzjFAsz1DjGog/giphy.gif', score: 15}
];

exports.loadMoreItems = function() {
  var deferredItems = Q.defer();
  request('/api/items', function(err, res) {
    if (err || res.xhr.status < 200 || res.xhr.status >= 300) {
      console.log('failed to get items.. using test items instead');
      deferredItems.resolve(testItems);
    } else {
      console.log('got items from backend', res.body);
      deferredItems.resolve(res.body);
    }
  });
  return deferredItems.promise;
};
