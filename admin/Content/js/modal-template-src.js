var app = angular.module('modalCustom', ['ui.bootstrap']);
app.service('$modalTemplate', function ($http, $window, $uibModal, $dialogConfirm, $uibModalStack, $dialogAlert, $dialogShowForm) {
    var click = false;
    this.detail = function (dataInvoice) {
        if (!click) {
            click = true;
            $http({
                method: 'GET',
                url: window.host_api + 'api/common/get?action=kesdetail&subsInfoId=' + dataInvoice + '&type=onesme',
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (response) {
                //console.log(response.data.data);
                if (response.data.result > 0) {
                    var dataInvoice = response.data.data;
                    var _keys = Object.keys(dataInvoice);
                    var _table = $("<tbody></tbody>");
                    //render auto html of data json and data api
                    _keys.forEach(function (val) {
                        if (window.dataJson[val]) {
                            //header name object
                            _table.append(`<tr style="cursor: pointer;" class="panel-info list-group-item-info" ng-click="toggleTr('${window.dataJson[val].tr_header.css}')" id="id_${window.dataJson[val].tr_header.css}"><td colspan="2"><strong>${window.dataJson[val].tr_header.name}</strong><i class="icon-submenu lnr lnr-chevron-down" style="margin-left:15px;font-size:12px;"></i></td></tr>`);

                            // sort by id datajson
                            var _e = Object.entries(window.dataJson[val]).sort((a, b) => {
                                return a[1].id - b[1].id;
                            });
                            _e.forEach(function (value) {
                                var _name = (dataInvoice[val][value[0]] == undefined) ? '' : dataInvoice[val][value[0]];
                                if (value[1].type) {
                                    //value of object
                                    if (typeof (dataInvoice[val][value[0]]) === 'object') {
                                        _table.append(`<tr class="${window.dataJson[val].tr_header.css}"><td style='width:150px'>${value[1].name}</td><td>${dataInvoice[val][value[0]].name}</td></tr>`);
                                    }
                                    else {
                                        _table.append(`<tr class="${window.dataJson[val].tr_header.css}"><td style='width:150px'>${value[1].name}</td><td>${_name}</td></tr>`);
                                    }
                                }
                            });
                        }
                    });

                    var modal = $uibModal.open({
                        animation: 1000,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<div class="modal-header label-primary" style="position:relative">\
                                <h4 class ="modal-title" style="color:#fff" >Thông tin đơn hàng </h4>\
                                </div>\
                                <div ng-hide="flag" class="text-center"><p>Đang tải dữ liệu</p></div>
                                <div style="max-height:500px;overflow-y:scroll" id="print" ng-show="flag">
                                    <h2 class="live-print" style="display:none">Thông tin đơn hàng </h2>

                                    <table class ="table table-bordered table-hover" style="width:100%;">
                                            ${_table.prop('outerHTML')}
                                    </table>

                                </div>
                                <div class ="modal-footer">\
                                    <button class ="btn btn-default" ng-click="cancel()" data-dismiss="modal" type="button"  >Đóng</button>\
                                </div>`,
                        controller: function ($scope, $uibModalInstance, $timeout) {
                            click = false;
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                                return;
                            };
                            $scope.flag = false;
                            $timeout(function () {
                                $scope.flag = true;
                            }, 1000);
                            $scope.toggleTr = function (id) {
                                $(`.${id}`).fadeToggle();
                                var _class = $("#id_" + id + " i");
                                if (_class.hasClass('lnr-chevron-down')) {
                                    _class.removeClass('lnr-chevron-down').addClass('lnr-chevron-up')
                                } else {
                                    _class.addClass('lnr-chevron-down').removeClass('lnr-chevron-up')
                                }
                            }

                        },
                        size: 'xs',//size,   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    $dialogAlert("\n " + response.data.message, "Thông báo!", "warning");
                }

            }, function (res) {
                console.log(res);
                $dialogAlert("\n " + res.data.message ? res.data.message : "Lỗi đường truyền, vui lòng thực hiện lại sau ít phút", "Thông báo!", "warning");
            });

        }
    }
    var clicked = false;
    this.form = function (option, callback) {
        if (!clicked) {
            clicked = true;
            $http({
                method: 'GET',
                url: window.host_api + 'api/onesme?action=param&module=' + option.module + '&type=' + option.type + '&id=' + option.id,
                headers: {
                    'Authorization': "Bearer " + $window.localStorage.token
                }
            }).then(function (response) {
                //console.log(response.data.data);
                if (response.data.result > 0) {
                    var dataInvoice = response.data.data;
                    //var _keys = Object.keys(dataInvoice);                        
                    var form_data = $("<tbody></tbody>");
                    //render auto html of data json and data api
                    dataInvoice.forEach(function (val) {
                        // sort by id datajson
                        //var _e = Object.entries(window.dataJson[val]).sort((a, b) => {
                        //    return a[1].id - b[1].id;
                        //});
                        form_data.append(`<tr class="panel-info list-group-item-info"><td colspan="2"><strong>${val.name}</strong></td></tr>`);
                        //console.log(_e)
                        val.detail.forEach(function (value) {
                            switch (value.type) {
                                case "input":
                                    form_data.append(`<tr><td style='width:150px'>${value.display} <span style="${value.is_get_info ? 'color:red' : 'display:none'}">*</span></td><td>
                                             <div class="form-group">
                                                    <input type="text"  class ="form-control " placeholder="${(value.css_value.indexOf('date') >= 0) ? 'dd/mm/yyyy' : 'Nhập ' + value.display.toLowerCase()}" data-bv-message='Vui lòng nhập ${value.display.toLowerCase()}' value="${value.value != '' ? value.value : ''}" ${value.value != '' ? 'ereadonly' : ''}  name='${val.code}.${value.name}' ${value.is_get_info ? 'required' : ''} ${(value.css_value.indexOf('date') >= 0) ? 'ui-date' : ''} ${(value.css_value.indexOf('date') >= 0) ? `ng-model=${value.name}` : ''}   >
                                                </div>
                                            </div>
                                            </td></tr>`);
                                    break;
                                case "select":
                                    var _otp = $(`<select class="form-control selectContainer" id="selectedrq" name="${val.code}.${value.name}" ></select>`);
                                    value.type_value.forEach(function (item) {
                                        _otp.append(`<option value='${item.code}' ${value.value == item.code ? 'selected' : ''}>${item.value}</option>`)
                                    })
                                    form_data.append(`<tr><td style='width:150px'>${value.display}</td><td>
                                              <div class ="form-group">${_otp.prop('outerHTML')}</div>
                                            </td></tr>`);
                                    break;
                                default:
                                    return;
                                    // code block
                            }


                        });

                    });
                    var modal = $uibModal.open({
                        animation: false,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        template: `<form id='formdataProduct'><div class="modal-header label-primary" style="position:relative">\
                                    <h4 class ="modal-title" style="color:#fff" >${option.title}</h4>\
                                    </div>\
                                    <div ng-hide="flag" class="text-center"><p>Đang tải dữ liệu</p></div>
                                    <div style="max-height:500px;overflow-y:scroll" id="print" ng-show="flag">
                                        <h2 class="live-print" style="display:none">Thông tin đơn hàng </h2>

                                        <table class="table table-bordered table-hover" style="width:100%;">
                                             ${form_data.prop('outerHTML')}
                                        </table>
                                    </div>
                                    <div class ="modal-footer">\
                                        <button ng-show="flag" class ="btn btn-primary" type="submit">Cập nhật</button>\
                                        <button class ="btn btn-dask" ng-click="cancel()" data-dismiss="modal" type="button" >Đóng</button>\
                                    </div> </form>`,
                        controller: function ($scope, $uibModalInstance, $timeout) {
                            clicked = false;
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                                return;
                            };
                            $scope.flag = false;
                            $timeout(function () {
                                $scope.flag = true;
                                $(document).ready(function () {
                                    //$('.select_promotion').select2({
                                    //    placeholder: {
                                    //        id: '-1', // the value of the option
                                    //        text: 'Chọn ít nhất 1 sản phẩm'
                                    //    }
                                    //});

                                    $('#formdataProduct')
                                    .bootstrapValidator({
                                        excluded: ':disabled',
                                        feedbackIcons: {
                                            valid: 'glyphicon glyphicon-ok',
                                            invalid: 'glyphicon glyphicon-remove',
                                            validating: 'glyphicon glyphicon-refresh'
                                        },
                                        fields: {
                                            "comp.city": {
                                                validators: {
                                                    notEmpty: {
                                                        message: 'Vui lòng chọn một tỉnh/thành phố'
                                                    },
                                                    callback: {
                                                        message: 'Vui lòng chọn một tỉnh/thành phố',
                                                        callback: function (value, validator) {
                                                            value = parseInt(value);
                                                            if (value > 0) {
                                                                validator.updateStatus('comp.city', 'VALID');
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
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
                                        var data = $('#formdataProduct').serializeArray();
                                        data = serializeObject(data);
                                        //convert from object data to object of object
                                        Object.keys(data).filter(key => key.indexOf(".") >= 0).forEach(key => {
                                            const combined = key.split(/\./);
                                            const parent = combined[0];
                                            const child = combined[1];
                                            if (!data[parent]) data[parent] = {};

                                            data[parent][child] = data[key];
                                            delete data[key];
                                        });

                                        //console.log(data);
                                        var _ck = updateData(data, option.module, option.id, option.refid, function (res) {
                                            if (res) return callback();
                                        });
                                        //postData();
                                        //if (_ck) return callback();
                                    });

                                })
                            }, 1000);

                        },
                        size: 'xs',//size,   
                        windowClass: 'your-modal-class',

                    });
                } else {
                    clicked = false;
                    $dialogAlert("\n " + response.data.message, "Thông báo!", "warning");
                }

            }, function (res) {
                console.log(res);
                $dialogAlert("\n " + res.data.message ? res.data.message : "Lỗi đường truyền, vui lòng thực hiện lại sau ít phút", "Thông báo!", "warning");
            });
        }
    };
    function updateData(obj, module, id, refid, callback) {
        obj.subsId = id;
        obj.refId = refid;
        $http({
            method: 'POST',
            url: window.host_api + 'api/onesme/confirm',
            headers: {
                'Authorization': "Bearer " + $window.localStorage.token
            },
            data: obj
        }).then(function (res) {
            //console.log(res)                  
            if (res.data.result > 0) {
                $dialogAlert("\n" + res.data.message, "Thông báo!", "success", function (res) {
                    //search();
                    $uibModalStack.dismissAll();
                    callback(true)
                });
            } else {
                //$scope.textloading = "Dữ liệu trống.";
                callback(false);
                $scope.textloading = res.data.message;
                $dialogAlert("\n" + res.data.message, "Thông báo!", "warning");
            }
        }, function err(e) {
            callback(false);
            $rootScope.checkError(e, $dialogAlert);
        })
    }
    function serializeObject(obj) {
        var jsn = {};
        $.each(obj, function () {
            if (jsn[this.name]) {
                if (!jsn[this.name].push) {
                    jsn[this.name] = [jsn[this.name]];
                }
                jsn[this.name].push(this.value || '');
            } else {
                jsn[this.name] = this.value || '';
            }
        });
        return jsn;
    };
})
