var create = function(domElement) {

  var animateTimeout = null;

  var setExpPercentage = function(percentage) {
    console.log(percentage);
    domElement.classList.add('animate');
    domElement.style.width = percentage + '%';
    clearTimeout(animateTimeout);
    animateTimeout = setTimeout(function() {
      domElement.classList.remove('animate');
    }, 25);
  };
  
  return {
    setExpPercentage: setExpPercentage
  };
};

exports.create = create;
