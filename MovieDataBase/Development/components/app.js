
angular.module('navBar', [])
    .directive('navdirective', ["$localStorage", "$state", "$location", "$window", "$rootScope", "$log", function($localStorage,$state,$location,$window , $rootScope ,$log) {

    return {

        restrict: 'E',
        templateUrl: 'components/shared/navbar/navBarTemplate.html',
        link: function (scope, elem, attrs) {
            
            scope.Logout = function () {

                if (!confirm('Are you sURE')) {

                    var url = "http://" + $window.location.host + $location.path();
                    $window.location.href = url;
                }

                else {
                    delete $localStorage.newToken;
                    console.log($localStorage);

                    $rootScope.message = 'User Logout ! Please Login to Continue';
                  $state.go('Login')

                }


            }


        }


    }

}])


angular.module('navBar')
    .factory('resourceFactory', ['$resource', '$localStorage', function ($resource,$localStorage) {



    function getUserFromToken() {
        var Token = $localStorage.newToken;
        return {'Authorization': Token}
    }

    var headers = getUserFromToken();


    // Assemble actions with custom headers attached
    var actions = {
        'get'   : {method: 'GET', headers: headers},
        'save'  : {method: 'POST', headers: headers},
        'create': {method: 'POST', headers: headers},
        'query' : {method: 'GET', isArray: true, headers: headers},
        'remove': {method: 'DELETE', headers: headers},
        'delete': {method: 'DELETE', headers: headers},
        'update': {method: 'PUT', headers: headers}
    };

    var Movies = $resource('/api/movies/:id', {id: '@id'}, actions);

    return Movies;


}]);

angular.module('homeApp', [])
    .controller('homeController', ["$rootScope", "$scope", "resourceFactory", function($rootScope, $scope,resourceFactory) {
    $scope.a = resourceFactory.query( function(result, responseHeaders){


    }, function(responseHeaders){

        var message = '<strong>Api Access ForBidden !! </strong> ';

       
    });
    



    $scope.DeleteMovie = function (ID) {
        alert('Are you sure')

        resourceFactory.delete({id: ID}, function (res) {

            $scope.entry = resourceFactory;
            var resource = resourceFactory.query(function () {

                $scope.a = resource;

            });
        })

    };


    $scope.myCallback = function(){

        console.log('sss')
    }








}]);

angular.module('viewApp', [])
    .controller('viewController', ["$scope", "$stateParams", "resourceFactory", function($scope,$stateParams,resourceFactory){

    $scope.entry = resourceFactory.get({id: $stateParams.id}, function (){


        $scope.Movie = $scope.entry;

    });

    
   }])



angular.module('AddMovie', [])
    .controller('AddNewMovieController', ["$scope", "$rootScope", "resourceFactory", function($scope,$rootScope, resourceFactory){

    $scope.$watch('Movie.$dirty', function(dirty){

       if(dirty){

           $rootScope.preventNavigation = true;
       }

        else {

           $rootScope.preventNavigation= false;
       }


    })
    $scope.data  = {};
    
  $scope.getError = function(error){
      if(angular.isDefined(error)){
          if(error.required){
              return 'Please Add a Value'
          }
          else if(error.email){
              return 'Enter a Valid Email'
          }

      }
  }
    
    $scope.AddMovie = function(data) {
       $scope.newMovie = new resourceFactory();
        $scope.newMovie.MovieData = data ;
        resourceFactory.save($scope.newMovie , function(){
            $scope.data = {};

        })

        
    }


    
}]);

angular.module('editApp', [])
    .controller('editController', ["$scope", "$stateParams", "resourceFactory", "$location", "$localStorage", function($scope, $stateParams,resourceFactory,$location,$localStorage) {

    $scope.entry = resourceFactory.get({id: $stateParams.id}, function () {


        $scope.data = $scope.entry;

    })


    $scope.UpdateMovie = function(ID) {



        resourceFactory.update({id:ID} ,  $scope.data, function(){

            console.log('Yo');
        })
        
    }
    $scope.myCallback = function(){

        $location.path('/home')
    }

    $scope.Show = function() {
        console.log('Show')

        console.log($localStorage.Token);
    }



}]);


