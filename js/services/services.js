'use strict';

/* Services */

var NotNotServices = angular.module('HegelServices', []);

NotNotServices.factory('storageService', function(){
    console.log("in factory");
    return {
      get: function (key) {
        return JSON.parse(localStorage.getItem(key) || '[]');
      },

      set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    };
  });
