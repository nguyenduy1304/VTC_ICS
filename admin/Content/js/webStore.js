var host = window.host;
var host_api = window.host_api;
var timer = 10000;
var PerPage = 4;
var user = 'vtc';
var user_Key = 'D3sQlzacZKLQXf221XOHPJ5uwyPfyPBM';
const domain_api = 'http://ttn.onephone.online/index.php/api/';

//const url_host_api = 'http://127.0.0.1:5500/';

var formatNumbers = function (amount, decimalCount, decimal, thousands) {
    decimalCount = decimalCount || 0;
    decimal = decimal || '.';
    thousands = thousands || '.';
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
function disableAtrr(self) {
    if ($(self).is(':checked')) {
        $(self).prop('checked', false);
        $(self).bootstrapToggle('off');
    } else {
        $(self).prop('checked', true);
        $(self).bootstrapToggle('on');
    }
}
var app = angular.module('WebStore', ['ui.router', 'ui.bootstrap', 'angular.filter', 'ckeditor']);
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        //thai
        .state('manageRadioApp', {
            url: '/quan-ly-thiet-bi/truyen-thanh-ung-dung',
            cache: false,
            controller: 'manageRadioApp',
            templateUrl: window.templateUrl + "/manageDevice/radioApp.html"
        })
        .state('editRadioApp', {
            url: '/quan-ly-thiet-bi/truyen-thanh-ung-dung/cap-nhat/:id',
            cache: false,
            controller: 'editRadioApp',
            templateUrl: window.templateUrl + "/manageDevice/editRadioApp.html"
        })
        .state('addRadioApp', {
            url: '/quan-ly-thiet-bi/truyen-thanh-ung-dung/them',
            cache: false,
            controller: 'addRadioApp',
            templateUrl: window.templateUrl + "/manageDevice/addRadioApp.html"
        })
        .state('manageDevice', {
            url: '/quan-ly-thiet-bi/thiet-bi',
            cache: false,
            controller: 'manageDevice',
            templateUrl: window.templateUrl + "/manageDevice/device.html"
        })
        .state('editDevice', {
            url: '/quan-ly-thiet-bi/thiet-bi/cap-nhat/:id',
            cache: false,
            controller: 'editDevice',
            templateUrl: window.templateUrl + "/manageDevice/editDevice.html"
        })
        .state('addDevice', {
            url: '/quan-ly-thiet-bi/thiet-bi/them',
            cache: false,
            controller: 'addDevice',
            templateUrl: window.templateUrl + "/manageDevice/addDevice.html"
        })
        .state('managePlayschedule', {
            url: '/quan-ly-thiet-bi/lich-phat',
            cache: false,
            controller: 'managePlayschedule',
            templateUrl: window.templateUrl + "/manageDevice/playschedule.html"
        })
        .state('editPlayschedule', {
            url: '/quan-ly-thiet-bi/lich-phat/cap-nhat/:id',
            cache: false,
            controller: 'editPlayschedule',
            templateUrl: window.templateUrl + "/manageDevice/editplayschedule.html"
        })
        .state('addPlayschedule', {
            url: '/quan-ly-thiet-bi/lich-phat/them',
            cache: false,
            controller: 'addPlayschedule',
            templateUrl: window.templateUrl + "/manageDevice/addplayschedule.html"
        })
        .state('managePublicNews', {
            url: '/quan-ly-thiet-bi/bang-tin-cong-cong',
            cache: false,
            controller: 'managePublicNews',
            templateUrl: window.templateUrl + "/manageDevice/publicNews.html"
        })
        .state('editPublicNews', {
            url: '/quan-ly-thiet-bi/bang-tin-cong-cong/cap-nhat/:id',
            cache: false,
            controller: 'editPublicNews',
            templateUrl: window.templateUrl + "/manageDevice/editPublicNews.html"
        })
        .state('addPublicNews', {
            url: '/quan-ly-thiet-bi/bang-tin-cong-cong/them',
            cache: false,
            controller: 'addPublicNews',
            templateUrl: window.templateUrl + "/manageDevice/addPublicNews.html"
        })
        //thai
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
            templateUrl: window.templateUrl + "/seller/mProduct.html"
        })
        .state('selStatistic', {
            url: '/don-vi-ban-hang/thong-ke',
            cache: false,
            controller: 'selStatistic$Ctrl',
            templateUrl: window.templateUrl + "/seller/revStatistic.html"
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
            url: '/account/edit/:id/:refid',
            cache: false,
            controller: 'edit$account$Ctrl',
            templateUrl: window.templateUrl + "/account/edit.html"
        })
        .state('statictis$account', {
            url: '/account/statictis',
            cache: false,
            controller: 'statictis$account$Ctrl',
            templateUrl: window.templateUrl + "/account/statictis.html"
        })
        .state('change$password', {
            url: '/account/changepassword',
            cache: false,
            controller: 'change$password$Ctrl',
            templateUrl: window.templateUrl + "/account/changePassword.html"
        })
        .state('pmcs', {
            url: '/quan-ly-don-hang/microsoft',
            cache: false,
            controller: 'pmcs$Ctrl',
            templateUrl: window.templateUrl + "/order/microsoft.html"
        })
        .state('pkes', {
            url: '/quan-ly-don-hang/kaspersky-endpoint-security',
            cache: false,
            controller: 'pkes$Ctrl',
            templateUrl: window.templateUrl + "/order/kes.html"
        })
        .state('pmoza', {
            url: '/quan-ly-don-hang/moza',
            cache: false,
            controller: 'pmoza$Ctrl',
            templateUrl: window.templateUrl + "/order/moza.html"
        })
        .state('ptiki', {
            url: '/quan-ly-don-hang/tiki',
            cache: false,
            controller: 'ptiki$Ctrl',
            templateUrl: window.templateUrl + "/order/tiki.html"
        })
        .state('ponesme', {
            url: '/quan-ly-don-hang/onesme',
            cache: false,
            controller: 'ponesme$Ctrl',
            templateUrl: window.templateUrl + "/order/onesme.html"
        })
        .state('mdKYCmobile', {
            url: '/thong-tin-khach-hang/user/:id',
            cache: false,
            controller: 'mdKYCmobile$Ctrl',
            templateUrl: window.templateUrl + "/user/info.html"
        })
        //th?? vi???n ngu???n============
        .state('17-22-sourcelibrary', {
            url: '/thu-vien-nguon',
            allowAnonymous: true,
            controller: 'sourcelibraryCtrl',
            templateUrl: window.templateUrl + "/17-22/index.html"
        })
        .state('17-22-add_sourcelibrary', {
            url: '/them-thu-vien-nguon',
            allowAnonymous: true,
            controller: 'add_sourcelibraryCtrl',
            templateUrl: window.templateUrl + "/17-22/addsourcelibrary.html"
        })
        .state('17-22-edit_sourcelibrary', {
            url: '/cap-nhat-thu-vien-nguon/:id',
            allowAnonymous: true,
            controller: 'edit_sourcelibraryCtrl',
            templateUrl: window.templateUrl + "/17-22/editsourcelibrary.html"
        })
        //B??o c??o th???ng k??=================
        .state('17-22-reportstatistical', {
            url: '/bao-cao-thong-ke',
            allowAnonymous: true,
            controller: 'reportstatisticalCtrl',
            templateUrl: window.templateUrl + "/17-22/reportstatistical.html"
        })
        .state('17-22-reportnews', {
            url: '/bao-cao-thong-ke-ban-tin',
            allowAnonymous: true,
            controller: 'reportnewsCtrl',
            templateUrl: window.templateUrl + "/17-22/reportnews.html"
        })
        .state('17-22-reportnewsmedia', {
            url: '/bao-cao-thong-ke-ban-tin-media',
            allowAnonymous: true,
            controller: 'reportnewsmediaCtrl',
            templateUrl: window.templateUrl + "/17-22/reportnewsmedia.html"
        })
        //Ki???n ngh??? ng?????i d??n ================
        .state('17-22-recommend', {
            url: '/kien-nghi-cua-nguoi-dan',
            allowAnonymous: true,
            controller: 'recommendCtrl',
            templateUrl: window.templateUrl + "/17-22/recommend.html"
        })
        .state('17-22-add_recommend', {
            url: '/them-kien-nghi-cua-nguoi-dan',
            allowAnonymous: true,
            controller: 'add_recommendCtrl',
            templateUrl: window.templateUrl + "/17-22/addrecommend.html"
        })
        .state('17-22-edit_recommend', {
            url: '/cap-nhat-kien-nghi-cua-nguoi-dan/:id',
            allowAnonymous: true,
            controller: 'edit_recommendCtrl',
            templateUrl: window.templateUrl + "/17-22/editrecommend.html"
        })
        //Qu???n tr??? t??i kho???n ng?????i d??ng ==================
        .state('17-22-manageruser', {
            url: '/quan-tri-tai-khoan-nguoi-dung',
            allowAnonymous: true,
            controller: 'manageruserCtrl',
            templateUrl: window.templateUrl + "/17-22/manageruser.html"
        })
        .state('17-22-add-manageruser', {
            url: '/quan-tri-tai-khoan-nguoi-dung/them-moi',
            allowAnonymous: true,
            controller: 'addmanageruserCtrl',
            templateUrl: window.templateUrl + "/17-22/addmanageruser.html"
        })
        .state('17-22-edit-manageruser', {
            url: '/cap-nhat-tai-khoan-nguoi-dung/:id',
            //allowAnonymous: true,
            cache: false,
            controller: 'editmanageruserCtrl',
            templateUrl: window.templateUrl + "/17-22/editmanageruser.html"
        })
        //Qu???n tr??? group ng?????i d??ng =================
        .state('17-22-managergroupuser', {
            url: '/quan-tri-nhom-nguoi-dung',
            allowAnonymous: true,
            controller: 'managergroupuserCtrl',
            templateUrl: window.templateUrl + "/17-22/managergroupuser.html"
        })
        .state('17-22-add-managergroupuser', {
            url: '/them-nhom-nguoi-dung',
            allowAnonymous: true,
            controller: 'addmanagergroupuserCtrl',
            templateUrl: window.templateUrl + "/17-22/addmanagergroupuser.html"
        })
        .state('17-22-edit-managergroupuser', {
            url: '/cap-nhat-nhom-nguoi-dung/:id',
            allowAnonymous: true,
            controller: 'editmanagergroupuserCtrl',
            templateUrl: window.templateUrl + "/17-22/editmanagergroupuser.html"
        })
        //Nh???t k?? ng?????i d??ng ========================
        .state('17-22-userlog', {
            url: '/nhat-ky-nguoi-su-dung',
            allowAnonymous: true,
            controller: 'userlogCtrl',
            templateUrl: window.templateUrl + "/17-22/userlog.html"
        })
        .state('17-22-add-userlog', {
            url: '/nhat-ky-nguoi-su-dung/them-moi',
            allowAnonymous: true,
            controller: 'adduserlogCtrl',
            templateUrl: window.templateUrl + "/17-22/adduserlog.html"
        })
        .state('17-22-edit-userlog', {
            url: '/nhat-ky-nguoi-su-dung/cap-nhat/:id',
            allowAnonymous: true,
            controller: 'edituserlogCtrl',
            templateUrl: window.templateUrl + "/17-22/edituserlog.html"
        })


    //$locationProvider.html5Mode(true);
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
    $rootScope.checkError = function (data, callback) {
        if (data.data.result == -401) {
            $rootScope.$user = null;
        }
        if (data.data.message) {
            callback("\n" + data.data.message, "Th??ng b??o!", "warning");
        }
    }
})

