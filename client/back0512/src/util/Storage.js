/**
 * Created by kenkozheng on 2014/12/4.
 */

var phoneImei = null;
var javaReturnPhoneImei = function(imei){
    phoneImei = imei;
    Storage.setImei(phoneImei);
}

var jsGetPhoneImei = function () {
    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","jsSetPortrait","(I)V",2);
}

var Storage = {

    getUserId: function(){
        var userId = cc.sys.localStorage.getItem("userId") || 0;
        return userId;
    },

    setUserId: function(userId){
        cc.sys.localStorage.setItem("userId",userId);
        return true;
    },

    getPassword: function(){
        var password = cc.sys.localStorage.getItem("password") || 0;
        return password;
    },

    setPassword: function(password){
        cc.sys.localStorage.setItem("password",password);
        return true;
    },



    getImei: function () {
        var imei  = cc.sys.localStorage.getItem("imei") || 0;
        //返回本机IMEI --待改造
        if(!imei){
            // imei = getBJimei(); //底层获取IMEI
            if(!!phoneImei){
                imei = phoneImei;
            }
        }
        return imei;
    },

    setImei:function(imei){
        cc.sys.localStorage.setItem("imei",imei);
        return true;
    }
};