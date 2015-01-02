var stage = document.getElementById('stage');

var imageContainer = document.createElement('div');
imageContainer.className = 'image-container';
stage.appendChild(imageContainer);

var currShownImage = null;

var fixBugs = function(data) {
  return data
      .replace(/^(http:\/\/)+/, 'http://')
      .replace(/gifv$/, 'gif')
      .replace(/^http:\/\/https:\/\//, 'http://');
};

exports.prepare = function(item) {
  var image = new Image();
  image.src = fixBugs(item.data);
};

exports.show = function(item) {
  var image = new Image();
  image.src = fixBugs(item.data);
  imageContainer.appendChild(image);
  currShownImage = image;
};

exports.hide = function(item, nextItem) {
  imageContainer.removeChild(currShownImage);
};
