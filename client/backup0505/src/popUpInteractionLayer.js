/**
 * Created by guowanfu on 2016/4/5.
 */
//互动表情的玩家服务器位置
var g_playerPositionServer_interaction=0;
//互动表情的表情编号
var g_faceIteractionNumber=0;
var PopUpInteractionLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,
    //交互界面背景
    interactionBackground:null,
    //玩家信息礼物背景
    giftBackground:null,
    //赠送礼物选择背景,点击赠送礼物按钮或添加好友按钮时弹出
    sendGiftSelectBackground:null,

    playerPositionServer:null,
    id:null,
    sex:"man",
    money:0,
    autograph:"No autograph!",
    vip:0,
    photoPathString:null,
    gift1_num:0,
    gift2_num:0,
    gift3_num:0,
    gift4_num:0,
    gift5_num:0,

    //将玩家Id，玩家服务器位置，玩家性别，玩家金币，玩家签名，
    // 玩家vip级别，玩家收到各个礼物的数量和玩家照片存储位置作为参数传入（目前数据不全）
    ctor:function(id,positionServer){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0));
        this.initInteractionFrameAndContent(id,positionServer);
    },
    //初始化交互界面的框架和内容
    initInteractionFrameAndContent:function(id,positionServer){
        var size=cc.director.getWinSize();
        //初始化玩家基本信息
        this.id=id;
        this.playerPositionServer=positionServer;

        //透明背景
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack);

        //个人信息背景框
        this.interactionBackground=new cc.Sprite(res.InteractionBackground_png);
        this.interactionBackground.setPosition(this.spriteSelectBack.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.interactionBackground);

        //添加关闭按钮
        var closeSprite1=new cc.Sprite(res.Close_png);
        var closeSprite2=new cc.Sprite(res.Close_png);
        var closeSprite3=new cc.Sprite(res.Close_png);
        var closeMenuItem=new cc.MenuItemSprite(closeSprite1,closeSprite2,closeSprite3,
            this.menuCallbackClose,this);
        var closeMenu=new cc.Menu(closeMenuItem);
        closeMenu.setPosition(this.interactionBackground.getContentSize().width-closeSprite1.getContentSize().width/2,
            this.interactionBackground.getContentSize().height-closeSprite1.getContentSize().height/2);
        closeMenu.setAnchorPoint(0.5,0.5);
        this.interactionBackground.addChild(closeMenu);

        //添加花纹
        var leftFlower_background=new cc.Sprite(res.Back_flowerLeft_png);
        var rightFlower_background=new cc.Sprite(res.Back_flowerRight_png);
        leftFlower_background.setPosition(this.interactionBackground.getContentSize().width/4,
        this.interactionBackground.getContentSize().height-50);
        rightFlower_background.setPosition(this.interactionBackground.getContentSize().width*3/4,
            this.interactionBackground.getContentSize().height-50);
        this.interactionBackground.addChild(leftFlower_background);
        this.interactionBackground.addChild(rightFlower_background);

        //添加主题标签
        var labelTitle=new cc.LabelTTF("个人信息","Arial",30);
        labelTitle.setPosition(this.interactionBackground.getContentSize().width/2,
            this.interactionBackground.getContentSize().height-50);
        this.interactionBackground.addChild(labelTitle);

        //添加玩家基本信息和互动按钮
        this.initPlayerMessageAndInteractionMenu();

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
        cc.eventManager.addListener(this.m_touchListener1,this.interactionBackground);


    },
    //初始化玩家的基本信息和互动按钮
    initPlayerMessageAndInteractionMenu:function(){
        console.log("w0");
        /*基本信息*/
        //头像
        var myselfPhoto=null;
        if(this.photoPathString==null){
            if(this.sex=="man"){
                console.log("w1");
                myselfPhoto=new cc.Sprite(res.Man_jpg);
            }
            else{
                console.log("w2");
                myselfPhoto=new cc.Sprite(res.Woman_jpg);
            }
        }
        else{
            console.log("w3");
           // myselfPhoto=new cc.Sprite(this.photoPathString);
        }
        myselfPhoto.setPosition(this.interactionBackground.getContentSize().width*1/8,
            this.interactionBackground.getContentSize().height-myselfPhoto.getContentSize().height/2-30);
        this.interactionBackground.addChild(myselfPhoto);
        //相框
        var photoFrame=new cc.Sprite(res.MyselfPhotoFrame_png);
        photoFrame.setPosition(myselfPhoto.getContentSize().width/2,myselfPhoto.getContentSize().height/2);
        myselfPhoto.addChild(photoFrame);
        //玩家id
        var labelId=new cc.LabelTTF(this.id,"Arial",30);
        labelId.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20,
            y : this.interactionBackground.getContentSize().height-70,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(labelId);
        //玩家性别
        var sexSprite=null;
        if(this.sex=="man"){
            console.log("man");
            sexSprite=new cc.Sprite(res.Boy_png);
        }
        else{
            console.log("woman");
            sexSprite=new cc.Sprite(res.Girl_png);
        }
        sexSprite.attr({
            x:labelId.getContentSize().width+5,
            y:labelId.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        labelId.addChild(sexSprite);
        //金币图标
        var moneySprite=new cc.Sprite(res.MoneyPicture_png);
        moneySprite.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20,
            y : this.interactionBackground.getContentSize().height-100,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(moneySprite);
        //金币数目
        var labelMoney=new cc.LabelTTF(this.money.toString(),"Arial",30);
        labelMoney.attr({
            x:moneySprite.getContentSize().width+5,
            y:moneySprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        moneySprite.addChild(labelMoney);
        //个性签名
        var autographString="个性签名:"+this.autograph;
        var labelAutograph=new cc.LabelTTF(autographString,"Arial",25);
        labelAutograph.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20,
            y : this.interactionBackground.getContentSize().height-130,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(labelAutograph);

        /*交互按钮*/
        //送花按钮
        var flowerSprite1=new cc.Sprite(res.Flower_png);
        var flowerSprite2=new cc.Sprite(res.Flower_png);
        var flowerSprite3=new cc.Sprite(res.Flower_png);
        var flowerMenuItem=new cc.MenuItemSprite(flowerSprite1,flowerSprite2,flowerSprite3,
            this.menuCallbackInteraction,this);
        flowerMenuItem.setName("1");
        flowerMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var flowerMenu=new cc.Menu(flowerMenuItem);
        flowerMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20,
            y : this.interactionBackground.getContentSize().height-130-flowerSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(flowerMenu);
        //点赞按钮
        var cheersSprite1=new cc.Sprite(res.Cheers_png);
        var cheersSprite2=new cc.Sprite(res.Cheers_png);
        var cheersSprite3=new cc.Sprite(res.Cheers_png);
        var cheersMenuItem=new cc.MenuItemSprite(cheersSprite1,cheersSprite2,cheersSprite3,
            this.menuCallbackInteraction,this);
        cheersMenuItem.setName("2");
        cheersMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var cheerMenu=new cc.Menu(cheersMenuItem);
        cheerMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20+80*1,
            y : this.interactionBackground.getContentSize().height-130-cheersSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(cheerMenu);
        //亲吻按钮
        var kissSprite1=new cc.Sprite(res.Kiss_png);
        var kissSprite2=new cc.Sprite(res.Kiss_png);
        var kissSprite3=new cc.Sprite(res.Kiss_png);
        var kissMenuItem=new cc.MenuItemSprite(kissSprite1,kissSprite2,kissSprite3,
            this.menuCallbackInteraction,this);
        kissMenuItem.setName("3");
        kissMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var kissMenu=new cc.Menu(kissMenuItem);
        kissMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20+80*2,
            y : this.interactionBackground.getContentSize().height-130-kissSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(kissMenu);
        //仍鸡蛋按钮
        var eggSprite1=new cc.Sprite(res.Egg_png);
        var eggSprite2=new cc.Sprite(res.Egg_png);
        var eggSprite3=new cc.Sprite(res.Egg_png);
        var eggMenuItem=new cc.MenuItemSprite(eggSprite1,eggSprite2,eggSprite3,
            this.menuCallbackInteraction,this);
        eggMenuItem.setName("4");
        eggMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var eggMenu=new cc.Menu(eggMenuItem);
        eggMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20+80*3,
            y : this.interactionBackground.getContentSize().height-130-eggSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(eggMenu);
        //扔鞋按钮
        var shoeSprite1=new cc.Sprite(res.Shoe_png);
        var shoeSprite2=new cc.Sprite(res.Shoe_png);
        var shoeSprite3=new cc.Sprite(res.Shoe_png);
        var shoeMenuItem=new cc.MenuItemSprite(shoeSprite1,shoeSprite2,shoeSprite3,
            this.menuCallbackInteraction,this);
        shoeMenuItem.setName("5");
        shoeMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var shoeMenu=new cc.Menu(shoeMenuItem);
        shoeMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20+80*4,
            y : this.interactionBackground.getContentSize().height-130-shoeSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(shoeMenu);

        //仍炸弹按钮
        var bombSprite1=new cc.Sprite(res.Bomb_png);
        var bombSprite2=new cc.Sprite(res.Bomb_png);
        var bombSprite3=new cc.Sprite(res.Bomb_png);
        var bombMenuItem=new cc.MenuItemSprite(bombSprite1,bombSprite2,bombSprite3,
            this.menuCallbackInteraction,this);
        bombMenuItem.setName("6");
        bombMenuItem.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0
        });
        var bombMenu=new cc.Menu(bombMenuItem);
        bombMenu.attr({
            x : this.interactionBackground.getContentSize().width*1/8+myselfPhoto.getContentSize().width/2+20+80*5,
            y : this.interactionBackground.getContentSize().height-130-bombSprite1.getContentSize().height,
            anchorX : 0,
            anchorY : 0
        });
        this.interactionBackground.addChild(bombMenu);

        /*礼物信息*/
        //礼物背景
        this.giftBackground=new cc.Sprite(res.Gift_back_png);
        this.giftBackground.attr({
            x:12,
            y:this.interactionBackground.getContentSize().height-130-bombSprite1.getContentSize().height-
            this.giftBackground.getContentSize().height,
            anchorX:0,
            anchorY:0
        });
        this.interactionBackground.addChild(this.giftBackground);
        //初始化礼物信息和其他按钮
        this.initGiftMessageAndOtherMenu();
    },
    //初始化玩家的收到礼物数量信息、赠送礼物按钮和添加好友按钮
    initGiftMessageAndOtherMenu:function(){
        //标题
        var labelGift=new cc.LabelTTF("收到的礼物:","Arial",30);
        labelGift.attr({
            x:10,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(labelGift);
        //礼物一
        var gift_item1=new cc.Sprite(res.Gift_item1_png);
        gift_item1.attr({
            x:labelGift.getContentSize().width+10,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(gift_item1);
        var gift_item1_num_back=new cc.Sprite(res.Gift_numberBack_png);
        gift_item1_num_back.attr({
            x:gift_item1.getContentSize().width-3,
            y:gift_item1.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item1.addChild(gift_item1_num_back);
        var labelGift_item1_number=new cc.LabelTTF(this.gift1_num.toString(),"Arial",20);
        labelGift_item1_number.attr({
            x:gift_item1_num_back.getContentSize().width/2,
            y:gift_item1_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item1_num_back.addChild(labelGift_item1_number);
        //礼物二
        var gift_item2=new cc.Sprite(res.Gift_item2_png);
        gift_item2.attr({
            x:labelGift.getContentSize().width+20+gift_item1.getContentSize().width*1,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(gift_item2);
        var gift_item2_num_back=new cc.Sprite(res.Gift_numberBack_png);
        gift_item2_num_back.attr({
            x:gift_item2.getContentSize().width-3,
            y:gift_item2.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item2.addChild(gift_item2_num_back);
        var labelGift_item2_number=new cc.LabelTTF(this.gift2_num.toString(),"Arial",20);
        labelGift_item2_number.attr({
            x:gift_item2_num_back.getContentSize().width/2,
            y:gift_item2_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item2_num_back.addChild(labelGift_item2_number);
        //礼物三
        var gift_item3=new cc.Sprite(res.Gift_item3_png);
        gift_item3.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*2,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(gift_item3);
        var gift_item3_num_back=new cc.Sprite(res.Gift_numberBack_png);
        gift_item3_num_back.attr({
            x:gift_item3.getContentSize().width-3,
            y:gift_item3.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item3.addChild(gift_item3_num_back);
        var labelGift_item3_number=new cc.LabelTTF(this.gift3_num.toString(),"Arial",20);
        labelGift_item3_number.attr({
            x:gift_item3_num_back.getContentSize().width/2,
            y:gift_item3_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item3_num_back.addChild(labelGift_item3_number);
        //礼物四
        var gift_item4=new cc.Sprite(res.Gift_item4_png);
        gift_item4.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*3,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(gift_item4);
        var gift_item4_num_back=new cc.Sprite(res.Gift_numberBack_png);
        gift_item4_num_back.attr({
            x:gift_item4.getContentSize().width-3,
            y:gift_item4.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item4.addChild(gift_item4_num_back);
        var labelGift_item4_number=new cc.LabelTTF(this.gift4_num.toString(),"Arial",20);
        labelGift_item4_number.attr({
            x:gift_item4_num_back.getContentSize().width/2,
            y:gift_item4_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item4_num_back.addChild(labelGift_item4_number);
        //礼物五
        var gift_item5=new cc.Sprite(res.Gift_item5_png);
        gift_item5.attr({
            x:labelGift.getContentSize().width+(20+gift_item1.getContentSize().width)*4,
            y:this.giftBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.giftBackground.addChild(gift_item5);
        var gift_item5_num_back=new cc.Sprite(res.Gift_numberBack_png);
        gift_item5_num_back.attr({
            x:gift_item5.getContentSize().width-3,
            y:gift_item5.getContentSize().height-3,
            anchorX:1,
            anchorY:1
        });
        gift_item5.addChild(gift_item5_num_back);
        var labelGift_item5_number=new cc.LabelTTF(this.gift5_num.toString(),"Arial",20);
        labelGift_item5_number.attr({
            x:gift_item5_num_back.getContentSize().width/2,
            y:gift_item5_num_back.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gift_item5_num_back.addChild(labelGift_item5_number);

        //赠送礼物按钮
        var sendGiftSprite1=new cc.Sprite(res.OtherMenu_png);
        var sendGiftSprite2=new cc.Sprite(res.OtherMenu_png);
        var sendGiftSprite3=new cc.Sprite(res.OtherMenu_png);
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
        var addFriendSprite1=new cc.Sprite(res.OtherMenu_png);
        var addFriendSprite2=new cc.Sprite(res.OtherMenu_png);
        var addFriendSprite3=new cc.Sprite(res.OtherMenu_png);
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
            x:this.interactionBackground.getContentSize().width/2,
            y:this.interactionBackground.getContentSize().height-
              130-100-this.giftBackground.getContentSize().height-addFriendSprite1.getContentSize().height,
            anchorX:0.5,
            anchorY:0.5
        });
        this.interactionBackground.addChild(menuBoth);
    },
    //互动按钮回调函数
    menuCallbackInteraction:function(sender){
        console.log("player whose positionServer is "+myselfPlayerPositionServer+" give a "+
        sender.getName()+" to "+"the player whose positionServer is "+this.playerPositionServer);
        g_playerPositionServer_interaction=this.playerPositionServer;
        g_faceIteractionNumber=parseInt(sender.getName());
        pomelo.request('game.gameChatHandler.sendMes',{
            chatType:"Interaction",
            position1:myselfPlayerPositionServer,
            position2:g_playerPositionServer_interaction,
            chatContent:g_faceIteractionNumber
        },function(data){
            console.log('----------+++++++++++----------'+JSON.stringify(data));
        });
        this.destoty();
        this.removeFromParent();
    },
    //关闭互动界面按钮的回调函数
    menuCallbackClose:function(){
        this.destoty();
        this.removeFromParent();
        console.log("close interaction layer");
    },
    //赠送礼物和添加好友按钮回调函数
    menuCallbackSendGiftAndAddFriend:function(sender){
        //销毁之前的聊天互动界面
        cc.eventManager.removeListener(this.m_touchListener1);
        this.m_touchListener1=null;
        this.interactionBackground.removeFromParent();
        this.interactionBackground=null;

        //创建送礼选择界面
        this.sendGiftSelectBackground=new cc.Sprite(res.SendGiftSelectBackground_png);
        this.sendGiftSelectBackground.setPosition(this.spriteSelectBack.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.sendGiftSelectBackground);

        //添加关闭按钮
        var closeSprite1=new cc.Sprite(res.Close_png);
        var closeSprite2=new cc.Sprite(res.Close_png);
        var closeSprite3=new cc.Sprite(res.Close_png);
        var closeMenuItem=new cc.MenuItemSprite(closeSprite1,closeSprite2,closeSprite3,
            this.menuCallbackClose,this);
        var closeMenu=new cc.Menu(closeMenuItem);
        closeMenu.setPosition(this.sendGiftSelectBackground.getContentSize().width-closeSprite1.getContentSize().width/2,
            this.sendGiftSelectBackground.getContentSize().height-closeSprite1.getContentSize().height/2);
        closeMenu.setAnchorPoint(0.5,0.5);
        this.sendGiftSelectBackground.addChild(closeMenu);

        //添加花纹
        var leftFlower_background=new cc.Sprite(res.Back_flowerLeft_png);
        var rightFlower_background=new cc.Sprite(res.Back_flowerRight_png);
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
        var giftMenuItem1_Sprite1=new cc.Sprite(res.Gift_item1_png);
        var giftMenuItem1_Sprite2=new cc.Sprite(res.Gift_item1_png);
        var giftMenuItem1_Sprite3=new cc.Sprite(res.Gift_item1_png);
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
        var giftMenuItem2_Sprite1=new cc.Sprite(res.Gift_item2_png);
        var giftMenuItem2_Sprite2=new cc.Sprite(res.Gift_item2_png);
        var giftMenuItem2_Sprite3=new cc.Sprite(res.Gift_item2_png);
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
        var giftMenuItem3_Sprite1=new cc.Sprite(res.Gift_item3_png);
        var giftMenuItem3_Sprite2=new cc.Sprite(res.Gift_item3_png);
        var giftMenuItem3_Sprite3=new cc.Sprite(res.Gift_item3_png);
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
        var giftMenuItem4_Sprite1=new cc.Sprite(res.Gift_item4_png);
        var giftMenuItem4_Sprite2=new cc.Sprite(res.Gift_item4_png);
        var giftMenuItem4_Sprite3=new cc.Sprite(res.Gift_item4_png);
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
        var giftMenuItem5_Sprite1=new cc.Sprite(res.Gift_item5_png);
        var giftMenuItem5_Sprite2=new cc.Sprite(res.Gift_item5_png);
        var giftMenuItem5_Sprite3=new cc.Sprite(res.Gift_item5_png);
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
    //选择赠送礼物按钮回调函数
    menuCallbackSelectGift:function(sender){
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