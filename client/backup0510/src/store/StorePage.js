/**
 * Created by MQN on 2016/4/7.
 */

var STORE_ROW = 3; //行
var STORE_COL = 4; //列

var StorePage = cc.Node.extend({
    bgName:null,
    page:0,
    bg:null,

    ctor:function(bgName, page){
        this._super();
        this.loadConfig(bgName, page);
        this.loadBg();
        this.loadSelectItem(page);

        return true;
    },

    loadConfig:function(bgName, page){
        this.bgName = bgName;
        this.page = page;
    },

    loadBg:function(){
        var size = cc.winSize;
        var node = new cc.Sprite(this.bgName);
        //var node = new cc.Sprite("res/chooseItem1.png");
        this.addChild(node);
        //console.log("loadBg");
        node.setPosition(size.width/2, size.height/2);

        this.bg = node;
    },



    loadSelectItem:function(page){
        var size = new cc.Sprite(res.ItemBg_png).getContentSize();
        var offset = size.width / 4;
        //console.log("size>>" + size.width + "  " + size.height);
        //console.log("page>>" + this.page);

        var winSize = cc.winSize;

        // TODO
        var startX = (winSize.width - (STORE_COL * size.width + (STORE_COL - 1) * offset)) / 2 + size.width / 2;
        var startY = (winSize.height - (STORE_ROW * size.height + (STORE_ROW - 1) * offset)) / 2 + (STORE_ROW - 1) * (size.height + offset) + size.height / 2;
        //console.log("startPos>>"+ startX + "  " + startY);
        var menuItem = [];
        for (var row = 0; row < STORE_ROW; row++){
            var y =  startY - (size.height + offset) * row;

            for (var col = 0; col < STORE_COL; col++){
                var x = startX + (size.width + offset) * col;

                var nodeNormal = new cc.Sprite("res/store/item" + this.page + row + col +".png");
                var nodeSelected = new cc.Sprite("res/store/item" + this.page + row + col +".png");
                var nodeDisabled = new cc.Sprite("res/store/item" + this.page + row + col +".png");

                this.node = new cc.MenuItemSprite(
                    nodeNormal,
                    nodeSelected,
                    nodeDisabled,
                    this.buyItemCallback,
                    this
                );

                this.node.setTag(page*100 + row*10 + col);
                console.log("nodeSetTag>>" + this.node.getTag());
                menuItem.push(this.node);
                this.node.setPosition(x, y);

                //var itemBg = new cc.Sprite(res.ItemBg_png);
                //node.addChild(itemBg, -1);
                //itemBg.setAnchorPoint(0, 0);
            }
        }

        //this.addChild(itemBg);
        //itemBg.setPosition(0, 0);

        var menu = new cc.Menu(menuItem);
        this.addChild(menu);
        menu.setPosition(0, 0);
    },


    buyItemCallback:function(sender){


        var node = sender;
        //node.setEnabled(false);
        var nodeTag = node.getTag();
        //购买成功提示
        //this.tips = new cc.LabelTTF("0000", "黑体", 40);
        //this.tips.x = 640;
        //this.tips.y = 300;
        //this.tips.setFontFillColor(cc.color(255, 255, 0));
        //this.addChild(this.tips, 1);
        //this.tips.setOpacity(0);
        this.buyItemLayer = new buyItemLayer();
        this.buyItemLayer.tips.x = 640;
        this.buyItemLayer.tips.y = 300;
        this.buyItemLayer.tips.setFontName("黑体");
        this.buyItemLayer.tips.setOpacity(0);
        this.addChild(this.buyItemLayer);



        switch(nodeTag){
            case 0:

            case 1:

                if(diamond >= 5){
                    this.buyItemLayer.tips.setString("获得换牌卡X1");

                    Servers.storeBuy(playerId, 1, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        diamond = data.player.diamond;
                        exchangeCard = data.player.huanPaiKa;
                    });

                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 2:
                if(diamond >= 50){
                    this.buyItemLayer.tips.setString("获得换牌卡礼包X1");
                    Servers.storeBuy(playerId, 1, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        diamond = data.player.diamond;
                        exchangeCard = data.player.huanPaiKa;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 3:

                if(coin >= 5000){
                    this.buyItemLayer.tips.setString("获得巧克力X1");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        giftCandy = data.player.gift01;
                        console.log("giftCandy>>" + giftCandy);
                    });
                }else{
                    this.buyItemLayer.tips.setString("金币不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 10:
                if(coin >= 20000){
                    this.buyItemLayer.tips.setString("获得戒指X1");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        giftRing = data.player.gift02;
                    });
                }else{
                    this.buyItemLayer.tips.setString("金币不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 11:
                if(coin >= 200000){
                    this.buyItemLayer.tips.setString("获得跑车X1");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        giftRing = data.player.gift03;
                    });
                }else{
                    this.buyItemLayer.tips.setString("金币不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 12:
                if(coin >= 500000){
                    this.buyItemLayer.tips.setString("获得豪宅X1");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        giftRing = data.player.gift04;
                    });
                }else{
                    this.buyItemLayer.tips.setString("金币不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 13:

                if(coin >= 1000000){
                    this.buyItemLayer.tips.setString("获得飞机X1");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        giftRing = data.player.gift05;
                    });
                }else{
                    this.buyItemLayer.tips.setString("金币不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 20:

                if(diamond >= 5){
                    this.buyItemLayer.tips.setString("获得金币X50000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 21:

                if(diamond >= 10){
                    this.buyItemLayer.tips.setString("获得金币X100000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 22:
                if(diamond >= 30){
                    this.buyItemLayer.tips.setString("获得金币300000+24000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 23:

                if(diamond >= 50){
                    this.buyItemLayer.tips.setString("获得金币500000+90000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 100:
                if(diamond >= 100){
                    this.buyItemLayer.tips.setString("获得金币1000000+280000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 101:

                if(diamond >= 500){
                    this.buyItemLayer.tips.setString("获得金币5000000+2900000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 102:

                if(diamond >= 100){
                    this.buyItemLayer.tips.setString("获得金币10000000+6000000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 103:
                //BuyItem.buyCoin(nodeTag);

                if(diamond >= 200){
                    this.buyItemLayer.tips.setString("获得金币20000000+13000000");
                    Servers.storeBuy(playerId, nodeTag, function(data){
                        console.log(JSON.stringify(data));    //打印全部数据
                        coin = data.player.gold;
                        diamond = data.player.diamond;
                    });
                }else{
                    this.buyItemLayer.tips.setString("钻石不足，请充值");
                }
                this.buyItemLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
                this.scheduleOnce(function(){
                    this.removeChild(this.buyItemLayer);
                }, 1);

                break;
            case 110:
                console.log("buy diamond");
                break;
            case 111:
                console.log("buy diamond");
                break;
            case 112:
                console.log("buy diamond");
                break;
            case 113:
                console.log("buy diamond");
                break;
            case 120:
                console.log("buy diamond");
                break;
            case 121:
                console.log("buy diamond");
                break;
            case 122:
                console.log("buy diamond");
                break;
            case 123:
                //充值钻石
                console.log("buy diamond");
                break;

            case 200:
            case 201:
            case 202:
            case 203:
            case 210:
            case 211:
            case 212:
            case 213:
                //购买VIP
                console.log("buy vip");
                break;
            default :
                break;

        }
    }
});