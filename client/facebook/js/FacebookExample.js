angular.module('FacebookExample', [])

.controller('FacebookExampleController', function($scope, $http) {

  $scope.usernameInvalid = false;
  $scope.passwordInvalid = false;

  $scope.hasSession  = false;
  $scope.ajaxLoading = false;

  var getUser = function() {
    var userRequest = $http.get('/api/user');
    userRequest.then(function(user) {
      $scope.user = user.data;
      $scope.hasSession = true;
    }, function() {

    });
  };

  getUser();

  $scope.login = function(username, password) {

    if(!username || username.length < 1) {
      $scope.usernameInvalid = true;
      return;
    }

    if(!password || password.length < 1) {
      $scope.passwordInvalid = true;
      return;
    }

    var loginRequest = $http.post('/api/session',
      {
        username: username,
        password: password
      }
    );

    $scope.ajaxLoading = true;

    loginRequest.then(function(user) {
      $scope.hasSession = true;
      $scope.ajaxLoading = false;
    }, function(response) {
      $scope.usernameInvalid = true;
      $scope.passwordInvalid = true;
      $scope.ajaxLoading = false;
    });

  };

});
