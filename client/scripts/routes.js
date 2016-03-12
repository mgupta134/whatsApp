//Create routes and states

//***We will use the controller with conrollerAs syntax, 
//which means we won't put our variables on the 
//$scope - we will use this context instead.
angular
    .module('Whatsapp')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'client/templates/tabs.html',
            resolve: {
                user: isAuthorized,
                chats() {
                    return Meteor.subscribe('chats');
                }
            }
        })
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'client/templates/chats.html',
                    controller: 'ChatsCtrl as chats'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'client/templates/chat-detail.html',
                    controller: 'ChatDetailCtrl as chat'
                }
            }
        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'client/templates/settings.html',
                    controller: 'SettingsCtrl as settings',
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'client/templates/login.html',
            controller: 'LoginCtrl as logger'
        })
        .state('confirmation', {
            url: '/confirmation/:phone',
            templateUrl: 'client/templates/confirmation.html',
            controller: 'ConfirmationCtrl as confirmation'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'client/templates/profile.html',
            controller: 'ProfileCtrl as profile',
            resolve: {
                user: isAuthorized
            }
        });

    $urlRouterProvider.otherwise('tab/chats');

    ////////////

    function isAuthorized($q) {
        let deferred = $q.defer();
        if (!Meteor.user)
            deferred.reject('AUTH_REQUIRED');
        else if (_.isEmpty(Meteor.user()))
            deferred.reject('AUTH_REQUIRED');
        else
            deferred.resolve();

        return deferred.promise;
    }
}
