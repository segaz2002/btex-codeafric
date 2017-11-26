
var coinApp = angular.module('coinApp', []);

coinApp.controller('mainController', function mainController($scope, $http) {
  $scope.title = "Bitcoin Exchange";
  $scope.rates = [];

  $scope.getPrice = function(){
    console.log("Trying to get price");   
    $http({
      method: 'GET',
      url: 'https://api.coindesk.com/v1/bpi/currentprice/CNY.json '
    }).then(function successCallback(response) {
        var bpi = response.data.bpi
        $scope.rates.push(bpi['USD']);
        $scope.rates.push(bpi['CNY']);
        console.log($scope.rates);
      }, function errorCallback(response) {
        console.error(response)
      });
  }
});
