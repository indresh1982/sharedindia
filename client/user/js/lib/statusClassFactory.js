userApp.factory('statusClassFactory', [function() {
  var getStatusClass = function (status) {
    var statusClass = 'info ' + status;
    return statusClass;
  };
  var getIconStatusClass = function (status) {
    var statusClass = '';
    switch (status) {
      case 'error':
        statusClass = 'fa fa-exclamation-circle'
        break;
      case 'warn':
        statusClass = 'fa fa-exclamation-triangle'
        break;
      case 'success':
        statusClass = 'fa fa-check-circle'
        break;
    }
    return statusClass;
  };
  return {getStatusClass:getStatusClass, getIconStatusClass:getIconStatusClass};
}]);