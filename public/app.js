'use strict';

angular.module('cms', [
    'ngResource',
    'ui.bootstrap',
    'ngAnimate',
    'headerCtrl',
    'homeCtrl',
    'adminCtrl',
    'userRegCtrl',
    'conferenceCtrl',
    'loginCtrl',
    'managersCtrl',
    'createConferenceCtrl',
    'profileCtrl',
    'activityCtrl',
    'manageAccountsCtrl',
    'apiService',
    'mapService',
    'countryService',
    'satellizer',
    'customDirs',
    'validateDirectives',
    'customFilters',
    'google.places',
    'popupCtrl',
    'signupConfCtrl',
    'signupEventCtrl',
    'ng-fusioncharts',
    'manageAccommodationsCtrl',
    'manageInventoryCtrl',
    'manageRoomsCtrl',
    'manageTransportationCtrl',
    'ngStorage',
    'popupServices',
    'ngMap',
    'ui.router',
    'manageRequestsCtrl',
    'ngTable',
    'permissionService',
    'reportsCtrl',
    'angular-timeline',
    'ui.mask',
    'manageAttendeesCtrl',
    'createEventCtrl'
])

.run( function( $rootScope, $auth, $localStorage, $http, popup ) {
    $rootScope.auth = $auth.isAuthenticated();

    $rootScope.$on('$stateChangeStart',
        function () {
            var user;
            if ($rootScope.user) {
                user = $rootScope.user.id;
            }
            var token;
            if ($auth.getToken()) token = $auth.getToken();
            $http({
                method: 'POST',
                url: 'api/auth/confirm',
                headers: {
                    'X-Auth-Token': token,
                    'ID': user
                }
            }).success( function ( response ) {
                if ( response.status == 'error' ) {
                    popup.alert('danger', 'You have been logged out.');
                    $auth.removeToken();
                    $rootScope.auth = null;
                    $rootScope.user = null;
                    delete $localStorage.user;
                }
            })
        });

    $rootScope.user = $localStorage.user;
    $rootScope.alerts = [];
})

.config(function( $stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, uiMaskConfigProvider ) {
    $authProvider.loginUrl = 'api/auth/login';
    $authProvider.httpInterceptor = false;

    $httpProvider.interceptors.push('tokenInterceptor');
    $httpProvider.defaults.headers.common["Accept"] = 'application/json';

    var maskDefinitions = uiMaskConfigProvider.$get().maskDefinitions;
    angular.extend(maskDefinitions, {'2': /[0-2]/, '6': /[0-6]/});

    $stateProvider

    .state( 'home', {
        url: '/',
        templateUrl: 'components/home/homeView.html',
        controller: 'homeController'
    })

    .state( 'login', {
        url: '/login',
        templateUrl: 'components/login/loginView.html',
        controller: 'loginController',
        resolve: {
            skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state( 'admin', {
        url: '/admin',
        templateUrl: 'components/admin/adminView.html',
        controller: 'adminController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'register', {
        url: '/register',
        templateUrl: 'components/userReg/userRegView.html',
        controller: 'userRegController',
        resolve: {
            skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state( 'conference', {
        url: '/conference-:conferenceId',
        templateUrl: 'components/conference/conferenceView.html',
        controller: 'conferenceController'
    })

    .state( 'create-conference', {
        url: '/create-conference',
        templateUrl: 'components/createConference/createConferenceView.html',
        controller: 'createConferenceController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'conference-signup', {
        url: '/conference-:conferenceId/signup?name',
        templateUrl: 'components/signupConference/signupConferenceView.html',
        controller: 'signupConferenceController',
        resolve: {
          loginRequired: loginRequired
        }
    })

    .state( 'create-event', {
        url: '/conference-:conferenceId/create-event',
        templateUrl: 'components/createEvent/createEventView.html',
        controller: 'createEventController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'event-signup', {
        url: '/event-:eventId/signup?name',
        templateUrl: 'components/signupEvent/signupEventView.html',
        controller: 'signupEventController',
        resolve: {
          loginRequired: loginRequired
        }
    })

    .state( 'profile', {
        url: '/profile',
        templateUrl: 'components/profile/profileView.html',
        controller: 'profileController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'logs', {
        url: '/logs',
        templateUrl: 'components/activityLog/activityLogView.html',
        controller: 'activityLogController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'accounts', {
        url: '/accounts',
        templateUrl: 'components/manageAccounts/manageAccountsView.html',
        controller: 'manageAccountsController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'conference-managers', {
        url: '/conference-:conferenceId/managers',
        templateUrl: 'components/manageManagers/manageManagersView.html',
        controller: 'conferenceManagersController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'event-managers', {
        url: '/event-:eventId/managers',
        templateUrl: 'components/manageManagers/manageManagersView.html',
        controller: 'eventManagersController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'manage-accommodations', {
        url: '/manage-accommodations-:conferenceId',
        templateUrl: 'components/manageAccommodations/manageAccommodationsView.html',
        controller: 'manageAccommodationsController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'manage-inventory', {
        url: '/manage-inventory-:conferenceId',
        templateUrl: 'components/manageInventory/manageInventoryView.html',
        controller: 'manageInventoryController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'manage-rooms', {
        url: '/manage-rooms-:accommodationId',
        templateUrl: 'components/manageRooms/manageRoomsView.html',
        controller: 'manageRoomsController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'manage-transportation', {
        url: '/manage-transportation-:conferenceId',
        templateUrl: 'components/manageTransportation/manageTransportationView.html',
        controller: 'manageTransportationController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'requests', {
        url: '/requests',
        templateUrl: 'components/manageRequests/manageRequestsView.html',
        controller: 'manageRequestsController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'reports', {
        url: '/reports-:conferenceId',
        templateUrl: 'components/reports/reportsView.html',
        controller: 'reportsController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    .state( 'manage-attendees', {
        url: '/manage-attendees-:conferenceId',
        templateUrl: 'components/manageAttendees/manageAttendeesView.html',
        controller: 'manageAttendeesController',
        resolve: {
            loginRequired: loginRequired
        }
    })

    $urlRouterProvider.otherwise( '/' );

    $locationProvider.html5Mode(true);

    function skipIfLoggedIn( $q, $auth, $location ) {
        var deferred = $q.defer();
        if ( $auth.isAuthenticated() ) {
            $location.path('/');
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function loginRequired( $q, $auth, $location ) {
        var deferred = $q.defer();
        if ( $auth.isAuthenticated() ) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }
})

.factory('tokenInterceptor', function ($q, $rootScope, $injector) {
    return {
        'response': function (response) {
            var $auth = $injector.get('$auth');
            var $http = $injector.get('$http');
            var token = $auth.getToken();
            if (token) {
                $http.defaults.headers.common["X-Auth-Token"]=token;
            } else {
                $http.defaults.headers.common["X-Auth-Token"]=undefined;
            }
            var user = $rootScope.user;
            var id = undefined;
            if (user) {
                id = user.id;
            }
            $http.defaults.headers.common["ID"]=id;
            return response || $q.when(response);
        }
    };
});
