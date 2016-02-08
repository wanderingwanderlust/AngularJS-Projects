/**
 * Created by goku on 2/7/16.
 */
'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/facebook', {
            templateUrl: 'facebook/facebook.html',
            controller: 'FacebookCtrl'
        });
    }])

    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId('');
        $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
    })


    .run( function( $rootScope ) {
        // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Load the facebook SDK asynchronously
        //(function(){
        //    ...
        //}());
    })


    .controller('FacebookCtrl', ['$scope','$facebook' , function($scope, $facebook) {
        $scope.isLoggedIn = false;

        $scope.login = function(){
            $facebook.login().then(function(){
                $scope.isLoggedIn = true;
                refresh();
            });
        }


        $scope.logout = function(){
            $facebook.logout().then(function(){
                $scope.isLoggedIn = false;
                refresh();
            })
        }

        function refresh(){
            $facebook.api("/me").then(function(response){
                $scope.welcomeMsg = 'Welcome' + response.name;
                $scope.isLoggedIn = true;
                $scope.userInfor = response;
                $facebook.api('/me/picture').then(function(response){
                    $scope.picture = response.data.url;
                    $facebook.api('me/permissions').then(function(response){
                        $scope.permission = response.data;
                        $facebook.api('/me/posts').then(function(response){
                            $scope.posts = response.data;
                        });
                    });
                });

            },
            function(err){
                $scope.welcomeMsg = "Please Log In";
            });
        }

        $scope.postStatus = function(){
            var body = this.body;
            $facebook.api('/me/feed', 'post', {message: body}).then(function(response){
               $scope.msg = 'Thanks for posting';
                refresh();
            });
        }

        refreash();
    }]);