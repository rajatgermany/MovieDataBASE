
// Main App with all the Dependencies

var app = angular.module('MovieApp', ['navBar','ui.router', 'AuthenticationApp' , 'ngResource' ,'homeApp','ngStorage' , 'AddMovie', 'editApp' , 'viewApp',
    'mgcrea.ngStrap' , 'mgcrea.ngStrap.alert', 'mgcrea.ngStrap.aside']);



// Checks the State and Prevent Navigation if USER not authenticated
 app.run(['GetTokenFactory','$localStorage', '$rootScope', '$state' , '$alert','$location',function(GetTokenFactory,$localStorage,$rootScope,$state, $alert, $location ){
     $rootScope.preventNavigation = false;
     $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
         if (toState.authenticate == false) {
             return;
         }
         else if (!GetTokenFactory.GetToken($localStorage.newToken) || $rootScope.preventNavigation && !confirm("You have unsaved changes, do you want to continue?")) {
             event.preventDefault();
             $alert({title: 'Please Login', placement: 'top', type: 'info', show: true});
         };
 });
 }]);


// Angular ui-Router Configuration
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


