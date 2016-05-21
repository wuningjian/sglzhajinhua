/**
 * Created by MQN on 2016/3/15.
 */

var LOADINGBARPRONUM = 1;

var LOADINGBAR_TAG = 99912;

var GameFrameCache = function () {
    this.flag = 0;
};

var LOADINGBARPROALLNUM = 0;

var finishTag = 0;

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


var LoadGameLayer = cc.Layer.extend({
    perNum: null,
    percent: null,

    ctor: function () {

        this._super();


        //实时更新百分比
        this.scheduleUpdate();

        var size = cc.winSize;

        //初始化进度条
        this.initLoadingBar(this);

        //进行异步加载，绑定更新进度条的方法setLoadingBar
        GameFrameCache.setAllCache(this, this.setLoadingBar);

        //显示资源加载百分比
        //var loadingBar = this.getChildByTag(LOADINGBAR_TAG);
        this.percent   = new cc.LabelTTF(this.perNum + " %", "Arial", 30);
        this.percent.x = 640;
        this.percent.y = 300;
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
        var userId   = 8;
        var password = 'password';
        //var password = Storage.getPassword();//"password";//Storage.getPassword();
        console.log("userId:password " + userId + ":" + password);
        var imei     = Storage.getImei();
        console.log('Storage.getImei = ',imei);
        if (!imei) {
            imei = "imei10";
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
        uid = playerId;
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
        forbidCard = data.initdata.player.jinBiKa;
        exchangeCard = data.initdata.player.huangPaiKa;
        doubleCard = data.initdata.player.fangBeiKa;
        continueLoginDaysNew = data.initdata.player.continueLoginDays;
        Storage.setUserId(userId);
        Storage.setPassword(password);
        this.scheduleOnce(this.intoHall(),3);
    },
    //跳转页面
    intoHall:function(){
        if( 1){
            console.log("intoHall");

            cc.director.runScene(new cc.TransitionFade(1, new MainScene()));
        }
    },

    //加载用户信息
    //loadUserInfo: function () {
    //    var self = this;
    //    //login Test
    //    pomelo.init({
    //        //host: "120.24.254.91", port: "3010",
    //        //host: "127.0.0.1",
    //        //port: "3210",
    //        user: {name: "nick", email: "okonce@qq.com"}
    //    }, function (target) {
    //        console.log('pomelo init success connector.userHandler.entry');
    //        //if(target.code === 500) {
    //        //    showError(LOGIN_ERROR);
    //        //    return;
    //        //}
    //        /**
    //         * //情况一     ：用户第一次安装进入游戏，userid为空  password为空，手机IMEI号为imei号(字符串)
    //         * 携带请求参数 :{userId:'',password:'',imei: 'imei27'}
    //         * 后端处理    ：根据此IMEI号获取以前的账号信息(如果曾经安装过卸载重装的情况)，
    //         *              没有的话新建用户信息（包括登录用的信息：user，玩家信息player，任务信息：task）
    //         * 返回数据    :json形式返回user,player,task
    //         *
    //         * //情况二    :用户登录(非第一次登录)，userid为用户的id，password为'password'，IMEI号为空或者IMEI号
    //         * 示例       :{userId:1458009829512,password:'password',imei: 'imei27'}
    //         * 后端处理   ：根据userId 和password 验证登录并返回用户数据与情况一相同
    //         *
    //         *
    //         */
    //            //{userId:1458009829512,password:'password',imei: 'imei27'}
    //        pomelo.request("login.loginHandler.login", {userId: 8, password: 'password'}, function (data) {
    //            //console.log(data.host + ":" + data.port);
    //
    //            console.log(JSON.stringify(data));    //打印全部数据
    //            //console.log(JSON.stringify(data.code));  //打印放回码
    //            //console.log(JSON.stringify(data.msg));    //打印文字消息
    //            //console.log(JSON.stringify(data.initData));   //打印用户所有数据
    //            //console.log(JSON.stringify(data.initData.user));   //用户
    //            //console.log(JSON.stringify(data.initData.player)); //玩家游戏
    //            //console.log(JSON.stringify(data.initData.task));   //玩家任务
    //
    //            //从服务器获取以下玩家信息，并赋值给对应全局变量
    //            //playerId = JSON.stringify(data.initData.player.playerId);
    //            //userId = JSON.stringify(data.initData.player.userId);
    //            //userName = JSON.stringify(data.initData.player.userName);
    //            //nickName = JSON.stringify(data.initData.player.nickName);
    //            //gender = JSON.stringify(data.initData.player.gender);
    //            //signature = JSON.stringify(data.initData.player.signature);
    //            //level = JSON.stringify(data.initData.player.level);
    //            //vip = JSON.stringify(data.initData.player.vip);
    //            //coin = JSON.stringify(data.initData.player.gold);
    //            //diamond = JSON.stringify(data.initData.player.diamond);
    //            //forbidCard = JSON.stringify(data.initData.player.jinBiKa);
    //            //exchangeCard = JSON.stringify(data.initData.player.huangPaiKa);
    //            //doubleCard = JSON.stringify(data.initData.player.fangBeiKa);
    //            //continueLoginDays = JSON.stringify(data.initData.player.continueLoginDays);
    //            /* playerId = data.initData.player.playerId;
    //             nickName = data.initData.player.nickName;
    //             userId = data.initData.player.userId;
    //             userName = data.initData.player.userName;
    //             gender = data.initData.player.gender;
    //             signature = data.initData.player.signature;
    //             level = data.initData.player.level;
    //             vip = data.initData.player.vip;
    //             coin = data.initData.player.gold;
    //             diamond = data.initData.player.diamond;
    //             forbidCard = data.initData.player.jinBiKa;
    //             exchangeCard = data.initData.player.huangPaiKa;
    //             doubleCard = data.initData.player.fangBeiKa;
    //             continueLoginDays = data.initData.player.continueLoginDays;*/
    //
    //
    //            //self.local();
    //            //console.log("playerId111>>" + playerId);
    //            //console.log("finishTag>>" + finishTag);
    //            //此时若资源文件已加载完成，则跳转
    //            //pomelo.disconnect();
    //            //if(finishTag == 1)
    //            //    cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
    //
    //        });
    //        //console.log("playerId222>>" + playerId);
    //        //pomelo.request("connector.userHandler.addGold", {playerId: 1458009829560, gold: 10000, diamond: -10, flag: 'buyGold'}, function (data) {
    //        //
    //        //        console.log("返回修改数据");
    //        //        //console.log('connector.userHandler.entry','返回data');
    //        //        console.log(JSON.stringify(data));    //打印全部数据
    //        //        console.log(JSON.stringify(data.gold));
    //        //        console.log(JSON.stringify(data.diamond));
    //        //    });
    //    });
    //
    //},

    //
    //local:function(){
    //    console.log("playerId>>" + playerId);
    //},
    //进度条的加载
    initLoadingBar: function (sp_loading) {

        //加载用户信息
        this.loadUserInfo2();
        console.log("teststart ---- ");
        //Servers.getGateEntry();
        //console.log("testend ---- ");
        //加载Loading条
        var sp_loadingtiao = new cc.Sprite(res.UILoadingBd_png);
        sp_loadingtiao.attr({
            x: sp_loading.getContentSize().width / 2,
            y: sp_loading.getContentSize().height / 2,
            scale: 1,
            rotation: 0
        });
        sp_loading.addChild(sp_loadingtiao, 1);
        //var loadingBar = new ccui.LoadingBar(res.UILOADINGBAR_png);
        var loadingBar = new cc.ProgressTimer(new cc.Sprite(res.UILoadingBar_png));
        loadingBar.setType(cc.ProgressTimer.TYPE_BAR);
        loadingBar.setMidpoint(cc.p(0, 0.5));       //设置进度条的起始点
        loadingBar.setBarChangeRate(cc.p(1, 0));     //设置进度条动画方向
        loadingBar.x = sp_loading.getContentSize().width / 2;
        loadingBar.y = sp_loading.getContentSize().height / 2;
        sp_loading.addChild(loadingBar, 2, LOADINGBAR_TAG);
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

            //console.log("playerId5555>>" + playerId);
            //cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
            //setTimeout(function(){
            //    cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
            //}, 500)

        }

    }


});

var LoadGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LoadGameLayer();
        this.addChild(layer);

    }
});

