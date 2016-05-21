/**
 * Created by MQN on 2016/3/15.
 */

var LOADINGBARPRONUM = 1;

var LOADINGBAR_TAG = 99912;

var LOADINGBARPROALLNUM = 0;

var finishTag = 0;

var GameFrameCache = function () {
    this.flag = 0;
};

//异步加载资源
GameFrameCache.setAllCache = function (obj, objcallback) {

    //异步加载所有游戏资源
    var texCache = cc.textureCache;
    //遍历所有的资源
    var resList = res;
    var allNum  = 0;
    for (var key = 0 in resList) {
        //Mlog.c("reslist key"+key+"value:"+reslist[key]);
        //console.log("resList key" + key + "value:" + resList[key]);
        allNum++;
    }

    LOADINGBARPROALLNUM = allNum;
    //Mlog.c("LOADINGBARPROALLNUM>>",LOADINGBARPROALLNUM);
    console.log("LOADINGBARPROALLNUM>>", LOADINGBARPROALLNUM);

    //var readnum = 0;
    for (var key = 0 in resList) {
        //开始装载
        texCache.addImageAsync(resList[key], objcallback, obj);
    }
};

//资源加载层
var LoadGameLayer = cc.Layer.extend({
    perNum: null,
    percent: null,

    ctor: function () {

        this._super();
        //初始化进度条
        this.initLoadingBar(this);
        console.log("-----loadgame 51----");

        //Servers.getServerTime(function(data){
        //    console.log("getServerTime>>" + JSON.stringify(data));
        //    var timeString = data.time;
        //    console.log("timeString>>" + timeString);
        //    var serverTime = new Date(timeString);
        //
        //    //var dateNow = this.serverTime.getFullYear() +":"+ this.serverTime.getMonth() +":"+ this.serverTime.getDate();
        //    var yyyy = serverTime.getFullYear();
        //    var mm = serverTime.getMonth() + 1;
        //    var dd = serverTime.getDate();
        //    mm = mm<10?"0"+mm:mm;
        //    dd = dd<10?"0"+dd:dd;
        //    dateNow = yyyy + "-" + mm + "-" + dd;
        //    console.log("dateNow111>>" + dateNow);
        //
        //});

        //实时更新百分比
        this.scheduleUpdate();

        //进行异步加载，绑定更新进度条的方法setLoadingBar
        GameFrameCache.setAllCache(this, this.setLoadingBar);

        //蓝色背景
        var loadBg = new cc.Sprite(res.LoadBg_png);
        loadBg.x = 640;
        loadBg.y = 360;
        this.addChild(loadBg, 1);

        //美女头像
        var loadGirl = new cc.Sprite(res.LoadGirl_png);
        loadGirl.x = 640;
        loadGirl.y = 360;
        this.addChild(loadGirl, 3);

        //光效
        var loadLight = new cc.Sprite(res.LoadLight_png);
        loadLight.x = 640;
        loadLight.y = 360;
        this.addChild(loadLight, 2);

        //显示资源加载百分比
        //var loadingBar = this.getChildByTag(LOADINGBAR_TAG);
        this.percent   = new cc.LabelTTF(this.perNum + " %", "Arial", 30);
        this.percent.x = 640;
        this.percent.y = 100;
        this.addChild(this.percent, 2);

        //setTimeout(function(){
        //    console.log("playerId333>>" + playerId);
        //},500);

    },

    update: function (dt) {
        this.percent.setString(this.perNum + " %");
    },

    //加载用户信息  new  ---weitufei
    loadUserInfo2: function () {
        var self = this;
        console.log("loadUserInfo2()");
        //var userId   = Storage.getUserId();//9;//Storage.getUserId();
        var userId   = 9;//Storage.getUserId();
        var password = Storage.getPassword();//"password";//Storage.getPassword();
        console.log("userId:password " + userId + ":" + password);
        var imei     = Storage.getImei();
        if (imei == 0) {
            imei = "imei7";
        }
        if (!!userId && !!password) {
            Servers.getLogin(userId, password, function (data) {
                console.log(JSON.stringify(data));
                console.log("getLogin by userId password----------");
                console.log("Servers.getLogin---dis");
                //pomelo.disconnect();

                //Storage.setUserId(userId);
                //Storage.setPassword(password);

                var token = data.token;
                Servers.getEntry(token,function(data){
                    //console.log(JSON.stringify(data));
                    self.saveUserInfo(data);
                    //Storage.setUserId(data.user.userId);
                    //Storage.setPassword(data.user.password);
                });
            });
        } else if (!!imei) {
            Servers.getRegister(imei, function (data) {
                console.log(JSON.stringify(data));
                console.log("getRegister by imei=================");
                console.log("Servers.getRegister");
                //pomelo.disconnect();
                var token = data.token;
                Servers.getEntry(token,function(data){
                    console.log(JSON.stringify(data));
                    self.saveUserInfo(data);
                });
            });
        } else {
            console.log("load user infolmation failed !!");
        }

    },

    //保存用户信息
    saveUserInfo:function(data){
        console.log("saveUserInfo");

        playerId = data.initdata.player.playerId;
        nickName = data.initdata.player.nickName;
        userId = data.initdata.player.userId;
        password = data.initdata.player.password;
        userName = data.initdata.player.userName;
        gender = data.initdata.player.gender;
        signature = data.initdata.player.signature;
        level = data.initdata.player.level;
        vip = data.initdata.player.vip;
        coin = data.initdata.player.gold;
        diamond = data.initdata.player.diamond;
        //forbidCard = data.initdata.player.jinBiKa;
        forbidCard = JSON.stringify(data.initdata.player.jinBiKa);
        //exchangeCard = data.initdata.player.huanPaiKa;
        exchangeCard = JSON.stringify(data.initdata.player.huanPaiKa);
        //doubleCard = data.initdata.player.fanBeiKa;
        doubleCard = JSON.stringify(data.initdata.player.fanBeiKa);
        continueLoginDaysNew = data.initdata.player.continueLoginDays;
        giftCandy = data.initdata.player.gift01;
        giftRing = data.initdata.player.gift02;
        giftCar = data.initdata.player.gift03;
        giftHouse = data.initdata.player.gift04;
        giftPlane = data.initdata.player.gift05;
        recharge = data.initdata.player.recharge;
        playTimes =  data.initdata.player.playTimes;
        winTimes =  data.initdata.player.winTimes;
        loseTimes =  data.initdata.player.loseTimes;
        winRate =  data.initdata.player.rate;
        everydayPlay = data.initdata.task.playTimes;
        everydayWin = data.initdata.task.winTimes;
        everydayExchange = data.initdata.task.useHuanpaika;
        everydayAllIn = data.initdata.task.allInTimes;
        everydayLoginTimes = data.initdata.task.loginTimes;
        Storage.setUserId(userId);
        Storage.setPassword(password);
        this.intoHall();
    },
    //跳转页面
    intoHall:function(){
        //if( finishTag == 1){
        //    console.log("intoHall");
        //    cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
        //}
        cc.director.runScene(new cc.TransitionFade(1, new MainScene()));

    },

    //进度条的加载
    initLoadingBar: function (sp_loading) {

        ////加载用户信息
        //this.loadUserInfo2();
        console.log("teststart ---- ");
        //Servers.getGateEntry();
        //console.log("testend ---- ");
        //加载Loading条
        var sp_loadingtiao = new cc.Sprite(res.UILoadingBd_png);
        sp_loadingtiao.attr({
            x: sp_loading.getContentSize().width / 2,
            y: sp_loading.getContentSize().height / 2 - 300,
            scale: 1,
            rotation: 0
        });
        sp_loading.addChild(sp_loadingtiao, 2);
        //var loadingBar = new ccui.LoadingBar(res.UILOADINGBAR_png);
        var loadingBar = new cc.ProgressTimer(new cc.Sprite(res.UILoadingBar_png));
        loadingBar.setType(cc.ProgressTimer.TYPE_BAR);
        loadingBar.setMidpoint(cc.p(0, 0.5));       //设置进度条的起始点
        loadingBar.setBarChangeRate(cc.p(1, 0));     //设置进度条动画方向
        loadingBar.x = sp_loading.getContentSize().width / 2;
        loadingBar.y = sp_loading.getContentSize().height / 2 - 300;
        sp_loading.addChild(loadingBar, 3, LOADINGBAR_TAG);
        loadingBar.setPercentage(0);
        //loadingBar.percentage = 0;


    },

    //资源loading buffer进度回调
    setLoadingBar:function () {

        this.perNum    = parseInt(LOADINGBARPRONUM / LOADINGBARPROALLNUM * 100);

        //console.log("preNum: " + this.perNum);
        LOADINGBARPRONUM++;
        var loadingBar = this.getChildByTag(LOADINGBAR_TAG);
        //if(loadingBar!=null)
        //{
        loadingBar.percentage = this.perNum;
        //console.log("loadingBar: " + loadingBar.percentage);
        //}
        //进度条加载完毕进行跳转
        if (this.perNum == 100) {
            //loadingBar.percentage = 80;
            finishTag = 1;
            //加载完毕
            console.log("加载完毕 finishTag: " + finishTag);
            //加载用户信息
            this.loadUserInfo2();
            //console.log("playerId5555>>" + playerId);
            //cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
            //setTimeout(function(){
            //    cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
            //}, 500)

        }

    }

});

//资源加载场景
var LoadGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        console.log("hhhhhhhhhhhhhh");
        var layer = new LoadGameLayer();
        this.addChild(layer);
    }
});

