/*! MyWebSite-1.0.0.concat.js 2017-07-16 */
var myApp = angular.module('myApp', [
    'ionic',
    // 'angularFileUpload',
    // 'controlModule',
    'commonModule',
    'loginModule'
]);

//     .run('$q', function ($q) {
//     $q.when()
//         .then(function () {
//             console.log('this is run,it will be use someday~');
//         })
// });

myApp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.views.maxCache(0); //禁止页面缓存的两个方法之一，没有这一句的话，浏览器刷新可能会回到最原始的页面？
    $urlRouterProvider.otherwise('/login-index');
    
    // $stateProvider
    //     .state('login-index', {//状态名
    //         url: '/login-index',//浏览器显示的地址
    //         templateUrl: 'src/login/ui/index.html',//html的路径
    //         controller: 'loginIndexController'//控制器的名称
    //     });
    // .state('homePage-homePage', {
    //     url: '/homePage',
    //     templateUrl: 'src/login/ui/homePage/homePage.html',
    //     controller: 'loginHomePageController'
    // });
}).run(['$rootScope', function ($rootScope) {
    //*********************rem布局计算代码*********************************************
    (function (doc, win, undefined) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (clientWidth === undefined) {
                    return;
                }
                // docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
                docEl.style.fontSize = '16px';
            };
        if (doc.addEventListener === undefined) {
            return;
        }
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    //*********************rem布局计算代码*********************************************
    
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
        // // 如果用户未登录
        // if (!AuthService.userLoggedIn()) {
        //     if (next.templateUrl === "login.html") {
        //         // 已经转向登录路由因此无需重定向
        //     } else {
        //         $location.path('/login');
        //     }
        // }
    });
}]);

var globalModule = angular.module('globalModule', []);
globalModule.service('globalModule', ['$q',
    function ($q) {
        var o = {
            data: {},
            action: {}
        };
        o.data.hello = '2333';
        return o;
    }]);


// var controlModule = angular.module('controlModule', []);