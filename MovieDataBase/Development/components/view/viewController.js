angular.module('viewApp', [])
    .controller('viewController', ["$scope", "$stateParams", "resourceFactory", function($scope,$stateParams,resourceFactory){
        $scope.entry = resourceFactory.get({id: $stateParams.id}, function (){
            $scope.Movie = $scope.entry;
        });
    }])



