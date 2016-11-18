
// Home Page Nav Bar is Custom Directive
angular.module('navBar', [])
    .directive('navdirective', ["$localStorage", "$state", "$location", "$window", "$rootScope", "$log",'$alert' ,function($localStorage,$state,$location,$window , $rootScope ,$log, $alert) {
        return {
            restrict: 'E',
            templateUrl: 'components/shared/navbar/navBarTemplate.html',
            link: function (scope, elem, attrs) {
                scope.Logout = function () {
                    if (!confirm('Are you sURE')) {
                        $alert({title: 'Continue playing', placement: 'bottom', type: 'danger', show: true});
                        $state.go('home')
                    }
                    else {
                        delete $localStorage.newToken;
                        $alert({title: 'Please Login', placement: 'bottom', type: 'danger', show: true});
                        $state.go('Login')
                    }
                }
            }
        }
    }])


