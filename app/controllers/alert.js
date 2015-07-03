'use strict';

angular.module('PartnerApp.controllers')
    .controller('AlertCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.alerts = [];

        $scope.alerts.has = function(msg) {
            return $scope.alerts.some(function(item) {
                if (item.msg == msg) {
                    return true;
                }
            });
        }

        $rootScope.$on('alert', function(event, data) {
            if (!$scope.alerts.has(data.msg)) {
                $scope.alerts.push(data);
            }
        });

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }]);