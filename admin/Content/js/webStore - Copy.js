(function () {
    var host = window.host;
    var host_api = window.host_api; //"http://localhost:56469/";
    var timer = 10000;
    var formatNumbers = function (amount, decimalCount = 0, decimal = ".", thousands = ".") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };
    function roundNumber(num, scale) {
        if (!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale) + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if (+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }
    var app = angular.module('WebStore', ['ui.router', 'ui.bootstrap', 'angular.filter']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            allowAnonymous: true,
            controller: 'producerCtrl',
            templateUrl: window.templateUrl + "/producer/index.html"
        })
            .state('proList', {
                url: '/san-pham/quan-ly',
                cache: false,
                controller: 'proList$Ctrl',
                templateUrl: window.templateUrl + "/producer/mProduct.html"
            })
            .state('proStatistic', {
                url: '/san-pham/thong-ke',
                cache: false,
                controller: 'proStatistic$Ctrl',
                templateUrl: window.templateUrl + "/producer/revStatistic.html"
            })
            .state('prokhuyenmai', {
                url: '/san-pham/quan-ly-khuyen-mai',
                cache: false,
                controller: 'prokhuyenmai$Ctrl',
                templateUrl: window.templateUrl + "/producer/quanlykhuyenmai.html"
            })
            .state('proboithuong', {
                url: '/san-pham/quan-ly-boi-thuong',
                cache: false,
                controller: 'proboithuong$Ctrl',
                templateUrl: window.templateUrl + "/producer/quanlyboithuong.html"
            })
            .state('seller', {
                url: '/don-vi-ban-hang',
                allowAnonymous: true,
                controller: 'sellerCtrl',
                templateUrl: window.templateUrl + "/seller/index.html"
            })
            .state('selList', {
                url: '/don-vi-ban-hang/quan-ly',
                cache: false,
                controller: 'selList$Ctrl',
                templateUrl: window.templateUrl + "/seller/mProduct.html"
            })
            .state('selStatistic', {
                url: '/don-vi-ban-hang/thong-ke',
                cache: false,
                controller: 'selStatistic$Ctrl',
                templateUrl: window.templateUrl + "/seller/revStatistic.html"
            })
            .state('selkhuyenmai', {
                url: '/don-vi-ban-hang/quan-ly-khuyen-mai',
                cache: false,
                controller: 'selkhuyenmai$Ctrl',
                templateUrl: window.templateUrl + "/seller/quanlykhuyenmai.html"
            })
            .state('selboithuong', {
                url: '/don-vi-ban-hang/quan-ly-boi-thuong',
                cache: false,
                controller: 'selboithuong$Ctrl',
                templateUrl: window.templateUrl + "/seller/quanlyboithuong.html"
            })
            .state('add$account', {
                url: '/account/add',
                cache: false,
                controller: 'add$account$Ctrl',
                templateUrl: window.templateUrl + "/account/add.html"
            })
            .state('list$account', {
                url: '/account/list',
                cache: false,
                controller: 'list$account$Ctrl',
                templateUrl: window.templateUrl + "/account/list.html"
            })
            .state('edit$account', {
                url: '/account/edit/:id',
                cache: false,
                controller: 'edit$account$Ctrl',
                templateUrl: window.templateUrl + "/account/edit.html"
            })
            .state('statictis$account', {
                url: '/account/statictis',
                cache: false,
                controller: 'statictis$account$Ctrl',
                templateUrl: window.templateUrl + "/account/statictis.html"
            });
    });
    app.run(function ($window, $rootScope, $q, $http, $location, $log, $timeout, $state, $interval) {
        $rootScope.$watch('$user', function () {
            if ($rootScope.$user === null || $rootScope.$user === undefined) {
                $log.info('redirect to login');
                $location.path('/account/signin');
                return;
            }
        })

        $rootScope.logOut = function () {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
        }
        $rootScope.formatNumbers = function (number) {
            return formatNumbers(number)
        };
        //bieu do highchart pie
        $rootScope.loadChartPie = function (datas, idName, title, options) {
            //setTimeout(function () {
            $(document).ready(function () {
                Highcharts.chart(idName, {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'

                    },
                    title: {
                        text: title
                    },

                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            colors: options.colors,
                            dataLabels: options.dataLabels,
                            showInLegend: options.showlegend
                        }
                    },
                    tooltip: {
                        //pointFormat: "T???ng: {point.y:,.0f}",
                        formatter: function () {
                            //console.log(this)
                            return this.key +
                                '<br/>T???ng:' + formatNumbers(this.y);
                        }
                    },
                    series: [{
                        name: 'T???ng',
                        colorByPoint: true,
                        data: datas
                    }],
                    credits: {
                        enabled: false
                    },
                });
            })
            //},0)
        }
        //bieu do highchart line
        $rootScope.loadChartLine = function (datas, idName, title, options) {
            setTimeout(function () {
                $(document).ready(function () {
                    Highcharts.setOptions({
                        colors: options.colors
                    });
                    Highcharts.chart(idName, {//'lineChart'
                        chart: {
                            type: 'spline',
                            scrollablePlotArea: {
                                minWidth: 600,
                                scrollPositionX: 1
                            }
                        },
                        title: {
                            text: title///'Th???ng k?? t??ng tr?????ng doanh thu (VN??)'
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: options.dataY
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        plotOptions: {
                            spline: {
                                lineWidth: 2,
                                states: {
                                    hover: {
                                        lineWidth: 3
                                    }
                                },
                                marker: {
                                    enabled: false
                                },

                            }
                        },
                        tooltip: {
                            //pointFormat: "T???ng: {point.y:,.0f}",
                            formatter: function () {
                                //console.log(this)
                                return this.key +
                                    '<br/>T???ng:' + formatNumbers(this.y);
                            }
                        },
                        series: datas,
                        credits: {
                            enabled: false
                        },
                    });
                })
            }, 100)
        }

    })
    //function dashboard
    app.controller('producerCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('producer') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = 'Nh?? cung c???p > Dashboard';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.dataOrder = {};
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'dashboard')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/producer?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

        //show product detail
        $scope.productDetail = function (code) {
            $http({
                method: 'GET',
                url: host_api + 'api/common/get?action=productdetail&productcode=' + code,
                //host_api + 'api/report/seller?action=productdetail&productcode=' + code,
                ///host_api + 'api/common/get?action=productdetail&productcode=' + code,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    var detailProduct = res.data.data;
                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >${detailProduct.product_name}</h4>\
                        </div>\
                        <div style="" id="print">
                            <table class="table" style="width:100%;margin-bottom:0">
                                <tr><td  style="width:150px;"><strong>M?? s???n ph???m: </strong></td><td>${detailProduct.product_code}</td></tr>
                                <tr><td><strong>Gi??: </strong></td><td>${detailProduct.price}</td></tr>
                                <tr><td><strong>M?? t???: </strong></td><td>${detailProduct.description}</td></tr>
                            </table>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {

                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                            };
                        },
                        controllerAs: $scope,
                        size: 'xs',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                console.log(e);
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            })


        };
        // Chi tiet doanh thu trong th??ng
        $scope.dtDetail = function (code, pName) {
            $('.modal').modal('show');
            $http({
                method: 'GET',
                url: host_api + 'api/report/producer?action=dashboarddetail&code=' + code + '&type=month&num=9999&page=0',
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                //console.log(res);
                $('.modal').modal('hide');
                if (res.data.result > 0) {
                    var detailProduct = res.data.data.detail;
                    var modal = $uibModal.open({
                        animation: 0,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >Chi ti???t doanh thu ${pName} trong th??ng </h4>\
                        </div>\
                        <div style="max-height:350px;" id="print">
                            <table class="table table-bordered" style="width:100%;margin-bottom:0">
                                    <thead>
                                        <tr class="panel-info list-group-item-info">
                                            <th style="text-align:center;width:60px">STT</th>
                                            <th style="width:150px">M?? s???n ph???m </th>
                                            <th style="width:100px">G??i</th>
                                            <th style="width:150px">Gi??</th>
                                            <th style="width:200px">Ng??y k??ch ho???t</th>
                                            <th style="width:216px">Ng??y h???t h???n</th>
                                        </tr>
                                    </thead>                                   
                            </table>
                            <div style="max-height: 300px;overflow-y: scroll;">
                                <table class="table table-bordered table-striped" style="width:100%;margin-bottom:0">
                                    <tbody>   
                                            <tr ng-repeat="item in detailProduct">
                                                <td style="width:60px;text-align:center;">{{$index+1}}</td>
                                                <td style="width:150px">{{item.product_code}}</td>                                
                                                <td style="width:100px">{{item.type}}</td>                                
                                                <td style="width:150px" class="text-right">{{item.total}}</td>                                
                                                <td style="width:200px">{{item.subscribe_date.substring(0,10)}}</td>                                
                                                <td style="width:200px">{{item.subscribe_expired}}</td>                                
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.detailProduct = detailProduct;
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                            };
                        },
                        controllerAs: $scope,
                        size: 'lg',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }
            }, function err(e) {
                console.log(e);
                $('.modal').modal('hide');
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            });
        };
        // Chi tiet doanh thu l??y k???
        $scope.dtlkDetail = function (code, pName) {
            $('.modal').modal('show');
            $http({
                method: 'GET',
                url: host_api + 'api/report/producer?action=dashboarddetail&code=' + code + '&type=all&num=999999&page=0',
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                $('.modal').modal('hide');
                if (res.data.result > 0) {
                    var detailProduct = res.data.data.detail;
                    var modal = $uibModal.open({
                        animation: 0,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >Chi ti???t doanh thu l??y k??? ${pName}</h4>\
                        </div>\
                        <div style="max-height:350px;" id="print">
                            <table class="table table-bordered" style="width:100%;margin-bottom:0">
                                    <thead>
                                        <tr class="panel-info list-group-item-info">
                                            <th style="text-align:center;width:60px">STT</th>
                                            <th style="width:150px">M?? s???n ph???m </th>
                                            <th style="width:100px">G??i</th>
                                            <th style="width:150px">Gi??</th>
                                            <th style="width:200px">Ng??y k??ch ho???t</th>
                                            <th style="width:216px">Ng??y h???t h???n</th>
                                        </tr>
                                    </thead>                                   
                            </table>
                            <div style="max-height: 300px;overflow-y: scroll;">
                                <table class="table table-bordered table-striped" style="width:100%;margin-bottom:0">
                                    <tbody>   
                                            <tr ng-repeat="item in detailProduct">
                                                <td style="width:60px;text-align:center;">{{$index+1}}</td>
                                                <td style="width:150px">{{item.product_code}}</td>                                
                                                <td style="width:100px">{{item.type}}</td>                                
                                                <td style="width:150px" class="text-right">{{item.total}}</td>                                
                                                <td style="width:200px">{{item.subscribe_date.substring(0,10)}}</td>                                
                                                <td style="width:200px">{{item.subscribe_expired}}</td>                                
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.detailProduct = detailProduct;
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                            };
                        },
                        controllerAs: $scope,
                        size: 'lg',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }
            }, function err(e) {
                console.log(e);
                $('.modal').modal('hide');
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            });
        };


    });
    // function qu???n l?? s???n ph???m producer
    app.controller('proList$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('producer') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = 'Nh?? cung c???p > Qu???n l?? s???n ph???m';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'product')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/producer?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })

    // function qu???n l?? th???ng k?? doanh thu producer
    app.controller('proStatistic$Ctrl', function ($http, $scope, $state, $rootScope, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('producer') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = "Nh?? cung c???p > Th???ng k?? doanh thu";
        $scope.textloading = "??ang t???i d??? li???u ...";
        $(document).ready(function () {
            setTimeout(function () {
                $(".dateTimePicker").datetimepicker({
                    isRTL: false,
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'en',
                    minView: 2, //tat thoi gian
                    pickTime: false, //tat thoi gian
                    todayBtn: true,
                });
            }, 500);
        });

        var _timeTodate = function () {
            var date = new Date();
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours();
            month = month < 10 ? "0" + month : month,
                day = day < 10 ? "0" + day : day;


            return year + "-" + month + "-" + day; // day + "/" + month + "/" + year;
        }
        var _timeFromdate = function () {
            //var date = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));/ / l??i 30 ng??y
            var date = new Date();
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours();
            month = month < 10 ? "0" + month : month,
                day = '01';///day < 10 ? "0" + day : day;


            return year + "-" + month + "-" + day; // day + "/" + month + "/" + year;
        }
        $scope.from_date = _timeFromdate();
        $scope.to_date = _timeTodate();
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'statistic')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }

            // search theo date, search theo productName or productCode
            $scope.searchFilter = function () {
                $scope.page = 0;
                search();
            }

            // load data api
            function search() {
                $scope.from_date = $scope.from_date;
                $scope.to_date = $scope.to_date;
                $scope.fromDate = new Date($scope.from_date);
                $scope.toDate = new Date($scope.to_date);
                $scope.data = [];
                $scope.priceTotal = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/producer?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.priceTotal = res.data.data.total;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }

                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })
    // function qu???n l?? Khuy???n m??i producer
    app.controller('prokhuyenmai$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('producer') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = 'Nh?? cung c???p > Qu???n l?? khuy???n m??i';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }


        fndata($http, $scope, 'product');

        function fndata($http, $scope, action) {
            search();
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/producer?action=promotion&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })
    // function qu???n l?? b???i th?????ng producer
    app.controller('proboithuong$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('producer') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = 'Nh?? cung c???p > Qu???n l?? b???i th?????ng';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'product')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/producer?action=claim&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })

    //function dashboard seller
    app.controller('sellerCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = '????n v??? b??n h??ng > Dashboard';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.dataOrder = {};
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'dashboard')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.priceTotal = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/seller?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.priceTotal = res.data.data.total;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }

                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

        //show producer detail
        $scope.productDetail = function (code) {
            $http({
                method: 'GET',
                url: host_api + 'api/report/seller?action=productdetail&productcode=' + code,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    var detailProduct = res.data.data;
                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >${detailProduct.seller.product_name}</h4>\
                        </div>\
                        <div style="" id="print">
                            <table class="table" style="width:100%;margin-bottom:0">
                                <tr><td  style="width:150px;"><strong>M?? s???n ph???m: </strong></td><td>${detailProduct.seller.product_code}</td></tr>
                                <tr><td><strong>Gi?? b??n: </strong></td><td>${detailProduct.price_out}</td></tr>
                                <tr><td><strong>Gi?? mua: </strong></td><td>${detailProduct.price_in}</td></tr>
                                <tr><td><strong>Chi???t kh???u: </strong></td><td>${detailProduct.description}</td></tr>
                            </table>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.cancel = function () {
                                $uibModalInstance.close(false)
                            };
                        },

                        size: 'xs',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                console.log(e);
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            })


        };
        //show seller detail
        $scope.sellerDetail = function (code) {
            $http({
                method: 'GET',
                url: host_api + 'api/common/get?action=productdetail&productcode=' + code,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    var detailProduct = res.data.data;
                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >${detailProduct.product_name}</h4>\
                        </div>\
                        <div style="" id="print">
                            <table class="table" style="width:100%;margin-bottom:0">
                                <tr><td  style="width:150px;"><strong>M?? s???n ph???m: </strong></td><td>${detailProduct.product_code}</td></tr>
                                <tr><td><strong>Gi??: </strong></td><td>${detailProduct.price}</td></tr>
                                <tr><td><strong>M?? t???: </strong></td><td>${detailProduct.description}</td></tr>
                            </table>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()"  >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {

                            $scope.cancel = function () {
                                $uibModalInstance.close(false)
                            };
                        },
                        //controllerAs: $scope,
                        size: 'xs',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                console.log(e);
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            })


        };
        // Chi tiet doanh thu trong th??ng
        $scope.dtDetail = function (code, pName) {
            $('.modal').modal('show');
            $http({
                method: 'GET',
                url: host_api + 'api/report/seller?action=dashboarddetail&code=' + code + '&num=999&page=0',
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                $('.modal').modal('hide');
                if (res.data.result > 0) {
                    var detailProduct = res.data.data.detail;
                    var modal = $uibModal.open({
                        animation: 0,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >Doanh thu chi ti???t c??ng ty ${pName}</h4>\
                        </div>\
                        <div style="max-height:350px;" id="print">
                            <table class="table table-bordered" style="width:100%;margin-bottom:0">
                                    <thead>
                                        <tr class="panel-info list-group-item-info">
                                            <th style="text-align:center;width:50px">STT</th>
                                            <th style="width: 196px;">T??n s???n ph???m </th>
                                            <th style="width: 220px;">K??nh b??n </th>
                                            <th style="width: 132px;">G??i</th>                                            
                                            <th style="width: 132px;">Ng??y k??ch ho???t</th>
                                            <th style="width: 136px;">Ng??y h???t h???n</th>
                                            <th style="width: 190px;">Doanh thu</th>
                                            <th style="width: 220px;">L???i nhu???n</th>
                                        </tr>
                                    </thead>                                   
                            </table>
                            <div style="max-height: 300px;overflow-y: scroll;">
                                <table class="table table-bordered table-striped" style="width:100%;margin-bottom:0">
                                    <tbody>   
                                            <tr ng-repeat="item in detailProduct">
                                                <td style="width:50px;text-align:center;">{{$index+1}}</td>
                                                <td style="width:150px">{{item.producer.product_code}}:{{item.producer.product_name}}</td>                                
                                                <td style="width:150px">{{item.seller.product_code}}:{{item.seller.product_name}}</td>                                
                                                <td style="width:100px">{{item.type}}</td>                      
                                                <td style="width:100px">{{item.subscribe_date.substring(0,10)}}</td>                                
                                                <td style="width:100px">{{item.subscribe_expired}}</td>
                                                <td style="width:150px" class="text-right">{{item.total}}</td>                                
                                                <td style="width:150px" class="text-right">{{item.total_last}}</td>                                
                                                                                
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.detailProduct = detailProduct;
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                            };
                        },
                        controllerAs: $scope,
                        size: 'lg',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }
            }, function err(e) {
                console.log(e);
                $('.modal').modal('hide');
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            });
        };
    });
    // function seller qu???n l?? s???n ph???m seller
    app.controller('selList$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = '????n v??? b??n h??ng > Qu???n l?? s???n ph???m';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'product')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // search theo date, search theo productName or productCode
            $scope.searchFilter = function () {
                $scope.page = 0;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/seller?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res)                  
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })
    // function seller qu???n l?? th???ng k?? doanh thu seller
    app.controller('selStatistic$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = "????n v??? b??n h??ng > Th???ng k?? doanh thu";
        $scope.textloading = "??ang t???i d??? li???u ...";
        $(document).ready(function () {
            setTimeout(function () {
                $(".dateTimePicker").datetimepicker({
                    isRTL: false,
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'en',
                    minView: 2, //tat thoi gian
                    pickTime: false, //tat thoi gian
                    todayBtn: true,
                });
            }, 500);
        });

        var _timeTodate = function () {
            var date = new Date();
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours();
            month = month < 10 ? "0" + month : month,
                day = day < 10 ? "0" + day : day;


            return year + "-" + month + "-" + day; // day + "/" + month + "/" + year;
        }
        var _timeFromdate = function () {
            //var date = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));// l??i 30 ng??y
            var date = new Date();
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hour = date.getHours();
            month = month < 10 ? "0" + month : month,
                day = '01';///day < 10 ? "0" + day : day;


            return year + "-" + month + "-" + day; // day + "/" + month + "/" + year;
        }
        $scope.from_date = _timeFromdate();
        $scope.to_date = _timeTodate();
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'statistic')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }

            // search theo date, search theo productName or productCode
            $scope.searchFilter = function () {
                $scope.page = 0;
                search();
            }

            // load data api
            function search() {
                $scope.data = [];
                $scope.priceTotal = [];
                $scope.totalRow = 0;
                $scope.from_date = $scope.from_date;
                $scope.to_date = $scope.to_date;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/seller?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.priceTotal = res.data.data.total;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                    }
                }, function err(e) {
                    console.log(e);
                    //if (err.data.result === -401) {
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                    //}

                })
            }
        }
        //show producer detail
        $scope.sellerDetail = function (code) {
            $http({
                method: 'GET',
                url: host_api + 'api/report/seller?action=productdetail&productcode=' + code,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    var detailProduct = res.data.data;
                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >${detailProduct.seller.product_name}</h4>\
                        </div>\
                        <div style="" id="print">
                            <table class="table" style="width:100%;margin-bottom:0">
                                <tr><td  style="width:150px;"><strong>M?? s???n ph???m: </strong></td><td>${detailProduct.seller.product_code}</td></tr>
                                <tr><td><strong>Gi?? b??n: </strong></td><td>${detailProduct.price_out}</td></tr>
                                <tr><td><strong>Gi?? mua: </strong></td><td>${detailProduct.price_in}</td></tr>
                                <tr><td><strong>Chi???t kh???u: </strong></td><td>${detailProduct.description}</td></tr>
                            </table>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()" >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {
                            $scope.cancel = function () {
                                $uibModalInstance.close(false)
                            };
                        },

                        size: 'xs',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                console.log(e);
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            })


        };
        //show seller detail
        $scope.productDetail = function (code) {
            $http({
                method: 'GET',
                url: host_api + 'api/common/get?action=productdetail&productcode=' + code,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    var detailProduct = res.data.data;
                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                        <h4 class ="modal-title" style="color:#fff" >${detailProduct.product_name}</h4>\
                        </div>\
                        <div style="" id="print">
                            <table class="table" style="width:100%;margin-bottom:0">
                                <tr><td  style="width:150px;"><strong>M?? s???n ph???m: </strong></td><td>${detailProduct.product_code}</td></tr>
                                <tr><td><strong>Gi??: </strong></td><td>${detailProduct.price}</td></tr>
                                <tr><td><strong>M?? t???: </strong></td><td>${detailProduct.description}</td></tr>
                            </table>
                        </div>
                        <div class ="modal-footer">\                           
                            <button class ="btn btn-default" ng-click="cancel()"  >????ng</button>\
                        </div>`,
                        controller: function ($scope, $uibModalInstance) {

                            $scope.cancel = function () {
                                $uibModalInstance.close(false)
                            };
                        },
                        //controllerAs: $scope,
                        size: 'xs',//size sm,xs,lg   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                console.log(e);
                $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            })


        };
        // load highchart
        /*$http({
            method: 'GET',
            url: host_api + 'api/report/seller?action=statistic&filter=' + ($scope.filter || '') + '&num=1000000&page=0&from_date=2021-08-01&to_date=2021-08-31',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                console.log(res.data.data);
                $scope.dataHc = res.data.data.detail;
                $scope.dataHc.forEach(function (val) {
                    val.total = val.total.replace(" ???", "");
                    val.total_last = val.total_last.replace(" ??", "")
                })
                $scope.dataHc = groupBy($scope.dataHc, pet => pet.producer.product_code );
                console.log($scope.dataHc);
                var _arr1 = [], _arr2 = [];
                res.data.data.total.forEach(function (val) {
                    if (val.producer_code !== "CHANNEL") {
                        val.total = val.total.replace(" ???", "");
                        val.total = val.total.replaceAll(".", "");
                        val.total_last = val.total_last.replace(" ??", "");
                        val.total_last = val.total_last.replaceAll(".", "");
                        _arr1.push({
                            name: val.producer_name,
                            y: parseInt(val.total)
                        });
                        _arr2.push({
                            name: val.producer_name,
                            y: parseInt(val.total_last)
                        });
                    }

                });
                
                
                $scope.dataPie = res.data.data.total;
                return { _arr1, _arr2}
            }
        }, function err(e) {
            ///console.log(e);
            //if (err.data.result === -401) {
            $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
            //}

        }).then(function (result) {
            //console.log(result);
            loadChartPie(result._arr1, "GPA","Th???ng k?? doanh thu (t??? ?????ng)");
            loadChartPie(result._arr2, "CSI",'Th???ng k?? l???i nhu???n (t??? ?????ng)');
        });*/
        // bi???u ????? h??nh tr??n
        var options_pie = {
            colors: ['#ED7D31', '#5B9BD5'],
            showlegend: false,
            dataLabels: {
                enabled: true,
                //format: `<b>{point.y}</b><br>{point.percentage:.1f} %`,
                formatter: function () {
                    //console.log(this)
                    return roundNumber(this.y / 1000000000, 3) +
                        '<br/>' + roundNumber(this.percentage, 1) + ' %';
                },
                distance: -70,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
        $http({
            method: 'GET',
            url: host_api + 'api/report/seller?action=statisticcharts&type=pie',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log(res);
            var _arr1 = [], _arr2 = [];
            //data thong ke loi nhuan
            res.data.data.total.forEach(function (val) {
                if (val.producer_code !== "CHANNEL") {
                    _arr1.push({
                        name: val.name,
                        y: val.y
                    });

                }

            });
            // data thong ke doanh thu
            res.data.data.total_last.forEach(function (val) {
                if (val.producer_code !== "CHANNEL") {
                    _arr2.push({
                        name: val.name,
                        y: val.y
                    });
                }
            });
            //console.log(_arr1, _arr2)
            return { _arr1, _arr2 }
        }, function err(e) {
            console.log(e);
            $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
        }).then(function (result) {
            //console.log(result);
            $rootScope.loadChartPie(result._arr1, "hightchart-GPA", "Th???ng k?? doanh thu (t??? ?????ng)", options_pie);
            $rootScope.loadChartPie(result._arr2, "hightchart-CSI", 'Th???ng k?? l???i nhu???n (t??? ?????ng)', options_pie);
        });


        // bi???u ????? ???????ng k???
        var option_line = {
            colors: ['#ED7D31', '#5B9BD5'],
            dataY: ['Th??ng 1', 'Th??ng 2', 'Th??ng 3', 'Th??ng 4', 'Th??ng 5', 'Th??ng 6', 'Th??ng 7', 'Th??ng 8', 'Th??ng 9', 'Th??ng 10', 'Th??ng 11', 'Th??ng 12']
        };
        $http({
            method: 'GET',
            url: host_api + 'api/report/seller?action=statisticcharts&type=line',//&from_date=2021-08-01&to_date=2021-08-31
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log(res);
            var _data = [];
            if (res.data.result > 0) {
                res.data.data.total.forEach(function (val) {
                    _data.push({
                        name: val.producer_name,
                        data: val.data
                    })
                })
            }
            return _data
        }, function err(e) {

            console.log(e);
            $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
        }).then(function (result) {
            //console.log(result);
            $rootScope.loadChartLine(result, 'lineChart', 'Th???ng k?? t??ng tr?????ng doanh thu (VN??)', option_line)
        });


        //$scope.dataHc = groupBy($scope.dataHc, pet => pet.producer.product_code);
        function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }


    })
    // function qu???n l?? Khuy???n m??i seller
    app.controller('selkhuyenmai$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = '????n v??? b??n h??ng  > Qu???n l?? khuy???n m??i';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'product')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/seller?action=promotion&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })
    // function qu???n l?? b???i th?????ng seller
    app.controller('selboithuong$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $window) {
        if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
            $rootScope.$user = null;
            $rootScope.login_active = true;
            $state.go('account$signout');
            return;
        }
        $rootScope.headTitle = '????n v??? b??n h??ng  > Qu???n l?? b???i th?????ng';
        $scope.textloading = "??ang t???i d??? li???u ...";
        $scope.page = 0;
        $scope.num = 10;
        $scope.totalRow = 0;
        if ($rootScope.$user === null || $rootScope.$user === undefined) {
            $log.info('redirect to login');
            $location.path('/account/signin');
            return;
        }
        fndata($http, $scope, 'product')
        function fndata($http, $scope, action) {
            search()
            $scope.search = search;
            // sort
            $scope.sort = {
                column: '',
                descending: false
            };

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
            // thay ?????i class khi sort
            $scope.selectedCls = function (column) {
                return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
            };
            // paging
            $scope.prev = function () {
                $scope.page--;
                if ($scope.page < 0) {
                    $scope.page = 0;
                    search();
                    return;
                }
                search();
            }
            $scope.next = function () {
                if ((($scope.page + 1) * $scope.num) > $scope.totalRow) return;
                $scope.page++;
                search();
            }
            // load data api
            function search() {
                $scope.data = [];
                $scope.totalRow = 0;
                $http({
                    method: 'GET',
                    url: host_api + 'api/report/seller?action=claim&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    //console.log(res);
                    if (res.data.result > 0) {
                        $scope.data = res.data.data.detail;
                        $scope.totalRow = res.data.data.total_row;
                    } else {
                        $scope.textloading = "D??? li???u tr???ng.";
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                    }
                }, function err(e) {
                    console.log(e);
                    $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
                })
            }
        }

    })
    // function thong ke tai khoan qua bieu do
    app.controller('statictis$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        // bi???u ????? h??nh tr??n
        var year = new Date();
        year = year.getFullYear();
        $http({
            method: 'GET',
            url: host_api + 'api/report/producer?action=customercharts&type=pie',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.result > 0) {
                var options_pie = {
                    colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
                    showlegend: true,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return roundNumber(this.percentage, 0) + ' %';
                        },
                        distance: -50
                    }
                }
                $rootScope.loadChartPie(res.data.data.customer, "tkluongkh", "Th???ng k?? l?????ng kh??ch h??ng", options_pie);
                $rootScope.loadChartPie(res.data.data.total, "tkdoanhthukh", 'Th???ng k?? doanh thu kh??ch h??ng', options_pie);

            }

        }, function err(e) {
            console.log(e);
            $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
        })
        // bieu do line
        var option_line = {
            colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
            dataY: ['Th??ng 1', 'Th??ng 2', 'Th??ng 3', 'Th??ng 4', 'Th??ng 5', 'Th??ng 6', 'Th??ng 7', 'Th??ng 8', 'Th??ng 9', 'Th??ng 10', 'Th??ng 11', 'Th??ng 12']
        };
        $http({
            method: 'GET',
            url: host_api + 'api/report/producer?action=customercharts&type=line',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.result > 0) {

                $rootScope.loadChartLine(res.data.data.customer, "bieudoline", "Th???ng k?? t??ng tr?????ng kh??ch h??ng (n??m " + year + ")", option_line);

            }

        }, function err(e) {
            console.log(e);
            $dialogAlert("\n" + e.data.Message, "Th??ng b??o!", "warning");
        })
    });
    // function them moi tai khoan
    app.controller('add$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        //default states
        $scope.selectDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $scope.selectedList = {};
        $scope.dataForm = {};
        $(document).ready(function () {
            $('#enableForm')
                .bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        password: {
                            enabled: false,
                            validators: {
                                notEmpty: {
                                    message: 'M???t kh???u kh??ng ???????c ????? tr???ng'
                                }
                            }
                        },
                        confirm_password: {
                            enabled: false,
                            validators: {
                                notEmpty: {
                                    message: 'M???t kh???u kh??ng ???????c ????? tr???ng'
                                },
                                identical: {
                                    field: 'password',
                                    message: 'X??c nh???n m???t kh???u kh??ng ch??nh x??c'
                                }
                            }
                        },
                        'rolle[]': {
                            validators: {
                                notEmpty: {
                                    message: 'Vui l??ng ch???n ??t nh???t m???t vai tr??'
                                }
                            }
                        }
                    }
                })
                // Enable the password/confirm password validators if the password is not empty
                .on('keyup', '[name="password"]', function () {
                    var isEmpty = $(this).val() === '';
                    $('#enableForm')
                        .bootstrapValidator('enableFieldValidators', 'password', !isEmpty)
                        .bootstrapValidator('enableFieldValidators', 'confirm_password', !isEmpty);

                    // Revalidate the field when user start typing in the password field
                    if ($(this).val().length === 1) {
                        $('#enableForm').bootstrapValidator('validateField', 'password')
                            .bootstrapValidator('validateField', 'confirm_password');
                    }
                })
                .on('success.field.bv', function (e, data) {
                    var $parent = data.element.parents('.form-group');
                    // Hide the success icon
                    $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]').hide();
                })
                .on('error.field.bv', function (e, data) {
                    // Hide the success icon
                    var $parent = data.element.parents('.form-group');
                    $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]').hide();
                })
                .on('success.form.bv', function (e) {
                    // Prevent form submission
                    e.preventDefault();
                    $scope.submit();
                });
        });
        /**
         * Action
         */
        $scope.submit = function () {
            var _rolle = []
            angular.forEach($scope.selectedList, function (selected, day) {
                if (selected) {
                    console.log(day);
                    _rolle.push(day)
                }
            });
            $scope.dataForm.rolles = _rolle;
            console.log($scope.dataForm);
        };
    });
    // function danh sach tai khoan
    app.controller('list$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        //
    });
    // function chinh sua tai khoan
    app.controller('edit$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
        //
    });
})();
