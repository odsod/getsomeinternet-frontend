function create(opts) {
  var upvoteButton = opts.domElements.upvoteButton;
  var downvoteButton = opts.domElements.downvoteButton;
  var emitter = opts.emitter;

  upvoteButton.addEventListener('click', function() {
    emitter.emit('upvote');
  });

  downvoteButton.addEventListener('click', function() {
    emitter.emit('downvote');
  });

  function setVisible(isVisible) {
    [upvoteButton, downvoteButton].forEach(function(button) {
      if (isVisible) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    });
  }

  return {
    setVisible: setVisible
  };
}

exports.create = create;
