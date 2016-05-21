/**
 * Created by WTF Wei on 2016/3/25.
 * Function :
 */
//var gateHost       = "120.24.254.91";
var gateHost       = "172.17.255.57";
//var loginHost      = "120.24.254.91";
var loginHost       = "172.17.255.57";

var gatePort       = "3014";
var gateRouter     = "gate.gateHandler.queryEntry";
var entryRouter    = "connector.entryHandler.entry";


var loginPort      = "8210";
var loginRouter    = "login.loginHandler.login";
var registerRouter = "login.loginHandler.register";
var userUpdateRouter = "user.userHandler.updateInfo";
var userAddGoldRouter = "user.storeHandler.addGold";



var Servers = Servers || {};


Servers.getUpdateInfo = function(playerId,signature, gender, nickName,cb){
    pomelo.request(userUpdateRouter,{playerId:playerId,signature:signature,gender:gender,nickName:nickName},function(data){
        cb(data);
    });
}

Servers.getAddGold = function(playerId,gold,dianmond,cb){
    pomelo.request(userAddGoldRouter,{playerId:playerId,gold:gold,dianmond:diamond},function(data){
        cb(data);
    });
}

/**
 * login by userId and password
 * @param userId
 * @param password
 * @param cb
 */
Servers.getLogin = function(userId, password, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(loginRouter, {userId: userId, password: password}, function (data) {
            pomelo.disconnect();
            cb(data);
        });
    });
}

Servers.getRegister = function(imei, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(registerRouter, {imei: imei}, function (data) {
            cb(data);
        });
    });
}

/**
 *
 * @param token
 * @param cb
 */
Servers.getEntry = function(token,cb) {
    pomelo.init({
        host:gateHost,
        port:gatePort,
        log:true
    }, function () {
        console.log("init gate server ok");
        pomelo.request(gateRouter,{},function(data){
            //pomelo.disconnect();
            console.log("JSON.stringify ",JSON.stringify(data));
            var host = data.host;
            var port = data.port; //3110
            console.log(host,port+"  port");
            pomelo.init({
                host:host,
                port:port,
                log:true
            },function(){
                pomelo.request(entryRouter,{token:token},function(data){
                    cb(data);
                });
            });
        });
    });
}

Servers.getGateEntry = function(){
    pomelo.init({
        host:gateHost,
        port:gatePort,
        log:true
    }, function () {
        console.log("init getGateEntry ok");
        pomelo.request(gateRouter,function(data){
            console.log(JSON.stringify(data));
        });
    });
}