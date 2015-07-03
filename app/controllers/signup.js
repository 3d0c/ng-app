'use strict';

angular.module('PartnerApp.controllers')
    .controller('SignUpCtrl', ['$scope', '$rootScope', 'errors', '$location', 'Partners', 'Sessions', 'Session', function($scope, $rootScope, errors, $location, Partners) {
        $scope.partner = {};

        $scope.signup = function() {
            var success = function () {
                // Automatically sign in on success
                $rootScope.$broadcast('credentials', {
                    email: $scope.partner.email,
                    password: $scope.partner.password
                })
            };

            var error = function (data) {
                var alert = {type: 'danger', msg: 'Unknown error'};
                if (errors.isKnown(data)) {
                    alert.msg = data.data.error_message
                }
                $rootScope.$broadcast('alert', alert);
            };

            Partners.save($scope.partner, success, error);
        };
    }]);
