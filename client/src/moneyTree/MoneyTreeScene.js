/**
 * Created by MQN on 2016/4/21.
 */


var MoneyTreeLayer = cc.Layer.extend({
    background:null,
    size:null,
    light:null,
    treeNo:null,
    treeFull:null,
    treeGold:null,
    MTBack:null,
    rechargeMenu:null,
    rechargeMu:null,
    tips:null,
    getMenu:null,
    getMu:null,
    getMoneyTips:null,
    treeLevel:null,
    treeLevelTTF:null,
    paid:null,


    ctor:function () {

        this._super();
        this.size = cc.winSize;


        //加载主要信息
        this.loadTreeItem();

        //加载按钮
        this.loadMenu();

        //加载摇钱树等级信息
        this.loadTreeLv();

        return true;
    },

    loadTreeItem:function(){
        this.background = new cc.Sprite(res.DingDianBg_png);
        this.background.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.background, 0);


        //关闭按钮
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

        //摇钱树背景框
        this.MTBack = new cc.Sprite(res.MTBack_png);
        this.MTBack.x = this.size.width/2;
        this.MTBack.y = this.size.height/2;
        this.addChild(this.MTBack, 2);

        //摇钱树图案
        this.treeNo = new cc.Sprite(res.TreeNo_png);
        this.treeNo.x = 700;
        this.treeNo.y = 420;
        this.MTBack.addChild(this.treeNo, 2);
        this.treeNo.setVisible(false);

        this.treeFull = new cc.Sprite(res.TreeFull_png);
        this.treeFull.x = 700;
        this.treeFull.y = 420;
        this.MTBack.addChild(this.treeFull, 2);
        this.treeFull.setVisible(false);

        //摇钱树背后的光
        this.light = new cc.Sprite(res.TreeLight_png);
        this.light.x = this.treeNo.x;
        this.light.y = this.treeNo.y;
        this.MTBack.addChild(this.light, 1);

        //tips
        this.tips = new cc.LabelTTF("0000", "黑体", 24);
        this.tips.x = this.treeNo.x;
        this.tips.y = this.treeNo.y - 270;
        this.MTBack.addChild(this.tips, 1);
        this.tips.setFontFillColor(cc.color.YELLOW);
    },

    loadMenu:function(){

        var self = this;
        Servers.getTree(playerId, function(data){
            console.log(JSON.stringify(data));

            //console.log("this.treeGold>>" + this.treeGold);
            self.loadMenuEnabled(data);
        });
    },

    //充值按钮回调函数
    rechargeCallback:function(){

    },

    loadMenuEnabled:function(data){
        //this.treeGold = 10000;
        this.treeGold = data.tree;
        this.paid = recharge;
        if(this.paid < 10){

            this.treeNo.setVisible(true);
            this.treeFull.setVisible(false);
            this.tips.setString("充值10元即可开启摇钱树");
            this.rechargeMenu = new cc.MenuItemImage(
                res.Recharge_png,
                res.Recharge_png,
                res.Recharge_png,
                this.rechargeCallback,
                this
            );
            this.rechargeMu = new cc.Menu(this.rechargeMenu);
            this.rechargeMu.x = this.treeNo.x;
            this.rechargeMu.y = this.treeNo.y - 320;
            this.MTBack.addChild(this.rechargeMu, 1);
        }else if(this.paid >= 10){

            this.getMenu = new cc.MenuItemImage(
                res.Get_png,
                res.Get_png,
                res.Get1_png,
                this.getMoneyCallback,
                this
            );
            this.getMu = new cc.Menu(this.getMenu);
            this.getMu.x = this.treeNo.x;
            this.getMu.y = this.treeNo.y - 320;
            this.MTBack.addChild(this.getMu, 1);

            console.log("this.treeGold>>" + this.treeGold);
            if(this.treeGold == 0 || this.treeGold == null){
                this.treeNo.setVisible(true);
                this.treeFull.setVisible(false);
                this.getMenu.setEnabled(false);
                this.tips.setString("当前无金币可领");
            }else if(this.treeGold >=0){
                this.treeNo.setVisible(false);
                this.treeFull.setVisible(true);
                this.getMenu.setEnabled(true);
                this.tips.setString("当前有"+this.treeGold+"金币可领");
            }
        }
    },

     loadTreeLv:function(){
        this.paid = recharge;
        this.treeLevel = util.toLevel(this.paid);
        console.log("treeLevel>>" + this.treeLevel);

        //等级显示
        this.treeLevelTTF = new cc.LabelTTF("LEVEL"+this.treeLevel, "黑体", 30);
        this.treeLevelTTF.x = this.treeNo.x;
        this.treeLevelTTF.y = this.treeNo.y - 220;
        this.treeLevelTTF.setFontFillColor(cc.color.GREEN);
        this.MTBack.addChild(this.treeLevelTTF, 2);

    },

    //领取奖励按钮回调函数
    getMoneyCallback:function(){
        //console.log("this.treeGold>>" + this.treeGold);
        this.getMenu.setEnabled(false);
        this.treeNo.setVisible(true);
        this.treeFull.setVisible(false);
        this.tips.setString("当前无金币可领");

        this.getMoneyTips = new cc.LabelTTF("获得金币X"+this.treeGold, "黑体", 30);
        this.getMoneyTips.setFontFillColor(cc.color(255, 255, 0));
        this.getMoneyTips.x = 500;
        this.getMoneyTips.y = 230;
        this.getMoneyTips.setFontFillColor(cc.color.RED);
        this.MTBack.addChild(this.getMoneyTips, 3);
        this.scheduleOnce(function(){
            this.MTBack.removeChild(this.getMoneyTips)
        }, 1);
        Servers.eventTreeExtract(playerId, function(data){
            console.log(JSON.stringify(data));
            coin = data.gold;
        })
    }

});

var MoneyTreeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MoneyTreeLayer();
        this.addChild(layer);

    }
});
