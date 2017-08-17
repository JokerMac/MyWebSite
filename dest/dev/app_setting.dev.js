/*! MyWebSite-1.0.0.concat.js 2017-08-17 */
var settingModule = angular.module('settingModule', []);

settingModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('setting-changeSkin-index', {//状态名
        url: '/setting-changeSkin-index',//浏览器显示的地址
        templateUrl: 'src/setting/ui/changeSkin/index.html',//html的路径
        controller: 'settingChangeSkinIndexController'//控制器的名称
    });
}]);

settingModule.controller('settingChangeSkinIndexController', ['$scope', 'global',
    function ($scope, $$global) {
        $scope.chooseSkin = function (skinName) {
            // debugger;
            var skinHref = $$global.skin[skinName];
            $('#app-skin').attr('href', skinHref);
    
            // $('#app-skin-red').attr('rel', 'stylesheet');
        };
    }]);

settingModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('setting-index', {//状态名
        url: '/setting-index',//浏览器显示的地址
        templateUrl: 'src/setting/ui/index.html',//html的路径
        controller: 'settingIndexController'//控制器的名称
    });
}]);

settingModule.controller('settingIndexController', ['$scope', 'global',
    function ($scope, $$global) {
        $scope.urls = {
            changeSkinUrl: 'src/setting/ui/changeSkin/index.html',
        };
    }]);