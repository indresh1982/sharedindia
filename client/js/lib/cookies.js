var SharedGlobal = SharedGlobal || {};

SharedGlobal.getLogin = function () {
  return JSON.parse(localStorage.getItem('auth'));
};
SharedGlobal.setLogin = function (data) {
  localStorage.setItem('auth', JSON.stringify(data));
};
SharedGlobal.logout = function () {
  localStorage.setItem('auth', null);
};
SharedGlobal.writeCookies = function (key, data, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = key+"="+data+"; "+expires;
};
SharedGlobal.readCookies = function (key) {
  var name = key + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};
