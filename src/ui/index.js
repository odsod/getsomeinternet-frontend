//var nav = require('./nav');
//var header = require('./header');
var stage = require('./stage');

//var navController = nav.create({
  //upvoteButton: document.getElementById('upvote'),
  //downvoteButton: document.getElementById('downvote'),
  //nextButton: document.getElementById('next')
//});

//var headerController = header.create({
  //score: document.getElementById('score'),
  //title: document.getElementById('title')
//});

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
  //navController.on(eventType, cb);
};

window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 39: // right
      //navController.next();
      e.preventDefault();
      break;
    case 38:
      //navController.setSelectedVote('upvote');
      e.preventDefault();
      break;
    case 37:
      //navController.setSelectedVote('downvote');
      e.preventDefault();
      break;
  }
});

exports.on = on;
exports.showItem = showItem;
exports.preloadItem = stageController.preloadItem;
