var ko = require('knockout');

var seenItems = require('./seen-items');

var vm = {};

vm.item = ko.observable(null);

vm.score = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.score;
});

vm.type = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.type;
});

vm.data = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.data;
});

vm.title = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.title;
});

vm.isYouTubeItem = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.type === 'youtube';
});

vm.isSoundCloudItem = ko.computed(function() {
  var currItem = vm.item();
  return currItem && currItem.type === 'soundcloud';
});

vm.isImageItem = ko.computed(function() {
  var currItem = vm.item();
  return currItem && (currItem.type === 'gif' || currItem.type === 'image');
});

vm.youTubeUrl = ko.computed(function() {
  return vm.isYouTubeItem() && '//www.youtube.com/embed/' + vm.data();
});

vm.soundCloudUrl = ko.computed(function() {
  return vm.isSoundCloudItem() && 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + vm.data() + '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
});

var items = [
  {title: 'Everyone is not Jesus', type: 'youtube', data: 'GllR1WyDzJc', score: 81},
  {title: 'Arnold\'s tank', type: 'youtube', data: 'jVs5kgvA_Ow', score: 9},
  {title: 'I\'ve been thinking about you (Dilemmachine Remix)', type: 'soundcloud', data: '94160734', score: 7},
  {type: 'gif', data: 'http://media.giphy.com/media/1Anamuv8XEimQ/giphy.gif', score: 11}
];

var currItem = 0;

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 39) { // left key
    nextItem();
  }
});

vm.item(items[0]);

var nextItem = function() {
  currItem = (currItem + 1) % items.length;
  vm.item(items[currItem]);
};

var votePlusAndNextItem = function() {
  nextItem();
};

var voteMinusAndNextItem = function() {
  nextItem();
};

vm.onNextClick = nextItem;
vm.onPlusClick = votePlusAndNextItem;
vm.onMinusClick = voteMinusAndNextItem;

ko.applyBindings(vm);
