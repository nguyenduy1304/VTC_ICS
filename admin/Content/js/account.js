(function () {
    var api = window.host + "api/";
    var app = angular.module('Login', []);

    app.config(function ($stateProvider) {
        $stateProvider.state('account$signin', {
            cache: false,
            url: '/account/signin',
            controller: 'signinCtrl',
            templateUrl: "./template/account/signin.html"
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
                // Prevent form submission
                e.preventDefault();
                $scope.signin();
            });

        })
        $scope.signin = function () {
            var data = $scope.data;
            $rootScope.username = data.username;
            $http({
                method: 'POST',
                url: api + 'auth/login',
                data: { username: data.username, password: data.password },
                dataType: 'json',
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            }).then(function successCallback(response) {
                if (response.data.result === 1) {
                    $window.localStorage.token = response.data.data.token;
                    $window.localStorage.user = JSON.stringify(response.data.data.user);
                    $rootScope.$user = response.data.data.user;
                    $dialogAlert('Đăng nhập thành công!', 'Thông báo', 'success', function (res) {
                        if (res) {
                            $rootScope.login_active = false;
                            $state.go('selList');
                        }
                    });
                } else {
                    $dialogAlert('Tên đăng nhập hoặc mật khẩu không hợp lệ. Vui lòng kiểm tra lại!', 'Thông báo', 'warning')
                    $scope.error = response.data.ErrorMessage;
                }
            }, function errorCallback(response) {
                if (response.status == 500 || response.status == 404) {
                    $dialogAlert('Không thể kết nối được với server, vui lòng kiểm tra lại!', 'Connection Fail!', 'danger')
                } else {
                    $rootScope.login_active = false;
                    $state.go('selList');
                    $dialogAlert('Không thể kết nối được với server, vui lòng kiểm tra lại!', 'OHH!', 'danger')
                }
            });
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
