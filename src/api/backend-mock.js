var Q = require('q');

var testItems = [{
  type: 'gif',
  data: 'http://media.giphy.com/media/1Anamuv8XEimQ/giphy.gif',
  score: 182
}, {
  type: 'soundcloud',
  title: 'I\'ve been thinking about you (Dilemmachine Remix)',
  data: '94160734',
  score: 7
}, {
  type: 'youtube',
  title: 'Everyone is not Jesus',
  data: 'GllR1WyDzJc',
  score: 81
}, {
  type: 'gif',
  data: 'https://s3.amazonaws.com/giphymedia/media/d8qrbB7GKlhza/giphy.gif',
  score: 12
}, {
  type: 'youtube',
  title: 'Arnold\'s tank',
  data: 'w4lnVx2BAYk',
  score: 9
}];

exports.loadMoreItems = function() {
  var deferred = Q.defer();
  deferred.resolve(testItems);
  return deferred.promise;
};
