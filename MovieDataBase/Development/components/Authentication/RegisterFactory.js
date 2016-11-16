angular.module('AuthenticationApp', [])
    .factory('RegisterFactory', ['$resource', function ($resource) {
        return $resource( '/users/signup/:id', {}, {
            delete: { method: 'DELETE',
                params: {id: 'id'} },

            update: { method: 'PUT',
                params: {id: 'id'} }



        })
    }]);