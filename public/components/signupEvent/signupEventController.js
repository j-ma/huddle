angular.module('signupEventCtrl',[])
.controller('signupEventController', function($scope){

  $scope.user = {
      Username: null,
      OldPassword: null,
      NewPassword: null,
      ConfirmPassword: null,
      FirstName: null,
      MiddleName: null,
      LastName: null,
      Birthdate: null,
      Gender: null,
      Country: null,
      City: null,
      Email: null,
      HomePhone: null,
      OtherPhone: null,
  };

  $scope.event = {
      name: "Peace, Light and Love",
  }

  $scope.arrival = {
    RideRequired: null
  }

  $scope.departure = {
    RideRequired: null
  }

  $scope.submitRequest = function () {

  }

})