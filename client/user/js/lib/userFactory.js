userApp.factory('userFactory', ['$http', function($http) {

  var login = function (email, password, callBack) {
    apiCall('login',
      {email:email, password:password},
      'Login is successful!!!',
      callBack);
  };

  var addUser = function (name, email, password, callBack) {
    apiCall('add',
      {name:name, email:email, password:password},
      'User Added!!!',
      callBack);
  };

  var verifyUser = function (email, vCode, callBack) {
    apiCall('verify',
      {email:email, vCode:vCode},
      'User is verified!!!',
      callBack);
  };

  var resendUser = function (email, callBack) {
    apiCall('resend',
      {email:email},
      'Verification Code is resend!!!',
      callBack);
  };

  var forgetUser = function (email, callBack) {
    apiCall('forget',
      {email:email},
      'Password is sent to email!!!',
      callBack);
  };

  var resetUser = function (email, oldPassword, newPassword, callBack) {
    apiCall('reset',
      {email:email, oldPassword:oldPassword, newPassword:newPassword},
      'Your Password is reset!!!',
      callBack);
  };

  var logoutUser = function (callBack) {
    apiCall('logout',
      {},
      'You are successful logout!!!',
      callBack);
  };

  function apiCall(urlPostfix, paramData, successMsg, callBack){
    $http({
      method: "POST",
      url: "/api/public/user/" + urlPostfix,
      data: JSON.stringify(paramData)
    }).then(function(response) {
      if(response.data.error) {
        callBack(response.data.error);
      } else {
        callBack({type:'success', textMsg:successMsg, data:response.data});
      }
    }, function(response) {
      callBack({type:'error', textMsg:response.statusText});
    });
  }

  return {login:login, add:addUser,
    verify:verifyUser, resend:resendUser,
    forget:forgetUser, reset:resetUser,
    logout:logoutUser};
}]);