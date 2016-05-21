/**
 * Created by MQN on 2016/3/31.
 */

//玩家基本信息层，用于提高代码复用率
var userBaseInfoLayer = cc.Layer.extend({
    face:null,
    name:null,
    user_name:null,

    level:null,

    vip:null,

    gender:null,

    lobbyCoin:null,
    coinNum:null,
    coin_number:null,
    lobbyCoin2:null,
    coinAddMu:null,

    lobbyDiamond:null,
    diamondNum:null,
    diamond_number:null,
    lobbyDiamond2:null,
    diamondAddMu:null,

    setting:null,
    ctor:function(){

        this._super();
        this.scheduleUpdate();
        var size = cc.winSize;

        console.log("playerId>>" + playerId);
        console.log("userId>>" + userId);
        console.log("userName>>" + userName);
        console.log("nickName>>" + nickName);
        console.log("gender>>" + gender);
        console.log("signature>>" + signature);
        console.log("level>>" + level);
        console.log("vip>>" + vip);
        console.log("coin>>" + coin);
        console.log("diamond>>" + diamond);
        console.log("forbidCard>>" + forbidCard);
        console.log("exchangeCard>>" + exchangeCard);
        console.log("doubleCard>>" + doubleCard);
        console.log("continueLoginDaysNew>>" + continueLoginDaysNew);
        console.log("giftCandy>>" + giftCandy);
        console.log("giftRing>>" + giftRing);
        console.log("giftCar>>" + giftCar);
        console.log("giftHouse>>" + giftHouse);
        console.log("giftPlane>>" + giftPlane);
        console.log("recharge>>" + recharge);
        console.log("playTimes>>" + playTimes);
        console.log("winTimes>>" + winTimes);
        console.log("loseTimes>>" + loseTimes);
        console.log("winRate>>" + winRate);
        console.log("everydayPlay>>" + everydayPlay);
        console.log("everydayWin>>" + everydayWin);
        console.log("everydayExchange>>" + everydayExchange);
        console.log("everydayAllIn>>" + everydayAllIn);
        console.log("everydayLoginTimes>>" + everydayLoginTimes);

        //用户头像框
        this.face = new cc.Sprite(res.Face_png);
        this.face.x = 100;
        this.face.y = size.height-100;
        this.addChild(this.face, 2);


        //用户昵称
        this.name = new cc.LabelTTF(nickName, "黑体", 30);
        this.name.x = this.face.x + 100;
        this.name.y = this.face.y + 40;
        this.name.setAnchorPoint(cc.p(0,0.5));
        this.name.setFontFillColor(cc.color.YELLOW);
        this.addChild(this.name, 1);

        //用户性别
        if(gender==2){
            this.gender = new cc.Sprite(res.Gender0_png);
        }else{
            this.gender = new cc.Sprite(res.Gender1_png);
        }
        this.gender.x = this.face.x + 50;
        this.gender.y = this.face.y - 30;
        if(avatarInfoTag == 0){
            this.addChild(this.gender, 2);
        }


        //用户等级
        this.level = new cc.LabelTTF("level  " + level, "Arial", 30);
        this.level.x = this.name.x;
        this.level.y = this.name.y - 30;
        this.level.setAnchorPoint(cc.p(0, 0.5));
        this.level.setFontFillColor(cc.color.YELLOW);
        this.addChild(this.level, 1);

        //用户vip
        switch(vip){
            case 1: this.vip = new cc.Sprite(res.Vip1_png);
                break;
            case 2: this.vip = new cc.Sprite(res.Vip2_png);
                break;
            case 3: this.vip = new cc.Sprite(res.Vip3_png);
                break;
            case 4: this.vip = new cc.Sprite(res.Vip4_png);
                break;
            case 5: this.vip = new cc.Sprite(res.Vip5_png);
                break;
            case 6: this.vip = new cc.Sprite(res.Vip6_png);
                break;
            case 7: this.vip = new cc.Sprite(res.Vip7_png);
                break;
            case 8: this.vip = new cc.Sprite(res.Vip8_png);
                break;
            default: this.vip = new cc.LabelTTF("vip "+vip, "Arial", 30);
                this.vip.setFontFillColor(cc.color.YELLOW);
                break;
        }

        //this.vip = new cc.Sprite("res/lobbyInfo/vip"+vip+".png");
        this.vip.x = this.name.x;
        this.vip.y = this.name.y - 70;
        this.vip.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this.vip, 1);

        //金币图案
        this.lobbyCoin = new cc.Sprite(res.LobbyCoin_png);
        this.lobbyCoin.x = this.face.x + 330;
        this.lobbyCoin.y = this.face.y + 40;
        this.addChild(this.lobbyCoin, 1);

        //用户金币数
        this.coinNum = new cc.LabelTTF(coin, "Arial", 30);
        this.coinNum.x = this.lobbyCoin.x + 100;
        this.coinNum.y = this.lobbyCoin.y;
        this.addChild(this.coinNum, 2);

        //金币数底框
        this.lobbyCoin2 = new cc.Sprite(res.LobbyCoin2_png);
        this.lobbyCoin2.x = this.lobbyCoin.x + 100;
        this.lobbyCoin2.y = this.lobbyCoin.y;
        this.addChild(this.lobbyCoin2, 1);

        //金币数充值按钮
        var coinAddImage = new cc.MenuItemImage(
            res.Lobby_add1_png,
            res.Lobby_add2_png,
            this.addCoin, this);
        this.coinAddMu = new cc.Menu(coinAddImage);
        this.coinAddMu.x = this.lobbyCoin.x + 200;
        this.coinAddMu.y = this.lobbyCoin.y;
        this.addChild(this.coinAddMu, 2);

        //钻石图案
        this.lobbyDiamond = new cc.Sprite(res.LobbyDiamond_png);
        this.lobbyDiamond.x = this.coinNum.x + 250;
        this.lobbyDiamond.y = this.coinNum.y;
        this.addChild(this.lobbyDiamond, 2);

        //用户钻石数
        this.diamondNum = new cc.LabelTTF(diamond, "Arial", 30);
        this.diamondNum.x = this.lobbyDiamond.x + 100;
        this.diamondNum.y = this.lobbyDiamond.y;
        this.addChild(this.diamondNum, 2);

        //钻石数底框
        this.lobbyDiamond2 = new cc.Sprite(res.LobbyCoin2_png);
        this.lobbyDiamond2.x = this.lobbyDiamond.x + 100;
        this.lobbyDiamond2.y = this.lobbyDiamond.y;
        this.addChild(this.lobbyDiamond2, 1);

        //钻石充值按钮
        var diamondAddImage = new cc.MenuItemImage(
            res.Lobby_add1_png,
            res.Lobby_add2_png,
            this.addDiamond, this
        );
        this.diamondAddMu = new cc.Menu(diamondAddImage);
        this.diamondAddMu.x = this.lobbyDiamond.x + 200;
        this.diamondAddMu.y = this.lobbyDiamond.y;
        this.addChild(this.diamondAddMu, 2);
    },

    update:function(dt){
        this.coinNum.setString(coin);
        this.diamondNum.setString(diamond);
    },

    addCoin:function(){
        console.log("addCoin");
        this.dTcLayer = new diaToCoinLayer();
        this.dTcLayer.x = 0;
        this.dTcLayer.y = 0;
        this.addChild(this.dTcLayer, 3);

        //关闭按钮
        var closeItem = new cc.MenuItemImage(
            res.Yes2_png,
            res.Yes2_png,
            function () {
                this.removeChild(this.dTcLayer);
                this.removeChild(closeMenu);
            }, this);
        if(avatarInfoTag == 0){
            closeItem.attr({
                x: 730,
                y: 350
            });
        }else if(avatarInfoTag == 1){
            closeItem.attr({
                x: 680,
                y: 510
            });
        }
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x = 0;
        closeMenu.y = 0;
        this.addChild(closeMenu, 4);
    },

    addDiamond:function(){
        console.log("addDiamond");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "jsScoreCount", "(I)V",1);

    }


});
