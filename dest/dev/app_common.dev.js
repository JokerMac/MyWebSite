/*! MyWebSite-1.0.0.concat.js 2017-07-16 */
var commonModule = angular.module('commonModule', []);

commonModule.factory('httpUtil', ['$http',
    function ($http) {
    debugger;
        var helper = {};
        helper.request = function (param) {
            return $http({
                method: 'post',
                url: param.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                // config:config
                // data: angular.toJson(obj),
                data: {
                    request: angular.toJson(param.request)
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            })
            .then(function (data) {
                debugger;
            })
            .catch(function (e) {
                debugger;
            });
        };
        return helper;
    }]);