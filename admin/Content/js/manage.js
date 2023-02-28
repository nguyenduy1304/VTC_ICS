var app = angular.module('WebStore', ['ui.router', 'ui.bootstrap', 'angular.filter', 'ckeditor']);
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise('/');
    // $urlMatcherFactoryProvider.caseInsensitive(true);
    // $urlMatcherFactoryProvider.strictMode(false); 
    $stateProvider
        .state('seller', {
            url: '/',
            allowAnonymous: true,
            controller: 'sellerCtrl',
            templateUrl: window.templateUrl + "/order/index.html"
        })
        .state('selList', {
            url: '/don-vi-ban-hang/quan-ly',
            cache: false,
            controller: 'selList$Ctrl',
            //templateUrl: window.templateUrl + "/seller/mProduct.html"
            templateUrl: window.templateUrl + "/manageDevice/device.html"
        })
    // $locationProvider.html5Mode(true);
});