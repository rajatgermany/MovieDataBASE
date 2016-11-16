angular.module('AuthenticationApp').
factory('LoginFactory', ['$resource', function ($resource) {
    return $resource( '/users/login/:id', {}, {
        delete: { method: 'DELETE',
            params: {id: 'id'} },

        update: { method: 'PUT',
            params: {id: 'id'} }
    })
}]);


