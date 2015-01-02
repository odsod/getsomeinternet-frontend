var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var readyCallback = null;

exports.onYouTubeIframeAPIReady = function(cb) {
  readyCallback = cb;
};

console.log('assigning callback');

window.onYouTubeIframeAPIReady = function() {
  exports.Player = window.YT.Player;
  if (readyCallback) {
    readyCallback();
  }
}
