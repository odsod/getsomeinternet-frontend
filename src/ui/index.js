var nav = require('./nav');
var stage = require('./stage');
var expBar = require('./exp-bar');

var navController = nav.create({
  nextButton: document.getElementById('next-button')
});

var expBarController = expBar.create(document.getElementById('exp-bar'));

var stageController = stage.create({
  imageContainer: document.getElementById('image-container'),
  youtubeContainer: document.getElementById('youtube-container'),
  soundcloudContainer: document.getElementById('soundcloud-container')
});

var showItem = function(item) {
  //headerController.showItem(item);
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

exports.on = on;
exports.showItem = showItem;
exports.preloadItem = stageController.preloadItem;
exports.setExpPercentage = expBarController.setExpPercentage;
