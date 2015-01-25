function create(opts) {
  var domElement = opts.domElement;

  function setText(text) {
    if (text !== undefined && text !== null) {
      domElement.textContent = text; 
      domElement.classList.remove('hidden');
    } else {
      domElement.classList.add('hidden');
    }
  }

  return {
    setText: setText
  };
}

exports.create = create;
