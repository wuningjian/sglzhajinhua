/**
 * Created by MQN on 2016/3/31.
 */

//钻石兑换金币层
var diaToCoinLayer = cc.Layer.extend({
    dTcBg:null,
    diamond:null,
    coin:null,
    arrow:null,
    diamond1:null,
    coin1:null,
    tips:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;

        //设置为触摸吞噬
        var touchListener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){
                return true;
            }
        };

        cc.eventManager.addListener(touchListener, this);

        //背景
        this.dTcBg = new cc.Sprite(res.DiamondToCoinBg_png);
        if(avatarInfoTag == 0){
            this.dTcBg.x = size.width/2;
            this.dTcBg.y = size.height/2 + 40;
        }else if(avatarInfoTag == 1){
            this.dTcBg.x = size.width/2 - 50;
            this.dTcBg.y = size.height/2 + 200;
        }
        this.addChild(this.dTcBg, 1);

        //钻石
        this.diamond = new cc.Sprite(res.LobbyDiamond_png);
        this.diamond.x = 150;
        this.diamond.y = 300;
        this.dTcBg.addChild(this.diamond, 1);

        this.diamond1 = new cc.LabelTTF("10", "黑体", 40);
        this.diamond1.x = 200;
        this.diamond1.y = 300;
        this.dTcBg.addChild(this.diamond1, 1);

        //箭头
        this.arrow = new cc.Sprite(res.Arrow_png);
        this.arrow.x = 350;
        this.arrow.y = 300;
        this.dTcBg.addChild(this.arrow, 1);

        //金币
        this.coin = new cc.Sprite(res.LobbyCoin_png);
        this.coin.x = 450;
        this.coin.y = 300;
        this.dTcBg.addChild(this.coin, 1);

        this.coin1 = new cc.LabelTTF("10000", "黑体", 40);
        this.coin1.x = 550;
        this.coin1.y = 300;
        this.dTcBg.addChild(this.coin1, 1);

        //确定提示
        this.tips = new cc.LabelTTF("使用10钻石获得10000金币", "黑体", 40);
        this.tips.x = 350;
        this.tips.y = 100;
        this.tips.setFontFillColor(cc.color(255, 255, 0));

        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {
                if(diamond >= 10){
                    console.log("playerId>>" + playerId);
                    Servers.getAddGold(playerId, 10000, -10, function(data){
                        console.log("返回修改金币和钻石数据");
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    this.dTcBg.addChild(this.tips, 2);
                    yesItem.setEnabled(false);
                    //this.tips.runAction(cc.fadeOut(1));
                    this.scheduleOnce(function(){
                        this.dTcBg.removeChild(this.tips);
                        yesItem.setEnabled(true);
                    }, 1.9);
                }else{
                    var error = new cc.LabelTTF("钻石不足，请充值", "黑体", 40);
                    error.x = 340;
                    error.y = 100;
                    error.setFontFillColor(cc.color.RED);
                    this.dTcBg.addChild(error, 2);
                    yesItem.setEnabled(false);
                }

            }, this);
        yesItem.attr({
            x: 250,
            y: 200
        });

        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.dTcBg.addChild(yesMenu, 4);
    }
});
