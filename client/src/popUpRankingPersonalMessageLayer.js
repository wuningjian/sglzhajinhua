/**
 * Created by guowanfu on 2016/4/19.
 */
var PopUpRankingPersonalMessageLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,

    //个人信息主背景
    personalMessageBackground:null,
    //个人基本信息项背景
    personalMessageItemBackground:null,
    //个人礼物信息背景
    giftMessageBackground:null,

    //当点击赠送礼物按钮或添加好友按钮时跳转到的礼物选择界面
    sendGiftSelectBackground:null,

    //玩家个人信息(假设是服务器发来的)
    personalMessage:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        //1.vip,2.玩家名，3.性别，4.公会，5.公会职位，
        //6.Id,7.金币数，8.胜利率，9.胜局数，10.败局数，
        //11.牌局数，12.个性签名，13.礼物数1，14.礼物数2,15.礼物数3，
        //16.礼物数4，17.礼物数5
        this.personalMessage=[1,"受伤的小兔兔","woMan","那年的细雨湖畔","门主",
                              521,8888888,"50%",10000,10000,
                              20000,"罗德里格斯的小兔兔",999,33,45,
                              88,90];
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0.25));
        this.initPersonalMessageBackground();
        this.initPersonalMessage();
        this.initPersonalGiftMessage();
        this.initSendGiftMenuAndAddFriendMenu();
    },
    //初始化个人信息主背景和个人基本信息项背景
    initPersonalMessageBackground:function(){
        var size=cc.director.getWinSize();
        //初始化透明背景
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack);

        //初始化排行者个人信息背景
        this.personalMessageBackground=new cc.Sprite(res.RankPersonalMain_png);
        this.personalMessageBackground.setPosition(this.spriteSelectBack.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.personalMessageBackground);
        //添加监听
        this.m_touchListener1=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){


                }
                else{
                    console.log("结束！！！！返回！！！！");
                    this.destoty();
                    this.removeFromParent();
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.personalMessageBackground);

        //添加花纹
        var leftFlower=new cc.Sprite(res.RankBack_flowerLeft_png);
        var rightFlower=new cc.Sprite(res.RankBack_flowerRight_png);
        leftFlower.setPosition(this.personalMessageBackground.getContentSize().width/3,
            this.personalMessageBackground.getContentSize().height-leftFlower.getContentSize().height/2-10);
        this.personalMessageBackground.addChild(leftFlower);
        rightFlower.setPosition(this.personalMessageBackground.getContentSize().width*2/3,
            this.personalMessageBackground.getContentSize().height-rightFlower.getContentSize().height/2-10);
        this.personalMessageBackground.addChild(rightFlower);
        //添加主题标签
        var titleLabel=new cc.LabelTTF("个人信息","Arial",35);
        titleLabel.setPosition(this.personalMessageBackground.getContentSize().width/2,
            this.personalMessageBackground.getContentSize().height-titleLabel.getContentSize().height/2-10);
        this.personalMessageBackground.addChild(titleLabel);

        //添加个人信息项的背景
        this.personalMessageItemBackground=new cc.Sprite(res.RankMessageItemBackground_png);
        this.personalMessageItemBackground.attr({
            x:this.personalMessageBackground.getContentSize().width/2,
            y:this.personalMessageBackground.getContentSize().height-titleLabel.getContentSize().height-20,
            anchorX:0.5,
            anchorY:1
        });
        this.personalMessageBackground.addChild(this.personalMessageItemBackground);

        //添加关闭按钮
        var closeMenuItemSprite1=new cc.Sprite(res.RankClose_png);
        var closeMenuItemSprite2=new cc.Sprite(res.RankClose_png);
        var closeMenuItemSprite3=new cc.Sprite(res.RankClose_png);
        var closeMenuItem=new cc.MenuItemSprite(closeMenuItemSprite1,closeMenuItemSprite2,closeMenuItemSprite3,
            this.menuCallbackClose,this);
        var closeMenu=new cc.Menu(closeMenuItem);
        closeMenu.attr({
            x:this.personalMessageBackground.getContentSize().width,
            y:this.personalMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:0.5
        });
        this.personalMessageBackground.addChild(closeMenu);
    },
    //初始化个人基本信息项
    initPersonalMessage:function(){
        //玩家头像
        var photoSprite=null;
        if(this.personalMessage[2]=="woMan"){
            photoSprite=new cc.Sprite(res.Rank_woMan_jpg);
        }
        else{
            photoSprite=new cc.Sprite(res.Rank_man_jpg);
        }
        photoSprite.attr({
            x:15,
            y:this.personalMessageItemBackground.getContentSize().height-15,
            anchorX:0,
            anchorY:1
        });
        this.personalMessageItemBackground.addChild(photoSprite);
        //相框
        var photoFrameSprite=new cc.Sprite(res.Rank_photoFrame_png);
        photoFrameSprite.attr({
            x:photoSprite.getContentSize().width/2,
            y:photoSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        photoSprite.addChild(photoFrameSprite);
        //vip
        if(this.personalMessage[0]>0&&this.personalMessage[0]<10){
            var vipSprite=null;
            switch (this.personalMessage[0]){
                case 1:
                    vipSprite=new cc.Sprite(res.Rank_VIP1_png);
                    break;
                case 2:
                    vipSprite=new cc.Sprite(res.Rank_VIP2_png);
                    break;
                case 3:
                    vipSprite=new cc.Sprite(res.Rank_VIP3_png);
                    break;
                case 4:
                    vipSprite=new cc.Sprite(res.Rank_VIP4_png);
                    break;
                case 5:
                    vipSprite=new cc.Sprite(res.Rank_VIP5_png);
                    break;
                case 6:
                    vipSprite=new cc.Sprite(res.Rank_VIP6_png);
                    break;
                case 7:
                    vipSprite=new cc.Sprite(res.Rank_VIP7_png);
                    break;
                case 8:
                    vipSprite=new cc.Sprite(res.Rank_VIP8_png);
                    break;
                case 9:
                    vipSprite=new cc.Sprite(res.Rank_VIP9_png);
                    break;
                default :
                    break;
            }
            vipSprite.attr({
                x:0,
                y:photoSprite.getContentSize().height,
                anchorX:0,
                anchorY:1
            });
            photoSprite.addChild(vipSprite);
        }
        //昵称
        var niChengLabel=new cc.LabelTTF(this.personalMessage[1],"Arial",25);
        niChengLabel.attr({
            x:photoSprite.getContentSize().width+10,
            y:photoSprite.getContentSize().height-10,
            anchorX:0,
            anchorY:1
        });
        photoSprite.addChild(niChengLabel);
        //性别标识
        var sexSprite=null;
        if(this.personalMessage[2]=="man"){
            sexSprite=new cc.Sprite(res.Rank_boy_png);
        }
        else{
            sexSprite=new cc.Sprite(res.Rank_girl_png);
        }
        sexSprite.attr({
            x:niChengLabel.getContentSize().width+10,
            y:niChengLabel.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        niChengLabel.addChild(sexSprite);
        //公会
        var gongHuiLabel=null;
        if(this.personalMessage[3]!=null){
            var string="公会："+this.personalMessage[3]+"  职位："+this.personalMessage[4];
            gongHuiLabel=new cc.LabelTTF(string,"Arial",25);
        }
        else{
            var string="公会：未加入公会！  职位：无";
            gongHuiLabel=new cc.LabelTTF(string,"Arial",25);
        }
        gongHuiLabel.attr({
            x:photoSprite.getContentSize().width+10,
            y:photoSprite.getContentSize().height/5*4-10,
            anchorX:0,
            anchorY:1
        });
        photoSprite.addChild(gongHuiLabel);

        //id,金币
        var idLabel=new cc.LabelTTF("ID:"+this.personalMessage[5],"Arial",25);
        var moneySprite=new cc.Sprite(res.Rank_moneyPicture_png);
        var moneyLabel=new cc.LabelTTF(this.personalMessage[6].toString(),"Arial",25);
        moneyLabel.attr({
            x:moneySprite.getContentSize().width+10,
            y:moneySprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        moneySprite.addChild(moneyLabel);
        moneySprite.attr({
            x:idLabel.getContentSize().width+40,
            y:idLabel.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        idLabel.addChild(moneySprite);
        idLabel.attr({
            x:photoSprite.getContentSize().width+10,
            y:photoSprite.getContentSize().height/5*3-10,
            anchorX:0,
            anchorY:1
        });
        photoSprite.addChild(idLabel);

        //胜率，胜，败，牌局数
        var stringPlay=
            "胜率:"+ this.personalMessage[7]+
            "  胜:"+this.personalMessage[8]+
            "  败:"+this.personalMessage[9]+
            "  牌局数:"+this.personalMessage[10];
        var playLabel=new cc.LabelTTF(stringPlay,"Arial",25);
        playLabel.attr({
            x:photoSprite.getContentSize().width+10,
            y:photoSprite.getContentSize().height/5*2-10,
            anchorX:0,
            anchorY:1
        });
        photoSprite.addChild(playLabel);

        //个性签名
        var autographString="个性签名:"+this.personalMessage[11];
        var autographLabel=new cc.LabelTTF(autographString,"Arial",25);
        autographLabel.attr({
            x:photoSprite.getContentSize().width+10,
            y:photoSprite.getContentSize().height/5-10,
            anchorX:0,
            anchorY:1
        });
        photoSprite.addChild(autographLabel);
    },
    //初始化个人礼物信息
    initPersonalGiftMessage:function(){
        //礼物背景
        this.giftMessageBackground=new cc.Sprite(res.Rank_gift_back_png);
        this.giftMessageBackground.attr({
            x:this.personalMessageItemBackground.getContentSize().width/2,
            y:this.personalMessageItemBackground.getContentSize().height/5*2+30,
            anchorX:0.5,
            anchorY:1
        });
        this.personalMessageItemBackground.addChild(this.giftMessageBackground);
        //标题
        var labelGift=new cc.LabelTTF("收到的礼物:","Arial",25);
        labelGift.attr({
            x:10,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(labelGift);
        //礼物一
        var gift_item1=new cc.Sprite(res.Rank_gift_item1_png);
        gift_item1.attr({
            x:labelGift.getContentSize().width+10,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(gift_item1);
        var gift_item1_num_back=new cc.Sprite(res.Rank_gift_numberBack_png);
        gift_item1_num_back.attr({
            x:gift_item1.getContentSize().width-3,
            y:gift_item1.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item1.addChild(gift_item1_num_back);
        var labelGift_item1_number=new cc.LabelTTF(this.personalMessage[12].toString(),"Arial",20);
        labelGift_item1_number.attr({
            x:gift_item1_num_back.getContentSize().width/2,
            y:gift_item1_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item1_num_back.addChild(labelGift_item1_number);
        //礼物二
        var gift_item2=new cc.Sprite(res.Rank_gift_item2_png);
        gift_item2.attr({
            x:labelGift.getContentSize().width+20+gift_item1.getContentSize().width*1,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(gift_item2);
        var gift_item2_num_back=new cc.Sprite(res.Rank_gift_numberBack_png);
        gift_item2_num_back.attr({
            x:gift_item2.getContentSize().width-3,
            y:gift_item2.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item2.addChild(gift_item2_num_back);
        var labelGift_item2_number=new cc.LabelTTF(this.personalMessage[13].toString(),"Arial",20);
        labelGift_item2_number.attr({
            x:gift_item2_num_back.getContentSize().width/2,
            y:gift_item2_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item2_num_back.addChild(labelGift_item2_number);
        //礼物三
        var gift_item3=new cc.Sprite(res.Rank_gift_item3_png);
        gift_item3.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*2,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(gift_item3);
        var gift_item3_num_back=new cc.Sprite(res.Rank_gift_numberBack_png);
        gift_item3_num_back.attr({
            x:gift_item3.getContentSize().width-3,
            y:gift_item3.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item3.addChild(gift_item3_num_back);
        var labelGift_item3_number=new cc.LabelTTF(this.personalMessage[14].toString(),"Arial",20);
        labelGift_item3_number.attr({
            x:gift_item3_num_back.getContentSize().width/2,
            y:gift_item3_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item3_num_back.addChild(labelGift_item3_number);
        //礼物四
        var gift_item4=new cc.Sprite(res.Rank_gift_item4_png);
        gift_item4.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*3,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(gift_item4);
        var gift_item4_num_back=new cc.Sprite(res.Rank_gift_numberBack_png);
        gift_item4_num_back.attr({
            x:gift_item4.getContentSize().width-3,
            y:gift_item4.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item4.addChild(gift_item4_num_back);
        var labelGift_item4_number=new cc.LabelTTF(this.personalMessage[15].toString(),"Arial",20);
        labelGift_item4_number.attr({
            x:gift_item4_num_back.getContentSize().width/2,
            y:gift_item4_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item4_num_back.addChild(labelGift_item4_number);
        //礼物五
        var gift_item5=new cc.Sprite(res.Rank_gift_item5_png);
        gift_item5.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*4,
            y:this.giftMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftMessageBackground.addChild(gift_item5);
        var gift_item5_num_back=new cc.Sprite(res.Rank_gift_numberBack_png);
        gift_item5_num_back.attr({
            x:gift_item5.getContentSize().width-3,
            y:gift_item5.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item5.addChild(gift_item5_num_back);
        var labelGift_item5_number=new cc.LabelTTF(this.personalMessage[16].toString(),"Arial",20);
        labelGift_item5_number.attr({
            x:gift_item5_num_back.getContentSize().width/2,
            y:gift_item5_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item5_num_back.addChild(labelGift_item5_number);
    },
    //初始化赠送礼物按钮和添加好友按钮
    initSendGiftMenuAndAddFriendMenu:function(){
        //赠送礼物按钮
        var sendGiftSprite1=new cc.Sprite(res.Rank_otherMenu_png);
        var sendGiftSprite2=new cc.Sprite(res.Rank_otherMenu_png);
        var sendGiftSprite3=new cc.Sprite(res.Rank_otherMenu_png);
        var labelSendString1=new cc.LabelTTF("赠送礼物","Arial",30);
        labelSendString1.attr({
            x:sendGiftSprite1.getContentSize().width/2,
            y:sendGiftSprite1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        sendGiftSprite1.addChild(labelSendString1);
        var labelSendString2=new cc.LabelTTF("赠送礼物","Arial",30);
        labelSendString2.attr({
            x:sendGiftSprite2.getContentSize().width/2,
            y:sendGiftSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        sendGiftSprite2.addChild(labelSendString2);
        var labelSendString3=new cc.LabelTTF("赠送礼物","Arial",30);
        labelSendString3.attr({
            x:sendGiftSprite3.getContentSize().width/2,
            y:sendGiftSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        sendGiftSprite3.addChild(labelSendString3);
        var sendGiftMenuItem=new cc.MenuItemSprite(sendGiftSprite1,sendGiftSprite2,sendGiftSprite3,
            this.menuCallbackSendGiftAndAddFriend,this);
        sendGiftMenuItem.setName("sendGift");

        //添加好友按钮
        var addFriendSprite1=new cc.Sprite(res.Rank_otherMenu_png);
        var addFriendSprite2=new cc.Sprite(res.Rank_otherMenu_png);
        var addFriendSprite3=new cc.Sprite(res.Rank_otherMenu_png);
        var labelAddFriendString1=new cc.LabelTTF("添加好友","Arial",30);
        labelAddFriendString1.attr({
            x:addFriendSprite1.getContentSize().width/2,
            y:addFriendSprite1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        addFriendSprite1.addChild(labelAddFriendString1);
        var labelAddFriendString2=new cc.LabelTTF("添加好友","Arial",30);
        labelAddFriendString2.attr({
            x:addFriendSprite2.getContentSize().width/2,
            y:addFriendSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        addFriendSprite2.addChild(labelAddFriendString2);
        var labelAddFriendString3=new cc.LabelTTF("添加好友","Arial",30);
        labelAddFriendString3.attr({
            x:addFriendSprite3.getContentSize().width/2,
            y:addFriendSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        addFriendSprite3.addChild(labelAddFriendString3);
        var addFriendMenuItem=new cc.MenuItemSprite(addFriendSprite1,addFriendSprite2,addFriendSprite3,
            this.menuCallbackSendGiftAndAddFriend,this);
        addFriendMenuItem.setName("addFriend");

        var menuBoth=new cc.Menu(sendGiftMenuItem,addFriendMenuItem);
        menuBoth.alignItemsHorizontallyWithPadding(200);
        menuBoth.attr({
            x:this.personalMessageBackground.getContentSize().width/2,
            y:30,
            anchorX:0.5,
            anchorY:0
        });
        this.personalMessageBackground.addChild(menuBoth);
    },
    //关闭按钮回调函数
    menuCallbackClose:function(){
        this.destoty();
        this.removeFromParent();
    },
    //赠送礼物和添加好友按钮回调函数
    menuCallbackSendGiftAndAddFriend:function(sender){
        console.log(sender.getName());
        //销毁之前的个人信息界面
        cc.eventManager.removeListener(this.m_touchListener1);
        this.m_touchListener1=null;
        this.personalMessageBackground.removeFromParent();
        this.personalMessageBackground=null;

        //创建送礼选择界面
        this.sendGiftSelectBackground=new cc.Sprite(res.Rank_sendGiftSelectBackground_png);
        this.sendGiftSelectBackground.setPosition(this.spriteSelectBack.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.sendGiftSelectBackground);

        //添加关闭按钮
        var closeSprite1=new cc.Sprite(res.RankClose_png);
        var closeSprite2=new cc.Sprite(res.RankClose_png);
        var closeSprite3=new cc.Sprite(res.RankClose_png);
        var closeMenuItem=new cc.MenuItemSprite(closeSprite1,closeSprite2,closeSprite3,
            this.menuCallbackClose_selectGift,this);
        var closeMenu=new cc.Menu(closeMenuItem);
        closeMenu.setPosition(this.sendGiftSelectBackground.getContentSize().width-closeSprite1.getContentSize().width/2,
            this.sendGiftSelectBackground.getContentSize().height-closeSprite1.getContentSize().height/2);
        closeMenu.setAnchorPoint(0.5,0.5);
        this.sendGiftSelectBackground.addChild(closeMenu);

        //添加花纹
        var leftFlower_background=new cc.Sprite(res.RankBack_flowerLeft_png);
        var rightFlower_background=new cc.Sprite(res.RankBack_flowerRight_png);
        leftFlower_background.setPosition(this.sendGiftSelectBackground.getContentSize().width/4,
            this.sendGiftSelectBackground.getContentSize().height-50);
        rightFlower_background.setPosition(this.sendGiftSelectBackground.getContentSize().width*3/4,
            this.sendGiftSelectBackground.getContentSize().height-50);
        this.sendGiftSelectBackground.addChild(leftFlower_background);
        this.sendGiftSelectBackground.addChild(rightFlower_background);

        //添加标题
        var labelTitle=new cc.LabelTTF("赠送礼物","Arial",30);
        labelTitle.setPosition(this.sendGiftSelectBackground.getContentSize().width/2,
            this.sendGiftSelectBackground.getContentSize().height-50);
        this.sendGiftSelectBackground.addChild(labelTitle);

        /*礼物信息按钮*/
        //礼物按钮一
        var giftMenuItem1_Sprite1=new cc.Sprite(res.Rank_gift_item1_png);
        var giftMenuItem1_Sprite2=new cc.Sprite(res.Rank_gift_item1_png);
        var giftMenuItem1_Sprite3=new cc.Sprite(res.Rank_gift_item1_png);
        var labelMoney1_String1=new cc.LabelTTF("5000金币","Arial",20);
        labelMoney1_String1.attr({
            x:giftMenuItem1_Sprite1.getContentSize().width/2,
            y:giftMenuItem1_Sprite1.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem1_Sprite1.addChild(labelMoney1_String1);
        var labelMoney1_String2=new cc.LabelTTF("5000金币","Arial",20);
        labelMoney1_String2.attr({
            x:giftMenuItem1_Sprite2.getContentSize().width/2,
            y:giftMenuItem1_Sprite2.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem1_Sprite2.addChild(labelMoney1_String2);
        var labelMoney1_String3=new cc.LabelTTF("5000金币","Arial",20);
        labelMoney1_String3.attr({
            x:giftMenuItem1_Sprite3.getContentSize().width/2,
            y:giftMenuItem1_Sprite3.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem1_Sprite3.addChild(labelMoney1_String3);
        var giftMenuItem1=new cc.MenuItemSprite(giftMenuItem1_Sprite1,giftMenuItem1_Sprite2,giftMenuItem1_Sprite3,
            this.menuCallbackSelectGift,this);
        if(sender.getName()=="sendGift"){
            giftMenuItem1.setName("1");
        }else{
            giftMenuItem1.setName("yi");
        }

        //礼物按钮二
        var giftMenuItem2_Sprite1=new cc.Sprite(res.Rank_gift_item2_png);
        var giftMenuItem2_Sprite2=new cc.Sprite(res.Rank_gift_item2_png);
        var giftMenuItem2_Sprite3=new cc.Sprite(res.Rank_gift_item2_png);
        var labelMoney2_String1=new cc.LabelTTF("20000金币","Arial",20);
        labelMoney2_String1.attr({
            x:giftMenuItem2_Sprite1.getContentSize().width/2,
            y:giftMenuItem2_Sprite1.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem2_Sprite1.addChild(labelMoney2_String1);
        var labelMoney2_String2=new cc.LabelTTF("20000金币","Arial",20);
        labelMoney2_String2.attr({
            x:giftMenuItem2_Sprite2.getContentSize().width/2,
            y:giftMenuItem2_Sprite2.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem2_Sprite2.addChild(labelMoney2_String2);
        var labelMoney2_String3=new cc.LabelTTF("20000金币","Arial",20);
        labelMoney2_String3.attr({
            x:giftMenuItem2_Sprite3.getContentSize().width/2,
            y:giftMenuItem2_Sprite3.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem2_Sprite3.addChild(labelMoney2_String3);
        var giftMenuItem2=new cc.MenuItemSprite(giftMenuItem2_Sprite1,giftMenuItem2_Sprite2,giftMenuItem2_Sprite3,
            this.menuCallbackSelectGift,this);
        if(sender.getName()=="sendGift"){
            giftMenuItem2.setName("2");
        }else{
            giftMenuItem2.setName("er");
        }

        //礼物按钮三
        var giftMenuItem3_Sprite1=new cc.Sprite(res.Rank_gift_item3_png);
        var giftMenuItem3_Sprite2=new cc.Sprite(res.Rank_gift_item3_png);
        var giftMenuItem3_Sprite3=new cc.Sprite(res.Rank_gift_item3_png);
        var labelMoney3_String1=new cc.LabelTTF("20万金币","Arial",20);
        labelMoney3_String1.attr({
            x:giftMenuItem3_Sprite1.getContentSize().width/2,
            y:giftMenuItem3_Sprite1.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem3_Sprite1.addChild(labelMoney3_String1);
        var labelMoney3_String2=new cc.LabelTTF("20万金币","Arial",20);
        labelMoney3_String2.attr({
            x:giftMenuItem3_Sprite2.getContentSize().width/2,
            y:giftMenuItem3_Sprite2.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem3_Sprite2.addChild(labelMoney3_String2);
        var labelMoney3_String3=new cc.LabelTTF("20万金币","Arial",20);
        labelMoney3_String3.attr({
            x:giftMenuItem3_Sprite3.getContentSize().width/2,
            y:giftMenuItem3_Sprite3.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem3_Sprite3.addChild(labelMoney3_String3);
        var giftMenuItem3=new cc.MenuItemSprite(giftMenuItem3_Sprite1,giftMenuItem3_Sprite2,giftMenuItem3_Sprite3,
            this.menuCallbackSelectGift,this);
        if(sender.getName()=="sendGift"){
            giftMenuItem3.setName("3");
        }else{
            giftMenuItem3.setName("san");
        }

        //礼物按钮四
        var giftMenuItem4_Sprite1=new cc.Sprite(res.Rank_gift_item4_png);
        var giftMenuItem4_Sprite2=new cc.Sprite(res.Rank_gift_item4_png);
        var giftMenuItem4_Sprite3=new cc.Sprite(res.Rank_gift_item4_png);
        var labelMoney4_String1=new cc.LabelTTF("50万金币","Arial",20);
        labelMoney4_String1.attr({
            x:giftMenuItem4_Sprite1.getContentSize().width/2,
            y:giftMenuItem4_Sprite1.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem4_Sprite1.addChild(labelMoney4_String1);
        var labelMoney4_String2=new cc.LabelTTF("50万金币","Arial",20);
        labelMoney4_String2.attr({
            x:giftMenuItem4_Sprite2.getContentSize().width/2,
            y:giftMenuItem4_Sprite2.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem4_Sprite2.addChild(labelMoney4_String2);
        var labelMoney4_String3=new cc.LabelTTF("50万金币","Arial",20);
        labelMoney4_String3.attr({
            x:giftMenuItem4_Sprite3.getContentSize().width/2,
            y:giftMenuItem4_Sprite3.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem4_Sprite3.addChild(labelMoney4_String3);
        var giftMenuItem4=new cc.MenuItemSprite(giftMenuItem4_Sprite1,giftMenuItem4_Sprite2,giftMenuItem4_Sprite3,
            this.menuCallbackSelectGift,this);
        if(sender.getName()=="sendGift"){
            giftMenuItem4.setName("4");
        }else{
            giftMenuItem4.setName("si");
        }

        //礼物按钮五
        var giftMenuItem5_Sprite1=new cc.Sprite(res.Rank_gift_item5_png);
        var giftMenuItem5_Sprite2=new cc.Sprite(res.Rank_gift_item5_png);
        var giftMenuItem5_Sprite3=new cc.Sprite(res.Rank_gift_item5_png);
        var labelMoney5_String1=new cc.LabelTTF("100万金币","Arial",20);
        labelMoney5_String1.attr({
            x:giftMenuItem5_Sprite1.getContentSize().width/2,
            y:giftMenuItem5_Sprite1.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem5_Sprite1.addChild(labelMoney5_String1);
        var labelMoney5_String2=new cc.LabelTTF("100万金币","Arial",20);
        labelMoney5_String2.attr({
            x:giftMenuItem5_Sprite2.getContentSize().width/2,
            y:giftMenuItem5_Sprite2.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem5_Sprite2.addChild(labelMoney5_String2);
        var labelMoney5_String3=new cc.LabelTTF("100万金币","Arial",20);
        labelMoney5_String3.attr({
            x:giftMenuItem5_Sprite3.getContentSize().width/2,
            y:giftMenuItem5_Sprite3.getContentSize().height/5,
            anchorX:0.5,
            anchorY:0.5
        });
        giftMenuItem5_Sprite3.addChild(labelMoney5_String3);
        var giftMenuItem5=new cc.MenuItemSprite(giftMenuItem5_Sprite1,giftMenuItem5_Sprite2,giftMenuItem5_Sprite3,
            this.menuCallbackSelectGift,this);
        if(sender.getName()=="sendGift"){
            giftMenuItem5.setName("5");
        }else{
            giftMenuItem5.setName("wu");
        }

        var giftMenu=new cc.Menu(giftMenuItem1,giftMenuItem2,giftMenuItem3,giftMenuItem4,giftMenuItem5);
        giftMenu.alignItemsHorizontallyWithPadding(20);
        giftMenu.attr({
            x:this.sendGiftSelectBackground.getContentSize().width/2,
            y:this.sendGiftSelectBackground.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.sendGiftSelectBackground.addChild(giftMenu);

        //界面提示信息
        if(sender.getName()=="sendGift"){
            var labelWarn=new cc.LabelTTF("选择礼物，对方可获得礼物价值的10%的金币！","Arial",30);
            labelWarn.attr({
                x:this.sendGiftSelectBackground.getContentSize().width/2,
                y:this.sendGiftSelectBackground.getContentSize().height/6,
                anchorX:0.5,
                anchorY:0.5
            });
            this.sendGiftSelectBackground.addChild(labelWarn);

        }
        else{
            var labelWarn=new cc.LabelTTF("选择见面礼，对方可获得礼物价值的10%的金币！","Arial",30);
            labelWarn.attr({
                x:this.sendGiftSelectBackground.getContentSize().width/2,
                y:this.sendGiftSelectBackground.getContentSize().height/6,
                anchorX:0.5,
                anchorY:0.5
            });
            this.sendGiftSelectBackground.addChild(labelWarn);
        }

        this.m_touchListener1=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){

                }
                else{
                    this.destoty();
                    this.removeFromParent();
                    console.log("clink background return");
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.sendGiftSelectBackground);
    },
    //礼物选择的关闭按钮回调函数
    menuCallbackClose_selectGift:function(){
        this.destoty();
        this.removeFromParent();
    },
    //选择所赠送的礼物时回调的函数
    menuCallbackSelectGift:function(sender){
        console.log(sender.getName());
        //1-5表示赠送礼物按钮界面触发的回调函数
        //yi-wu表示添加好友按钮界面触发的回调函数
        switch (sender.getName()){
            case "1":
                break;
            case "2":
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "yi":
                break;
            case "er":
                break;
            case "san":
                break;
            case "si":
                break;
            case "wu":
                break;
            default :
                break;
        }
        this.destoty();
        this.removeFromParent();

    },
    //销毁监听
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});