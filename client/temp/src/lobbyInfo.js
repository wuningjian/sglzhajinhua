/**
 * Created by MQN on 2016/3/14.
 */

var avatarInfoTag = 0;
var qiandaoKey = 0;

//大厅信息层
var lobbyInfoLayer = cc.Layer.extend({


    avatar:null,

    ctor:function(){
        this._super();
        var size = cc.winSize;
        avatarInfoTag = 0;
        //用户头像
        this.avatar = new cc.MenuItemImage(
            res.Avatar_png,
            res.Avatar_png,
            this.avatarCallback, this);
        this.avatarMu = new cc.Menu(this.avatar);
        this.avatarMu.x = 100;
        this.avatarMu.y = size.height - 100;
        this.addChild(this.avatarMu, 1);

        //玩家基本信息层
        this.infoLayer = new userBaseInfoLayer();
        this.addChild(this.infoLayer, 2);

        //添加“签到”层
        //this.prizeUI = new prizeLayer();
        //this.addChild(this.prizeUI, 3);

        //签到所需localStorage
        this.ls = cc.sys.localStorage;
        //this.ls.setItem(qiandaoKey, 0);
        console.log("qiandaoKey>>" + this.ls.getItem(qiandaoKey));

        //签到按钮
        var qiandaoNormal = new cc.Sprite(res.Qiandao1_png);
        var qiandaoSelected = new cc.Sprite(res.Qiandao2_png);
        var qiaodaoDisable = new cc.Sprite(res.Qiandao3_png);
        this.qiandaoMenuItem = new cc.MenuItemSprite(
            qiandaoNormal,
            qiandaoSelected,
            qiaodaoDisable,
            this.qiandaoCallback, this);
        this.qiandaoMu = new cc.Menu(this.qiandaoMenuItem);
        this.qiandaoMu.x = 300;
        this.qiandaoMu.y = 130;
        this.addChild(this.qiandaoMu, 1);

        console.log("continueLoginDaysNew>>" + continueLoginDaysNew);
        console.log("continueLoginDays>>" + this.ls.getItem(qiandaoKey));
        if(continueLoginDaysNew <= this.ls.getItem(qiandaoKey)){
            this.qiandaoMenuItem.setEnabled(false);
        }else if(continueLoginDaysNew > this.ls.getItem(qiandaoKey)){
            this.qiandaoMenuItem.setEnabled(true);
        }

    },
    //签到按钮回调函数
    qiandaoCallback:function(){

        //添加签到奖励层
        this.qiandaoLayer = new qiandaoLayer();
        this.addChild(this.qiandaoLayer, 4);

        this.qiandaoMenuItem.setEnabled(false);
        this.ls.setItem(qiandaoKey, continueLoginDaysNew);

        //“确定”按钮
        var yesMenuItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            this.yesCallback, this);
        this.yesMu = new cc.Menu(yesMenuItem);
        this.yesMu.x = 640;
        this.yesMu.y = 200;
        this.addChild(this.yesMu, 5);

    },

    //确定按钮回调函数
    yesCallback:function(){
        console.log("点击“确定”");
        this.removeChild(this.qiandaoLayer);
        this.removeChild(this.yesMu);
    },

    //点击头像后出现玩家详细信息
    avatarCallback:function(){
        this.removeChild(this.infoLayer);
        this.avatarLayer = new avatarInfoLayer();
        this.addChild(this.avatarLayer, 3);
        //返回按钮
        var backBtn = new cc.MenuItemImage(
            res.Back_png,
            res.Back_png,
            function(){
                cc.director.runScene(new MainScene());
                backMenu.setVisible(false);
                this.infoLayer.removeChild(this.avatarLayer);

            },this);
        var backMenu = new cc.Menu(backBtn);
        backMenu.x = 100;
        backMenu.y = 60;
        this.addChild(backMenu, 4);
    }

});

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

