var observable = require('../util/observable');
var dom = require('../util/dom');

var setTextOrHide = function(domElement) {
  return function(text) {
    console.log(text);
    if (text === undefined || text === null) {
      dom.hide(domElement);
    } else {
      dom.setText(domElement, text);
      dom.show(domElement);
      console.log(domElement);
    }
  };
};

var create = function(domElements) {
  var title = observable(null);
  var score = observable(null);

  console.log(domElements.title);

  var showItem = function(item) {
    item = item || {};
    title.set(item.title);
    score.set(item.score);
    console.log(item);
  };

  title.subscribe(setTextOrHide(domElements.title));
  score.subscribe(setTextOrHide(domElements.score));

  return {
    showItem: showItem
  };
};

exports.create = create;
