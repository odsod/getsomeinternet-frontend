var seenItemHashes;
if (window.localStorage.getItem('seenItemHashes')) {
  seenItemHashes = JSON.parse(window.localStorage.getItem('seenItemHashes'));
} else {
  seenItemHashes = [];
}

var nextIndex;
if (window.localStorage.getItem('nextIndex')) {
  nextIndex = JSON.parse(window.localStorage.getItem('nextIndex'));
} else {
  nextIndex = 0;
}

var seenItemsHashLookup = {};
seenItemHashes.forEach(function(itemHash) {
  seenItemsHashLookup[itemHash] = true;
});

exports.put = function(item) {
  if (seenItemHashes[nextIndex]) {
    delete seenItemsHashLookup[seenItemHashes[nextIndex]];
  }
  seenItemHashes[nextIndex] = item.hash;
  seenItemsHashLookup[item.hash] = true;
  nextIndex = (nextIndex + 1) % 1000;
  window.localStorage.putItem('nextIndex', JSON.stringify(nextIndex));
  window.localStorage.putItem('seenItemHashes', JSON.stringify(seenItemHashes));
};

exports.hasSeen = function(item) {
  return !!seenItemsHashLookup[item];
};
