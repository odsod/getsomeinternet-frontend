var Q = require('q');

var stageController = require('./stage');
var expBarController = require('./exp-bar');
var adjectiveButtonsController = require('./adjective-buttons');
var voteButtonsController = require('./vote-buttons');
var nextButtonController = require('./button');
var textController = require('./text');

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var title = textController.create({
  domElement: document.getElementById('title')
});

var score = textController.create({
  domElement: document.getElementById('score')
});

var nextButton = nextButtonController.create({
  emitter: emitter,
  domElement: document.getElementById('next-button')
});

nextButton.on('click', function() {
  emitter.emit('next');
});

var voteButtons = voteButtonsController.create({
  emitter: emitter,
  domElements: {
    upvoteButton: document.getElementById('upvote-button'),
    downvoteButton: document.getElementById('downvote-button')
  }
});

var positiveButtons = document.querySelectorAll('.positive-button');
var negativeButtons = document.querySelectorAll('.negative-button');
var adjectiveButtons = adjectiveButtonsController.create({
  emitter: emitter,
  domElements: {
    positiveButtons: [].slice.call(positiveButtons),
    negativeButtons: [].slice.call(negativeButtons)
  }
});

var expBar = expBarController.create({
  domElement: document.getElementById('exp-bar')
});

var stage = stageController.create({
  domElements: {
    imageContainer: document.getElementById('image-container'),
    youtubeContainer: document.getElementById('youtube-container'),
    soundcloudContainer: document.getElementById('soundcloud-container')
  }
});

var showItem = function(item) {
  title.setText(item.title);
  score.setText(item.score);
  stage.showItem(item);
};

window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 39: // right
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

var showHeader = function() {
  document.getElementById('header').classList.remove('hidden');
};

var hideHeader = function() {
  var deferred = Q.defer();
  document.getElementById('header').classList.add('hidden');
  setTimeout(function() {
    deferred.resolve();
  }, 250);
  return deferred.promise;
};

function scrollToTop() {
  window.scrollTo(0, 0);
}

function setLevel(level) {
  switch (level) {
    case 1:
      voteButtons.setVisible(false);
      adjectiveButtons.setVisible(false);
      break;
    case 2:
      voteButtons.setVisible(true);
      adjectiveButtons.setVisible(false);
      break;
    case 3:
      voteButtons.setVisible(false);
      adjectiveButtons.setVisible(true);
      break;
  }
}

exports.on = emitter.on.bind(emitter);
exports.scrollToTop = scrollToTop;
exports.showItem = showItem;
exports.hideHeader = hideHeader;
exports.showHeader = showHeader;
exports.setLevel = setLevel;
exports.preloadItem = stage.preloadItem;
exports.setExpPercentage = expBar.setExpPercentage;
