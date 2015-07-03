'use strict';

angular.module('PartnerApp.controllers')
    .controller('DashboardCtrl', ['$scope', 'Session', '$location', function($scope, Session, $location) {
        if (!Session.Valid()) {
            Session.Delete();
            $location.path('pages/signin');
        }
    }]);