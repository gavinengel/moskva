
var HegelApp = angular.module("HegelApp", ['ngRoute', 'HegelControllers', 'HegelServices']);

  HegelApp.config(function($routeProvider){

    $routeProvider
      .when('/',
      {
        controller: 'NotController',
        templateUrl: 'partials/subject.html'
        })
      .when('/isnot',
          {
            controller: 'NotNotController',
            templateUrl: 'partials/isnot.html'
          })
      .when('/truth',
          {
            controller: 'TruthController',
            templateUrl: 'partials/truth.html'
      })
      .when('/evolution',
        {
          controller: 'EvolutionController',
          templateUrl: 'partials/evolution.html'
        })
      .otherwise({
        redirectTo: '/'
        });

    });



