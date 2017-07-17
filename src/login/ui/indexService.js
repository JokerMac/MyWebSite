/**
 * Created by Joker on 2017/5/5.
 */
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
        
        o.action.$login = function () {
            return o.data.user.$login()
                .then(function (data) {
                    console.log(data);
                });
        };
        return o;
    }]);