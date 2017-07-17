/**
 * Created by Joker on 2017/4/23.
 */
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
        
        $q.when()
            .then(function () {
                return $$service.action.init();
            })
            .then(function (data) {
                console.info('login-indexController屏蔽登录接口请求');
                // return $$service.action.$login();
            });
    }]);

