//vm.soundCloudUrl = ko.computed(function() {
  //return vm.isSoundCloudItem() && 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + vm.data() + '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
//});

//require('./soundcloud-api').then(function(SC) {
  //var playerNode = document.createElement('iframe');
  //playerNode.src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true';
  //playerNode.width = '500px';
  //document.body.appendChild(playerNode);
  //var player = new SC.Widget(playerNode);
  //widget.bind(SC.Widget.Events.READY, function() {
    //// load new widget
    //widget.bind(SC.Widget.Events.FINISH, function() {
      //widget.load('http://api.soundcloud.com/tracks/13692671', {
        //show_artwork: false
      //});
    //});
  //});
//});

var prepare = function() {
};

var show = function() {
};

var hide = function() {
};

module.exports = {
  prepare: prepare,
  show: show,
  hide: hide
};
