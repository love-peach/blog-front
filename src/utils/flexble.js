// flexble 备用
(function() {
  document.body.style.fontSize = '16px';
  function flexAble() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
  }
  flexAble();
  var timer;
  window.onresize = function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      flexAble();
    }, 0);
  };
})();
