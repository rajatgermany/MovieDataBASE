// Checks the Token for the User

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
    }
    return Factory;
})
