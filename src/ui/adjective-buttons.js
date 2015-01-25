function create(opts) {
  var positiveButtons = opts.domElements.positiveButtons;
  var negativeButtons = opts.domElements.negativeButtons;
  var emitter = opts.emitter;

  positiveButtons.forEach(function(positiveButton) {
    emitter.emit('upvote', positiveButton.textContent);
  });

  negativeButtons.forEach(function(negativeButton) {
    emitter.emit('downvote', negativeButton.textContent);
  });

  function setAdjectives(adjectives) {
    [{buttons: positiveButtons, adjectives: adjectives.positives},
     {buttons: negativeButtons, adjectives: adjectives.negatives}
    ].forEach(function(opts) {
      opts.buttons.forEach(function(button, i) {
        var adjective = opts.adjectives[i];
        button.textContent = adjective;
      });
    });
  }

  function setVisible(isVisible) {
    positiveButtons.concat(negativeButtons).forEach(function(button) {
      if (isVisible) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    });
  }

  return {
    setAdjectives: setAdjectives,
    setVisible: setVisible
  };
}

exports.create = create;
