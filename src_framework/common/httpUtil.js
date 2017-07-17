/**
 * Created by Joker on 2017/7/10.
 */
commonModule.factory('httpUtil', ['$http',
    function ($http) {
        var helper = {};
        helper.request = function (param) {
            return $http({
                method: 'post',
                url: param.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                // config:config
                // data: angular.toJson(obj),
                data: {
                    request: angular.toJson(param.request)
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {//这里的遍历可能有点问题，没有排除一些情况。
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            })
            .then(function (data) {
                console.log('httpUtil-success: ' + data);
            })
            .catch(function (e) {
                console.error('httpUtil-fail: ' + e);
            });
        };
        return helper;
    }]);