//玩家信息层，用于显示玩家详细信息，其中调用了玩家基本信息层
var avatarInfoLayer = cc.Layer.extend({
    avatarBg:null,
    signature:null,
    pen:null,
    sigBg:null,

    genderBox1:null,
    genderBox0:null,
    genderSelect:null,

    forbidCard:null,
    exchangeCard:null,
    doubleCard:null,
    forbidCardNum:null,
    exchangeCardNum:null,
    doubleCardNum:null,


    ctor:function(){
        this._super();
        this.scheduleUpdate();

        avatarInfoTag = 1;

        //添加吞噬监听
        var touchListener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){

                var touchPos = touch.getLocation();
                //console.log(touchPos.x + "  " + touchPos.y);
                if(touchPos.x>529 && touchPos.x<573 && touchPos.y>388 && touchPos.y<432){
                    console.log("修改性别为女");
                    gender = 2;
                    //更新用户签名，性别，昵称   不更新的传原有数据
                    Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                        console.log("返回修改性别数据");
                        console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                    })
                }else if(touchPos.x>677 && touchPos.x<723 && touchPos.y>388 && touchPos.y<432){
                    console.log("修改性别为男");
                    gender = 1;
                    //更新用户签名，性别，昵称   不更新的传原有数据
                    Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                        console.log("返回修改性别数据");
                        console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                    })
                }
                return true;
            }
        };
        cc.eventManager.addListener(touchListener, this);
        var size = cc.winSize;

        //背景
        this.avatarBg = new cc.Sprite(res.AvatarBg_png);
        this.avatarBg.x = size.width/2;
        this.avatarBg.y = size.height/2;
        this.addChild(this.avatarBg, 5);

        //添加用户基本信息层
        this.avatarUserBaseInfoLayer = new userBaseInfoLayer();
        this.avatarUserBaseInfoLayer.x = 50;
        this.avatarUserBaseInfoLayer.y = -150;
        this.avatarBg.addChild(this.avatarUserBaseInfoLayer, 3);

        //编辑昵称
        var nameBg = new cc.MenuItemImage(
            res.LobbyCoin2_png,
            res.LobbyCoin2_png,
            this.editName, this
        );
        var editNameMenu = new cc.Menu(nameBg);
        editNameMenu.x = 330;
        editNameMenu.y = 510;
        this.avatarBg.addChild(editNameMenu, 1);

        var pen0 = new cc.Sprite(res.Pen_png);
        pen0.x = 230;
        pen0.y = editNameMenu.y;
        this.avatarBg.addChild(pen0, 2);

        //选择性别
        var gender0 = new cc.Sprite(res.Gender0_png);
        gender0.x = 500;
        gender0.y = 450;
        this.avatarBg.addChild(gender0, 1);

        this.genderBox0 = new cc.Sprite(res.GenderBox_png);
        this.genderBox0.x = gender0.x + 50;
        this.genderBox0.y = gender0.y;
        this.avatarBg.addChild(this.genderBox0, 1);

        var gender1 = new cc.Sprite(res.Gender1_png);
        gender1.x = gender0.x + 150;
        gender1.y = gender0.y;
        this.avatarBg.addChild(gender1, 1);

        this.genderBox1 = new cc.Sprite(res.GenderBox_png);
        this.genderBox1.x = gender0.x + 200;
        this.genderBox1.y = gender0.y;
        this.avatarBg.addChild(this.genderBox1, 1);

        this.genderSelect = new cc.Sprite(res.GenderSelect_png);
        if(gender == 2){
            this.genderSelect.x = this.genderBox0.x;
        }else if(gender == 1){
            this.genderSelect.x = this.genderBox1.x;
        }
        this.genderSelect.y = this.genderBox0.y;
        this.avatarBg.addChild(this.genderSelect, 2);

        //编辑签名
        this.sigBg = new cc.MenuItemImage(
            res.SigBg_png,
            res.SigBg_png,
            this.editSig, this
        );
        var editSigMenu = new cc.Menu(this.sigBg);
        editSigMenu.x = size.width/2 + 40;
        editSigMenu.y = 350;
        this.avatarBg.addChild(editSigMenu, 1);

        this.pen = new cc.Sprite(res.Pen_png);
        this.pen.x = 130;
        this.pen.y = editSigMenu.y;
        this.avatarBg.addChild(this.pen, 2);

        this.signature = new cc.LabelTTF(signature, "黑体", 30);
        this.signature.setFontFillColor(cc.color.YELLOW);
        this.signature.x = this.pen.x + 30;
        this.signature.y = editSigMenu.y;
        this.signature.setAnchorPoint(cc.p(0, 0.5));
        this.avatarBg.addChild(this.signature, 2);

        //禁比卡
        this.forbidCard = new cc.Sprite(res.ForbidCard_png);
        this.forbidCard.x = 500;
        this.forbidCard.y = 280;
        this.avatarBg.addChild(this.forbidCard, 1);

        this.forbidCardNum = new cc.LabelTTF(forbidCard, "Arial", 40);
        this.forbidCardNum.x = this.forbidCard.x + 50;
        this.forbidCardNum.y = this.forbidCard.y;
        this.avatarBg.addChild(this.forbidCardNum, 1);

        //换牌卡
        this.exchangeCard = new cc.Sprite(res.ExChangeCard_png);
        this.exchangeCard.x = 640;
        this.exchangeCard.y = 280;
        this.avatarBg.addChild(this.exchangeCard, 1);

        this.exchangeCardNum = new cc.LabelTTF(exchangeCard, "Arial", 40);
        this.exchangeCardNum.x = this.exchangeCard.x + 50;
        this.exchangeCardNum.y = this.exchangeCard.y;
        this.avatarBg.addChild(this.exchangeCardNum, 1);

        //翻倍卡
        this.doubleCard = new cc.Sprite(res.DoubleCard_png);
        this.doubleCard.x = 780;
        this.doubleCard.y = 280;
        this.avatarBg.addChild(this.doubleCard, 1);

        this.doubleCardNum = new cc.LabelTTF(doubleCard, "Arial", 40);
        this.doubleCardNum.x = this.doubleCard.x + 50;
        this.doubleCardNum.y = this.doubleCard.y;
        this.avatarBg.addChild(this.doubleCardNum, 1);



        //this.avatarUserBaseInfoLayer.removeChild(this.avatarUserBaseInfoLayer.gender);

    },

    update:function(dt){
        this.signature.setString(signature);
        this.avatarUserBaseInfoLayer.name.setString(nickName);

        if(gender == 2){
            this.genderSelect.x = this.genderBox0.x;
        }else if(gender == 1){
            this.genderSelect.x = this.genderBox1.x;
        }
    },

    //编辑签名回调函数
    editSig:function(){
        console.log("editSignature");

        //添加编辑个性签名层
        this.editSigLayer = new editSigLayer();
        this.avatarBg.addChild(this.editSigLayer, 4);

        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {
                signature = this.editSigLayer.editbox.getString();
                console.log("更新签名：" + signature);

                //更新用户签名，性别，昵称   不更新的传原有数据
                //pomelo.request("connector.userHandler.updateInfo", {
                //    playerId:1458009829560,signature:signature, gender:gender, nickName:nickName
                //}, function (data) {
                //    console.log("返回修改个性签名数据");
                //    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                //});
                Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                    console.log("返回修改个性签名数据");
                    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                });

                this.avatarBg.removeChild(this.editSigLayer);
                this.avatarBg.removeChild(yesMenu);
            }, this);
        yesItem.attr({
            x: 640,
            y: 200
        });

        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.avatarBg.addChild(yesMenu,5);
    },

    //编辑昵称回调函数
    editName:function(){
        console.log("editNickName");
        //var textField = new cc.TextFieldTTF("...", "Arial", 30);
        //this.avatarBg.addChild(textField, 4);
        //textField.x = 640;
        //textField.y = 400;
        //textField.attachWithIME();

        //添加编辑玩家昵称层
        this.editNameLayer = new editNameLayer();
        this.avatarBg.addChild(this.editNameLayer, 4);

        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {
                nickName = this.editNameLayer.editbox.getString();
                console.log("更新昵称：" + nickName);

                //更新用户签名，性别，昵称   不更新的传原有数据
                //pomelo.request("connector.userHandler.updateInfo", {
                //    playerId:1458009829560,signature:signature, gender:gender, nickName:nickName
                //}, function (data) {
                //    console.log("返回修改昵称数据");
                //    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                //});
                Servers.getUpdateInfo(playerId, signature, gender, nickName, function(data){
                    console.log("返回修改昵称数据");
                    console.log(JSON.stringify(data));    //打印数据code == 200 更新成功
                });

                this.avatarBg.removeChild(this.editNameLayer);
                this.avatarBg.removeChild(yesMenu);
            }, this);

        yesItem.attr({
            x: 640,
            y: 200
        });

        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.avatarBg.addChild(yesMenu,5);
    }
});

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
    }


});

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

