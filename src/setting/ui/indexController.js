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