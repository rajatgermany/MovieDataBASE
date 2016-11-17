angular.module('homeApp', [])
    .controller('homeController', ["$rootScope", "$scope", "resourceFactory",'$alert', function($rootScope, $scope,resourceFactory, $alert) {
        $scope.a = resourceFactory.query( function(result, responseHeaders){
        }, function(responseHeaders){
            console.log(responseHeaders);
        });

        $scope.DeleteMovie = function (ID) {
            alert('Are you sure')
            resourceFactory.delete({id: ID}, function (res) {
                $scope.entry = resourceFactory;
                var resource = resourceFactory.query(function () {
                    $scope.a = resource;
                    $alert({title: 'Movie Deleted', placement: 'top', type: 'info', show: true});
                });
            })
        };
    }]);