//编辑个性签名层
var editSigLayer = cc.Layer.extend({

    editbox:null,
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

        //文本输入框editbox
        var normal9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var press9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var disabled9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        this.editbox=new cc.EditBox(cc.size(500,50),normal9SpriteBg,press9SpriteBg,disabled9SpriteBg);
        this.editbox.x=640;
        this.editbox.y=400;
        this.editbox.setFontSize(30);
        this.editbox.setPlaceHolder("输入签名");
        this.editbox.setMaxLength(30);
        this.editbox.setFontColor(cc.color(255,255,255,100));
        this.addChild(this.editbox, 1);
        //this.scheduleOnce(function(){
        //    console.log("editbox>>" + editbox.getString());
        //}, 5);


    }
});

//编辑玩家昵称层
var editNameLayer = cc.Layer.extend({

    editbox:null,
    ctor:function(){
        this._super();

        //设置为触摸吞噬
        var touchListener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){
                return true;
            }
        };
        cc.eventManager.addListener(touchListener, this);

        //文本输入框editbox
        var normal9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var press9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var disabled9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        this.editbox=new cc.EditBox(cc.size(500,50),normal9SpriteBg,press9SpriteBg,disabled9SpriteBg);
        this.editbox.x=640;
        this.editbox.y=400;
        this.editbox.setFontSize(30);
        this.editbox.setPlaceHolder("输入昵称");
        this.editbox.setMaxLength(20);
        this.editbox.setFontColor(cc.color(255,255,255,100));
        this.addChild(this.editbox, 1);


    }
});
