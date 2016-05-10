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