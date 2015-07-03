'use strict';

angular.module('PartnerApp.controllers')
    .controller('HeaderCtrl', function($scope, Sessions, Session, $location, Partners) {
        $scope.session = Session;

        // TODO
        // Doesn't work on transition from signup
        var result = Partners.get(Session.PartnerId()).$promise;
        result.then(function onSuccess(data) {
            console.log('data:', data);
            $scope.CompanyName = data.company_name;
        });

        $scope.signout = function() {
            var success = function (data, status) {
                Session.Delete();
                $location.path("/pages/signin");
            };

            var error = function (data) {
                var alert = {type: 'danger', msg: 'Unknown error'};
                if (errors.isKnown(data)) {
                    alert.msg = data.data.error_message
                }
                $rootScope.$broadcast('alert', alert);
            };

            Sessions.delete(Session.Token(), success, error);
        };
    });
