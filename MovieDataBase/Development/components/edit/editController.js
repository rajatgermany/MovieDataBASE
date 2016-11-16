angular.module('editApp', [])
    .controller('editController', ["$scope", "$stateParams", "resourceFactory", "$location", "$localStorage", '$modal', '$state' ,function($scope, $stateParams,resourceFactory,$location,$localStorage, $modal, $state) {
        var modal = $modal({scope: $scope, templateUrl: '/components/edit/editMovieModal.html', show: false});
        $scope.entry = resourceFactory.get({id: $stateParams.id}, function () {
            $scope.data = $scope.entry;
        })

        $scope.UpdateMovie = function(ID) {
            resourceFactory.update({id:ID} ,  $scope.data, function(){
                modal.$promise.then(modal.show);
            })
        }

        $scope.GoHome = function(){
            modal.$promise.then(modal.hide);
            $state.go('home')
        }



    }]);


