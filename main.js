//gets currency from user selection
var coinApp = angular.module('coinApp', ['tw-currency-select']);
coinApp.controller('mainController', function($scope, $http) {

    $scope.title = "My Bitcoin Exchange";
    $scope.currencyChangeCount = 0;
    $scope.currencyCodeChangeCount = 0;

    $scope.total_usd_amount = 0.0;
    $scope.total_currency_amount = 0.0;
    $scope.total_usd_units = 0.0;
    $scope.total_currency_units = 0.0;


    $scope.currenciesWithNames = [
      {code: 'EUR',  name: 'Euro'},
      {code: 'USD',  name: 'US Dollar'},
      {code: 'GBP', name: 'British Pound'},
      {code: 'NGN',  name: 'Nigerian Naira'},
      {code: 'CNY',  name: 'Chinese Yuan'},
      {code: 'CAD',  name: 'Canadian Dollars'}
      
      

  ];


  $scope.selectedCurrency = {code: 'EUR', symbol: '€'};
  $scope.selectedCurrencyCode = 'USD';
  $scope.selectedCurrency2 = {code: 'EUR', symbol: '€'};
  $scope.selectedCurrency3 = {code: 'GBP', symbol: '£'};
  $scope.selectedCurrency7 = {code: 'EUR', symbol: '€'};
  $scope.selectedCurrency8 = {code: 'USD', symbol: '$'};
  $scope.selectedCurrency9 = {code: 'GBP', symbol: '£'};
  $scope.selectedCurrency10 = {code: 'GBP', symbol: '£'};
  
    $scope.currency_to_convert_to = 'EUR';
  
    $scope.getPrice = function() {
      console.log("Trying to get price");   
      $http({
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/currentprice/' + $scope.currency_to_convert_to + '.json'
      }).then(function successCallback(response) {
        $scope.rates = [];
          var bpi = response.data.bpi
          $scope.rates.push(bpi['USD']);
          $scope.rates.push(bpi[$scope.currency_to_convert_to]);
        }, function errorCallback(response) {
          console.error(response);
        });
    }
  
    $scope.calculateTotal = function() {
      angular.forEach($scope.rates, function(bt_rate) {
        var total = bt_rate.rate_float * parseInt($scope.units);
        if (bt_rate.code == "USD") {
          $scope.total_usd_amount = total;
        } else {
          $scope.total_currency_amount = total;
        }
      });
    }
  
    $scope.calculateUnits = function() {
      angular.forEach($scope.rates, function(bt_rate) {
        if (bt_rate.code == $scope.currency) {
          var units = parseInt($scope.amount) / bt_rate.rate_float;
          if (bt_rate.code == "USD") {
            $scope.total_usd_units = units;
            $scope.total_currency_units = 0;
          } else {
           $scope.total_currency_units = units;
            $scope.total_usd_units = 0
          }
        }
      });
    }
 

    
    $scope.codeMapper = function(code) {
        return {code: code};
    };

    $scope.codeExtractor = function(currency) {
        return currency.code;
    };

    $scope.changedHandler = function() {
        $scope.currencyChangeCount += 1;
    };

    $scope.changedCodeHandler = function() {
        $scope.currencyCodeChangeCount += 1;
    };

    $scope.otherClicked = function() {
        window.alert("Other clicked");
    };
});