app.controller('sourcelibraryCtrl', function ($dialogConfirm, $http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $.ajax({
        url: domain_api + 'lookups/model/Mediasource',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.items = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.items.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deletesourcelibrary = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a th?? vi???n ngu???n c?? m?? <span style='color:red;font-weight:bold;'>" + id + "</span> kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Mediasource',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {

                        if (response.status == 200) {
                            $dialogAlert("???? X??a th?? vi???n ngu???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }
        })
    }
});
app.controller('add_sourcelibraryCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
                console.log($scope.cities);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.dataForm.provinceID != '') {
            for (i in $scope.cities) {
                if ($scope.dataForm.provinceID == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.dataForm.districId != '') {
            for (i in $scope.districts) {
                if ($scope.dataForm.districId == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $scope.addlibrary = function () {
        $scope.name = $scope.dataForm.name;
        $scope.ipaddress = $scope.dataForm.ipaddress;
        $scope.uri = $scope.dataForm.uri;
        $scope.channel = $scope.dataForm.channel;
        $scope.devicetype = $scope.dataForm.devicetype;
        $scope.miclevel = $scope.dataForm.miclevel;
        $scope.status = $scope.dataForm.status;
        $scope.starttime = $scope.dataForm.starttime;
        $scope.starttime = new Date($scope.dataForm.starttime).getTime() / 1000;
        $scope.provinceID = $scope.dataForm.provinceID;
        $scope.districId = $scope.dataForm.districId;
        $scope.wardId = $scope.dataForm.wardId;
        $scope.contenttype = $scope.dataForm.contenttype;
        $scope.description = $scope.dataForm.description;
        $.ajax({
            url: domain_api + 'create/model/Mediasource',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                nodetype: "VTC",
                name: $scope.name,
                ipaddress: $scope.ipaddress,
                uri: $scope.uri,
                channel: $scope.channel,
                devicetype: $scope.devicetype,
                miclevel: $scope.miclevel,
                status: $scope.status,
                starttime: $scope.starttime,
                provinceID: $scope.provinceID,
                districId: $scope.districId,
                wardId: $scope.wardId,
                contenttype: $scope.contenttype,
                description: $scope.description
            },
            dataType: 'json',
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m th?? vi???n ngu???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $location.path("/thu-vien-nguon");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
});

app.controller('edit_sourcelibraryCtrl', function ($http, $scope, $state, $stateParams, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    var id = $stateParams.id;
    $.ajax({
        url: domain_api + 'lookups/model/Mediasource',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            $scope.$apply(function () {
                $scope.dataForm = response[id];
                $scope.createDate = new Date($scope.dataForm.starttime * 1000);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });

    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.dataForm.provinceID != '') {
            for (i in $scope.cities) {
                if ($scope.dataForm.provinceID == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    console.log($scope.districts);
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.dataForm.districId != '') {
            for (i in $scope.districts) {
                if ($scope.dataForm.districId == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $scope.editsourcelibrary = function () {
        $.ajax({
            url: domain_api + 'update/model/Mediasource',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.dataForm.name,

                ipaddress: $scope.dataForm.ipaddress,
                uri: $scope.dataForm.uri,
                channel: $scope.dataForm.channel,
                devicetype: $scope.dataForm.devicetype,
                miclevel: $scope.dataForm.miclevel,
                status: $scope.dataForm.status,
                starttime: new Date($scope.createDate).getTime() / 1000,
                provinceID: $scope.dataForm.provinceID,
                districId: $scope.dataForm.districId,
                wardId: $scope.dataForm.wardId,
                contenttype: $scope.dataForm.contenttype,
                description: $scope.dataForm.description
            },
            success: function (response) {
                if (response.id == id) {
                    $dialogAlert("C???p nh???t th?? vi???n ngu???n th??nh c??ng th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $location.path("/thu-vien-nguon");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
});

app.controller('managergroupuserCtrl', function ($dialogConfirm, $http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $.ajax({
        url: domain_api + 'lookups/model/Groups',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.groups = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.groups.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function err(e) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deletegroupuser = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a t??i kho???n n??y kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $http({
                    method: 'POST',
                    url: host_api + 'api/auth/delete',
                    data: {
                        groupid: id,
                    },
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
                    } else {
                        $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
                    }
                })
            }
        })
    }
    $scope.searchFilter = function () {
        $http({
            method: 'GET',
            url: listapi.managergroupuser.getmanagergroupusercopy,
            data: {
                filter: $scope.filter
            },
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.status != 404 && res.status != 405) {
                $scope.groups = res.data;
            } else {
                $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
app.controller('addmanagergroupuserCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'POST',
        url: host_api + 'them-nhom',
        data: dataForm,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
        } else {
            $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
        }
    })
});
app.controller('editmanagergroupuserCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $scope.dataForm = {};
    $http({
        method: 'GET',
        url: listapi.managergroupuser.getedit,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.dataForm = res.data;
            console.log(res);
            console.log($scope.dataForm);
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.editgroupuser = function () {
        console.log($scope.dataForm);
        $http({
            method: 'POST',
            url: host_api + 'cap-nhat',
            data: $scope.dataForm,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.result > 0) {
                $dialogAlert("C???p nh???t th?? vi???n ngu???n th??nh c??ngi", "Th??ng b??o!", "success", function (res) {
                    $state.go("managergroupuserCtrl");
                });

            } else {
                $dialogAlert("\n" + res.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    };
});

app.controller('manageruserCtrl', function ($dialogConfirm, $http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $.ajax({
        url: domain_api + 'listUsers/model/Users',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.users = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.users.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function err(e) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deletemanageruser = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a t??i kho???n n??y kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $http({
                    method: 'POST',
                    url: host_api + 'api/auth/delete',
                    data: {
                        groupid: id,
                    },
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
                    } else {
                        $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
                    }
                })
            }

        })
    }
    $scope.searchFilter = function () {
        console.log($scope.filter);
        $http({
            method: 'GET',
            url: listapi.manageruser.getmanagerusercopy,
            data: {
                filter: $scope.filter
            },
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.status != 404 && res.status != 405) {
                $scope.users = res.data;
            } else {
                $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

});
app.controller('addmanageruserCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'POST',
        url: host_api + 'them-tai-khoan',
        data: manageruser,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
        } else {
            $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
        }
    })
});
app.controller('editmanageruserCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    // $scope.dataForm = {};
    $http({
        method: 'GET',
        url: listapi.manageruser.getedit,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.manageruser = res.data;
            console.log($scope.manageruser);
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.edituser = function () {
        console.log($scope.manageruser);
        $http({
            method: 'POST',
            url: host_api + 'cap-nhat',
            data: $scope.manageruser,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.result > 0) {
                $dialogAlert("C???p nh???t th?? vi???n ngu???n th??nh c??ngi", "Th??ng b??o!", "success", function (res) {
                    $state.go("manageruserCtrl");
                });

            } else {
                $dialogAlert("\n" + res.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    };
});
app.controller('recommendCtrl', function ($dialogConfirm, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $.ajax({
        url: domain_api + 'lookups/model/Custfeedback',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.items = arr;
                var filteredData = $filter('filter')($scope.items, $scope.searchKeyword);

                if ($scope.from_date !== null && $scope.to_date !== null) {
                    filteredData = $filter('filter')($scope.items, function (item) {
                        return (parseInt(item.createDate) >= $scope.from_date.getTime() / 1000) && (parseInt(item.createDate) <= $scope.to_date.getTime() / 1000);
                    });
                }
                $scope.filteredData = filteredData;
                console.log($scope.filteredData);
            });
        },
        error: function err(e) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    //=====================================================
    $scope.searchKeyword = '';
    $scope.startDate = null;
    $scope.endDate = null;
    $scope.filterData = function () {
        // S??? d???ng filter ????? l???c d??? li???u d???a tr??n t??? kh??a t??m ki???m
        var filteredData = $filter('filter')($scope.items, $scope.searchKeyword);

        // N???u c?? ti??u ch?? l???c theo ng??y, th???c hi???n l???c th??m
        if ($scope.startDate !== null && $scope.endDate !== null) {
            filteredData = $filter('filter')(filteredData, function (item) {
                return (parseInt(item.createDate) >= $scope.startDate.getTime() / 1000) && (parseInt(item.createDate) <= $scope.endDate.getTime() / 1000);
            });
        }

        // L??u k???t qu??? l???c v??o bi???n $scope.filteredData
        $scope.filteredData = filteredData;
    };

    $scope.deleterecommend = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n ki???n ngh??? ng?????i d??n c?? m?? <span style='color:red;font-weight:bold;'>" + id + "</span> kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Custfeedback',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {

                        if (response.status == 200) {
                            $dialogAlert("???? x??a ki???n ngh??? c???a ng?????i d??n c?? m?? <span style='color:red;font-weight:bold;'>" + id + "</span> th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }
        })
    }
});
app.controller('add_recommendCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $scope.addrecommend = function () {
        $.ajax({
            url: domain_api + 'create/model/Custfeedback',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                name: $scope.dataForm.name,
                description: $scope.dataForm.description,
                note: $scope.dataForm.note
            },
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m ki???n ngh??? ng?????i d??n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $location.path("/kien-nghi-cua-nguoi-dan");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
});
app.controller('edit_recommendCtrl', function ($dialogConfirm, $scope, $state, $stateParams, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    var id = $stateParams.id;
    console.log(id);
    $.ajax({
        url: domain_api + 'lookups/model/Custfeedback',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            console.log(response);
            $scope.$apply(function () {
                $scope.dataForm = response[id];
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.editrecommend = function () {
        $.ajax({
            url: domain_api + 'update/model/Custfeedback',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.dataForm.name,
                description: $scope.dataForm.description,
                note: $scope.dataForm.note
            },
            success: function (response) {
                if (response.id == id) {
                    $dialogAlert("C???p nh???t th?? vi???n ngu???n th??nh c??ng th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $location.path("/kien-nghi-cua-nguoi-dan");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
});


app.controller('reportnewsCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:5500/admin/Template/17-22/data_json/reportnews.json ',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.data = res.data;
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
});


app.controller('reportnewsmediaCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:5500/admin/Template/17-22/data_json/reportnewsmedia.json ',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.data = res.data;
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
});

app.controller('reportstatisticalCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:5500/admin/Template/17-22/data_json/reportstatistical.json ',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.data = res.data;
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
});

app.controller('userlogCtrl', function ($dialogConfirm, $http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'GET',
        url: listapi.userlog.getlist,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.items = res.data;
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.deleteuserlog = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a t??i kho???n n??y kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $http({
                    method: 'POST',
                    url: host_api + 'api/auth/delete',
                    data: {
                        groupid: id,
                    },
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
                    } else {
                        $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
                    }
                })
            }

        })
    }
    $scope.searchFilter = function () {
        $http({
            method: 'GET',
            url: listapi.userlog.getuserlogcopy,
            data: {
                filter: $scope.filter
            },
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.status != 404 && res.status != 405) {
                $scope.items = res.data;
            } else {
                $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
//thai
app.controller('manageDevice', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $.ajax({
        url: domain_api + 'lookups/model/Ippbxextenlocation',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.data = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.data.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deleteDevice = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a thi???t b??? c?? m?? <span style='color:red;font-weight:bold;'>" + id + "</span> kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Ippbxextenlocation',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {
                        if (response.status == 200) {
                            $dialogAlert("???? x??a thi???t b??? th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }
        })
    }
})
app.controller('editDevice', function ($scope, $state, $stateParams, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    var id = $stateParams.id;
    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
                console.log($scope.cities);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.dataForm.city != '') {
            for (i in $scope.cities) {
                if ($scope.dataForm.city == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.dataForm.district != '') {
            for (i in $scope.districts) {
                if ($scope.dataForm.district == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $.ajax({
        url: domain_api + 'lookups/model/Ippbxextenlocation',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            $scope.$apply(function () {
                $scope.dataForm = response[id];
                if ($scope.dataForm.city != '') {
                    for (i in $scope.cities) {
                        if ($scope.dataForm.city == $scope.cities[i].Name) {
                            $scope.districts = $scope.cities[i].Districts;
                            break;
                        }
                    }
                }
                if ($scope.dataForm.district != '') {
                    for (i in $scope.districts) {
                        if ($scope.dataForm.district == $scope.districts[i].Name) {
                            $scope.wards = $scope.districts[i].Wards;
                            break;
                        }
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.editDevice = function () {
        $.ajax({
            url: domain_api + 'update/model/Ippbxextenlocation',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.dataForm.name,
                latitude: $scope.dataForm.latitude,
                longitude: $scope.dataForm.longitude,
                deviceId: $scope.dataForm.deviceId,
                c_simphonenumber: $scope.dataForm.c_simphonenumber,
                c_ssid: $scope.dataForm.c_ssid,
                c_ssid_pwd: $scope.dataForm.c_ssid_pwd,
                c_pausestatus: $scope.dataForm.c_pausestatus,
                c_techinterface: $scope.dataForm.c_techinterface,
                miclevel: $scope.dataForm.miclevel,
                spklevel: $scope.dataForm.spklevel,
                broadcaster: $scope.dataForm.broadcaster,
                c_micstatus: $scope.dataForm.c_micstatus,
                city: $scope.dataForm.city,
                district: $scope.dataForm.district,
                ward: $scope.dataForm.ward,
                c_endpointtype: $scope.dataForm.c_endpointtype,
                c_channelId: $scope.dataForm.c_channelId,
                issetting: $scope.dataForm.issetting,
                status: $scope.dataForm.status,
                c_playstatus: $scope.dataForm.c_playstatus,
                note: $scope.dataForm.note
            },
            success: function (response) {
                if (response.id == id) {
                    $dialogAlert("C???p nh???t thi???t b??? th??nh c??ng th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("manageDevice");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });

        $http({
            method: 'POST',
            url: listAPI.device.editDevice,
            data: $scope.formData,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.result > 0) {
                $dialogAlert("C???p nh???t th??ng tin th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                    $state.go("manageDevice");
                });
            } else {
                $dialogAlert("\n" + res.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    };
})
app.controller('addDevice', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.formData = {};
    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
                console.log($scope.cities);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.dataForm.city != '') {
            for (i in $scope.cities) {
                if ($scope.dataForm.city == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.dataForm.district != '') {
            for (i in $scope.districts) {
                if ($scope.dataForm.district == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }

    $scope.addDevice = function () {
        $.ajax({
            url: domain_api + 'create/model/Ippbxextenlocation',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                name: $scope.dataForm.name,
                latitude: $scope.dataForm.latitude,
                longitude: $scope.dataForm.longitude,
                deviceId: $scope.dataForm.deviceId,
                c_simphonenumber: $scope.dataForm.c_simphonenumber,
                c_ssid: $scope.dataForm.c_ssid,
                c_ssid_pwd: $scope.dataForm.c_ssid_pwd,
                c_pausestatus: $scope.dataForm.c_pausestatus,
                c_techinterface: $scope.dataForm.c_techinterface,
                miclevel: $scope.dataForm.miclevel,
                spklevel: $scope.dataForm.spklevel,
                broadcaster: $scope.dataForm.broadcaster,
                c_micstatus: $scope.dataForm.c_micstatus,
                city: $scope.dataForm.city,
                district: $scope.dataForm.district,
                ward: $scope.dataForm.ward,
                c_endpointtype: $scope.dataForm.c_endpointtype,
                c_channelId: $scope.dataForm.c_channelId,
                issetting: $scope.dataForm.issetting,
                status: $scope.dataForm.status,
                c_playstatus: $scope.dataForm.c_playstatus,
                note: $scope.dataForm.note
            },
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m th??ng tin thi???t b??? th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("manageDevice");
                    });
                }
            },
            error: function (response) {
                $dialogAlert("\n" + response.message, "Th??ng b??o!", "warning");
            }
        });
    };
})
app.controller('managePlayschedule', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.filter = '';
    $.ajax({
        url: domain_api + 'lookups/model/Playschedule',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.data = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.data.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deletePlayschedule = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a l???ch ph??t thanh c?? m?? <span style='color:red;font-weight:bold;'>" + id + "</span>  kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Playschedule',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {

                        if (response.status == 200) {
                            $dialogAlert("???? x??a l???ch ph??t thanh th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }
        })
    }
})
app.controller('editPlayschedule', function ($scope, $state, $stateParams, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    var id = $stateParams.id;
    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.formData.city != '') {
            for (i in $scope.cities) {
                if ($scope.formData.city == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.formData.district != '') {
            for (i in $scope.districts) {
                if ($scope.formData.district == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $.ajax({
        url: domain_api + 'lookups/model/Playschedule',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            $scope.$apply(function () {
                $scope.formData = response[id];
                
                $scope.formData.date_from = new Date($scope.formData.date_from * 1000);
                $scope.formData.date_to = new Date($scope.formData.date_to * 1000);

                $scope.formData.hour_from = new Date($scope.formData.hour_from);
                $scope.formData.hour_to = new Date($scope.formData.hour_to);

                $scope.formData.hour_from1 = new Date($scope.formData.hour_from1);
                $scope.formData.hour_to1 = new Date($scope.formData.hour_to1);

                $scope.formData.c_hour_from2 = new Date($scope.formData.c_hour_from2);
                $scope.formData.c_hour_to2 = new Date($scope.formData.c_hour_to2);

                $scope.formData.c_hour_from3 = new Date($scope.formData.c_hour_from3);
                $scope.formData.c_hour_to3 = new Date($scope.formData.c_hour_to3);

                $scope.formData.c_hour_from4 = new Date($scope.formData.c_hour_from4);
                $scope.formData.c_hour_to4 = new Date($scope.formData.c_hour_to4);

                $scope.formData.c_hour_from5 = new Date($scope.formData.c_hour_from5);
                $scope.formData.c_hour_to5 = new Date($scope.formData.c_hour_to5);

                $scope.week = $scope.formData.week_day;
                $scope.day = $scope.formData.day;
                $scope.month = $scope.formData.month;
                
                if ($scope.formData.city != '') {
                    for (i in $scope.cities) {
                        if ($scope.formData.city == $scope.cities[i].Name) {
                            $scope.districts = $scope.cities[i].Districts;
                            break;
                        }
                    }
                }
                if ($scope.formData.district != '') {
                    for (i in $scope.districts) {
                        if ($scope.formData.district == $scope.districts[i].Name) {
                            $scope.wards = $scope.districts[i].Wards;
                            break;
                        }
                    }
                }
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
            $rootScope.checkError(e, $dialogAlert);
        }
    });
   
    $scope.updateWeek = function() {
        $scope.week = "";
        for (var i = 0; i < 8; i++) {
            if ($scope.formData['week_day_' + i]) {
                $scope.week += i.toString() + ",";
            }
        }
        $scope.week = $scope.week.slice(0, -1); // X??a d???u ',' ??? cu???i chu???i
    };
    $scope.updateDay = function () {
        var selectedDay = [];
        for (var i = 1; i <= 31; i++) {
          if ($scope.formData['day_' + i]) selectedDay.push(i.toString());
        }
        $scope.day = selectedDay.join(',');
      };
      $scope.updateMonth = function () {
        var selectedMonth = [];
        for (var i = 1; i <= 12; i++) {
          if ($scope.formData['month_' + i]) selectedMonth.push(i);
        }
        $scope.month = selectedMonth.join(',');
      };

    $scope.editPlayschedule = function () {
        console.log($scope.week);
        console.log($scope.day);
        console.log($scope.week);
        $scope.date_from = new Date($scope.formData.date_from).getTime() / 1000;
        $scope.date_to = new Date($scope.formData.date_to).getTime() / 1000;
        $.ajax({
            url: domain_api + 'update/model/Playschedule',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.formData.name,
                dthID: $scope.formData.dthID,
                c_active: $scope.formData.c_active,
                c_scheduletype: $scope.formData.c_scheduletype,
                city: $scope.formData.city,
                district: $scope.formData.district,
                ward: $scope.formData.ward,
                field: $scope.formData.field,
                type: $scope.formData.type,

                date_from: $scope.date_from,
                date_to: $scope.date_to,
                hour_from: $scope.formData.hour_from,
                hour_to: $scope.formData.hour_to,

                hour_from1: $scope.formData.hour_from1,
                hour_to1: $scope.formData.hour_to1,

                c_hour_from2: $scope.formData.c_hour_from2,
                c_hour_to2: $scope.formData.c_hour_to2,

                c_hour_from3: $scope.formData.c_hour_from3,
                c_hour_to3: $scope.formData.c_hour_to3,

                c_hour_from4: $scope.formData.c_hour_from4,
                c_hour_to4: $scope.formData.c_hour_to4,

                c_hour_from5: $scope.formData.c_hour_from5,
                c_hour_to5: $scope.formData.c_hour_to5,

                week_day: $scope.week,
                day: $scope.day,
                month: $scope.month,
                c_active: $scope.formData.c_active,
                description: $scope.formData.description
            },
            success: function (response) {
                if (response.id == id) {
                    $dialogAlert("C???p nh???t l???ch ph??t th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("managePlayschedule");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
app.controller('addPlayschedule', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $.ajax({
        url: host_api + 'admin/data/data.json',
        type: 'GET',
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.cities = response;
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.listDistricts = function () {
        if ($scope.formData.city != '') {
            for (i in $scope.cities) {
                if ($scope.formData.city == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.formData.district != '') {
            for (i in $scope.districts) {
                if ($scope.formData.district == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $scope.week = '';
    $scope.day = '';
    $scope.month = '';
    $scope.updateWeek = function() {
        var selectedWeek = [];
        for (var i = 1; i <= 7; i++) {
            if ($scope.formData['week_day_' + i]) {
                selectedWeek.push(i.toString());
            }
        }
        $scope.week = selectedWeek.join(',');
    };
    $scope.updateDay = function () {
        var selectedDay = [];
        for (var i = 1; i <= 31; i++) {
          if ($scope.formData['day_' + i]) selectedDay.push(i.toString());
        }
        $scope.day = selectedDay.join(',');
      };
      $scope.updateMonth = function () {
        var selectedMonth = [];
        for (var i = 1; i <= 12; i++) {
          if ($scope.formData['month_' + i]) selectedMonth.push(i);
        }
        $scope.month = selectedMonth.join(',');
      };
    $scope.addPlayschedule = function () {
        $scope.date_from = new Date($scope.formData.date_from).getTime() / 1000;
        $scope.date_to = new Date($scope.formData.date_to).getTime() / 1000;

        $scope.hour_from = $scope.formData.hour_from;
        $scope.hour_to = $scope.formData.hour_to;
        console.log($scope.week);
        console.log($scope.day);
        console.log($scope.month);

        $.ajax({
            url: domain_api + 'create/model/Playschedule',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                name: $scope.formData.name,
                dthID: $scope.formData.dthID,
                c_active: $scope.formData.c_active,
                c_scheduletype: $scope.formData.c_scheduletype,
                city: $scope.formData.city,
                district: $scope.formData.district,
                ward: $scope.formData.ward,
                field: $scope.formData.field,
                type: $scope.formData.type,

                date_from: $scope.date_from,
                date_to: $scope.date_to,
                hour_from: $scope.formData.hour_from,
                hour_to: $scope.formData.hour_to,

                hour_from1: $scope.formData.hour_from1,
                hour_to1: $scope.formData.hour_to1,

                c_hour_from2: $scope.formData.c_hour_from2,
                c_hour_to2: $scope.formData.c_hour_to2,

                c_hour_from3: $scope.formData.c_hour_from3,
                c_hour_to3: $scope.formData.c_hour_to3,

                c_hour_from4: $scope.formData.c_hour_from4,
                c_hour_to4: $scope.formData.c_hour_to4,

                c_hour_from5: $scope.formData.c_hour_from5,
                c_hour_to5: $scope.formData.c_hour_to5,

                week_day: $scope.week,
                day: $scope.day,
                month: $scope.month,
                c_active: $scope.formData.c_active,
                description: $scope.formData.description

            },
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m th?? vi???n ngu???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("managePlayschedule");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
app.controller('managePublicNews', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.filter = '';
    $.ajax({
        url: domain_api + 'lookups/model/Inforboard',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.data = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.data.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    //pagination
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.size = 0;
    $scope.first = function () {
        $scope.currentPage = 0;
    }
    $scope.next = function () {
        $scope.currentPage += 1;
    }
    $scope.previous = function () {
        $scope.currentPage -= 1;
    }
    $scope.last = function (last) {
        $scope.currentPage = last;
    }
    $scope.thisPage = function (i) {
        $scope.currentPage = i;
    }
    $scope.totalPage = function (size, pageSize) {
        $scope.size = $window.Math.ceil(size / pageSize);
        return $window.Math.ceil(size / pageSize);
    }
    $scope.filterPublicNews = function () {
        console.log('filter=' + $scope.filter);
        $http({
            method: 'GET',
            url: listAPI.publicNews.getListPublicNews1,
            data: {
                filter: $scope.filter
            },
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log('ddaay la filter' + $scope.filter);
            if (res.status != 404 && res.status != 405) {
                $scope.data = res.data;
            } else {
                $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
    $scope.deletePublicNews = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a b???n tin ??i???n t??? <span style='color:red;font-weight:bold;'>" + id + "</span> kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Inforboard',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {

                        if (response.status == 200) {
                            $dialogAlert("???? X??a b???ng tin ??i???n t??? th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }

        })

    }
})
app.controller('editPublicNews', function ($scope, $state, $stateParams, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    var id = $stateParams.id;

    $.ajax({
        url: domain_api + 'lookups/model/Inforboard',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            console.log(response);
            $scope.$apply(function () {
                $scope.formData = response[id];
                console.log($scope.formData.createDate);
                $scope.formData.createDate = new Date($scope.formData.createDate * 1000);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.editPublicNews = function () {
        $.ajax({
            url: domain_api + 'update/model/Inforboard',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.formData.name,
                dthID: $scope.formData.dthID,
                address: $scope.formData.address,
                lat: $scope.formData.lat,
                lng: $scope.formData.lng,
                status: $scope.formData.status,
                deviceType: $scope.formData.deviceType,
                note: $scope.formData.note,
            },
            success: function (response) {
                if (response.id == id) {
                    $dialogAlert("C???p nh???t b???ng tin ??i???n t??? th??nh c??ng th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("managePublicNews")
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
app.controller('addPublicNews', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.addPublicNews = function () {
        console.log($scope.formData);
        console.log($scope.formData.status);
        $.ajax({
            url: domain_api + 'create/model/Inforboard',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                name: $scope.formData.name,
                dthID: $scope.formData.dthID,
                address: $scope.formData.address,
                lat: $scope.formData.lat,
                lng: $scope.formData.lng,
                status: $scope.formData.status,
                deviceType: $scope.formData.deviceType,
                note: $scope.formData.note,
            },
            dataType: 'json',
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m b???ng tin ??i???n t??? th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("managePublicNews");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
app.controller('manageRadioApp', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.filter = '';
    $.ajax({
        url: domain_api + 'lookups/model/Radionode',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key
        },
        success: function (response) {
            const arr = Object.values(response);
            $scope.$apply(function () {
                $scope.data = arr;
                $scope.currentPage = 1;
                $scope.itemsPerPage = PerPage;
                $scope.numPages = Math.ceil($scope.data.length / $scope.itemsPerPage);
                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };
                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.numPages) {
                        $scope.currentPage++;
                    }
                };
                $scope.range = function () {
                    var rangeSize = $scope.itemsPerPage;
                    var ret = [];
                    var start;
                    start = $scope.currentPage;
                    if (start > $scope.numPages - rangeSize) {
                        start = $scope.numPages - rangeSize + 1;
                    }
                    var numbers = [];
                    for (var i = start; i < start + rangeSize; i++) {
                        numbers.push(i);
                    }
                    for (var i = 0; i < numbers.length; i++) {
                        if (numbers[i] > 0) {
                            ret.push(numbers[i]);
                        }
                    }
                    return ret;
                };
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });
    $scope.deleteRadioApp = function (id) {
        $dialogConfirm("B???n ch???c ch???n mu???n x??a ????i truy???n thanh m?? <span style='color:red;font-weight:bold;'>" + id + "</span> kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $.ajax({
                    url: domain_api + 'delete/model/Radionode',
                    type: 'POST',
                    data: {
                        user: user,
                        userKey: user_Key,
                        id: id
                    },
                    success: function (response) {
                        if (response.status == 200) {
                            $dialogAlert("X??a ????i truy???n thanh v?? ???ng d???ng cntt - vt th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                                $window.location.reload();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log('error');
                        $rootScope.checkError(e, $dialogAlert);
                    }
                });
            }
        })
    }
})
app.controller('editRadioApp', function ($scope, $state, $stateParams, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.formData = {};
    var id = $stateParams.id;
    $.ajax({
        url: domain_api + 'lookups/model/Radionode',
        type: 'POST',
        data: {
            user: user,
            userKey: user_Key,
            id: id
        },
        success: function (response) {
            $scope.$apply(function () {
                $scope.formData = response[id];
                //console.log($scope.formData);
            });
        },
        error: function (xhr, status, error) {
            console.log('error');
            $rootScope.checkError(e, $dialogAlert);
        }
    });

    $scope.editRadioApp = function () {
        
        const file = document.getElementById("file-name").textContent;
        $scope.icecast_url = file;
        console.log($scope.icecast_url);
        $.ajax({
            url: domain_api + 'update/model/Radionode',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                id: id,
                name: $scope.formData.name,
                status: $scope.formData.status,
                channel: $scope.formData.channel,
                nodetype: $scope.formData.nodetype,
                confId: $scope.formData.confId,
                province: $scope.formData.province,
                districId: $scope.formData.districId,
                communeId: $scope.formData.communeId,
                description: $scope.formData.description,

                icecast_url: $scope.icecast_url
            },
            success: function (response) {

                if (response.id == id) {
                    $dialogAlert("C???p nh???t truy???n thanh v?? ???ng d???ng cntt - vt th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("manageRadioApp");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
app.controller('addRadioApp', function ($scope, $state, $http, $window, $dialogAlert, $rootScope, $dialogConfirm) {
    $scope.formData = {};
    $scope.cities = [];
    $scope.districts = [];
    $scope.wards = [];
    $http({
        method: 'GET',
        url: host_api + 'admin/data/data.json',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404 && res.status != 405) {
            $scope.cities = res.data;
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }
    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.listDistricts = function () {
        if ($scope.formData.province != '') {
            for (i in $scope.cities) {
                if ($scope.formData.province == $scope.cities[i].Name) {
                    $scope.districts = $scope.cities[i].Districts;
                    break;
                }
            }
        }
    }
    $scope.listWards = function () {
        if ($scope.formData.district != '') {
            for (i in $scope.districts) {
                if ($scope.formData.district == $scope.districts[i].Name) {
                    $scope.wards = $scope.districts[i].Wards;
                    break;
                }
            }
        }
    }
    $scope.addRadioApp = function () {
        const file = document.getElementById("upload-file").files[0];
        $scope.icecast_url = file.name;
        console.log($scope.icecast_url);
        $.ajax({
            url: domain_api + 'create/model/Radionode',
            type: 'POST',
            data: {
                user: user,
                userKey: user_Key,
                name: $scope.formData.name,
                status: $scope.formData.status,
                channel: $scope.formData.channel,
                nodetype: $scope.formData.nodetype,
                confId: $scope.formData.confId,
                province: $scope.formData.province,
                districId: $scope.formData.district,
                communeId: $scope.formData.commune,
                description: $scope.formData.description,

                icecast_url:$scope.icecast_url
            },
            success: function (response) {
                if (response.status == 200) {
                    $dialogAlert("Th??m ????i truy???n thanh v?? ???ng d???ng cntt - vt th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("manageRadioApp");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log("Data:" + data);

                console.log('error');
                $rootScope.checkError(e, $dialogAlert);
            }
        });
    };
})
//thai
app.controller('edituserlogCtrl', function ($http, $scope, $state, $rootScope, $dialogShowForm, $dialogAlert, $log, $uibModal, $location, $window) {
    $http({
        method: 'GET',
        url: listapi.userlog.getedit,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.status != 404) {
            $scope.dataForm = res.data;
            console.log($scope.dataForm);
        } else {
            $dialogAlert("\n Kh??ng t??m th???y th??ng tin", "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.edituserlog = function () {
        console.log($scope.dataForm);
        $http({
            method: 'POST',
            url: host_api + 'cap-nhat',
            data: $scope.dataForm,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.result > 0) {
                $dialogAlert("C???p nh???t th?? vi???n ngu???n th??nh c??ngi", "Th??ng b??o!", "success", function (res) {
                    $state.go("userlogCtrl");
                });
            } else {
                $dialogAlert("\n" + res.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    };
});

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
    $scope.num = 3;
    $scope.totalRow = 0;
    $scope.maxSize = 3;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
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
        // paging
        $scope.pageChanged = function () {
            $scope.page = $scope.bigCurrentPage - 1;
            console.log('Page changed to: ' + $scope.bigCurrentPage);
            search();
        };
        // load data api
        function search() {
            $scope.data = [];
            $scope.priceTotal = [];
            //host_api + 'api/report/seller?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || ''),
            $http({
                method: 'GET',
                url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=listPlayschedule' + '&num=' + $scope.maxSize + '&page=' + $scope.page,
                //headers: {
                //    'Authorization': "Bearer " + $window.localStorage.token
                //}
            }).then(function (res) {
                console.log(res);
                if (res.data.data.length > 0) {
                    $scope.data = res.data.data;
                    $scope.bigTotalItems = res.data.totalrow;
                } else {
                    //$scope.textloading = "D??? li???u tr???ng.";
                    $scope.textloading = res.data.message;
                    // $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
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
            $rootScope.checkError(e, $dialogAlert);
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
            $rootScope.checkError(e, $dialogAlert);
        })


    };
    // Chi tiet doanh thu trong th??ng
    $scope.dtDetail = function (code, pName, type) {
        var $titlle = 'Doanh thu chi ti???t lo???i b???o hi???m ' + pName;
        switch (type) {
            case 'channel':
                $titlle = 'Doanh thu chi ti???t k??nh b??n ' + pName;
                break;
            case 'producer':
                $titlle = 'Doanh thu chi ti???t nh?? cung c???p ' + pName;
                break;
            default:
                $titlle;
        }
        $("div.overlay").addClass("show");
        $http({
            method: 'GET',
            url: host_api + 'api/report/seller?action=dashboarddetail&code=' + code + '&type=' + type + '&num=999&page=0',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            $("div.overlay").removeClass("show");
            if (res.data.result > 0) {
                var detailProduct = res.data.data.detail;
                var modal = $uibModal.open({
                    animation: 0,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class ="modal-title" style="color:#fff" >${$titlle}</h4>\
                    </div>\
                    <div style="max-height:350px;" id="print">
                        <table class="table table-bordered" style="width:100%;margin-bottom:0">
                                <thead>
                                    <tr class="panel-info list-group-item-info">
                                        <th style="text-align:center;width:58px">STT</th>
                                        <th style="width: 196px;">T??n s???n ph???m </th>
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
                                            <td style="width:150px">{{item.product.code}}:{{item.product.name}}</td>                                                            
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
            $("div.overlay").removeClass("show");
            $rootScope.checkError(e, $dialogAlert);
        });
    };
    $scope.page2 = 0;
    $scope.num2 = 10;
    $scope.totalRow2 = 0;
    $scope.maxSize2 = 10;
    $scope.bigTotalItems2 = 0;
    $scope.bigCurrentPage2 = 1;
    $scope.varTinh = "";
    $scope.filters = {
        status: "'','0'",
        tinh: '',
        huyen: '',
        xa: ''
    };
    $(".select2").select2();
    $scope.pageChanged2 = function () {
        $scope.page2 = $scope.bigCurrentPage2 - 1;
        console.log('Page changed to: ' + $scope.bigCurrentPage2);
        loadDataLoa($scope.filters);
    };
    //loadDataLoa($scope.filters);
    $scope.checkLoa = function () {
        var checkboxes = document.getElementsByName('status[]');
        var vals = "";
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked) {
                if (checkboxes[i].value != "") {
                    vals += "," + checkboxes[i].value;
                }
            }
        }
        if (vals) vals = vals.substring(1);
        $scope.filters = {
            status: vals
        };
        loadDataLoa($scope.filters);
    }
    function loadDataLoa() {
        ($scope.filters.status == undefined) ? $scope.filters.status = "" : $scope.filters.status;
        ($scope.filters.tinh == undefined) ? $scope.filters.tinh = "" : $scope.filters.tinh;
        ($scope.filters.huyen == undefined) ? $scope.filters.huyen = "" : $scope.filters.huyen;
        ($scope.filters.xa == undefined) ? $scope.filters.xa = "" : $scope.filters.xa;
        $scope.data_loa = [];
        $http({
            method: 'GET',
            url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=listIppbxextenLocation&tinh=' + $scope.filters.tinh + '&huyen=' + $scope.filters.huyen + '&xa=' + $scope.filters.xa + '&num=' + $scope.maxSize2 + '&page=' + $scope.page2 + "&status=" + $scope.filters.status,
            //headers: {
            //    'Authorization': "Bearer " + $window.localStorage.token
            //}
        }).then(function (res) {
            console.log(res);
            if (res.data.data.length > 0) {
                $scope.data_loa = res.data.data;
                $scope.bigTotalItems2 = res.data.totalrow;
            } else {
                $scope.textloading = "D??? li???u tr???ng.";
                //$scope.textloading = res.data.message;
                // $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })

    }
    $scope.$watch("filters", function (newVal, oldVal) {
        console.log(newVal, oldVal);
        //$scope.filters.tinh = $scope.varTinh;
        loadDataLoa(newVal);
    }, true);

    $http({
        method: 'GET',
        url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=countStatusLoa',
        //headers: {
        //    'Authorization': "Bearer " + $window.localStorage.token
        //}
    }).then(function (res) {
        console.log(res);
        var _online = 0;
        res.data.forEach(function (val) {
            if (val.status === "" || val.status === "0") {
                _online += parseInt(val.total);
                $scope.sttOnline = _online;
            }

        })
        $scope.dataTotalStatus = res.data;


    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    });
    $http({
        method: 'GET',
        url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=getProvinces',
        //headers: {
        //    'Authorization': "Bearer " + $window.localStorage.token
        //}
    }).then(function (res) {
        $scope.dataProvinces = res.data;
    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.loadHuyens = function () {
        $http({
            method: 'GET',
            url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=getDistricts&proId=' + $scope.filters.tinh,
        }).then(function (res) {
            $scope.dataDistricts = res.data;
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
    $scope.loadXas = function () {
        $http({
            method: 'GET',
            url: 'http://ics.vtctelecom.com.vn/index.php?api=vtc_api&method=getWards&ditId=' + $scope.filters.huyen,
        }).then(function (res) {
            $scope.dataWards = res.data;
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
// function seller qu???n l?? s???n ph???m seller
app.controller('selList$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $dialogShowForm, $uibModalStack, $timeout, $stateParams, $window) {

    loadDatachannel();
    function loadDatachannel() {
        $http({
            method: 'GET',
            url: host_api + 'api/channel/get?action=list',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res);
            if (res.data.result > 0) {
                $scope.dataListChannel = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
        $http({
            method: 'GET',
            url: host_api + 'api/channel/get?action=producer',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res);
            if (res.data.result > 0) {
                $scope.dataListProducer = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
    $rootScope.headTitle = '????n v??? b??n h??ng > Qu???n l?? s???n ph???m';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.totalRow = 0;
    $scope.maxSize = 10;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.flag = false;
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


        // search theo date, search theo productName or productCode
        $scope.searchFilter = function () {
            $scope.page = 0;
            search();
        }
        // paging
        $scope.pageChanged = function () {
            $scope.page = $scope.bigCurrentPage - 1;
            console.log('Page changed to: ' + $scope.bigCurrentPage);
            search();
        };
        // load data api
        function search() {
            $scope.data = [];
            $scope.totalRow = 0;
            $http({
                method: 'GET',
                url: host_api + 'api/report/seller?action=' + action + '&filter=' + ($scope.filter || '') + '&producer=' + ($scope.filter_producer || '') + '&channel=' + ($scope.filter_channel || '') + '&num=' + $scope.maxSize + '&page=' + ($scope.page || ''),
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                //console.log(res)                  
                if (res.data.result > 0) {
                    $scope.data = res.data.data.detail;
                    $scope.totalRow = res.data.data.total_row;
                    $scope.bigTotalItems = res.data.data.total_row;
                    $(document).ready(function () {
                        $('.btnProductToggle').bootstrapToggle({
                            on: 'K??ch ho???t',
                            off: 'Ng???ng k??ch ho???t',
                            size: "mini",
                            style: "btnToggleCustom"
                        });
                    })
                } else {
                    //$scope.textloading = "D??? li???u tr???ng.";
                    $scope.textloading = res.data.message;
                    //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }
            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
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
    $scope.maxSize = 10;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    fndata($http, $scope, 'statistic')
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

        // search theo date, search theo productName or productCode
        $scope.searchFilter = function () {
            $scope.page = 0;
            search();
        }
        // paging
        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.bigCurrentPage);
            $scope.page = $scope.bigCurrentPage - 1;
            search();
        };
        // load data api
        function search() {
            $scope.data = [];
            $scope.totalRow = 0;
            $http({
                method: 'GET',
                url: host_api + 'api/report/seller?action=statistic&filter=' + ($scope.filter || '') + '&num=' + $scope.maxSize + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    $scope.data = res.data.data.detail;
                    $scope.totalRow = res.data.data.total_row;
                    $scope.bigTotalItems = res.data.data.total_row;
                } else {
                    $scope.textloading = "D??? li???u tr???ng.";
                }
            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);

            })
        }

    }
    const width = 320; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream

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
                            <tr><td><strong>G??i: </strong></td><td>${detailProduct.product_type}</td></tr>
                            <tr><td><strong>Gi?? mua: </strong></td><td>${detailProduct.price}</td></tr>
                            <tr><td><strong>Gi?? b??n: </strong></td><td>${detailProduct.price_out}</td></tr>
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
            $rootScope.checkError(e, $dialogAlert);
        })


    };

    $(document).ready(function () {
        let streaming = false;
        let video = null;
        let canvas = null;
        let photo = null;
        let startbutton = null;
        // vars
        let result = document.querySelector('.result'),
            img_result = document.querySelector('.img-result'),
            img_w = document.querySelector('.img-w'),
            img_h = document.querySelector('.img-h'),
            options = document.querySelector('.options'),
            save = document.querySelector('.save'),
            cropped = document.querySelector('.cropped'),
            dwn = document.querySelector('.download'),
            upload = document.querySelector('#file-input'),
            cropper = '';

        // on change show image with crop options
        upload.addEventListener('change', (e) => {
            if (e.target.files.length) {
                // start file reader
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target.result) {
                        // create new image
                        let img = document.createElement('img');
                        img.id = 'image';
                        img.src = e.target.result
                        // clean result before
                        result.innerHTML = '';
                        // append new image
                        result.appendChild(img);
                        // show save btn and options
                        save.classList.remove('hide');
                        options.classList.remove('hide');
                        // init cropper
                        cropper = new Cropper(img);
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // save on click
        save.addEventListener('click', (e) => {
            e.preventDefault();
            // get result to data uri
            let imgSrc = cropper.getCroppedCanvas({
                width: img_w.value // input value
            }).toDataURL();
            // remove hide class of img
            cropped.classList.remove('hide');
            img_result.classList.remove('hide');
            // show image cropped
            cropped.src = imgSrc;
            dwn.classList.remove('hide');
            dwn.download = 'imagename.png';
            dwn.setAttribute('href', imgSrc);
        });

        $scope.checkCamera = function () {
            video = document.getElementById("video");
            canvas = document.getElementById("canvas");
            photo = document.getElementById("photo");
            startbutton = document.getElementById("startbutton");

            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error(`An error occurred: ${err}`);
                });

            video.addEventListener(
                "canplay",
                (ev) => {
                    if (!streaming) {
                        height = video.videoHeight / (video.videoWidth / width);

                        // Firefox currently has a bug where the height can't be read from
                        // the video, so we will make assumptions if this happens.

                        if (isNaN(height)) {
                            height = width / (4 / 3);
                        }

                        video.setAttribute("width", width);
                        video.setAttribute("height", height);
                        canvas.setAttribute("width", width);
                        canvas.setAttribute("height", height);
                        streaming = true;
                    }
                },
                false
            );

            startbutton.addEventListener(
                "click",
                (ev) => {
                    takepicture();
                    ev.preventDefault();
                },
                false
            );

            clearphoto();
        }
        function clearphoto() {
            const context = canvas.getContext("2d");
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
        }

        function takepicture() {
            const context = canvas.getContext("2d");
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);

                const data = canvas.toDataURL("image/png");
                photo.setAttribute("src", data);
                // create new image

                let img = document.createElement('img');
                img.id = 'image';
                img.src = data;
                // clean result before
                result.innerHTML = '';
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');
                options.classList.remove('hide');
                // init cropper
                cropper = new Cropper(img);
            } else {
                clearphoto();
            }

        }
    })

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

// function them moi tai khoan
app.controller('add$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    //default states
    $scope.selectRoles = [];
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
    //api get list roles
    $http({
        method: 'GET',
        url: host_api + 'api/auth/get?action=roles',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        // console.log(res);
        if (res.data.result > 0) {
            $scope.selectRoles = res.data.data;
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })

    /**
        * Action
        */
    $scope.submit = function () {
        var _rolle = []
        angular.forEach($scope.selectedList, function (selected, day) {
            if (selected) {
                //console.log(day);
                var role = parseInt(day);
                _rolle.push(role);
            }
        });
        $scope.dataForm.Roles = _rolle;
        console.log($scope.dataForm);
        setTimeout(function () {
            if (_rolle.length <= 0) {
                return false;
            }
            //api get list roles
            $http({
                method: 'POST',
                url: host_api + 'api/auth/create',
                data: $scope.dataForm,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    //console.log(res);
                    $dialogAlert("Th??m t??i kho???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("list$account");
                    });

                } else {
                    $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }, 1000)

    };
});
// function danh sach tai khoan
app.controller('list$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    //
    $scope.filter = "";
    $scope.textloading = "??ang t???i d??? li???u";
    $scope.showRow = false;

    //api get list account

    $scope.search = function () {
        search();
    }
    search();
    function search() {
        $http({
            method: 'GET',
            url: host_api + 'api/auth/get?action=userlist&filter=' + $scope.filter,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            // console.log(res);
            if (res.data.result > 0) {
                $scope.listAccounts = res.data.data.detail;
                $scope.showRow = true;
            } else {
                $scope.listAccounts = [];
                $scope.showRow = false;
                $scope.textloading = res.data.message;
            }

        }, function err(e) {
            console.log(e);
            $scope.showRow = false;
            $scope.textloading = e.data.message;
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    $scope.detailUser = function (id, refid) {
        //api get detail user follow id,refid
        $http({
            method: 'GET',
            url: host_api + 'api/auth/get?action=userbyid&userid=' + id + '&refid=' + refid,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.result > 0) {
                //$scope.selectRoles = res.data.data;
                var dataInfo = res.data.data;
                var modal = $uibModal.open({
                    animation: 1000,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class="modal-title" style="color:#fff" >Th??ng tin t??i kho???n </h4>\
                    </div>\
                    <div style="max-height:500px;overflow-y:scroll" id="print">
                        <table class="table table-bordered" style="width:100%;">                               
                            <tr><td style="width:200px">H??? t??n</td><td>{{dataInfoUser.fullname}}</td></tr>
                            <tr><td>T??i kho???n ????ng nh???p</td><td>{{dataInfoUser.username}}</td></tr>
                            <tr><td>S??? ??i???n tho???i</td><td>{{dataInfoUser.phone}}</td></tr>
                            <tr><td>Quy???n qu???n l??</td><td><span ng-repeat="item in dataInfoUser.roles">{{item.name}}, </span></td></tr>
                        </table>
                    </div>
                    <div class ="modal-footer">\
                        <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                    </div>`,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.cancel = function () {
                            $uibModalInstance.close(false);
                        };
                        $scope.dataInfoUser = dataInfo;
                    },
                    controllerAs: $scope,
                    size: 'xs',//size,   
                    windowClass: 'your-modal-class',

                });
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    $scope.deleteUser = function (id, refid) {
        //id, refid
        $dialogConfirm("B???n ch???c ch???n mu???n x??a t??i kho???n n??y kh???i h??? th???ng?", "X??c nh???n", function (res) {
            if (res) {
                $http({
                    method: 'POST',
                    url: host_api + 'api/auth/delete',
                    data: {
                        UserId: id,
                        RefId: refid
                    },
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (res) {
                    if (res.data.result > 0) {
                        $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "success");
                    } else {
                        $dialogAlert("\n" + e.data.message, "Th??ng b??o!", "warning");
                    }
                })
            }

        })

    }
});
// function chinh sua tai khoan
app.controller('edit$account$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    //default states
    $scope.uid = $stateParams.id;
    $scope.refid = $stateParams.refid;
    $scope.selectRoles = [];
    $scope.selectedList = [];
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
    //api get list roles
    $http({
        method: 'GET',
        url: host_api + 'api/auth/get?action=roles',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        // console.log(res);
        if (res.data.result > 0) {
            $scope.selectRoles = res.data.data;
            //api get detail user follow id,refid
            $http({
                method: 'GET',
                url: host_api + 'api/auth/get?action=userbyid&userid=' + $scope.uid + '&refid=' + $scope.refid,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    var _data = res.data.data;
                    $scope.accountName = _data.username;
                    $scope.dataForm = {
                        FullName: _data.fullname,
                        Phone: _data.phone,
                        Sex: _data.sex.toString(),
                        Email: _data.email,
                        RefId: $scope.refid,
                        UserId: $scope.uid
                    }
                    console.log($scope.dataForm);
                    angular.forEach(_data.roles, function (val) {
                        angular.forEach($scope.selectRoles, function (item) {
                            if (val.code === item.code) {
                                $scope.selectedList[item.code] = true;
                            }
                        });

                    });

                }
            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })

    /**
        * Action
        */
    $scope.submit = function () {
        var _rolle = []
        angular.forEach($scope.selectedList, function (selected, day) {
            if (selected) {
                //console.log(day);
                var role = parseInt(day);
                _rolle.push(role);
            }
        });
        $scope.dataForm.Roles = _rolle;
        console.log($scope.dataForm);
        setTimeout(function () {
            if (_rolle.length <= 0) {
                return false;
            }
            //api get list roles
            // return;
            $http({
                method: 'POST',
                url: host_api + 'api/auth/update',
                data: $scope.dataForm,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    //console.log(res);
                    $dialogAlert("C???p nh???t t??i kho???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("list$account");
                    });

                } else {
                    $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }, 1000)

    };
});
// function doi mat khau
app.controller('change$password$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
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
                    Password: {
                        enabled: false,
                        validators: {
                            notEmpty: {
                                message: 'M???t kh???u kh??ng ???????c ????? tr???ng'
                            }
                        }
                    },
                    RePassword: {
                        enabled: false,
                        validators: {
                            notEmpty: {
                                message: 'M???t kh???u kh??ng ???????c ????? tr???ng'
                            },
                            identical: {
                                field: 'Password',
                                message: 'X??c nh???n m???t kh???u kh??ng ch??nh x??c'
                            }
                        }
                    }
                }
            })
            // Enable the password/confirm password validators if the password is not empty
            .on('keyup', '[name="Password"]', function () {
                var isEmpty = $(this).val() === '';
                $('#enableForm')
                    .bootstrapValidator('enableFieldValidators', 'Password', !isEmpty)
                    .bootstrapValidator('enableFieldValidators', 'RePassword', !isEmpty);

                // Revalidate the field when user start typing in the password field
                if ($(this).val().length === 1) {
                    $('#enableForm').bootstrapValidator('validateField', 'Password')
                        .bootstrapValidator('validateField', 'RePassword');
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
        //console.log($scope.dataForm);
        setTimeout(function () {
            // return;
            $http({
                method: 'POST',
                url: host_api + 'api/auth/reset',
                data: $scope.dataForm,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    //console.log(res);
                    $dialogAlert("C???p nh???t m???t kh???u th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("list$account");
                    });

                } else {
                    $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }, 1000)

    };
});
// function quan ly don hang microsoft
app.controller('pmcs$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('info') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    $rootScope.headTitle = 'Qu???n l?? ????n h??ng  > Microsoft';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.num = 10;
    $scope.totalRow = 0;
    $scope.status = "-1";
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
    // xac nhan don hang da khoi tao thong tin cho khach hang thanh cong
    $scope.fnconfirm = function (subid) {
        $dialogConfirm(`<p style="font-size:14px">X??c nh???n ???? kh???i t???o th??ng tin cho kh??ch h??ng th??nh c??ng?</p>
            <input class ="form-control" ng-model="bankingRef" name="bankingRef" placeholder="Nh???p ghi ch?? x??c nh???n th??ng tin" required>
            </div>`, "X??c nh???n", function (res) {
            if (res) {
                var _note = $("input[name='bankingRef']").val();
                if ($.trim(_note) === "") {
                    $dialogAlert("Ghi ch?? kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnconfirm(subid);
                    });
                    return;
                }
                $http({
                    method: 'GET',
                    url: window.host_api + 'api/common/get?action=kesconfirm&subsId=' + subid + '&note=' + _note,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (response) {
                    //console.log(response);
                    if (response.data.result > 0) {
                        $dialogAlert("X??c nh???n th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            window.location.reload();
                        });
                    } else {
                        $scope.textloading = response.data.message;
                        //$dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }

                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });
            }
        })
    }
    //show order detail
    $scope.invoiceDetail = function (dataInvoice) {
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=kesdetail&subsInfoId=' + dataInvoice + '&type=ms',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (response) {
            // console.log(response.data.data);
            if (response.data.result > 0) {
                var dataInvoice = response.data.data;
                var modal = $uibModal.open({
                    animation: 1000,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class ="modal-title" style="color:#fff" >Th??ng tin chi ti???t ????n h??ng </h4>\
                    </div>\
                    <div style="max-height:500px;overflow-y:scroll" id="print">
                        <h2 class="live-print" style="display:none">Th??ng tin ????n h??ng </h2>
                        <table class="table table-bordered" style="width:100%;">
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin mua h??ng</strong></td></tr>
                            <tr><td style="width:200px">H??? t??n</td><td>${dataInvoice.order.fullname}</td></tr>
                            <tr><td>Email</td><td>${dataInvoice.order.email}</td></tr>
                            <tr><td>S??? ??i???n tho???i</td><td>${dataInvoice.order.phone}</td></tr>
                            <tr><td>S???n ph???m</td><td>${dataInvoice.order.product_name}</td></tr>
                            <tr><td>Ng??y mua</td><td>${dataInvoice.order.created_date}</td></tr>
                            <tr><td>S??? l?????ng</td><td>${dataInvoice.order.qty_user} (user)</td></tr>
                            <tr><td>T??i kho???n</td><td>${dataInvoice.order.account}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin ng?????i qu???n l?? t??i kho???n</strong></td></tr>
                            <tr><td>FirstName</td><td>${dataInvoice.manager.firstname}</td></tr>
                            <tr><td>LastName</td><td>${dataInvoice.manager.lastname}</td></tr>
                            <tr><td>Phone</td><td>${(dataInvoice.manager.phone)}</td></tr>
                            <tr><td>Email</td><td>${(dataInvoice.manager.email)}</td></tr>
                            <tr><td>Address</td><td>${(dataInvoice.manager.address)}</td></tr>
                            <tr><td>City</td><td>${(dataInvoice.manager.city)}</td></tr>
                            <tr><td>Country</td><td>${(dataInvoice.manager.country)}</td></tr>
                            <tr><td>ZipCode</td><td>${(dataInvoice.manager.zipcode)}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin c??ng ty</strong></td></tr>
                            <tr><td>T??n c??ng ty</td><td>${dataInvoice.comp.name}</td></tr>
                            <tr><td>S??T</td><td>${dataInvoice.comp.phone}</td></tr>
                            <tr><td>?????a ch???</td><td>${dataInvoice.comp.address}</td></tr>
                            <tr><td>M?? s??? thu???</td><td>${dataInvoice.comp.taxcode}</td></tr>
                            <tr><td>Ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.name : ""}</td></tr>
                            <tr><td>S??T ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.phone : ""}</td></tr>  
                        </table>
                    </div>
                    <div class ="modal-footer">\
                        <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                    </div>`,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.cancel = function () {
                            $uibModalInstance.close(false);
                        };
                    },
                    controllerAs: $scope,
                    size: 'xs',//size,   
                    windowClass: 'your-modal-class',

                });

            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function (res) {
            console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
        });

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
    // list order kes
    search();
    function search() {
        $scope.data = [];
        $scope.totalRow = 0;
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=productkes&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date + '&status=' + $scope.status + "&type=ms",
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $scope.data = res.data.data.detail;
                $scope.totalRow = res.data.data.total_row;
            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
// function quan ly don hang kaspersky endpoint security
app.controller('pkes$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('info') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    $rootScope.headTitle = 'Qu???n l?? ????n h??ng  > Kaspersky endpoint security';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.num = 10;
    $scope.totalRow = 0;
    $scope.status = "-1";
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
    // xac nhan don hang da khoi tao thong tin cho khach hang thanh cong
    $scope.fnconfirm = function (subid) {
        $dialogConfirm(`<p style="font-size:14px">X??c nh???n ???? kh???i t???o th??ng tin cho kh??ch h??ng th??nh c??ng?</p>
            <input class ="form-control" ng-model="bankingRef" name="bankingRef" placeholder="Nh???p ghi ch?? x??c nh???n th??ng tin" required>
            </div>`, "X??c nh???n", function (res) {
            if (res) {
                var _note = $("input[name='bankingRef']").val();
                if ($.trim(_note) === "") {
                    $dialogAlert("Ghi ch?? kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnconfirm(subid);
                    });
                    return;
                }
                $http({
                    method: 'GET',
                    url: window.host_api + 'api/common/get?action=kesconfirm&subsId=' + subid + '&note=' + _note,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (response) {
                    //console.log(response);
                    if (response.data.result > 0) {
                        $dialogAlert("X??c nh???n th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            window.location.reload();
                        });
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }

                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });
            }
        })
    }
    //show order detail
    $scope.invoiceDetail = function (dataInvoice) {
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=kesdetail&subsInfoId=' + dataInvoice + '&type=kes',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (response) {
            //console.log(response.data.data);
            if (response.data.result > 0) {
                var dataInvoice = response.data.data;
                var modal = $uibModal.open({
                    animation: 1000,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class ="modal-title" style="color:#fff" >Th??ng tin chi ti???t ????n h??ng </h4>\
                    </div>\
                    <div style="max-height:500px;overflow-y:scroll" id="print">
                        <h2 class="live-print" style="display:none">Th??ng tin ????n h??ng </h2>
                        <table class="table table-bordered" style="width:100%;">
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin mua h??ng</strong></td></tr>
                            <tr><td style="width:200px">H??? t??n</td><td>${dataInvoice.order.fullname}</td></tr>
                            <tr><td>Email</td><td>${dataInvoice.order.email}</td></tr>
                            <tr><td>S??? ??i???n tho???i</td><td>${dataInvoice.order.phone}</td></tr>
                            <tr><td>S???n ph???m</td><td>${dataInvoice.order.product_name}</td></tr>
                            <tr><td>Ng??y mua</td><td>${dataInvoice.order.created_date} </td></tr>
                            <tr><td>S??? l?????ng</td><td>${dataInvoice.order.qty_user}</td></tr>
                            <tr><td>T??i kho???n</td><td>${dataInvoice.order.account}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin ng?????i qu???n l?? t??i kho???n</strong></td></tr>
                            <tr><td>FirstName</td><td>${dataInvoice.manager.firstname}</td></tr>
                            <tr><td>LastName</td><td>${dataInvoice.manager.lastname}</td></tr>
                            <tr><td>Phone</td><td>${(dataInvoice.manager.phone)}</td></tr>
                            <tr><td>Email</td><td>${(dataInvoice.manager.email)}</td></tr>
                            <tr><td>Address</td><td>${(dataInvoice.manager.address)}</td></tr>
                            <tr><td>City</td><td>${(dataInvoice.manager.city)}</td></tr>
                            <tr><td>Country</td><td>${(dataInvoice.manager.country)}</td></tr>
                            <tr><td>ZipCode</td><td>${(dataInvoice.manager.zipcode)}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin c??ng ty</strong></td></tr>
                            <tr><td>T??n c??ng ty</td><td>${dataInvoice.comp.name}</td></tr>
                            <tr><td>S??T</td><td>${dataInvoice.comp.phone}</td></tr>
                            <tr><td>?????a ch???</td><td>${dataInvoice.comp.address}</td></tr>
                            <tr><td>M?? s??? thu???</td><td>${dataInvoice.comp.taxcode}</td></tr>
                            <tr><td>Ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.name : ""}</td></tr>
                            <tr><td>S??T ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.phone : ""}</td></tr>  
                        </table>
                    </div>
                    <div class ="modal-footer">\
                        <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                    </div>`,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.cancel = function () {
                            $uibModalInstance.close(false);
                        };
                    },
                    controllerAs: $scope,
                    size: 'xs',//size,   
                    windowClass: 'your-modal-class',

                });

            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function (res) {
            console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
        });

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
    // list order kes
    search();
    function search() {
        $scope.data = [];
        $scope.totalRow = 0;
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=productkes&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date + '&status=' + $scope.status + "&type=kes",
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $scope.data = res.data.data.detail;
                $scope.totalRow = res.data.data.total_row;
            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
// quan ly don hang onesme
app.controller('ponesme$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $modalTemplate, $uibModalStack, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('info') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    $rootScope.headTitle = 'Qu???n l?? ????n h??ng  > oneSME';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.num = 10;
    $scope.totalRow = 0;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.showRow = false;
    $scope.status = "-1";
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
    // xac nhan don hang da khoi tao thong tin cho khach hang thanh cong
    $scope.fnconfirm = function (subid) {
        $dialogConfirm(`<p style="font-size:14px">X??c nh???n ???? kh???i t???o th??ng tin cho kh??ch h??ng th??nh c??ng?</p>
            <input class ="form-control" ng-model="bankingRef" name="bankingRef" placeholder="Nh???p ghi ch?? x??c nh???n th??ng tin" required>
            </div>`, "X??c nh???n", function (res) {
            if (res) {
                var _note = $("input[name='bankingRef']").val();
                if ($.trim(_note) === "") {
                    $dialogAlert("Ghi ch?? kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnconfirm(subid);
                    });
                    return;
                }
                $http({
                    method: 'GET',
                    url: window.host_api + 'api/common/get?action=kesconfirm&subsId=' + subid + '&note=' + _note,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (response) {
                    //console.log(response);
                    if (response.data.result > 0) {
                        $dialogAlert("X??c nh???n th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            window.location.reload();
                        });
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }

                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });
            }
        })
    }
    //show order detail
    //console.log(window.dataJson);

    $scope.invoiceDetail = function (dataInvoice) {
        return $modalTemplate.detail(dataInvoice);
    };
    // form mail template
    //console.log(window.dataJson);
    $scope.sendMailTemp = function (module, id, refid) {
        var option1 = {
            title: 'C???p nh???t th??ng tin ????n h??ng <span class ="lnr lnr-pencil" style="font-size: 15px;"></span>',
            module: module,// nh??m s???n ph???m
            type: 1,// action d??nh cho api c???p nh???t ????n h??ng
            id: id,
            refid: refid
        }
        $modalTemplate.form(option1, function (res) {
            return search();
        });
    };
    $scope.updateInfoOder = function (module, id, refid) {
        var option2 = {
            title: 'Ho??n th??nh ????n h??ng ',
            type: 2, // action d??nh cho api ho??n th??nh ????n h??ng
            id: id,
            module: module, // nh??m s???n ph???m
            refid: refid
        }
        $modalTemplate.form(option2, function (res) {
            return search();
        });
    };
    // paging
    $scope.pageChanged = function () {
        $scope.page = $scope.bigCurrentPage - 1;
        search();
    };
    // search theo date, search theo productName or productCode
    $scope.searchFilter = function () {
        $scope.page = 0;
        search();
    }
    // list order kes
    search();
    function search() {
        $scope.textloading = "??ang t???i d??? li???u...";
        $scope.data = [];
        $scope.totalRow = 0;
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=productkes&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date + '&status=' + $scope.status + "&type=onesme",
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $scope.data = res.data.data.detail;
                $scope.bigTotalItems = res.data.data.total_row;

            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
});
// danh sach don vi nha cung cap
app.controller('producerList$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $dialogShowForm, $stateParams, $window) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('seller') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }

    $rootScope.headTitle = 'Nh?? cung c???p > Danh s??ch';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.totalRow = 0;
    $scope.maxSize = 10;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.flag = false;
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }


    fndata($http, $scope, 'list')
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


        // search theo date, search theo productName or productCode
        $scope.searchFilter = function () {
            $scope.page = 0;
            search();
        }
        // paging
        $scope.pageChanged = function () {
            $scope.page = $scope.bigCurrentPage - 1;
            console.log('Page changed to: ' + $scope.bigCurrentPage);
            search();
        };
        // load data api
        function search() {
            $scope.data = [];
            $scope.totalRow = 0;
            $http({
                method: 'GET',
                url: window.host_api + 'api/producer/get?action=' + action + '&filter=' + ($scope.filter || '') + '&num=' + $scope.maxSize + '&page=' + ($scope.page || ''),
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                //console.log(res)                  
                if (res.data.result > 0) {
                    $scope.data = res.data.data;
                    $scope.totalRow = res.data.data.total_row;
                    $scope.bigTotalItems = res.data.data.total_row;
                    $(document).ready(function () {
                        $('.btnProductToggle').bootstrapToggle({
                            on: 'K??ch ho???t',
                            off: 'Ng???ng k??ch ho???t',
                            size: "mini",
                            style: "btnToggleCustom"
                        });
                    })
                } else {
                    //$scope.textloading = "D??? li???u tr???ng.";
                    $scope.textloading = res.data.message;
                    //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }
            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }
    }
    // bieu do doi tac cung cap dich 
    // bi???u ????? h??nh tr??n

    var options_pie = {
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        showlegend: true,
        dataLabels: {
            enabled: true,
            formatter: function () {
                //console.log(this)
                return formatNumbers(this.y) +
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
        url: host_api + 'api/producer/get?action=statisticcharts&type=pie',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        console.log(res);
        if (res.data.result > 0) {
            var _datas = res.data.data;
            $rootScope.loadChartPie(_datas.total, "chartdvncc1", "Th???ng k?? doanh thu b???o hi???m (t??? ?????ng)", options_pie);
            $rootScope.loadChartPie(_datas.total_last, "chartdvncc2", "Th???ng k?? l???i nhu???n (t??? ?????ng)", options_pie);
            _datas.calim.forEach(function (val) {
                if (val.y == 0) {
                    val.visible = false
                }
            })
            $rootScope.loadChartPie(_datas.calim, "chartdvncc3", "Khi???u n???i kh??ch h??ng", options_pie);
            _datas.suspend.forEach(function (val) {
                if (val.y == 0) {
                    val.visible = false
                }
            })
            $rootScope.loadChartPie(_datas.suspend, "chartdvncc4", "Kh??ch h??ng t???m ng??ng d???ch v???", options_pie);
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })

    // bieu do thong ke tang truong
    // bi???u ????? ???????ng k???
    var option_line = {
        colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        dataY: ['Th??ng 1', 'Th??ng 2', 'Th??ng 3', 'Th??ng 4', 'Th??ng 5', 'Th??ng 6', 'Th??ng 7', 'Th??ng 8', 'Th??ng 9', 'Th??ng 10', 'Th??ng 11', 'Th??ng 12']
    };
    var data_line = [
        {
            name: "C??ng ty b???o hi???m BIC",
            data: [2100, 2550, 3000, 3200, 4100, 4120, 5500, 5900, 8000, 9600, 20000, 36000]
        },
        {
            name: "C??ng ty b???o hi???m PVI",
            data: [3600, 4000, 6000, 9000, 15000, 15500, 22000, 26000, 29000, 32000, 33000, 35900]
        },
        {
            name: "C??ng ty b???o hi???m MC",
            data: [2000, 2500, 3000, 4500, 6500, 8000, 7500, 7600, 10000, 15000, 19000, 23000]
        }
    ]
    $http({
        method: 'GET',
        url: host_api + 'api/producer/get?action=statisticcharts&type=line',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        console.log(res);
        if (res.data.result > 0) {
            var _datas = res.data.data;
            $rootScope.loadChartLine(_datas.total, "line_chartdvncc", "Th???ng k?? t??ng tr?????ng kh??ch h??ng", option_line);
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })

})
// Them khuyen mai
app.controller("addPromotion$Ctrl", function ($http, $scope, $rootScope, $dialogAlert, $dialogConfirm, $state, $dialogShowForm, $log, $uibModal, $window) {
    $scope.data = {
        textInput: '',
        options: {
            language: 'en',
            allowedContent: true,
            entities: false
        }
    };
    $scope.dataProduct = {
        target: 0
    }
    $(document).ready(function () {
        $('.select_promotion').select2({
            placeholder: {
                id: '-1', // the value of the option
                text: 'Ch???n ??t nh???t 1 s???n ph???m'
            }
        });
        $('#formProduct').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'Ti??u ????? kh??ng ???????c b??? tr???ng.'
                        }
                    }
                },
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
                postData();
            });
        setTimeout(function () {
            $(".dateTimePicker").datetimepicker({
                isRTL: false,
                format: 'yyyy-mm-dd hh:ii:00',
                autoclose: true,
                language: 'en',
                //minView: 2, //tat thoi gian
                //pickTime: false, //tat thoi gian
                todayBtn: true,
            });
        }, 500);

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    })
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
    $http({
        method: 'GET',
        url: host_api + 'api/channel/get?action=list',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            $scope.dataListChannel = res.data.data;
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.dataProduct = {};
    $scope.dataProduct.productId = [];
    //danh s??ch s???n ph???m theo id k??nh b??n
    $scope.flag_product = true;
    $scope.loadProducts = function (pid) {
        $http({
            method: 'GET',
            url: host_api + 'api/product/get?action=listbychannelid&channelId=' + pid,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                $scope.flag_product = false;
                $scope.dataListProduct = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    //che do hi???n th??? /1 la show /0 la hide
    //$scope.dataProduct.status = 1;
    // get category blog
    $http.get('/api/common/db_getdatanew?action=blogcategory')
        .then(function (res) {
            $scope.dataCategory = res.data.data;
            //console.log(res);
        }, function err(e) {
            console.log(e);
        });
    $scope.$watch("myFile", function () {
        //console.log($scope.myFile);
        if ($scope.myFile) {
            $scope.fileName = $scope.myFile.filename;
        }
    });

    $scope.addFiles = function () {
        //console.log($scope.myFile)
        if ($scope.myFile === undefined || $scope.myFile === "") {
            $scope.error = "Vui l??ng ch???n 1 ???nh ?????i di???n c???a b??i vi???t";
            return;
        }

        if ($scope.myFile) {
            $scope.error = undefined;
            //console.log($scope.myFile)
            if ($scope.myFile.filesize <= 0) return;
            $scope.dataImage = {
                Name: $scope.myFile.filename,
                Content: "data:" + $scope.myFile.filetype + ";base64," + $scope.myFile.base64
            };
            ///api upload h??nh
            $http({
                method: 'POST',
                url: window.host_api + 'api/common/upload',
                data: $scope.dataImage,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token,
                }
            }).then(function (response) {
                //console.log(response);
                $scope.imagesUrl = window.host + "uploads/" + response.data.data.rewrite;
                $scope.dataProduct.files = [{
                    rewrite: response.data.data.rewrite,
                    original: response.data.data.original
                }];
            }, function (res) {
                console.log(res);
                // $dialogAlert("\n " + res.data.Message ? res.data.Message : "", "Th??ng b??o!", "warning");
            });
        }
    }

    //$scope.contentBlog = "";
    function postData() {
        $scope.dataProduct.fromdate = $scope.from_date;
        $scope.dataProduct.todate = $scope.to_date;
        $scope.dataProduct.action = "create";
        console.log($scope.dataProduct);
        //return;
        $http({
            method: 'POST',
            url: host_api + 'api/promotion/crud',
            data: $scope.dataProduct,
            headers: {
                'Authorization': $window.localStorage.token,
            }
        }).then(function (response) {
            //console.log(response);
            if (response.data.result > 0) {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "success", function (res) {
                    if (res) {
                        $state.go("selkhuyenmai");
                    }
                });
                $('#formProduct').bootstrapValidator('resetForm', true);
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }
        }, function (res) {
            //console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "", "Th??ng b??o!", "warning");
        });
    }

})
// Them khuyen mai
app.controller("editPromotion$Ctrl", function ($http, $scope, $state, $rootScope, $stateParams, $dialogAlert, $dialogConfirm, $dialogShowForm, $log, $uibModal, $window) {
    $scope.pid = $stateParams.id;
    console.log($scope.pid);
    $scope.dataProduct = {};
    var productId = [];
    $scope.data = {
        textInput: '',
        options: {
            language: 'en',
            allowedContent: true,
            entities: false
        }
    };
    $(document).ready(function () {
        $('.select_promotion').select2();
        $('#formProduct').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'Ti??u ????? kh??ng ???????c b??? tr???ng.'
                        }
                    }
                },
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
                postData();
            });

    })
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
    //$scope.from_date = _timeFromdate();
    // $scope.to_date = _timeTodate();
    $http({
        method: 'GET',
        url: host_api + 'api/promotion/get?action=detail&id=' + $scope.pid,
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        //console.log(res)
        if (res.data.result > 0) {
            $scope.dataListChannel = res.data.data;

            $scope.dataProduct = {
                title: res.data.data.name,
                channelId: res.data.data.channel.code,
                type: res.data.data.type,
                scale: res.data.data.scale,
                fromdate: res.data.data.start_time,
                todate: res.data.data.end_time,
                description: res.data.data.description,
                refId: res.data.data.refId
            }

            $scope.loadProducts(res.data.data.channel.code)
            setTimeout(function () {
                $(".dateTimePicker").datetimepicker({
                    isRTL: false,
                    format: 'yyyy-mm-dd hh:ii:00',
                    autoclose: true,
                    language: 'en',
                    //minView: 2, //tat thoi gian
                    //pickTime: false, //tat thoi gian
                    todayBtn: true,
                });
                res.data.data.product.forEach(function (val) {
                    productId.push(val.code);
                })
                $scope.dataProduct.productId = productId;
                $(document).ready(function () {
                    $('.select_promotion').val(productId);
                    $('.select_promotion').trigger('change');
                });
            }, 500);
            $http({
                method: 'GET',
                url: host_api + 'api/channel/get?action=list',
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                if (res.data.result > 0) {
                    $scope.dataListChannel = res.data.data;
                } else {
                    $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })


    //danh s??ch s???n ph???m theo id k??nh b??n
    $scope.flag_product = true;
    $scope.loadProducts = function (pid) {
        $http({
            method: 'GET',
            url: host_api + 'api/product/get?action=listbychannelid&channelId=' + pid,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                $scope.flag_product = false;
                $scope.dataListProduct = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    //che do hi???n th??? /1 la show /0 la hide
    //$scope.dataProduct.status = 1;
    // get category blog
    $http.get('/api/common/db_getdatanew?action=blogcategory')
        .then(function (res) {
            $scope.dataCategory = res.data.data;
            //console.log(res);
        }, function err(e) {
            console.log(e);
        });
    $scope.$watch("myFile", function () {
        //console.log($scope.myFile);
        if ($scope.myFile) {
            $scope.fileName = $scope.myFile.filename;
        }
    });

    $scope.addFiles = function () {
        //console.log($scope.myFile)
        if ($scope.myFile === undefined || $scope.myFile === "") {
            $scope.error = "Vui l??ng ch???n 1 ???nh ?????i di???n c???a b??i vi???t";
            return;
        }

        if ($scope.myFile) {
            $scope.error = undefined;
            //console.log($scope.myFile)
            if ($scope.myFile.filesize <= 0) return;
            $scope.dataImage = {
                Name: $scope.myFile.filename,
                Content: "data:" + $scope.myFile.filetype + ";base64," + $scope.myFile.base64
            };
            ///api upload h??nh
            $http({
                method: 'POST',
                url: window.host_api + 'api/common/upload',
                data: $scope.dataImage,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token,
                }
            }).then(function (response) {
                //console.log(response);
                $scope.imagesUrl = window.host + "uploads/" + response.data.data.rewrite;
                $scope.dataProduct.files = [{
                    rewrite: response.data.data.rewrite,
                    original: response.data.data.original
                }];
            }, function (res) {
                console.log(res);
                // $dialogAlert("\n " + res.data.Message ? res.data.Message : "", "Th??ng b??o!", "warning");
            });
        }
    }

    //$scope.contentBlog = "";
    function postData() {
        //$scope.dataProduct.fromdate = $scope.from_date;
        // $scope.dataProduct.todate = $scope.to_date;
        $scope.dataProduct.action = "update";
        //console.log($scope.dataProduct);
        $dialogConfirm("Vui l??ng ki???m tra l???i th??ng tin v?? ???n x??c nh???n ????? ho??n t???t.", "X??c nh???n thay ?????i", function (res) {
            if (res) {
                //return;
                $http({
                    method: 'POST',
                    url: host_api + 'api/promotion/crud',
                    data: $scope.dataProduct,
                    headers: {
                        'Authorization': $window.localStorage.token,
                    }
                }).then(function (response) {
                    //console.log(response);
                    if (response.data.result > 0) {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "success", function (res) {
                            if (res) {
                                $state.go("selkhuyenmai");
                            }
                        });
                        $('#formProduct').bootstrapValidator('resetForm', true);
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }
                }, function (res) {
                    //console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "", "Th??ng b??o!", "warning");
                });
            }
        })
    }
})
// Them nha cung cap
app.controller("addProducer$Ctrl", function ($http, $scope, $rootScope, $dialogAlert, $dialogConfirm, $state, $dialogShowForm, $log, $uibModal, $window) {
    $scope.data = {
        textInput: '',
        options: {
            language: 'en',
            allowedContent: true,
            entities: false
        }
    };

    $(document).ready(function () {

        $('#formProducer').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'T??n kh??ng ???????c b??? tr???ng.'
                        }
                    }
                },
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
                postData();
            });

    })

    $http({
        method: 'GET',
        url: host_api + 'api/channel/get?action=list',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            $scope.dataListChannel = res.data.data;
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    $scope.dataProducer = {};

    //danh s??ch nh?? cung c???p
    $scope.flag_product = true;
    $scope.loadProducts = function (pid) {
        $http({
            method: 'GET',
            url: host_api + 'api/product/get?action=listbychannelid&channelId=' + pid,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                $scope.flag_product = false;
                $scope.dataListProduct = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    //$scope.contentBlog = "";
    function postData() {
        $scope.dataProducer.action = "create";
        //console.log($scope.dataProducer);
        //return;
        $http({
            method: 'POST',
            url: host_api + 'api/producer/crud',
            data: $scope.dataProducer,
            headers: {
                'Authorization': $window.localStorage.token,
            }
        }).then(function (response) {
            //console.log(response);
            if (response.data.result > 0) {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "success", function (res) {
                    if (res) {
                        $state.go("selList");
                    }
                });
                $('#formProduct').bootstrapValidator('resetForm', true);
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }
        }, function (res) {
            //console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "", "Th??ng b??o!", "warning");
        });
    }

})
// Them s???n ph???m nha cung cap
app.controller("addSptProducer$Ctrl", function ($http, $scope, $rootScope, $stateParams, $dialogAlert, $dialogConfirm, $state, $dialogShowForm, $log, $uibModal, $window) {
    var code = $stateParams.code;
    $(document).ready(function () {
        $('.select_product').select2({
            placeholder: {
                id: '-1', // the value of the option
                text: 'Ch???n s???n ph???m'
            }
        });
        $('#formProducer').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'T??n kh??ng ???????c b??? tr???ng.'
                        }
                    }
                },
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
                postData();
            });

    })
    $scope.dataProducer = {};
    //
    $http({
        method: 'GET',
        url: host_api + 'api/channel/get?action=list',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        //console.log(res);
        if (res.data.result > 0) {
            $scope.dataListChannel = res.data.data;
        } else {
            $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    // danh sach nha cung cap
    $http({
        method: 'GET',
        url: window.host_api + 'api/producer/get?action=list',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            res.data.data.forEach(function (val) {
                if (val.code == code) {
                    $scope.title = val.name;
                    $scope.dataProducer.code = val.code;
                    $scope.dataProducer.secretkey = val.secretkey;
                }
            })
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }
    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })
    // danh sach nhom san pham
    $http({
        method: 'GET',
        url: host_api + 'api/producer/get?action=insugroup',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        if (res.data.result > 0) {
            $scope.dataInsugroup = res.data.data;
        } else {
            $dialogAlert("\n " + res.data.message, "Th??ng b??o!", "warning");
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })


    //danh s??ch nh?? cung c???p
    $scope.flag_product = true;
    $scope.loadProducts = function (pid) {
        $http({
            method: 'GET',
            url: host_api + 'api/producer/get?action=insutype&code=' + pid,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                $scope.flag_product = false;
                $scope.dataListProduct = res.data.data;
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    //$scope.contentBlog = "";
    function postData() {
        $scope.dataProducer.action = "product";
        //console.log($scope.dataProducer);
        //return;
        $http({
            method: 'POST',
            url: host_api + 'api/producer/crud',
            data: $scope.dataProducer,
            headers: {
                'Authorization': $window.localStorage.token,
            }
        }).then(function (response) {
            //console.log(response);
            if (response.data.result > 0) {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "success", function (res) {
                    if (res) {
                        $state.go("selProducer");
                    }
                });
                $('#formProduct').bootstrapValidator('resetForm', true);
            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }
        }, function (res) {
            //console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "", "Th??ng b??o!", "warning");
        });
    }

})
app.controller("chienluocbanhang$Ctrl", function ($http, $scope, $rootScope, $stateParams, $dialogAlert, $dialogConfirm, $state, $dialogShowForm, $log, $uibModal, $window) {
    //bieu do thong ke chien luoc ban hang
    $(document).ready(function () {
        var options_column = {
            colors: ['#5B9BD5', '#ED7D31', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        }
        var data1 = {
            category: ["Truy???n th??ng sms", "Truy???n th??ng m???ng x?? h???i", "Truy???n th??ng Telesale"],
            series: [
                {
                    name: "M???c ti??u",
                    data: [20000, 50000, 30000]
                },
                {
                    name: "?????t ???????c",
                    data: [15000, 80000, 1000]
                }
            ]
        };
        var data2 = {
            category: ["Truy???n th??ng sms", "Truy???n th??ng m???ng x?? h???i", "Truy???n th??ng Telesale"],
            series: [
                {
                    name: "M???c ti??u",
                    data: [100, 50, 30]
                },
                {
                    name: "?????t ???????c",
                    data: [20, 80, 10]
                }
            ]
        }
        var data3 = {
            category: ["SMS t???i KH VIP", "SMS t???i KH HSSV", "SMS t???i KH Ph??? th??ng"],
            series: [
                {
                    name: "M???c ti??u",
                    data: [10000, 10000, 50000]
                },
                {
                    name: "?????t ???????c",
                    data: [15000, 6000, 80000]
                }
            ]
        };
        var data4 = {
            category: ["SMS t???i KH VIP", "SMS t???i KH HSSV", "SMS t???i KH Ph??? th??ng"],
            series: [
                {
                    name: "M???c ti??u",
                    data: [25, 15, 50]
                },
                {
                    name: "?????t ???????c",
                    data: [32, 9, 80]
                }
            ]
        }
        load_bieudocot("chartclbh1", data1, "Chi???n l?????c b??n h??ng", options_column);
        load_bieudocot("chartclbh2", data2, "Th???ng k?? doanh thu(t??? ?????ng)", options_column);
        load_bieudocot("chartclbh3", data3, "Ph??n t??ch kh??ch h??ng", options_column);
        load_bieudocot("chartclbh4", data4, "Th???ng k?? doanh thu(t??? ?????ng)", options_column);

        function load_bieudocot(id, data, title, options) {
            Highcharts.setOptions({
                colors: options.colors
            });
            Highcharts.chart(id, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: data.category,
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    formatter: function () {
                        var _html = "";
                        _html += `<h4>${this.x}</h4>`;
                        this.points.forEach(function (val) {
                            _html += `<p style="margin-bottom:0"><span style="color:${val.color}"> ${val.series.name}</span> : ${formatNumbers(val.y)}</p>`;
                        })
                        return _html;
                    },
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return formatNumbers(this.y)
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: data.series
            });
        }


    })

})
app.controller("phantichhanhvi$Ctrl", function ($http, $scope, $rootScope, $stateParams, $dialogAlert, $dialogConfirm, $state, $dialogShowForm, $log, $uibModal, $window) {
    //bieu do thong ke chien luoc ban hang
    $(document).ready(function () {
        var options_column = {
            colors: ['#ED7D31', '#5B9BD5', '#89A54E', '#80699B', '#763c3c', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        }
        var data1 = {}, data2 = {};
        $http({
            method: 'GET',
            url: host_api + 'api/report/seller?action=customerchart&type=column',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            // console.log(res);
            if (res.data.result > 0) {
                console.log(res);
                data1.category = res.data.data.customer.category;
                data1.series = res.data.data.customer.series;
                data2.category = res.data.data.subscription.category;
                data2.series = res.data.data.subscription.series;
                load_bieudocot("charthvkh1", data1, "Th???ng k?? t??ng tr?????ng kh??ch h??ng", options_column);
                load_bieudocot("charthvkh2", data2, "Th???ng k?? thu?? bao", options_column);
            } else {
                $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }

        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })

        function load_bieudocot(id, data, title, options) {
            Highcharts.setOptions({
                colors: options.colors
            });
            Highcharts.chart(id, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: data.category,
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    formatter: function () {
                        var _html = "";
                        _html += `<h4>${this.x}</h4>`;
                        this.points.forEach(function (val) {
                            _html += `<p style="margin-bottom:0"><span style="color:${val.color}"> ${val.series.name}</span> : ${formatNumbers(val.y)}</p>`;
                        })
                        return _html;
                    },
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return formatNumbers(this.y) + '<div><span class="lnr lnr-user"></span></div>';
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: data.series
            });
        }


    })

})

// function quan ly don hang moza
app.controller('pmoza$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('info') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    $rootScope.headTitle = 'Qu???n l?? ????n h??ng  > Kaspersky endpoint security';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.num = 10;
    $scope.totalRow = 0;
    $scope.status = "-1";
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
    // xac nhan don hang da khoi tao thong tin cho khach hang thanh cong
    $scope.fnconfirm = function (subid) {
        $scope.datakh = {};
        $dialogConfirm(`<p style="font-size:14px">X??c nh???n ???? kh???i t???o th??ng tin cho kh??ch h??ng th??nh c??ng?</p>
                <form class="form-auth-small" name="signinForm" id="signinForm">
                        <div class="form-group">
                            <label for="signin-email" class="control-label sr-only">T??i kho???n</label>
                            <input class="form-control" type="text" placeholder="Nh???p t??i kho???n" name="taikhoan" ng-model="datakh.taikhoan" required>
                        </div>
                        <div class="form-group">
                            <label for="signin-password" class="control-label sr-only">M???t kh???u</label>
                            <input type="password" class="form-control" placeholder="Nh???p m???t kh???u" name="matkhau" ng-model="datakh.matkhau" required>
                        </div>
                        <div class="form-group">
                            <label for="signin-password" class="control-label sr-only">Key</label>
                            <input type="text" class="form-control" placeholder="Nh???p key" name="key" ng-model="datakh.key" required>
                        </div>
                        <div class="form-group">
                            <label for="signin-password" class="control-label sr-only">Key</label>
                            <input class ="form-control" ng-model="bankingRef" name="bankingRef" placeholder="Nh???p ghi ch?? x??c nh???n th??ng tin" required>
                        </div>
                </form>
            
            </div>`, "X??c nh???n", function (res) {
            if (res) {
                var _taikhoan = $("input[name='taikhoan']").val();
                var _matkhau = $("input[name='matkhau']").val();
                var _key = $("input[name='key']").val();
                var _note = $("input[name='bankingRef']").val();
                if ($.trim(_taikhoan) === "" || $.trim(_matkhau) === "" || $.trim(_key) === "" || $.trim(_note) === "") {
                    $dialogAlert("Th??ng tin kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnconfirm(subid);
                    });
                    return;
                }
                $http({
                    method: 'GET',
                    url: window.host_api + 'api/common/get?action=kesconfirm&subsId=' + subid + '&taikhoan=' + _taikhoan + '&matkhau=' + _matkhau + '&key=' + _key + '&note=' + _note,
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    }
                }).then(function (response) {
                    //console.log(response);
                    if (response.data.result > 0) {
                        $dialogAlert("X??c nh???n th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            window.location.reload();
                        });
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }

                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });
            }
        })
    }
    //show order detail moza product
    $scope.invoiceDetail = function (dataInvoice) {
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=kesdetail&subsInfoId=' + dataInvoice + '&type=moza',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (response) {
            //console.log(response.data.data);
            if (response.data.result > 0) {
                var dataInvoice = response.data.data;
                var modal = $uibModal.open({
                    animation: 1000,
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class ="modal-title" style="color:#fff" >Th??ng tin chi ti???t ????n h??ng </h4>\
                    </div>\
                    <div style="max-height:500px;overflow-y:scroll" id="print">
                        <h2 class="live-print" style="display:none">Th??ng tin ????n h??ng </h2>
                        <table class="table table-bordered" style="width:100%;">
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin mua h??ng</strong></td></tr>
                            <tr><td style="width:200px">H??? t??n</td><td>${dataInvoice.order.fullname}</td></tr>
                            <tr><td>Email</td><td>${dataInvoice.order.email}</td></tr>
                            <tr><td>S??? ??i???n tho???i</td><td>${dataInvoice.order.phone}</td></tr>
                            <tr><td>S???n ph???m</td><td>${dataInvoice.order.product_name}</td></tr>
                            <tr><td>Ng??y mua</td><td>${dataInvoice.order.created_date} </td></tr>
                            <tr><td>S??? l?????ng</td><td>${dataInvoice.order.qty_user}</td></tr>
                            <tr><td>T??i kho???n</td><td>${dataInvoice.order.account}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin ng?????i qu???n l?? t??i kho???n</strong></td></tr>
                            <tr><td>FirstName</td><td>${dataInvoice.manager.firstname}</td></tr>
                            <tr><td>LastName</td><td>${dataInvoice.manager.lastname}</td></tr>
                            <tr><td>Phone</td><td>${(dataInvoice.manager.phone)}</td></tr>
                            <tr><td>Email</td><td>${(dataInvoice.manager.email)}</td></tr>
                            <tr><td>Address</td><td>${(dataInvoice.manager.address)}</td></tr>
                            <tr><td>City</td><td>${(dataInvoice.manager.city)}</td></tr>
                            <tr><td>Country</td><td>${(dataInvoice.manager.country)}</td></tr>
                            <tr><td>ZipCode</td><td>${(dataInvoice.manager.zipcode)}</td></tr>
                            <tr class="panel-info list-group-item-info"><td colspan="2"><strong>Th??ng tin c??ng ty</strong></td></tr>
                            <tr><td>T??n c??ng ty</td><td>${dataInvoice.comp.name}</td></tr>
                            <tr><td>S??T</td><td>${dataInvoice.comp.phone}</td></tr>
                            <tr><td>?????a ch???</td><td>${dataInvoice.comp.address}</td></tr>
                            <tr><td>M?? s??? thu???</td><td>${dataInvoice.comp.taxcode}</td></tr>
                            <tr><td>Ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.name : ""}</td></tr>
                            <tr><td>S??T ng?????i ?????i di???n</td><td>${dataInvoice.comp.represent ? dataInvoice.comp.represent.phone : ""}</td></tr>  
                        </table>
                    </div>
                    <div class ="modal-footer">\
                        <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                    </div>`,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.cancel = function () {
                            $uibModalInstance.close(false);
                        };
                    },
                    controllerAs: $scope,
                    size: 'xs',//size,   
                    windowClass: 'your-modal-class',

                });

            } else {
                $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
            }

        }, function (res) {
            console.log(res);
            $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
        });

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
    // list order kes
    search();
    function search() {
        $scope.data = [];
        $scope.totalRow = 0;
        $http({
            method: 'GET',
            url: window.host_api + 'api/common/get?action=productkes&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&from_date=' + $scope.from_date + '&to_date=' + $scope.to_date + '&status=' + $scope.status + "&type=moza",
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $scope.data = res.data.data.detail;
                $scope.totalRow = res.data.data.total_row;
            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }

    // demo json
    var _json = {
        "result": 1,
        "message": "Th??nh c??ng",
        "data": {
            "total_row": 71,
            "detail": [
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "9/2021",
                    "qty": 6
                },
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "10/2021",
                    "qty": 3
                },
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "11/2021",
                    "qty": 9
                },
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "12/2021",
                    "qty": 3
                },
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "1/2022",
                    "qty": 1
                },
                {
                    "name": "B???o hi???m  h???c sinh sinh vi??n",
                    "mmyy": "3/2022",
                    "qty": 3
                },
                {
                    "name": "B???o hi???m M?? t??- xe m??y (1 n??m)",
                    "mmyy": "7/2021",
                    "qty": 3
                },
                {
                    "name": "B???o hi???m M?? t??- xe m??y (1 n??m)",
                    "mmyy": "9/2021",
                    "qty": 1
                },
                {
                    "name": "B???o hi???m M?? t??- xe m??y (1 n??m)",
                    "mmyy": "10/2021",
                    "qty": 25
                },
                {
                    "name": "B???o hi???m M?? t??- xe m??y (1 n??m)",
                    "mmyy": "11/2021",
                    "qty": 3
                },
                {
                    "name": "B???o hi???m M?? t??- xe m??y (1 n??m)",
                    "mmyy": "12/2021",
                    "qty": 1
                },
                {
                    "name": "B???o hi???m TNDS ?? t??",
                    "mmyy": "10/2021",
                    "qty": 1
                },
                {
                    "name": "B???o hi???m TNDS ?? t??",
                    "mmyy": "11/2021",
                    "qty": 1
                },
                {
                    "name": "B???o hi???m TNDS ?? t??",
                    "mmyy": "12/2021",
                    "qty": 4
                },
                {
                    "name": "B???o hi???m TNDS ?? t??",
                    "mmyy": "2/2022",
                    "qty": 1
                },
                {
                    "name": "Kapersky Anti Virus - 1 DT",
                    "mmyy": "6/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Endpoint Security cho Doanh nghi???p | Standard",
                    "mmyy": "9/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "6/2021",
                    "qty": 2
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "7/2021",
                    "qty": 14
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "8/2021",
                    "qty": 11
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "9/2021",
                    "qty": 14
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "10/2021",
                    "qty": 12
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "11/2021",
                    "qty": 26
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "12/2021",
                    "qty": 22
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "1/2022",
                    "qty": 15
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "2/2022",
                    "qty": 13
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 1 DVC",
                    "mmyy": "3/2022",
                    "qty": 7
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "4/2021",
                    "qty": 19
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "5/2021",
                    "qty": 8
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "6/2021",
                    "qty": 3
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "7/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "8/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "9/2021",
                    "qty": 76
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "10/2021",
                    "qty": 15
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "11/2021",
                    "qty": 11
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "12/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "1/2022",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "2/2022",
                    "qty": 13
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 3 DVC",
                    "mmyy": "3/2022",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "6/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "7/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "8/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "9/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "10/2021",
                    "qty": 15
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "11/2021",
                    "qty": 12
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "12/2021",
                    "qty": 13
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "1/2022",
                    "qty": 78
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "2/2022",
                    "qty": 11
                },
                {
                    "name": "Kaspersky Internet Security - Multi-Device - 5 DVC",
                    "mmyy": "3/2022",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "3/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "6/2021",
                    "qty": 4
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "7/2021",
                    "qty": 11
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "8/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "9/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "10/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "11/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "12/2021",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "1/2022",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "2/2022",
                    "qty": 10
                },
                {
                    "name": "Kaspersky Internet Security for Android - 1 MD",
                    "mmyy": "3/2022",
                    "qty": 5
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "6/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "7/2021",
                    "qty": 1
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "11/2021",
                    "qty": 16
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "12/2021",
                    "qty": 11
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "1/2022",
                    "qty": 5
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "2/2022",
                    "qty": 3
                },
                {
                    "name": "Kaspersky Safe Kids - 1 DT",
                    "mmyy": "3/2022",
                    "qty": 2
                },
                {
                    "name": "Microsoft 365 Business Basic (Office 365 Business Essentials)",
                    "mmyy": "11/2021",
                    "qty": 1
                },
                {
                    "name": "M?? t??- xe m??y (1 n??m)",
                    "mmyy": "7/2021",
                    "qty": 2
                },
                {
                    "name": "M?? t??- xe m??y (1 n??m)",
                    "mmyy": "10/2021",
                    "qty": 3
                },
                {
                    "name": "Moza",
                    "mmyy": "3/2022",
                    "qty": 16
                }
            ]
        },
        "requestId": 129083
    }
    //$scope.dataMoza = _json.data.detail;
    function groupByKey(array, key) {
        return array
            .reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
            }, {})
    }
    var demo_data = _json.data.detail;

    // group theo th??ng
    var ar_date = groupByKey(demo_data, 'mmyy');
    ar_date = Object.keys(ar_date);
    //console.log(ar_date);
    var _arrdate2 = []
    ar_date.forEach(function (val) {
        var _val = val.split("/");
        _arrdate2.push({
            'month': _val[0],
            'year': _val[1]
        })
    })
    //group theo t??n s???n ph???m
    var ar_name = groupByKey(demo_data, 'name');

    ar_name = Object.values(ar_name);
    //console.log(ar_name);

    var _arrdate = []
    ar_name.forEach(function (val) {
        var valName = val[0].name;
        _arrdate.push({
            'name': valName,
            'datas2': val
        })
    })

    $scope.dataMoza = _arrdate;
    //console.log(_arrdate);

    //function sum value
    $scope.sumValue = function (arr) {
        var _e = 0;
        arr.forEach(function (val) {
            _e += val.qty;
        });
        return _e
    }
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const sorter = (a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        } else {
            return months.indexOf(a.month) - months.indexOf(b.month);
        };
    };
    _arrdate2.sort(sorter);

    //console.log(_arrdate2);
    var _arryDate = [];
    _arrdate2.forEach(function (val) {
        _arryDate.push(val.month + '/' + val.year)
    })
    var _series = [];
    var data2 = [];
    _arrdate.forEach(function (item, key) {
        item.data2 = [];
        item.datas = cvobject(item.datas2);
        item.datas.forEach(function (val) {
            item.data2.push(val.qty)
        })
        _series.push({
            'name': item.name,
            'data': item.data2
        })

    });
    //console.log(_series)
    setTimeout(function () {
        // return;
        $("#imgLoading").remove();
        //console.log(_arrdate);
        $(document).ready(function () {
            var colors = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
            Highcharts.setOptions({
                colors: colors
            });
            Highcharts.chart('hightchart_moza', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Th???ng k?? doanh s??? b??n s???n ph???m '
                },
                yAxis: {
                    title: {
                        text: '<strong>S??? l?????ng s???n ph???m</strong>'
                    },
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                xAxis: {
                    title: {
                        text: '<strong>Th???i gian</strong>'
                    },
                    categories: _arryDate,
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    spline: {
                        dataLabels: {
                            enabled: true
                        }
                    }

                },
                series: _series,
                credits: {
                    enabled: false
                },
            });

        })

    }, 3000);

    function cvobject(arr) {
        const result = _arryDate.map(person => {
            var e = {}
            const addressItem = arr.find(address => address.mmyy === person)
            e.key = person;
            e.qty = addressItem ? addressItem.qty : null;
            return e
        })
        return result;
    }
    $scope.rowHighilited = function (group, row) {
        $scope.selectedGroup = group;
        $scope.selectedRow = row;
    };
    var data_jsondashboard = { "result": 1, "message": "Th??nh c??ng", "data": [{ "ordi_num": 1, "product": { "name": "B???o hi???m  h???c sinh sinh vi??n" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 1, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 2, "product": { "name": "B???o hi???m M?? t??- xe m??y (1 n??m)" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 33, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 3, "product": { "name": "B???o hi???m TNDS ?? t??" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 1, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 4, "product": { "name": "Kapersky Anti Virus - 1 DT" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 1, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 5, "product": { "name": "Kaspersky Endpoint Security cho Doanh nghi???p | Standard" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 1, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 6, "product": { "name": "Kaspersky Internet Security - Multi-Device - 1 DVC" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 13, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 7, "product": { "name": "Kaspersky Internet Security - Multi-Device - 3 DVC" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 60, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 8, "product": { "name": "Kaspersky Internet Security - Multi-Device - 5 DVC" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 70, "curr": 1, "1": 0, "2": 0, "3": 0, "4": 0, "5": 1, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 9, "product": { "name": "Kaspersky Internet Security for Android - 1 MD" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 4, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }, { "ordi_num": 10, "product": { "name": "Kaspersky Safe Kids - 1 DT" }, "partner": { "id": 20210002, "name": "Store VTC" }, "qty": { "ago": 1, "curr": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0 } }], "requestId": 148265 };
    $scope.data_jsondashboard = data_jsondashboard.data;
    $scope.month_cur = new Date();
    $scope.month_ago = (new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()) + '/' + (new Date().getFullYear().toString().substr(-2));
});
// function quan ly don hang tiki
app.controller('ptiki$Ctrl', function ($http, $scope, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    if ($rootScope.$user && $rootScope.$user.Roles.indexOf('info') < 0 && $rootScope.$user.Roles.indexOf('tiki_get') < 0) {
        $rootScope.$user = null;
        $rootScope.login_active = true;
        $state.go('account$signout');
        return;
    }
    if ($rootScope.$user === null || $rootScope.$user === undefined) {
        $log.info('redirect to login');
        $location.path('/account/signin');
        return;
    }
    $rootScope.headTitle = 'Qu???n l?? ????n h??ng  > Tiki shop';
    $scope.textloading = "??ang t???i d??? li???u ...";
    $scope.page = 0;
    $scope.num = 10;
    $scope.totalRow = 0;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.showRow = false;
    $scope.status = "-1";
    $scope.dataList = [];

    var selectText = `<select id="selectText" name='productTiki' class="form-control" >
                            <option value=''>Ch???n s???n ph???m</option>
                          </select>`;
    // xac nhan don hang da khoi tao thong tin cho khach hang thanh cong        
    $scope.fnconfirm = function () {
        $http({
            method: 'GET',
            url: window.host_api + 'api/tiki/get?action=item',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            if (res.data.result > 0) {
                $scope.dataList = res.data.data;
                res.data.data.forEach(function (val) {
                    $('#selectText').append(`<option value='${val.code}'>${val.name}</option>`);
                })
            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
        $scope.datakh = {};
        $dialogConfirm(`<p style="font-size:14px">Vui l??ng ch???n s???n ph???m v?? nh???p s??? l?????ng ????? l???y key</p>
                <form class="form-auth-small" name="signinForm" id="signinForm">
                        <div class="form-group">
                          <span for="signin-password" class="control-label sr-only">Ch???n s???n ph???m:</span>
                          ${selectText}
                        </div>
                         <div class="form-group">
                            <span for="signin-password" class="control-label sr-only">S??? l?????ng:</span>
                            <input type="Number" class="form-control" placeholder="Nh???p s??? l?????ng" name="quantity"  required>
                        </div>  
                </form>
            
            </div>`, "L???y key theo s???n ph???m", function (res) {
            if (res) {
                $("div.overlay").addClass("show");
                var ProductId = $("select[name='productTiki']").val();
                var qty = $("input[name='quantity']").val();
                console.log(ProductId, qty)
                if ($.trim(ProductId) === "" || $.trim(qty) === "") {
                    $dialogAlert("Th??ng tin kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnconfirm();
                    });
                    $("div.overlay").removeClass("show");
                    return;
                }
                var data = {
                    "action": "activate",
                    "qty": qty,
                    "ProductId": ProductId
                }

                $http({
                    method: 'POST',
                    url: window.host_api + 'api/tiki/asu',
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    },
                    data: data
                }).then(function (response) {
                    //console.log(response);

                    if (response.data.result > 0) {
                        $dialogAlert("L???y key th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            //window.location.reload();
                            //console.log(response);
                            var modal = $uibModal.open({
                                animation: 1000,
                                backdrop: 'static',
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                template: `<div class="modal-header label-primary" style="position:relative">\
                                        <h4 class ="modal-title" style="color:#fff" >Danh s??ch key </h4>\
                                        </div>\
                                        <div style="max-height:500px;overflow-y:scroll" id="printKey">
                                            <table class="table table-bordered" style="width:100%;margin-top:10px">
                                                <thead>
                                                    <tr class="panel-info list-group-item-info">
                                                        <th style="text-align:center;width:60px">STT</th>
                                                        <th>Key</th>
                                                        <th>M?? code</th>                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr ng-if="data.length == 0"><td colspan="9">{{textloading}}</td></tr>
                                                    <tr ng-repeat="item in dataKeys" >
                                                        <td class="text-center" style="width:60px">{{$index+1}}</td>
                                                        <td>{{item.Item3}}</td>
                                                        <td style="width:250px">{{item.Item4}}</td>
                                                       
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class ="modal-footer">\
                                            <button class ="btn btn-primary" ng-click="exportExcel()" >Xu???t excel</button>\
                                            <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                                        </div>`,
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.cancel = function () {
                                        $uibModalInstance.close(false);
                                        search();
                                    };
                                    $scope.dataKeys = response.data.data;
                                    $scope.nameT = getName(ProductId);
                                    //console.log($scope.nameT)
                                    var nameFile = $scope.nameT.replaceAll(' ', '-');
                                    nameFile = nameFile.replaceAll("--", "")
                                    $scope.exportExcel = function () {
                                        $("#printKey").table2excel({
                                            exclude: ".excludeThisClass",
                                            name: $scope.nameT,
                                            filename: nameFile + ".xls", // do include extension
                                            preserveColors: false // set to true if you want background colors and font colors preserved
                                        });
                                    }

                                },
                                size: 'xs',//size,   
                                windowClass: 'your-modal-class',

                            });


                        });
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }
                    $("div.overlay").removeClass("show");
                    function getName(code) {
                        var _name = "";
                        $scope.dataList.forEach(function (val) {
                            if (val.code === parseInt(code)) {
                                return _name = val.name;
                            }
                        });
                        return _name;
                    }
                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });

            }
        })
    }
    // huy key theo time or tung key rieng le
    $scope.fnCancelKey = function () {

        $scope.datakh = {};
        $dialogConfirm(`<p style="font-size:14px">Vui l??ng ch???n s???n ph???m v?? nh???p s??? l?????ng ????? l???y key</p>
                <form class="form-auth-small" name="signinForm" id="signinForm">
                        <div class="form-group">
                          <span for="signin-password" class="control-label sr-only">Th??? lo???i h???y</span>
                          <select id="selectText" name='typeKey' class="form-control" >
                            <option value='1'>M?? code</option>
                            <option value='0'>Th???i gian</option>
                          </select>
                        </div>
                        <div class="form-group haskey">
                            <span for="signin-password" class="control-label sr-only">Key:</span>
                            <input type="text" class="form-control" placeholder="Nh???p m?? code" name="key"  required>
                        </div>
                        <div class="form-group hasdate" style="display:none">
                            <span for="signin-password" class="control-label sr-only">Th???i gian:</span>
                            <input type="text" class="form-control" placeholder="Nh???p th???i gian(yyyy-mm-dd)" name="dateTime"  required>
                        </div>
                </form>
            
            </div>`, "H???y key theo s???n ph???m", function (res) {
            if (res) {
                $("div.overlay").addClass("show");
                var type = $("select[name='typeKey']").val();
                var _key = $("input[name='key']").val();
                var _date = $("input[name='dateTime']").val();
                if (($.trim(type) === "1" && $.trim(_key) === "") || ($.trim(type) === "0" && $.trim(_date) === "")) {
                    $dialogAlert("Th??ng tin kh??ng ???????c b??? tr???ng, vui l??ng th???c hi???n l???i!", "Th??ng b??o", "warning", function (res) {
                        $scope.fnCancelKey();
                    });
                    $("div.overlay").removeClass("show");
                    return;
                }
                var data = {
                    "action": "suspend",
                    "activateDate": _date
                }
                if (type === "1") {
                    data = {
                        "action": "suspendbycode",
                        "code": _key
                    }
                }
                $http({
                    method: 'POST',
                    url: window.host_api + 'api/tiki/asu',
                    headers: {
                        'Authorization': "Bearer " + $window.localStorage.token
                    },
                    data: data
                }).then(function (response) {
                    //console.log(response);
                    $("div.overlay").removeClass("show");
                    if (response.data.result > 0) {
                        $dialogAlert("H???y key th??nh c??ng!", "Th??ng b??o!", "success", function () {
                            //window.location.reload();
                            console.log(response);
                            var modal = $uibModal.open({
                                animation: 1000,
                                backdrop: 'static',
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                template: `<div class="modal-header label-primary" style="position:relative">\
                                        <h4 class ="modal-title" style="color:#fff" >Danh s??ch key ???? h???y </h4>\
                                        </div>\
                                        <div style="max-height:500px;overflow-y:scroll" id="print">
                                            <div class='item list' style="padding:0 15px;"><p> <strong>T??n s???n ph???m</strong> <span style='float:right'><strong>code</strong></span></p></div>
                                            <div ng-repeat="item in dataKeys" class='item list' style="padding:0 15px;">
                                                <p >{{item.Item4}} <span style='float:right'>{{item.Item3}}</span></p>                                                
                                            </div>                                           
                                        </div>
                                        <div class ="modal-footer">\
                                            <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                                        </div>`,
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.cancel = function () {
                                        $uibModalInstance.close(false);
                                        search();
                                    };
                                    $scope.dataKeys = response.data.data;
                                },
                                size: 'xs',//size,   
                                windowClass: 'your-modal-class',

                            });


                        });
                    } else {
                        $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                    }

                }, function (res) {
                    console.log(res);
                    $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                });
            }
        });
        setTimeout(function () {
            $("select[name='typeKey']").on('change', function () {
                if (this.value === "1") {
                    $(".haskey").show();
                    $(".hasdate").hide();
                } else if (this.value === "0") {
                    $(".haskey").hide();
                    $(".hasdate").show();
                }
            });
        }, 1000)
    }

    //show order detail moza product
    $scope.invoiceDetail = function (refId) {

        var modal = $uibModal.open({
            animation: 1000,
            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: `<div class="modal-header label-primary" style="position:relative">\
                    <h4 class ="modal-title" style="color:#fff" >C???p nh???t th??ng tin ????n h??ng </h4>\
                    </div>\
                    <div style="max-height:500px;padding:15px" id="print">
                        <h2 class="live-print" style="display:none">Th??ng tin ????n h??ng </h2>
                        <div class="form-group">
                          <label for="usr">Ng??y b??n:</label>
                          <input type="text" class="form-control dateTimePicker" ng-model="data.orderDate" ng-value="data.orderDate" placeholder="yyyy-mm-dd" >
                        </div>
                        <div class="form-group">
                          <label for="usr">S??? h??a ????n:</label>
                          <input type="text" class="form-control" ng-model="data.orderId" placeholder="Nh???p s??? h??a ????n" >
                        </div>
                        <div class="form-group">
                          <label for="usr">T??n kh??ch h??ng:</label>
                          <input type="text" class="form-control"  ng-model="data.custName"  placeholder="Nh???p t??n kh??ch h??ng">
                        </div>
                        <div class="form-group">
                          <label for="usr">?????a ch???:</label>
                          <input type="text" class="form-control"  ng-model="data.address" placeholder="Nh???p ?????a ch??? kh??ch h??ng">
                        </div>
                        <div class="form-group">
                            <label >Xu???t h??a ????n?</label>
                            <div>
                                <label class="radio-inline"><input type="radio" name="optradio" value="true"  ng-model="data.isInvoice" >C??</label>
                                <label class="radio-inline"><input type="radio" name="optradio" value="false"  ng-model="data.isInvoice" checked>Kh??ng</label>
                            </div>
                        </div>
                    </div>
                    <div class ="modal-footer">\
                        <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" >????ng</button>\
                        <button class ="btn btn-primary" ng-click="update()"  >C???p nh???t</button>\
                    </div>`,
            controller: function ($scope, $uibModalInstance, $uibModalStack) {
                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };
                $scope.data = {
                    "action": "update",
                    "refId": refId,
                    "custName": '',
                    "address": '',
                    "orderId": '',
                    "orderDate": '',
                    "isInvoice": false
                }
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
                $scope.data.orderDate = _timeTodate();
                $(document).ready(function () {
                    setTimeout(function () {
                        $(".dateTimePicker").datetimepicker({
                            isRTL: false,
                            format: 'yyyy-mm-dd HH:ii:ss',
                            autoclose: true,
                            language: 'en',
                            //minView: 2, //tat thoi gian
                            // pickTime: false, //tat thoi gian
                            todayBtn: true,
                        });
                    }, 1000);
                });
                $scope.update = function () {
                    //console.log($scope.data);
                    $("div.overlay").addClass("show");
                    //return;
                    if ($.trim($scope.data.custName) === '' || $.trim($scope.data.address) === '' || $.trim($scope.data.orderId) === '' || $.trim($scope.data.orderDate) === '') {
                        $dialogAlert("\n Th??ng tin kh??ch h??ng kh??ng ???????c ????? tr???ng, vui l??ng nh???p ?????y ????? v?? th??? l???i", "L???i!", "warning");
                        $("div.overlay").removeClass("show");
                        return;
                    }
                    $http({
                        method: 'POST',
                        url: window.host_api + 'api/tiki/asu',
                        headers: {
                            'Authorization': "Bearer " + $window.localStorage.token
                        },
                        data: $scope.data
                    }).then(function (response) {
                        $("div.overlay").removeClass("show");
                        //console.log(response.data.data);
                        if (response.data.result > 0) {
                            $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "success", function (res) {
                                search();
                                $uibModalStack.dismissAll();
                            });

                        } else {
                            $dialogAlert("\n " + response.data.message, "Th??ng b??o!", "warning");
                        }

                    }, function (res) {
                        console.log(res);
                        $dialogAlert("\n " + res.data.message ? res.data.message : "L???i ???????ng truy???n, vui l??ng th???c hi???n l???i sau ??t ph??t", "Th??ng b??o!", "warning");
                    });
                }
            },
            controllerAs: $scope,
            size: 'xs',//size,   
            windowClass: 'your-modal-class',

        });


    };

    // paging
    // search theo date, search theo productName or productCode
    $scope.searchFilter = function () {
        $scope.page = 0;
        search();
    }
    // list order kes
    $scope.pageChanged = function () {
        $scope.page = $scope.bigCurrentPage - 1;
        search();
    };
    search();
    function search() {
        $scope.data = [];
        $scope.totalRow = 0;
        $http({
            method: 'GET',
            url: window.host_api + 'api/tiki/get?action=list&filter=' + ($scope.filter || '') + '&num=' + $scope.num + '&page=' + ($scope.page || '') + '&status=' + $scope.status,
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            }
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $scope.data = res.data.data.detail;
                $scope.bigTotalItems = res.data.data.total_row;
            } else {
                //$scope.textloading = "D??? li???u tr???ng.";
                $scope.textloading = res.data.message;
                //$dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
            }
        }, function err(e) {
            $rootScope.checkError(e, $dialogAlert);
        })
    }
    $scope.month_cur = new Date();
    $scope.month_ago = (new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()) + '/' + (new Date().getFullYear().toString().substr(-2));
});
app.controller('mdKYCmobile$Ctrl', function ($http, $scope, $uibModal, $rootScope, $state, $dialogConfirm, $dialogAlert, $stateParams, $uibModal, $window, $timeout) {
    //default states
    $scope.uid = $stateParams.id;
    $scope.selectRoles = [];
    $scope.selectedList = [];
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

    //show modal camera

    $scope.showCamera = function (clss) {
        var modal = $uibModal.open({

            backdrop: 'static',
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: window.templateUrl + "user/mdcamera.html",
            controller: function ($scope, $uibModalInstance, $sce) {
                $scope.modal = $uibModalInstance;

                $(document).ready(function () {
                    const width = 320; // We will scale the photo width to this
                    let height = 0; // This will be computed based on the input stream
                    let streaming = false;
                    let video = null;
                    let canvas = null;
                    let photo = null;
                    let startbutton = null;
                    video = document.getElementById("video");
                    canvas = document.getElementById("canvas");
                    photo = document.getElementById("photo");
                    startbutton = document.getElementById("startbutton");
                    // vars
                    let result = document.querySelector('.result'),
                        img_result = document.querySelector('.img-result'),
                        img_w = document.querySelector('.img-w'),
                        img_h = document.querySelector('.img-h'),
                        options = document.querySelector('.options'),
                        save = document.querySelector('.save'),
                        cropped = document.querySelector('.cropped'),
                        dwn = document.querySelector('.download'),
                        upload = document.querySelector('#file-input'),
                        cropper = '';
                    checkCamera();

                    function checkCamera() {
                        const streams = navigator.mediaDevices
                            .getUserMedia({ video: true, audio: false })
                            .then((stream) => {
                                window.localStream = stream;
                                video.srcObject = stream
                                video.play();
                            })
                            .catch((err) => {
                                console.error(`An error occurred: ${err}`);
                            });
                        video.addEventListener(
                            "canplay",
                            (ev) => {
                                if (!streaming) {
                                    height = video.videoHeight / (video.videoWidth / width);

                                    // Firefox currently has a bug where the height can't be read from
                                    // the video, so we will make assumptions if this happens.

                                    if (isNaN(height)) {
                                        height = width / (4 / 3);
                                    }

                                    video.setAttribute("width", width);
                                    video.setAttribute("height", height);
                                    canvas.setAttribute("width", width);
                                    canvas.setAttribute("height", height);
                                    streaming = true;
                                }
                            },
                            false
                        );

                        startbutton.addEventListener(
                            "click",
                            (ev) => {
                                takepicture();
                                ev.preventDefault();
                            },
                            false
                        );

                        clearphoto();
                    }
                    function clearphoto() {
                        const context = canvas.getContext("2d");
                        context.fillStyle = "#AAA";
                        context.fillRect(0, 0, canvas.width, canvas.height);

                        const data = canvas.toDataURL("image/png");
                        photo.setAttribute("src", data);
                    }

                    function takepicture() {
                        const context = canvas.getContext("2d");
                        if (width && height) {
                            canvas.width = width;
                            canvas.height = height;
                            context.drawImage(video, 0, 0, width, height);

                            const data = canvas.toDataURL("image/png");
                            photo.setAttribute("src", data);
                            // create new image
                            let img = document.createElement('img');
                            img.id = 'image';
                            img.src = data;
                            // clean result before
                            result.innerHTML = '';
                            // append new image
                            result.appendChild(img);
                            // show save btn and options
                            save.classList.remove('hide');
                            options.classList.remove('hide');
                            // init cropper
                            cropper = new Cropper(img);
                        } else {
                            clearphoto();
                        }

                    }
                    // save on click
                    save.addEventListener('click', (e) => {
                        e.preventDefault();
                        // get result to data uri
                        let imgSrc = cropper.getCroppedCanvas({
                            width: img_w.value // input value
                        }).toDataURL();
                        // remove hide class of img
                        cropped.classList.remove('hide');
                        img_result.classList.remove('hide');
                        // show image cropped
                        cropped.src = imgSrc;
                        dwn.classList.remove('hide');
                        dwn.download = 'imagename.png';
                        dwn.setAttribute('href', imgSrc);
                    });
                    $scope.takepicture = function () {
                        return takepicture();
                    }
                })

                $scope.modal.close = function () {
                    $uibModalInstance.dismiss(true);
                    var streams = video.srcObject;
                    streams.getTracks().forEach(function (track) {
                        if (track.readyState == 'live' && track.kind === 'video') {
                            track.stop();
                        }
                    });
                };
            },
            size: 'md',
        });

    }


    //api get list roles
    $http({
        method: 'GET',
        url: host_api + 'api/auth/get?action=roles',
        headers: {
            'Authorization': "Bearer " + $window.localStorage.token
        }
    }).then(function (res) {
        // console.log(res);
        if (res.data.result > 0) {
            $scope.selectRoles = res.data.data;
            //api get detail user follow id,refid
            $http({
                method: 'GET',
                url: host_api + 'api/auth/get?action=userbyid&userid=' + $scope.uid + '&refid=' + $scope.refid,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    var _data = res.data.data;
                    $scope.accountName = _data.username;
                    $scope.dataForm = {
                        FullName: _data.fullname,
                        Phone: _data.phone,
                        Sex: _data.sex.toString(),
                        Email: _data.email,
                        RefId: $scope.refid,
                        UserId: $scope.uid
                    }
                    console.log($scope.dataForm);
                    angular.forEach(_data.roles, function (val) {
                        angular.forEach($scope.selectRoles, function (item) {
                            if (val.code === item.code) {
                                $scope.selectedList[item.code] = true;
                            }
                        });

                    });

                }
            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }

    }, function err(e) {
        $rootScope.checkError(e, $dialogAlert);
    })

    /**
        * Action
        */
    $scope.submit = function () {
        var _rolle = []
        angular.forEach($scope.selectedList, function (selected, day) {
            if (selected) {
                //console.log(day);
                var role = parseInt(day);
                _rolle.push(role);
            }
        });
        $scope.dataForm.Roles = _rolle;
        console.log($scope.dataForm);
        setTimeout(function () {
            if (_rolle.length <= 0) {
                return false;
            }
            //api get list roles
            // return;
            $http({
                method: 'POST',
                url: host_api + 'api/auth/update',
                data: $scope.dataForm,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (res) {
                // console.log(res);
                if (res.data.result > 0) {
                    //console.log(res);
                    $dialogAlert("C???p nh???t t??i kho???n th??nh c??ng", "Th??ng b??o!", "success", function (res) {
                        $state.go("list$account");
                    });

                } else {
                    $dialogAlert("\n" + res.data.message, "Th??ng b??o!", "warning");
                }

            }, function err(e) {
                $rootScope.checkError(e, $dialogAlert);
            })
        }, 1000)
    };
});
