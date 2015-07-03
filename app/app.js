'use strict';

var PartnerApp = angular.module('PartnerApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'PartnerApp.directives',
    'PartnerApp.services',
    'PartnerApp.controllers',
    'PartnerApp.localization',
    'PartnerApp.Nav'
]);

PartnerApp.config(function($routeProvider) {
    var routes = ['dashboard', 'pages/signin', 'pages/signup', 'pages/profile', 'pages/authors'];

    var setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
            templateUrl: 'views/' + route + '.html'
        };

        $routeProvider.when(url, config);

        return $routeProvider;
    };

    routes.forEach(function(route) {
        setRoutes(route);
    });

    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    }).when('/404', {
        templateUrl: 'views/pages/404.html'
    }).otherwise({
        redirectTo: '/404'
    });

}).config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
