var stage = document.getElementById('stage');

var currShownImage = null;

exports.prepare = function(item) {
  var image = new Image();
  image.src = item.data;
};

exports.show = function(item) {
  var image = new Image();
  image.src = item.data;
  stage.appendChild(image);
  currShownImage = image;
};

exports.hide = function(item, nextItem) {
  stage.removeChild(currShownImage);
};
