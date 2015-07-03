'use strict';

angular.module('PartnerApp.controllers')
    .controller('SignInCtrl', ['$scope', '$rootScope', 'Sessions', 'Session', 'errors', '$location', function($scope, $rootScope, Sessions, Session, errors, $location) {
        $scope.credentials = {};

        // Automatically sign in, if sign up was success.
        $rootScope.$on('credentials', function(event, data) {
            $scope.credentials = data;
            $scope.signin();
        })

        $scope.signin = function() {
            var success = function (data, status) {
                Session.Create(data);
                $location.path("/dashboard");
            };

            var error = function (data) {
                var alert = {type: 'danger', msg: 'Unknown error'};
                if (errors.isKnown(data)) {
                    alert.msg = data.data.error_message
                }
                $rootScope.$broadcast('alert', alert);
            };

            Sessions.save($scope.credentials, success, error);
        };
    }]);
