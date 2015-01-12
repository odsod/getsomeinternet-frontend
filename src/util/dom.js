var empty = function(domElement) {
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
};

var setText = function(domElement, text) {
  empty(domElement);
  domElement.appendChild(document.createTextNode(text));
};

var show = function(domElement) {
  domElement.style.display = '';
};

var hide = function(domElement) {
  domElement.style.display = 'none';
};

exports.empty = empty;
exports.setText = setText;
exports.hide = hide;
exports.show = show;
