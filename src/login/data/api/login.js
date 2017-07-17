/**
 * Created by Joker on 2017/4/23.
 */
loginModule.factory('login.data.api.login', ['$q', 'httpUtil',
    function ($q, $$httpUtil) {
        var api10008 = function () {
            var obj = {};
            obj.url = 'http://kyt.jxt189.com/ydt/API/Login.ashx';
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
        };
        
        var o = {};
        o.api10008 = api10008;
        return o;
    }]);