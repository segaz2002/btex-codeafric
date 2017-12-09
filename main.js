
var coinApp = angular.module('coinApp', []);

coinApp.controller('mainController', function mainController($scope, $http) {
  $scope.title = "My Bitcoin Exchange";
  $scope.rates = [];
  title = "My title";
  $scope.total_amount_usd = 0.0;
  $scope.total_amount_ngn = 0.0;
  $scope.total_units_usd = 0.0;
  $scope.total_units_ngn = 0.0;

  $scope.getPrice = function(){
    console.log("Trying to get price");   
    $http({
      method: 'GET',
      url: 'https://api.coindesk.com/v1/bpi/currentprice/NGN.json'
    }).then(function successCallback(response) {
        var bpi = response.data.bpi
        $scope.rates.push(bpi['USD']);
        $scope.rates.push(bpi['NGN']);
      }, function errorCallback(response) {
        console.error(response);
      });
  }

  $scope.calculateTotal = function() {
    angular.forEach($scope.rates, function(bt_rate) {
      var total = bt_rate.rate_float * parseInt($scope.units);
      if (bt_rate.code == "USD") {
        $scope.total_amount_usd = total;
      } else {
        $scope.total_amount_ngn = total;
      }
    });
  }

  $scope.calculateUnits = function() {
    angular.forEach($scope.rates, function(bt_rate) {
      if (bt_rate.code == $scope.currency) {
        var units = parseInt($scope.amount) / bt_rate.rate_float;
        if (bt_rate.code == "USD") {
          $scope.total_units_usd = units;
          $scope.total_units_ngn = 0;
        } else {
          $scope.total_units_ngn = units;
          $scope.total_units_usd = 0
        }
      }
    });
  }
});