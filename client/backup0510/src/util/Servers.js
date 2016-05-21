/**
 * Created by WTF Wei on 2016/3/25.
 * Function :
 */
var gateHost       = "172.17.255.57";
//var gateHost       = "127.0.0.1";
//var loginHost      = "120.24.254.91";
var loginHost      = "172.17.255.57";
//var loginHost       = "127.0.0.1";

//var gateHost       = "10.16.20.251";
//var loginHost       = "10.16.20.251";

var gatePort       = "3014";
var gateRouter     = "gate.gateHandler.queryEntry";
var entryRouter    = "connector.entryHandler.entry";


var loginPort      = "8210";
var loginRouter    = "login.loginHandler.login"; //用户登录
var registerRouter = "login.loginHandler.register"; //注册新用户
var userUpdateRouter = "user.userHandler.updateInfo"; //更新用户信息
var userAddGoldRouter = "user.storeHandler.addGold"; //增加金币
var userUpdateAccount = 'user.userHandler.updateAccount';//更改用户名

var getPlayerInfo = 'user.userHandler.getPlayerInfo'; //获取其他用户的信息

var userPresents = 'user.userHandler.presents'; //送礼物 //未完待续
var storeBuyGift = 'user.storeHandler.buyGift';  //买礼物
var storeBuyEquip = "user.storeHandler.buyEquip"; //买道具
var storeBuyDiamond = 'user.storeHandler.buyDiamond'; //充值钻石
var storeGetData = 'user.storeHandler.getStoreData';  //获取商店数据

var storeBuyRouter = 'user.storeHandler.buy';

var feedbackRouter = 'user.userHandler.feedback';

var timeingRewardRouter = 'user.taskHandler.timingReward';

var serverTime = 'user.taskHandler.serverTime';



var Servers = Servers || {};


/**
 * 完善用户名和密码
 * @param userId
 * @param userName
 * @param password
 * @param cb
 */
Servers.updateAccount = function(userId,userName,password,cb){
    pomelo.request(userUpdateAccount,{userId:userId,userName:userName,password:password},function(data){
        cb(data);
    });
};

/**
 * 购买钻石
 * @param playerId
 * @param number 购买数量
 * @param cb
 */
Servers.buyDiamond = function(playerId,number,cb){
    pomelo.request(storeBuyDiamond,{playerId:playerId,number:number},function(data){
        cb(data);
    });
};

/***
 * 获取其他用户信息
 * @param playerId
 * @param cb
 */
Servers.getPlayerInfo = function(playerId,cb){
    pomelo.request(getPlayerInfo,{playerId:playerId},function(data){
        cb(data);
    });
};



/**
 *
 * @param playerId 购买的用户
 * @param equip =3 购买翻倍 =2 购买换牌卡 =1 购买金币卡
 * @param number 购买的数量
 * @param cb 返回data.code ==200 操作成功
 * @constructor
 */
Servers.storeBuyEquip = function(playerId,equip,number,cb){
    pomelo.request(storeBuyEquip,{playerId:playerId,equip:equip,number:number},function(data){
        cb(data);
    });
};

/**
 * 购买金币
 * @param playerId
 * @param number
 * @param cb
 */
Servers.buyGold = function(playerId,number,cb){
    pomelo.request(storeBuyGold,{playerId:playerId,number:number},function(data){
       cb(data);
    });
};

/**
 *  用户from送礼给用户to
 * @param from
 * @param to
 * @param gift 礼物类型 1=gitf01 2=gitf02 3=gitf03 4=gitf04 5=gitf05
 * @param number 礼物数量
 * @param cb
 */
Servers.presents = function(from,to,gift,number,cb){
    pomelo.request(userPresents,{from:from,to:to,number:number},function(data){
        cb(data);
    });
};

/**
 * 购买礼物
 * @param playerId 用户Id
 * @param gift 礼物类型 1=gitf01 2=gitf02 3=gitf03 4=gitf04 5=gitf05
 * @param number 礼物数量
 * @param cb
 */
Servers.buyGift = function(playerId,gift,number,cb){
    pomelo.request(storeBuyGift,{playerId:playerId,gift:gift,number:number},function(data){
        cb(data);
    });
};
/**
 * 更新用户信息
 * @param playerId
 * @param signature
 * @param gender
 * @param nickName
 * @param cb
 */
Servers.getUpdateInfo = function(playerId,signature, gender, nickName,cb){
    pomelo.request(userUpdateRouter,{playerId:playerId,signature:signature,gender:gender,nickName:nickName},function(data){
        cb(data);
    });
};

