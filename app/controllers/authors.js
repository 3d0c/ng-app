'use strict';

angular.module('PartnerApp.controllers')
    .controller('AuthorsCtrl', function($scope, Session, $location, Authors) {
        if (!Session.Valid()) {
            Session.Delete();
            $location.path('pages/signin');
        }

        $scope.authors = Authors.query()

        $scope.delete = function(id) {
            console.log('delete ' + id);
        }

        $scope.add = function() {
            $scope.authors.push({name: 'xxx'});
        }

        $scope.save = function(author) {
            console.log('save:');
            console.log(author);
        }
    });