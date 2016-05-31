locationApp.factory('locationFactory', ['$http', function($http) {
  var locCategory = [{id:0, name:'Village'}, {id:1, name:'City'}, {id:2, name:'District'}, {id:3, name:'State'}];
  var stateList = null;
  var getCategory = function () {
    return locCategory;
  };

  var getState = function (callBack) {
    if(stateList) {
      callBack({type: 'success', textMsg: 'States List!!!', data: stateList});
    } else {
      apiCall('/api/protected/location/states',
        location,
        '',
        function (result) {
          stateList = stateList.data;
          callBack({type: 'success', textMsg: 'States List!!!', data: stateList});
        });
    }
  };

  var addLoc = function (location, callBack) {
    apiCall('/api/protected/location/add',
      location,
      'Location successfully Added!!!',
      callBack);
  };


  function apiCall(url, paramData, successMsg, callBack) {
    $http({
      method: "POST",
      url: url,
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

  return {add:addLoc, getCategory:getCategory,
    getState:getState
  };
}]);