
// Login and Registration Handlers
angular.module('AuthenticationApp').
controller('AuthenticationController', ["$scope", "$rootScope", "RegisterFactory", "LoginFactory", "$state", "$localStorage",'$alert', function($scope,$rootScope ,RegisterFactory,LoginFactory,$state, $localStorage, $alert)

{
    $scope.RegisterUser = function(user) {
        $scope.newUser = new RegisterFactory();
        $scope.newUser.data = user ;
        RegisterFactory.save($scope.newUser , function(err,value){
            $state.go('Login')
        });
    }

    $scope.GoHome = function(){
        aside.$promise.then(aside.hide);
    }

    $scope.LoginUser = function(user){
        $scope.newUser = new LoginFactory();
        $scope.newUser.LoginData = user ;
        LoginFactory.save($scope.newUser , function(value){

            if(value.success == false){
                alert(value.message)
            }
            else {
                $localStorage.newToken = value.token;   // Storing the Token in the lOCAL Machine
                $alert({title: 'Login Successful', placement: 'top', type: 'info', show: true});
                $state.go('home')
            }
        })
    }


}]);


