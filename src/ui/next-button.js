function create(opts) {
  var domElement = opts.domElement;
  var emitter = opts.emitter;

  domElement.addEventListener('click', function() {
    emitter.emit('next');
  });
}

exports.create = create;