angular.module('AuthenticationApp', [])
    .factory('RegisterFactory', ['$resource', function ($resource) {
    
    
    return $resource( '/users/signup/:id', {}, {
        delete: { method: 'DELETE',
            params: {id: 'id'} },

        update: { method: 'PUT',
            params: {id: 'id'} }



    })
}]);
/**
 * Created by Mani on 01-10-2016.
 */



angular.module('AuthenticationApp').
    factory('LoginFactory', ['$resource', function ($resource) {
    return $resource( '/users/login/:id', {}, {
        delete: { method: 'DELETE',
            params: {id: 'id'} },

        update: { method: 'PUT',
            params: {id: 'id'} }



    })
}]);





angular.module('AuthenticationApp').
    factory('GetTokenFactory', function(){

    var Factory = {};

    Factory.GetToken = function(i){
        
        if(i){


            return true
        }
        
        else{
            return false
        }

       
    },

    Factory.a = 'dhhd'

    
    

    return Factory;

   

})



angular.module('AuthenticationApp').
controller('AuthenticationController', ["$scope", "$rootScope", "RegisterFactory", "LoginFactory", "$state", "$localStorage", function($scope,$rootScope ,RegisterFactory,LoginFactory,$state, $localStorage)

 {

    $scope.RegisterUser = function(user) {


       $scope.newUser = new RegisterFactory();
        $scope.newUser.data = user ;
        RegisterFactory.save($scope.newUser , function(value){
            console.log(value)
            $rootScope.message = 'User Registered'
            $state.go('Login')


    });
    }

    $scope.myCallback = function(){

        $location.path('/home')
    }

    
    $scope.LoginUser = function(user){


        $scope.newUser = new LoginFactory();
        $scope.newUser.LoginData = user ;
        LoginFactory.save($scope.newUser , function(value){

            if(value.success == false){
                alert(value.message)
            }
            else {
                
                $localStorage.newToken = value.token;
                $rootScope.message = 'Login Successful'
                $state.go('home')
            }




        })
        
        
    }
     $scope.Show = function() {
         console.log('Show')
         
     }


}]);





var app = angular.module('MovieApp', ['navBar','ui.router', 'AuthenticationApp' , 'ngResource' ,'homeApp','ngStorage' , 'AddMovie', 'editApp' , 'viewApp']);

/*

app.run(['GetTokenFactory','$localStorage', '$rootScope', '$state' , function(GetTokenFactory,$localStorage,$rootScope,$state ){

    $rootScope.preventNavigation = false;


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if(toState.authenticate == false){

            return ;
        }

        else if (!GetTokenFactory.GetToken($localStorage.newToken) ||$rootScope.preventNavigation && !confirm("You have unsaved changes, do you want to continue?")){
            event.preventDefault();
            $rootScope.message = 'Please Login '

        };


    });
    
    






}]);


*/
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/user/login');
    $stateProvider.state('home', {
        url : '/home',
        templateUrl: 'components/home/homeView.html',
        controller : 'homeController'


    }).state('viewMovie',{
        url : '/view/movie/:id',
        templateUrl: 'components/view/view.html',
        controller : 'viewController'


}).state('EditMovie', {
        url : '/edit/movie/:id',
        templateUrl: 'components/edit/editView.html',
        controller : 'editController'


}).state('NewMovie', {
        url : '/add/movie',
        templateUrl: 'components/addmovie/addnewmovie.html',
        controller : 'AddNewMovieController'


}).state('AddMovie', {
        url : '/add/movie',
        templateUrl: '/addmovie/addnewmovie.html',
        controller : 'AddNewMovieController'


}).state('Register', {

        url : '/user/signup',
        templateUrl: 'components/Authentication/registerView.html',
        controller : 'AuthenticationController',
        authenticate : false

        
        
}).state('Login', {

        url : '/user/login',
        templateUrl: 'components/Authentication/LoginView.html',
        controller : 'AuthenticationController',
        authenticate : false



})


    

}]);


