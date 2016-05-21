/**
 * Created by MQN on 2016/3/31.
 */

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

    gift1:null,
    gift1Num:null,
    gift2:null,
    gift2Num:null,
    gift3:null,
    gift3Num:null,
    gift4:null,
    gift4Num:null,
    gift5:null,
    gift5Num:null,

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
        this.forbidCard.x = 850;
        this.forbidCard.y = 440;
        this.avatarBg.addChild(this.forbidCard, 1);

        this.forbidCardNum = new cc.LabelTTF("X" + forbidCard, "Arial", 30);
        this.forbidCardNum.x = this.forbidCard.x + 70;
        this.forbidCardNum.y = this.forbidCard.y;
        this.forbidCardNum.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.forbidCardNum, 1);

        //换牌卡
        this.exchangeCard = new cc.Sprite(res.ExChangeCard_png);
        this.exchangeCard.x = 990;
        this.exchangeCard.y = 440;
        this.avatarBg.addChild(this.exchangeCard, 1);

        this.exchangeCardNum = new cc.LabelTTF("X" + exchangeCard, "Arial", 30);
        this.exchangeCardNum.x = this.exchangeCard.x + 70;
        this.exchangeCardNum.y = this.exchangeCard.y;
        this.exchangeCardNum.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.exchangeCardNum, 1);

        //翻倍卡
        this.doubleCard = new cc.Sprite(res.DoubleCard_png);
        this.doubleCard.x = 1130;
        this.doubleCard.y = 440;
        this.avatarBg.addChild(this.doubleCard, 1);

        this.doubleCardNum = new cc.LabelTTF("X" + doubleCard, "Arial", 30);
        this.doubleCardNum.x = this.doubleCard.x + 70;
        this.doubleCardNum.y = this.doubleCard.y;
        this.doubleCardNum.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.doubleCardNum, 1);

        //礼物巧克力
        this.gift1 = new cc.Sprite(res.Gift1_png);
        this.gift1.x = 240;
        this.gift1.y = 200;
        this.avatarBg.addChild(this.gift1, 1);

        //礼物巧克力数量
        this.gift1Num = new cc.LabelTTF("X"+ giftCandy, "Arial", 30);
        this.gift1Num.x = this.gift1.x;
        this.gift1Num.y = this.gift1.y - 100;
        this.gift1Num.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.gift1Num, 1);

        //礼物戒指
        this.gift2 = new cc.Sprite(res.Gift2_png);
        this.gift2.x = 440;
        this.gift2.y = 200;
        this.avatarBg.addChild(this.gift2, 1);

        //礼物戒指数量
        this.gift2Num = new cc.LabelTTF("X"+ giftRing, "Arial", 30);
        this.gift2Num.x = this.gift2.x;
        this.gift2Num.y = this.gift2.y - 100;
        this.gift2Num.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.gift2Num, 1);

        //礼物车
        this.gift3 = new cc.Sprite(res.Gift3_png);
        this.gift3.x = 640;
        this.gift3.y = 200;
        this.avatarBg.addChild(this.gift3, 1);

        //礼物车数量
        this.gift3Num = new cc.LabelTTF("X"+ giftCar, "Arial", 30);
        this.gift3Num.x = this.gift3.x;
        this.gift3Num.y = this.gift3.y - 100;
        this.gift3Num.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.gift3Num, 1);

        //礼物房子
        this.gift4 = new cc.Sprite(res.Gift4_png);
        this.gift4.x = 840;
        this.gift4.y = 200;
        this.avatarBg.addChild(this.gift4, 1);

        //礼物房子数量
        this.gift4Num = new cc.LabelTTF("X"+ giftHouse, "Arial", 30);
        this.gift4Num.x = this.gift4.x;
        this.gift4Num.y = this.gift4.y - 100;
        this.gift4Num.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.gift4Num, 1);

        //礼物飞机
        this.gift5 = new cc.Sprite(res.Gift5_png);
        this.gift5.x = 1040;
        this.gift5.y = 200;
        this.avatarBg.addChild(this.gift5, 1);

        //礼物飞机数量
        this.gift5Num = new cc.LabelTTF("X"+ giftPlane, "Arial", 30);
        this.gift5Num.x = this.gift5.x;
        this.gift5Num.y = this.gift5.y - 100;
        this.gift5Num.setFontFillColor(cc.color.YELLOW);
        this.avatarBg.addChild(this.gift5Num, 1);
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
