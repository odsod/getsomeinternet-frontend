var nav = require('./nav');
var stage = require('./stage');
var header = require('./header');
var expBar = require('./exp-bar');

var Q = require('q');

var navController = nav.create({
  nextButton: document.getElementById('next-button')
});

var headerController = header.create({
  title: document.getElementById('title'),
  score: document.getElementById('score')
});

var expBarController = expBar.create(document.getElementById('exp-bar'));

var stageController = stage.create({
  imageContainer: document.getElementById('image-container'),
  youtubeContainer: document.getElementById('youtube-container'),
  soundcloudContainer: document.getElementById('soundcloud-container')
});

var showItem = function(item) {
  headerController.showItem(item);
  stageController.showItem(item);
};

var on = function(eventType, cb) {
  navController.on(eventType, cb);
};

window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 39: // right
      navController.next();
      e.preventDefault();
      break;
    case 38:
      e.preventDefault();
      break;
    case 37:
      e.preventDefault();
      break;
  }
});

var hideHeader = function() {
  var deferred = Q.defer();
  document.getElementsByTagName('header')[0].classList.add('hidden');
  setTimeout(function() {
    deferred.resolve();
  }, 250);
  return deferred.promise;
};

var showHeader = function() {
  document.getElementsByTagName('header')[0].classList.remove('hidden');
};

document.getElementById('upvote-button').classList.add('disabled');
document.getElementById('downvote-button').classList.add('disabled');

var enableVoting = function() {
  document.getElementById('upvote-button').classList.remove('disabled');
  document.getElementById('downvote-button').classList.remove('disabled');
};

var scrollToTop = function() {
  window.scrollTo(0, 0);
};

exports.on = on;
exports.scrollToTop = scrollToTop;
exports.enableVoting = enableVoting;
exports.showItem = showItem;
exports.hideHeader = hideHeader;
exports.showHeader = showHeader;
exports.preloadItem = stageController.preloadItem;
exports.setExpPercentage = expBarController.setExpPercentage;
