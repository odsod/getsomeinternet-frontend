var stageTypes = {
  img: require('./image'),
  gif: require('./image'),
  youtube: require('./youtube'),
  soundcloud: require('./soundcloud')
};

var currShownItem = null;

var prepare = function(item) {
  console.log('preparing', item);
  stageTypes[item.type].prepare(item);
};

var show = function(item) {
  if (currShownItem) {
    stageTypes[currShownItem.type].hide(currShownItem, item);
  }
  stageTypes[item.type].show(item);
  currShownItem = item;
};

module.exports = {
  prepare: prepare,
  show: show
};
