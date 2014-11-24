
//controller collection
var HegelControllers = angular.module('HegelControllers', []);

//Subject Controller
HegelControllers.controller('SubjectController', function ($scope, $http, $location, storageService) {
    
  //clear localStorage
  localStorage.clear();

  //set the is/are variable
  $scope.isaretoggle = "is not";

  $scope.toggleisare = function(){
    if ($scope.isaretoggle == "is not") { 
      $scope.isaretoggle = "are not";
    }else{
      $scope.isaretoggle = "is not";
    }
  };


  //get the nots array, returns empty array or nots
  var notnots = storageService.get('notnot');

  // process the form, maybe turn to service and/or seperate controller
  $scope.processForm = function() {
    var subject = $scope.subject.trim();
    var not = $scope.thenot.trim();
    var isare = $scope.isaretoggle;
    if (!subject.length) {
      return;
    }


       $http({
           method: "POST",
           url: "/api/Idea",
           data: {
                   "idea" : subject,
                   "negative": not,
                   "doublenegative": "",
                   "synthesis": "",
                   "tense" : isare
            }
        }).success(function(data, status, headers, config) {
              console.log("object" + data);
              for (d in data){
                console.log(d + data[d]);
                var id = data["id"];
                console.log("id: " + data["id"]);
              }
              
});


    //push Subject values to array
    notnots.push({
      subject: subject,
      not: not,
      isare: isare
    });

    storageService.set('notnot', notnots);

    $location.path('/isnot');
  };
});


//  IsNotController
HegelControllers.controller('IsNotController', function ($scope, $location, $http, storageService) {

  //retrieve the notnots
  var notnots = storageService.get('notnot');
  var lastNots = notnots[notnots.length-1];
  $scope.isaretoggle = lastNots.isare;
  $scope.SubjectIsNot = lastNots.not;
  
  
  
  //hide suggestion box until needed
  //$scope.showants = false;


  $scope.toggleisare = function(){
    if ($scope.isaretoggle == "is not") { 
      $scope.isaretoggle = "are not";
    }else{
      $scope.isaretoggle = "is not";
    }
  };
  
  $scope.processNotNot = function (){
    var lastNots = notnots[notnots.length-1];
    
    notnots.push({
      subject: lastNots.subject,
      not: lastNots.not,
      isare: lastNots.isare, //look at original comp
      notnotnot: $scope.notnotnot  //only new value pretty lazy array work
    });

    storageService.set('notnot', notnots);

    $location.path('/truth');
    return false;

  };

});

//  TruthController
HegelControllers.controller('TruthController', function ($scope, $http, $location, storageService) {
  $scope.isaretoggle = "is not";
    $scope.toggleisare = function(){
    if ($scope.isaretoggle == "is not") { 
      $scope.isaretoggle = "are not";
    }else{
      $scope.isaretoggle = "is not";
    }
  };

  //retrieve the notnots
  var notnots = $scope.notnots = storageService.get('notnot');

  var lastNots = notnots[notnots.length-1];
  $scope.Subject = lastNots.subject; 
  $scope.IsAre = lastNots.isare;
  $scope.Not = lastNots.not;
  $scope.NotNotNot = lastNots.notnotnot;
  

  $scope.processTruth = function(){
 
  $scope.notnots.push({

  subject: $scope.notnots[$scope.notnots.length-1].subject,
  not: $scope.notnots[$scope.notnots.length-1].not,
  isare: $scope.notnots[$scope.notnots.length-1].isare, //look at original comp
  notnotnot: $scope.notnots[$scope.notnots.length-1].notnotnot,
  evolution: $scope.evolution
  });

    storageService.set('notnot', $scope.notnots);

       $http({
           method: "POST",
           url: "/api/Idea",
           data: {
                   "idea" :$scope.notnots[$scope.notnots.length-1].subject,
                   "negative": $scope.notnots[$scope.notnots.length-1].not,
                   "doublenegative": $scope.notnots[$scope.notnots.length-1].notnotnot,
                   "synthesis": $scope.evolution,
                   "tense" : $scope.notnots[$scope.notnots.length-1].isare
            }
        });



    $location.path('/evolution');
    return false;
  };


  $scope.processNotNot = function (){
    console.log('in processNotNot');
  };


});



