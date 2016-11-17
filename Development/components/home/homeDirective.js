/**
 * Created by Mani on 27-09-2016.
 */
var app = angular.module('homeApp', []);
app.directive('rajat', function(){

    return {
        restrict : 'E',
        scope : {
            data : '='
        },
        link : function(scope, elem, attrs){

        },
        template : '<input type = "text" ng-model = "data">'
    }
})