/**
 * 使用钻石购买金币
 * @param playerId
 * @param gold
 * @param dianmond
 * @param cb
 */
Servers.getAddGold = function(playerId,gold,diamond,cb){
    pomelo.request(userAddGoldRouter,{playerId:playerId,gold:gold,diamond:diamond},function(data){
        cb(data);
    });
};

/**
 * login by userId and password
 * @param userId
 * @param password
 * @param cb 登录成功返回code=200  加密token信息
 */
Servers.getLogin = function(userId, password, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(loginRouter, {userId: userId, password: password}, function (data) {
            //pomelo.disconnect();
            cb(data);
        });
    });
};

/**
 * 用户注册
 * @param imei
 * @param cb 注册成功返回code=200，加密token
 */
Servers.getRegister = function(imei, cb) {
    pomelo.init({
        host: loginHost,
        port: loginPort
    }, function () {
        pomelo.request(registerRouter, {imei: imei}, function (data) {
            cb(data);
        });
    });
};

/**
 * 连接主服务器
 * @param token
 * @param cb 成功code=200 返回玩家数据
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
};

/**
 * 请求路由服务器
 */
Servers.getGateEntry = function(cb){ pomelo.init({
        host:gateHost,
        port:gatePort,
        log:true
    }, function () {
        console.log("init getGateEntry ok");
        pomelo.request(gateRouter,function(data){
            console.log(JSON.stringify(data));
            cb(data);
        });
    });
};


/**
 * 获取商城信息
 */
Servers.getStore = function(cb){
    pomelo.request(storeGetData,{},function(data){
        cb(data);
    });
};

/**
 * 购买商品
 * @param playerId
 * @param tag 商品标签
 * @param cb 返回用户数据 包括 购买后发生的变化
 */
Servers.storeBuy = function(playerId,tag,cb){
    pomelo.request(storeBuyRouter,{playerId:playerId,tag:tag},function(data){
        cb(data);
    });
};

/**
 * 问题反馈
 * @param playerId
 * @param title 标题
 * @param content 内容
 * @param cb code = 200
 */
Servers.feedback = function(playerId,title,content,cb){
    pomelo.request(feedbackRouter,{playerId:playerId,title:title,content:content},function(data){
        cb(data);
    });
};

/**
 * 定时在线奖励
 * @param playerId
 * @param flag 时间段标识 3 2 1 0
 * @constructor
 */
Servers.timingReward = function(playerId,flag,cb){
    pomelo.request(timeingRewardRouter,{playerId:playerId,flag:flag},function(data){
        cb(data);
    });
};

/**
 * 获取服务器时间
 * @param cb
 */
Servers.getServerTime = function(cb){
    pomelo.request('user.taskHandler.serverTime',{},function(data){
        cb(data);
    });
};

var vipRewardRouter = 'user.taskHandler.eventVipReward';
/**
 *
 * @param playerId
 * @param vip vip等级
 * @param cb  返回金币数
 */
Servers.vipReward = function (playerId,vip,cb) {
    pomelo.request(vipRewardRouter,{playerId:playerId,vip:vip},function(data){
        cb(data);
    });
};

var storeItemRouter = 'user.storeHandler.getStoreItem';
/**
 * now for获取vip等级信息
 * @param itemId   = 201~208
 * @param cb
 */
Servers.getStoreItem = function (itemId,cb){
    pomelo.request(storeItemRouter,{itemId:itemId},function (data) {
        cb(data);
    });
};

var eventTreeExtractRouter = 'user.taskHandler.eventTreeExtract';
/**
 * 领取金币  tree加到gold里
 * @param playerId
 * @param cb
 */
Servers.eventTreeExtract = function (playerId,cb) {
    pomelo.request(eventTreeExtractRouter,{playerId:playerId},function (data) {
        cb(data);
    });
};

var eventTreeGetTreeRouter = 'user.taskHandler.getTree';
/**
 * 获取摇钱树可领取金额
 * @param playerId
 * @param cb
 */
Servers.getTree = function (playerId,cb) {
    pomelo.request(eventTreeGetTreeRouter,{playerId:playerId},function (data) {
        cb(data);
    });
};

var finishTaskRouter = 'user.taskHandler.finishTask';
/**
 * 完成任务获取奖励
 * @param playerId
 * @param flag
 * @param cb 返回奖励之后的gold
 */
Servers.finishTask = function (playerId,flag,cb) {
    pomelo.request(finishTaskRouter,{playerId:playerId,flag:flag},function(data){
        cb(data);
    });
};