var fixBugs = function(data) {
  return data
      .replace(/^(http:\/\/)+/, 'http://')
      .replace(/gifv$/, 'gif')
      .replace(/^http:\/\/https:\/\//, 'http://');
};

var create = function(domElement) {
  var currShownImage = null;

  var preloadItem = function(item) {
    var image = new Image();
    image.src = fixBugs(item.data);
  };

  var showItem = function(item) {
    var image = new Image();
    image.src = fixBugs(item.data);
    domElement.appendChild(image);
    currShownImage = image;
  };

  var hideItem = function(item) {
    domElement.removeChild(currShownImage);
  };

  return {
    preloadItem: preloadItem,
    showItem: showItem,
    hideItem: hideItem
  };
};

exports.create = create;
