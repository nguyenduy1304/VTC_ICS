(function () {
    var api = window.host + "api/";
    var app = angular.module('Login', []);

    app.config(function ($stateProvider) {
        $stateProvider.state('account$signin', {
            cache: false,
            url: '/account/signin',
            controller: 'signinCtrl',
            templateUrl: window.templateUrl + "/account/signin.html"
        })
            .state('account$signout', {
                cache: false,
                url: '/account/signout',
                controller: 'signoutCtrl'
            })
    });

    app.run(function ($rootScope, $window, $log) {
        if (!$window.localStorage.user) return;
        $rootScope.$user = JSON.parse($window.localStorage.user);
        $log.info('init $user for rootScope');
    });
    //account signin
    app.controller('signinCtrl', function ($scope, $state, $http, $window, $rootScope, $dialogAlert, $timeout) {
        $scope.data = {};
        $rootScope.showhide = false;
        $rootScope.login_active = true;
        $(document).ready(function () {
            var loginButton = document.getElementById('loginButton');
            var fv = $('#signinForm').bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    username: {
                        validators: {
                            notEmpty: {
                                message: 'Tên đăng nhập không được bỏ trống!'
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'Mật khẩu không được bỏ trống!'
                            }
                        }
                    }
                }
            }).on('core.form.bv', function () {
                loginButton.innerHTML = 'Validating ...';
            }).on('success.form.bv', function (e) {
                e.preventDefault();
                $scope.signin();
            });
        })
        $http({
            method: 'GET',
            url: host_api + 'admin/data/users.json'
        }).then(function successCallback(response) {
            $scope.users = response.data;
        });
        $scope.signin = function () {
            const user = $scope.users;
            if ($scope.data.username === user.username && $scope.data.password === user.password) {
                $dialogAlert('Đăng nhập thành công!', 'Thông báo', 'success', function (res) {
                    if (res) {
                        localStorage.setItem('token', user.token);
                        $rootScope.login_active = false;
                        $state.go('manageRadioApp');
                    }
                    else {
                        $dialogAlert('Không thể kết nối được với server, vui lòng kiểm tra lại!', 'OHH!', 'danger')
                    }
                });
            }

        };
    });
    app.controller('signoutCtrl', function ($state, $rootScope, $window) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
        $state.go('account$signin');
    });

})();
