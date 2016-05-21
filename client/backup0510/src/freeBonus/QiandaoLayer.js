/**
 * Created by MQN on 2016/3/31.
 */

//签到奖励层
var qiandaoLayer = cc.Layer.extend({

    prizeBg:null,
    qiandaoLabel:null,

    ctor:function() {
        this._super();
        var size = cc.winSize;

        //设置为触摸吞噬
        var touchListener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        };
        cc.eventManager.addListener(touchListener, this);

        console.log("点击“签到”");


        if(continueLoginDaysNew>0){
            switch(continueLoginDaysNew){
                case 1: //coin += 1000;
                    //pomelo.request("connector.userHandler.addGold", {
                    //        playerId: 1458009829560, gold: 1000, diamond: 0, flag: 'buyGold'
                    //    },
                    //    function (data) {
                    //
                    //        console.log("返回修改金币和钻石数据");
                    //        //console.log('connector.userHandler.entry','返回data');
                    //        console.log(JSON.stringify(data));    //打印全部数据
                    //        console.log(JSON.stringify(data.gold));
                    //        console.log(JSON.stringify(data.diamond));
                    //        coin = data.gold;
                    //        diamond = data.diamond;
                    //    });
                    Servers.getAddGold(playerId, 1000, 0, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    break;
                case 2: //coin += 2000;
                    Servers.getAddGold(playerId, 2000, 0, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    break;
                case 3: //coin += 5000;
                    Servers.getAddGold(playerId, 5000, 0, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    break;
                case 4: //coin += 8000;
                    Servers.getAddGold(playerId, 8000, 0, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    break;
                default: //coin += 10000;
                    Servers.getAddGold(playerId, 10000, 0, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        console.log("coin:" + JSON.stringify(data.gold));
                        console.log("diamond:" + JSON.stringify(data.diamond));
                        coin = data.gold;
                        diamond = data.diamond;
                    });
                    break;
            }
            //传回服务器
            //pomelo.request("connector.userHandler.addGold", {
            //        playerId: 1458009829560, gold: coin, diamond: 0, flag: 'buyGold'
            //    },
            //    function (data) {
            //
            //        console.log("返回修改金币和钻石数据");
            //        //console.log('connector.userHandler.entry','返回data');
            //        console.log(JSON.stringify(data));    //打印全部数据
            //        console.log(JSON.stringify(data.gold));
            //        console.log(JSON.stringify(data.diamond));
            //        coin = data.gold;
            //        diamond = data.diamond;
            //    });
        }else if(continueLoginDaysNew<1){
            this.qiandaoMenuItem.setEnabled(false);
        }

        //弹出信息
        this.prizeBg = new cc.Sprite(res.PrizeBg_png);
        this.prizeBg.x = 640;
        this.prizeBg.y = 400;
        this.addChild(this.prizeBg,1);
        //显示“签到成功”
        this.qiandaoLabel = new cc.LabelTTF("恭喜连续签到"+continueLoginDaysNew+"天！", "黑体", 40);
        this.qiandaoLabel.x = 640;
        this.qiandaoLabel.y = 400;
        this.prizeBg.addChild(this.qiandaoLabel,1);
        this.qiandaoLabel.setOpacity(0);
        this.qiandaoLabel.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5),cc.tintTo(0.1,255,205,0)));
        //金币
        var coins = new cc.Sprite(res.Coins_png);
        coins.x = 150;
        coins.y = -80;
        this.qiandaoLabel.addChild(coins, 2);
    }


});
