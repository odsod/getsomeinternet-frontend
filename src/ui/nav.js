var EventEmitter = require('events').EventEmitter;

var observable = require('../util/observable');

var create = function(domElements) {
  var emitter = new EventEmitter();
  var selectedVote = observable(null);
  var votingIsEnabled = true;

  var voteButtons = {
    upvote: domElements.upvoteButton,
    downvote: domElements.downvoteButton
  };

  var enableVoting = function() {
    domElements.upvoteButton.classList.remove('disabled');
    domElements.downvoteButton.classList.remove('disabled');
    votingIsEnabled = true;
  };

  var temporarilyDisableVoting = function() {
    domElements.upvoteButton.classList.add('disabled');
    domElements.downvoteButton.classList.add('disabled');
    votingIsEnabled = false;
    setTimeout(enableVoting, 3000);
  };

  var next = function() {
    var vote = selectedVote.get();
    if (vote) {
      selectedVote.set(null);
      temporarilyDisableVoting();
      emitter.emit(vote);
    }
    emitter.emit('next');
  };

  var setSelectedVoteIfVotingIsEnabled = function(vote) {
    if (votingIsEnabled) {
      selectedVote.set(vote);
    }
  };

  domElements.nextButton.addEventListener('click', next);

  domElements.upvoteButton.addEventListener('click', function() {
    setSelectedVoteIfVotingIsEnabled('upvote');
  });

  domElements.downvoteButton.addEventListener('click', function() {
    setSelectedVoteIfVotingIsEnabled('downvote');
  });

  selectedVote.subscribe(function(selectedVote, prevSelectedVote) {
    if (prevSelectedVote) {
      voteButtons[prevSelectedVote].classList.remove('selected');
    }
    if (selectedVote) {
      voteButtons[selectedVote].classList.add('selected');
    }
  });

  return {
    next: next,
    setSelectedVote: setSelectedVoteIfVotingIsEnabled,
    on: emitter.on.bind(emitter)
  };
};

exports.create = create;
