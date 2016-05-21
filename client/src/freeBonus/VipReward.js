/**
 * Created by MQN on 2016/4/19.
 */

var vipRewardKey = 11; //11为可按，12为不可按
var vipRewardDate = 1111;
var dateNow = 0;
var VipRewardLayer = cc.Layer.extend({
    background: null,
    size: null,
    vip: null,
    storeItem:null,
    paid:null,
    nextVipCost:null,
    rewardButton:null,
    rewardMu:null,
    getRewardLayer:null,
    vipTips:null,
    vipIntro:null,
    vipLs:null,
    vipDateLs:null,
    serverTime:null,
    dateNow:null,
    ctor: function () {

        this._super();

        this.size = cc.winSize;

        this.vipLs = cc.sys.localStorage;
        this.vipDateLs = cc.sys.localStorage;


        this.background = new cc.Sprite(res.DingDianBg_png);
        this.background.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.background, 0);


        //返回按钮
        var closeItem = new cc.MenuItemImage(
            res.Back_png,
            res.Back_png,
            function () {
                cc.director.runScene(new HelloWorldScene());
            }, this);
        closeItem.attr({
            x: 50,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x = 0;
        closeMenu.y = 0;
        this.addChild(closeMenu, 1);
        console.log('ctor ---this',this);
        this.loadCurrentDate();

        //加载玩家VIP信息，并显示奖励数
        this.loadVipInfo();





        return true;
    },

    loadCurrentDate:function(){
        console.log('log---loadTime-------+++++');
        var self = this;
        //从服务器获取当前时间
        Servers.getServerTime(function(data){
            console.log("getServerTime>>" + JSON.stringify(data));
            var timeString = data.time;
            console.log("timeString>>" + timeString);
            this.serverTime = new Date(timeString);

            //var dateNow = this.serverTime.getFullYear() +":"+ this.serverTime.getMonth() +":"+ this.serverTime.getDate();
            var yyyy = this.serverTime.getFullYear();
            var mm = this.serverTime.getMonth() + 1;
            var dd = this.serverTime.getDate();
            mm = mm<10?"0"+mm:mm;
            dd = dd<10?"0"+dd:dd;
            dateNow = yyyy + "-" + mm + "-" + dd;
            console.log("dateNow111>>" + dateNow);

            console.log('log---start-------+++++');
            console.log('log--',self);
            console.log(this);
            //加载按钮
            self.loadRewardMenu();
        });
    },

    loadVipInfo: function () {
        var self = this;
        this.vip = vip;
        this.paid = recharge;
        this.storeItem = 201 + this.vip;
        Servers.getStoreItem(this.storeItem, function(data){
            console.log("getStoreItem>>" + JSON.stringify(data));
            //加载文字提示信息
            self.loadTips(data);
        });
        //领取奖励按钮
        //self.loadRewordMenu();


    },

    loadTips:function(data){
        this.nextVipCost = data.storeItem.cost;
        console.log(this.nextVipCost);
        console.log(this.paid);

        this.vipTips = new cc.LabelTTF("您当前为VIP" + this.vip +", 还需充值" + (this.nextVipCost-this.paid)+ "元达到VIP"+(this.vip+1) , "黑体", 30);
        this.vipTips.x = this.size.width/2;
        this.vipTips.y = this.size.height/2 + 200;
        this.addChild(this.vipTips);

        this.vipIntro = new cc.LabelTTF("0000", "黑体", 24);

        this.vipIntro.x = this.vipTips.x;
        this.vipIntro.y = this.vipTips.y - 300;
        this.vipIntro.setDimensions(600,400);
        this.vipIntro.setString(data.storeItem.note);
        this.addChild(this.vipIntro);
    },

    loadRewardMenu: function () {
        console.log('log---cd rewmunu');
        this.rewardButton = new cc.MenuItemImage(
            res.DingDian1_png,
            res.DingDian1_png,
            res.DingDian2_png,
            this.RewardButtonCallback,
            this
        );
        this.rewardMu = new cc.Menu(this.rewardButton);
        this.rewardMu.x = this.size.width/2;
        this.rewardMu.y = this.size.height/2 - 200;
        this.addChild(this.rewardMu, 1);

        console.log("---------------------------");
        console.log(this.vipDateLs.getItem(vipRewardDate));
        console.log(this.vipLs.getItem(vipRewardKey));
        console.log(dateNow);

        if(this.vipDateLs.getItem(vipRewardDate) == null){
            this.rewardButton.setEnabled(true);
            this.vipLs.setItem(vipRewardKey, 11);
        }else if(this.vipDateLs.getItem(vipRewardDate)!= null){
            if(this.vipDateLs.getItem(vipRewardDate) < dateNow){
                this.rewardButton.setEnabled(true);
                this.vipLs.setItem(vipRewardKey, 11);
            }else if(this.vipDateLs.getItem(vipRewardDate) >= dateNow){
                if(this.vipLs.getItem(vipRewardKey) != 12){
                    this.rewardButton.setEnabled(true);
                }else if(this.vipLs.getItem(vipRewardKey) == 12){
                    this.rewardButton.setEnabled(false);
                }
            }
        }
    },

    RewardButtonCallback:function(){

        this.rewardButton.setEnabled(false);



        //提示层
        this.getRewardLayer = new getFreeBonusLayer();
        this.getRewardLayer.tips.x = 640;
        this.getRewardLayer.tips.y = 360;
        this.getRewardLayer.tips.setFontName("黑体");
        this.getRewardLayer.tips.setOpacity(0);
        this.addChild(this.getRewardLayer);

        Servers.vipReward(playerId, this.vip, function(data){
            console.log(JSON.stringify(data));
            coin = data.gold;
        });

        switch(this.vip){
            case 1:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X8000");
                break;
            case 2:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X10000");
                break;
            case 3:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X30000");
                break;
            case 4:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X60000");
                break;
            case 5:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X200000");
                break;
            case 6:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X300000");
                break;
            case 7:
                this.getRewardLayer.tips.setString("获得VIP奖励金币5008000");
                break;
            case 8:
                this.getRewardLayer.tips.setString("获得VIP奖励金币X800000");
                break;
        }

        Servers.getServerTime(function(data){
            console.log("getServerTime>>" + JSON.stringify(data));
            var timeString = data.time;
            console.log("timeString>>" + timeString);
            this.serverTime = new Date(timeString);

            //var dateNow = this.serverTime.getFullYear() +":"+ this.serverTime.getMonth() +":"+ this.serverTime.getDate();
            var yyyy = this.serverTime.getFullYear();
            var mm = this.serverTime.getMonth() + 1;
            var dd = this.serverTime.getDate();
            mm = mm<10?"0"+mm:mm;
            dd = dd<10?"0"+dd:dd;
            dateNow = yyyy + "-" + mm + "-" + dd;
            console.log("dateNow111>>" + dateNow);

        });

        this.vipDateLs.setItem(vipRewardDate, dateNow);
        this.vipLs.setItem(vipRewardKey, 12);

        console.log("============================");
        console.log("dateNow>>" + dateNow);
        console.log(this.vipDateLs.getItem(vipRewardDate));
        console.log(this.vipLs.getItem(vipRewardKey));
        this.getRewardLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
        this.scheduleOnce(function(){
            this.removeChild(this.getRewardLayer);
        }, 1);
    }


});

var VipRewardScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new VipRewardLayer();
        this.addChild(layer);

    }
});
