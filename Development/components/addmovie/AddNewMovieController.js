/*

MovieController - Serving  the Movie data from the Client to the Server
Navigation Stopped on Invalid/Incomplete Form
 */
angular.module('AddMovie', [])
    .controller('AddNewMovieController', function($scope,$rootScope, resourceFactory, $modal , $state){
        var modal = $modal({scope: $scope, templateUrl: '/components/addmovie/addNewMovieModal.html', show: false});
        console.log('shshs')

    $scope.data  = {};
        $scope.getError = function(error){
      if(angular.isDefined(error)){
          if(error.required){
              return 'Please Add a Value'
          }
          else if(error.email){
              return 'Enter a Validd Email'
          }
      }
  }
    
    $scope.AddMovie = function(data) {
       $scope.newMovie = new resourceFactory();
        $scope.newMovie.MovieData = data ;
        resourceFactory.save($scope.newMovie , function(){
            $scope.data = {};
            modal.$promise.then(modal.show);
        })

    }

    $scope.GoHome = function(){
            modal.$promise.then(modal.hide);
            $state.go('home')

        }

});