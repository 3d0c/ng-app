'use strict';

angular.module('PartnerApp.services', ['ngResource'])
    .value('version', '0.1')

    .factory('errors', function() {
        return {
            isKnown: function(data) {
                if (typeof data != 'object') {
                    return false;
                }

                if (typeof data.status == 'undefined') {
                    return false;
                }

                if (typeof data.data != 'object') {
                    return false;
                }

                if (typeof data.data.error_message == 'undefined') {
                    return false;
                }

                return true;
            }
        }
    })

    .service('Session', function() {
        this.Session = {token: '', expiration: ''};

        if (typeof localStorage.session != 'undefined') {
            this.Session = JSON.parse(localStorage.session);
        }

        this.Create = function(data) {
            localStorage.session = JSON.stringify(data);
            this.Session = JSON.parse(localStorage.session);
            return this;
        };

        this.Delete = function() {
            localStorage.removeItem('session');
            this.Session = {token: '', expiration: ''};
            return;
        };

        this.Token = function() {
            return {
                token: this.Session.token
            }
        };

        this.PartnerId = function() {
            return {
                partner_id: this.Session.partner_id
            }
        };

        this.Valid = function() {
            if (this.Session.token == '' || this.Session.expiration == '') {
                return false;
            }

            var currentDate = new Date();
            var expiration = new Date(this.Session.expiration);
            if (currentDate > expiration) {
                console.log(currentDate + ' > ' + expiration);
                return false;
            }

            return true;
        }
    })

    .factory('Authors', function($resource) {
        return $resource(apiEndpoint + 'authors');
    })

    .factory('Profile', function ($resource) {
        return $resource(apiEndpoint + 'profile');
    })

    .factory('Sessions', function ($resource) {
        return $resource(apiEndpoint + 'sessions/:token');
    })

    .factory('Partners', function($resource) {
        return $resource(apiEndpoint + 'partners/:partner_id');
    })

    .factory('httpRequestInterceptor', ['$location', 'Session', function ($location, Session) {
        return {
            request: function (req) {
                if(req.url.indexOf(apiUrl) != -1) {
                    if(Session.Valid()) {
                        req.headers = {'Token': Session.Token().token}
                    }
                } else {
                    console.log('Non api request to ' + req.url);
                    console.log(req);
                }

                return req;
            },

            response: function (resp) {
                return resp;
            },

            responseError: function (resp) {
                if(resp.config.url.indexOf(apiUrl) != -1) {
                    if(resp.status == 401) {
                        Session.Delete()
                        $location.path("pages/signin");
                    }
                }

                return resp;
            }
        };
    }])
;