//  EvolutionController
HegelControllers.controller('EvolutionController', function ($scope, $location, storageService) {
  $scope.isaretoggle = "is not";
          $scope.toggleisare = function(){
          if ($scope.isaretoggle == "is not") { 
            $scope.isaretoggle = "are not";
          }else{
            $scope.isaretoggle = "is not";
          }
        };

  //retrieve the notnots
  var notnots = $scope.notnots = storageService.get('notnot');

  $scope.Subject = notnots[notnots.length-1].subject; 
  $scope.IsAre = notnots[notnots.length-1].isare;
  $scope.Not = notnots[notnots.length-1].not;
  $scope.NotNotNot = notnots[notnots.length-1].notnotnot;
  $scope.Evolution = notnots[notnots.length-1].evolution;



  $scope.processTruth = function(){
    
      $scope.notnots.push({
      subject: $scope.notnots[$scope.notnots.length-1].subject,
      not: $scope.notnots[$scope.notnots.length-1].not,
      isare: $scope.notnots[$scope.notnots.length-1].isare, //look at original comp
      notnotnot: $scope.notnots[$scope.notnots.length-1].notnotnot,
      evolution: $scope.evolution
    });

    storageService.set('notnot', $scope.notnots);

    $location.path('/evolution');
  };





});



 //-----------------------
    // IP address for future suggestions (e.g. geo lookup for nearby things)
  //$scope.IPA = function(){
    //$http.jsonp('http://jsonip.com?callback=JSON_CALLBACK')
      //.success(function(json){
        //console.log("IP is " + json.ip);
      //});
    //};
    //$scope.IPA();

  // get a random word if selected
  //$scope.GetRandomWord = function (){
      //var url = "http://randomword.setgetgo.com/get.php?callback=JSON_CALLBACK";
      //$http.jsonp(url)
      //.success(function(d){
        //for (var o in d){
          //     $scope.subject = d[o];
        //}
      //
      //}).error(function(d) {
        //console.log('error');
      //});
    //};
  //-----------------------

  // Synonyms and Antonyms API, maybe later
  // ----------------------------------------------
  //get synonms
  /*$scope.setnotnotnot = function (){
    $scope.notnotnot = $scope.suggestions.syn;
    $scope.showants = false;
  };

  $scope.SubjectIsNot = $scope.notnots[$scope.notnots.length-1].not; 
  //var NotNotIsAre = $scope.NotNotIsAre = notnots[notnots.length-1].isare;

    var ants = $scope.ants = [
      {syn : "..."}
      ];

   $scope.suggestions = $scope.ants[0];  


   $scope.getSyns = function(){
    var bob = null;
   };

  $scope.getAntonyms = function() {

        //thesaurus settings 
    var urlbase = 'http://words.bighugelabs.com/api',
    version = '2',
    key = 'ea61abbf879c8cd605995a860703f119',
    format = 'json',
    word;


    var callback = 'JSON_CALLBACK';
    word = $scope.SubjectIsNot;
    url = urlbase + '/' +  version + '/' + key + '/' + word + '/' + format + '?callback='+callback;

    // set the lookup word, which is part of the url

    // https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=API&lang=en-ru&text=time&callback=myCallback
    //api key 


  //http://words.bighugelabs.com/apisample.php?v=2&format=json

    var superants = [];
    $http.jsonp(url)
      .success(function(d){
        //show suggestion box until needed
        $scope.showants = true;



        for (var o in d){console.log('d0: ' + d[o].ant);
        superants = d[o].ant;
        for (var a in superants){
          $scope.ants.push({
            syn: superants[a]
          });
          console.log(superants[a]);
          //document.getElementById("antonymfor").innerHTML += "<button class='btn btn-success' onclick='fillnotnot(&quot;"+ants[a]+"&quot;);return false;' id='antbutton"+a+"'>"+(ants[a])+"</button>";
        }
      }
      }).error(function(d) {
        $scope.suggest = "no results found; roll your own";

      });
    
  };

  // google translate AIzaSyCkzQMyNxAk4DUBFalmTrRK21Q9dK0MZKA

  //yandex api dict.1.1.20141004T051337Z.1b103fb9bc14258f.a9cce070b0b46169cf864b7e2752dba3a621492c

*/  
