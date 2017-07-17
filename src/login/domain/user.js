/**
 * Created by Joker on 2017/5/6.
 */
loginModule.factory('login.domain.user', ['login.data.api.login', '$q',
    function ($$login, $q) {
        var fn = (function () {
            function user() {
                this.realName = '';
                this.age = '';
            }
            
            user.prototype.$login = function () {
                return $$login.api10008()
                    .then(function (data) {
                        return data;
                    });
            };
            
            return user;
        })();
        return fn;
    }]);