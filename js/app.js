
var HegelApp = angular.module("HegelApp", ['ngRoute', 'HegelControllers', 'HegelServices']);

  HegelApp.config(function($routeProvider){

    $routeProvider
      .when('/',
      {
        controller: 'SubjectController',
        templateUrl: 'partials/subject.html'
        })
      .when('/isnot',
          {
            controller: 'IsNotController',
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


// directive to focus elements
// from http://angulartutorial.blogspot.com/2014/04/angular-js-auto-focus-for-input-box.html
angular.module('HegelApp').directive('focus', function($timeout) {
  return {
    scope : {trigger : '@focus'
      },
      link : function(scope, element) {
        scope.$watch('trigger', function(value) {
          if (value === "true") {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  }
); 
