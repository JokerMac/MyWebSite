/*! MyWebSite-1.0.0.concat.js 2017-07-16 */
var loginModule = angular.module('loginModule', ['commonModule']);

loginModule.factory('login.data.api.login', ['$q', 'httpUtil',
    function ($q, $$httpUtil) {
        // console.log('login.data.api.login');
        var api10301 = function () {
            // return $q.resolve('api10301 from api');
            // var url = 'http://kyt.jxt189.com/ydt/API/Action.ashx';
            // var url = 'http://kyt.jxt189.com/ydt/API/Action.ashx';
            var obj = {};
            // obj.CMD = 10201;
            // obj.AppUserId = '635609040216095894';
            // obj.sessionId = '{ba4fd513-24e1-4343-920d-61cc40a5bb06}';
      
            obj.url='http://kyt.jxt189.com/ydt/API/Login.ashx';
            obj.request = {};
            obj.request.CMD = 10008;
            obj.request.Account = '17099999901';
            obj.request.Password = 'ydt123';
            obj.request.LoginType = '3';
            obj.request.IsConfirm = false;
            obj.request.ConfirmType = 3;
            obj.request.ConfirmAppUserId = 0;
            obj.request.LoginArea = '';
            obj.request.ClientMachineNo = '';
            obj.request.ClientModel = '_';
            obj.request.ClientSystem = 100;
            obj.request.ConfirmUser = {'PlatformKey': '', 'UserId': ''};
            obj.request.ClientVersion = '';
            
            return $$httpUtil.request(obj);
            
            // var config = {
            //     'Accept': 'application/json, text/plain, */*',
            // Accept-Encoding:'gzip, deflate',
            // Accept-Language:'zh-CN,zh;q=0.8,en;q=0.6',
            // Cache-Control:'no-cache',
            //     Connection:'keep-alive',
            // Content-Length:'84',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // Cookie:'ASP.NET_SessionId=q4wnsi55qiab5t55sxa1wzvc; {ABA4BB58-E330-4bb0-8255-BB4A56933B31}_auth=B13B9AFAF108A31CB65F3BB5E7D76AFAF5B211ACC27363C397AE3E8051BADBFB6AB3364A2A9A0F5C13FDEDC08C91ED531BDC309E948580C84C3FDC8AC95ECF0907273B443BD05AF08A804D3CED704A68EE528E6A40F2250F3EEC5ADD3FDA138A45FBA212BC866645F54BC44BD0EBBB08C308B8E803F0D808C55C64DF180260CBCBF44B541909845ABFEF3A584E7500EF809EC7F8F7D529E423ACB38FFE77A4F68DCEE7C18CB5FF9E93E52BA25262C974A16BCBFD',
            // 'Pragma': 'no-cache'
            // };
            
            // return $http({
            //     method: 'post',
            //     url: url,
            //     // config:config
            //     // data: angular.toJson(obj),
            //     data: {
            //         request: angular.toJson(obj)
            //     },
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            //     },
            //     transformRequest: function (obj) {
            //         var str = [];
            //         for (var p in obj) {
            //             str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            //         }
            //         return str.join('&');
            //     }
            // })
            //     .then(function (data) {
            //         debugger;
            //     })
            //     .catch(function (e) {
            //         debugger;
            //     });
        };
        
        var o = {};
        o.api10301 = api10301;
        return o;
    }]);

loginModule.factory('login.domain.user', ['login.data.api.login', '$q',
    function ($$login, $q) {
        var fn = (function () {
            function user() {
                this.realName = '';
                this.age = '';
            }
            
            user.prototype.$getProductList = function () {
                // return $q.when()
                //     .then(function () {
                //         return $$login.api10301();
                //     })
                return $$login.api10301()
                    .then(function (data) {
                        return data;
                    });
            };
            
            return user;
        })();
        return fn;
    }]);

loginModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login-index', {//状态名
        url: '/login-index',//浏览器显示的地址
        templateUrl: 'src/login/ui/index.html',//html的路径
        controller: 'loginIndexController'//控制器的名称
    });
}]);

loginModule.controller('loginIndexController', ['loginIndexService', '$q', '$scope',
    function ($$service, $q, $scope) {
        $scope.data = $$service.data;
        $scope.test = '测试成功233';
        
        $q.when()
            .then(function () {
                return $$service.action.init();
            })
            .then(function (data) {
                return $$service.action.$getProductList();
            });
    }]);



loginModule.service('loginIndexService', ['login.domain.user', '$q',
    function ($$user, $q) {
        var o = {
            data: {
                user: null
            },
            action: {}
        };
        
        o.action.init = function () {
            if (!o.data.user) {
                o.data.user = new $$user();
            }
        };
        
        o.action.$getProductList = function () {
            return o.data.user.$getProductList()
                .then(function (data) {
                    debugger;
                });
        };
        return o;
    }]);