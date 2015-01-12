var imageController = require('./image');
var youtubeController = require('./youtube');
var soundcloudController = require('./soundcloud');

var observable = require('../../util/observable');

var create = function(domElements) {
  var subControllers = {
    img: imageController.create(domElements.imageContainer),
    youtube: youtubeController.create(domElements.youtubeContainer),
    soundcloud: soundcloudController.create(domElements.soundcloudContainer)
  };
  subControllers.gif = subControllers.img;

  var currShownItem = observable();

  var preloadItem = function(item) {
    subControllers[item.type].preloadItem(item);
  };

  currShownItem.subscribe(function(currShownItem, prevShownItem) {
    if (prevShownItem) {
      subControllers[prevShownItem.type].hideItem(prevShownItem, currShownItem);
    }
    subControllers[currShownItem.type].showItem(currShownItem);
  });

  return {
    preloadItem: preloadItem,
    showItem: currShownItem.set
  };
};

exports.create = create;
