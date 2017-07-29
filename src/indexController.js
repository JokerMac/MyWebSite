/**
 * Created by Joker on 2017/7/16.
 */
var majorEntryModule = angular.module('majorEntryModule', []);
majorEntryModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('major-entry', {//状态名
        url: '/',//浏览器显示的地址
        templateUrl: 'src/index.html',//html的路径
        controller: 'majorEntryController'//控制器的名称
    });
}]);

majorEntryModule.controller('majorEntryController', ['$q', '$scope',
    function ($q, $scope) {
        $scope.urls = {
            settingUrl: 'src/setting/ui/index.html'
        };
    }]);