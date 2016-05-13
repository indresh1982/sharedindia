var SharedGlobal = SharedGlobal || {};

SharedGlobal.setNav = function () {
  if(this.getLogin()) {
    document.getElementById('navLogin').className = 'hide';
    document.getElementById('navLogout').className = '';
  } else {
    document.getElementById('navLogin').className = '';
    document.getElementById('navLogout').className = 'hide';
  }
};

SharedGlobal.checkAdminRight = function (rUrl, type) {
  var user = this.getLogin();
  if(!user || user.type < type) {
    this.setRedirect(rUrl, type);
    window.location = '/user/';
  }
};

SharedGlobal.setNav();