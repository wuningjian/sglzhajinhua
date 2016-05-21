/**
 * Created by guowanfu on 2016/3/29.
 */
//自身表情编号
var g_faceChatNumber=0;
//静态文字聊天编号
var g_staticTackNumber=0;
//玩家输入动态文字聊天字符串
var g_dynamicTackString="";
// 静态聊天字符串数组
var g_staticTackStringArray=new Array();
g_staticTackStringArray.push("快点吧，我等到花儿都谢了！");
g_staticTackStringArray.push("看牌是小狗");
g_staticTackStringArray.push("这牌烂得简直不忍直视！");
g_staticTackStringArray.push("你是手滑了吗?敢跟注我?");
g_staticTackStringArray.push("跟到底，有种都别停！");
g_staticTackStringArray.push("我全押，你敢跟吗?");
g_staticTackStringArray.push("牌小就不要跟我玩！");
g_staticTackStringArray.push("你敢上，我就敢跟，谁怕谁！");
g_staticTackStringArray.push("不要走，决战到天亮！");
g_staticTackStringArray.push("这局我赢定了！");
g_staticTackStringArray.push("遇到我真是你的不幸！");
g_staticTackStringArray.push("不好意思，我又赢了！");
g_staticTackStringArray.push("我要走了，下次再玩吧！");

var PopUpChatLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,
    scrollView:null,
    chatBackground:null,
    faceMenuItem:null,
    tackMenuItem:null,
    chatHistoryMenuItem:null,
    textListener:null,
    textField:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0));

        var size=cc.director.getWinSize();
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack);

        //初始化聊天框内容
        this.initChatFrameAndContent();

    },
    initChatFrameAndContent:function(){
        var size=cc.director.getWinSize();
        this.chatBackground=new cc.Sprite(res.ChatBackground_png);
        var chatItemBackground=new cc.Sprite(res.ChatItemBackGround_png);

        //表情按钮
        var faceMenuItemSprite1=new cc.Sprite(res.FaceItem2_png);
        var faceMenuItemSprite2=new cc.Sprite(res.FaceItem1_png);
        var faceMenuItemSprite3=new cc.Sprite(res.FaceItem1_png);
        this.faceMenuItem=new cc.MenuItemSprite(faceMenuItemSprite1,faceMenuItemSprite2,faceMenuItemSprite3,
        this.menuCallbackFace,this);

        //聊天按钮
        var tackMenuItemSprite1=new cc.Sprite(res.TackingItem2_png);
        var tackMenuItemSprite2=new cc.Sprite(res.TackingItem1_png);
        var tackMenuItemSprite3=new cc.Sprite(res.TackingItem1_png);
        this.tackMenuItem=new cc.MenuItemSprite(tackMenuItemSprite1,tackMenuItemSprite2,tackMenuItemSprite3,
        this.menuCallbackTacking,this);

        //聊天历史按钮
        var chatHistoryMenuItemSprite1=new cc.Sprite(res.ChatHistoryItem2_png);
        var chatHistoryMenuItemSprite2=new cc.Sprite(res.ChatHistoryItem1_png);
        var chatHistoryMenuItemSprite3=new cc.Sprite(res.ChatHistoryItem1_png);
        this.chatHistoryMenuItem=new cc.MenuItemSprite(chatHistoryMenuItemSprite1,chatHistoryMenuItemSprite2,chatHistoryMenuItemSprite3,
        this.menuCallbackChatHistory,this);

        var chatMenu=new cc.Menu(this.faceMenuItem,this.tackMenuItem,this.chatHistoryMenuItem);
        chatMenu.alignItemsHorizontallyWithPadding(0);
        chatMenu.x=chatItemBackground.getContentSize().width/2+3;
        chatMenu.y=chatItemBackground.getContentSize().height/2+12;
        chatItemBackground.addChild(chatMenu);

        chatItemBackground.setPosition(this.chatBackground.getContentSize().width/2,
            this.chatBackground.getContentSize().height-chatItemBackground.getContentSize().height);
        this.chatBackground.addChild(chatItemBackground);

        //发送按钮
        var sendMenuItemSprite1=new cc.Sprite(res.SendItem_png);
        var sendMenuItemSprite2=new cc.Sprite(res.SendItem_png);
        var sendMenuItemSprite3=new cc.Sprite(res.SendItem_png);
        var sendMenuItem=new cc.MenuItemSprite(sendMenuItemSprite1,sendMenuItemSprite2,sendMenuItemSprite3,
        this.menuCallbackSend,this);
        var sendMenu=new cc.Menu(sendMenuItem);
        sendMenu.x=this.chatBackground.getContentSize().width-sendMenuItem.getContentSize().width+25;
        sendMenu.y=sendMenuItem.getContentSize().height-10;
        this.chatBackground.addChild(sendMenu);

        //输入文本背景
        var inputTxtBackground=new cc.Sprite(res.InputTxtBackground_png);
        inputTxtBackground.setPosition(inputTxtBackground.getContentSize().width/2+25,
            inputTxtBackground.getContentSize().height-10);
        this.chatBackground.addChild(inputTxtBackground);

        //输入文本图标
        var inputPicture=new cc.Sprite(res.InputPicture_png);
        inputPicture.setPosition(inputPicture.getContentSize().width/2+25,
            inputTxtBackground.getContentSize().height-10);
        this.chatBackground.addChild(inputPicture);

        //输入框
        this.textField = new cc.TextFieldTTF("输入聊天内容...",
            cc.size(inputTxtBackground.getContentSize().width,inputTxtBackground.getContentSize().height),
            cc.TEXT_ALIGNMENT_CENTER,"Arial", 32);
        this.textField.setPosition(inputTxtBackground.getContentSize().width/2+25,
            inputTxtBackground.getContentSize().height-10);
        this.chatBackground.addChild(this.textField);
        this.textListener=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    console.log("DAO:"+this.textField.attachWithIME());
                    //console.log("DAO1:"+this.textField.detachWithIME());
                    //this.textField.setString("");
                }
                else{

                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.textListener,this.textField);

        //第一次进入聊天界面，默认开启的是表情选择界面
        this.menuCallbackFace();

        this.chatBackground.setPosition(this.chatBackground.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height-this.chatBackground.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.chatBackground,1);
        //this.chatBackground.setName("chatBackground");

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
                    //console.log("Yes");
                }
                else{
                    this.destoty();
                    this.removeFromParent();
                    //console.log("No");
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.chatBackground);
    },
    menuCallbackFace:function(){
        //this.spriteSelectBack.getChildByName("chatBackground");
        this.faceMenuItem.setEnabled(false);
        this.chatHistoryMenuItem.setEnabled(true);
        this.tackMenuItem.setEnabled(true);
        if(this.scrollView!=null){
            this.scrollView.removeFromParent();
            this.scrollView=null;
        }
        //滚动框
        this.scrollView=new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(true);
        //this.scrollView.setBackGroundImage(res.CardBack_png);
        //this.scrollView.setBackGroundImageScale9Enabled(true);
        //listView.setContentSize(cc.size(chatBackground.getContentSize().width, chatBackground.getContentSize().height*2/3));
        this.scrollView.setContentSize(cc.size(450,420));
        this.scrollView.setInnerContainerSize(cc.size(450,700));
        this.scrollView.ignoreAnchorPointForPosition(false);
        this.scrollView.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView.setPosition(this.chatBackground.getContentSize().width/2,
            this.chatBackground.getContentSize().height/2-20);
        //this.listView.addEventListener(this.selectedItemEvent, this);
        this.scrollView.jumpToTop();
        for (var i = 0,j=0; i < 17; i++) {
            if(i%3==0){
                j++;
            }
            var order=i+1;
            var pathString="res/chat/face/"+order+".png";
            var button=new ccui.Button(pathString,pathString);
            button.setTouchEnabled(true);
            button.setPressedActionEnabled(true);
            button.addTouchEventListener(this.menuCallbackGetFace,this);
            button.setName(order.toString());
            button.x=75+(i%3)*150;
            button.y=this.scrollView.getInnerContainerSize().height-50-120 * (j-1);
            this.scrollView.addChild(button);
        }
        this.chatBackground.addChild(this.scrollView);
        //this.scrollView.setClippingToBounds(true);

    },
    menuCallbackTacking:function(){
        this.tackMenuItem.setEnabled(false);
        this.faceMenuItem.setEnabled(true);
        this.chatHistoryMenuItem.setEnabled(true);
        if(this.scrollView!=null){
            this.scrollView.removeFromParent();
            this.scrollView=null;
        }
        //滚动框
        this.scrollView=new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(true);
        //this.scrollView.setBackGroundImage(res.CardBack_png);
        //this.scrollView.setBackGroundImageScale9Enabled(true);
        //listView.setContentSize(cc.size(chatBackground.getContentSize().width, chatBackground.getContentSize().height*2/3));
        this.scrollView.setContentSize(cc.size(450,450));
        this.scrollView.setInnerContainerSize(cc.size(450,850));
        this.scrollView.ignoreAnchorPointForPosition(false);
        this.scrollView.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView.setPosition(this.chatBackground.getContentSize().width/2,
            this.chatBackground.getContentSize().height/2-20);
        //this.listView.addEventListener(this.selectedItemEvent, this);
        this.chatBackground.addChild(this.scrollView);
        this.scrollView.jumpToTop();
        //this.scrollView.scrollToTopLeft(0.1,false);

        var button1=new ccui.Button();
        button1.setTitleText("快点吧，我等到花儿都谢了！");
        button1.setTitleFontSize(24);
        button1.setTouchEnabled(true);
        button1.setPressedActionEnabled(true);
        button1.addTouchEventListener(this.menuCallbackGetTack,this);
        button1.setName("1");
        button1.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45,
            anchorX : 0,
            anchorY : 0.5
        });
        //button1.x=225;
        //button1.y=this.scrollView.getInnerContainerSize().height-45;
        this.scrollView.addChild(button1);

        //var chatItem1=new cc.MenuItemFont("快点吧，我等到花儿都谢了！！",this.menuCallbackGetTack,this);
        //var chatMenu1=new cc.Menu(chatItem1);
        //chatMenu1.x=225;
        //chatMenu1.y=this.scrollView.getInnerContainerSize().height-45;
        //this.scrollView.addChild(chatMenu1);
        //chatItem1.setName("1");
        var line1=new cc.Sprite(res.Line_png);
        line1.x=225;
        line1.y=this.scrollView.getInnerContainerSize().height-45-button1.getContentSize().height/2;
        this.scrollView.addChild(line1);

        var button2=new ccui.Button();
        button2.setTitleText("看牌是小狗！");
        button2.setTitleFontSize(24);
        button2.setTouchEnabled(true);
        button2.setPressedActionEnabled(true);
        button2.addTouchEventListener(this.menuCallbackGetTack,this);
        button2.setName("2");
        button2.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*1,
            anchorX : 0,
            anchorY : 0.5
        });
        //button2.x=225;
        //button2.y=this.scrollView.getInnerContainerSize().height-45-65*1;
        this.scrollView.addChild(button2);
        var line2=new cc.Sprite(res.Line_png);
        line2.x=225;
        line2.y=this.scrollView.getInnerContainerSize().height-45-65*1-button1.getContentSize().height/2;
        this.scrollView.addChild(line2);

        var button3=new ccui.Button();
        button3.setTitleText("这牌烂得简直不忍直视！");
        button3.setTitleFontSize(24);
        button3.setTouchEnabled(true);
        button3.setPressedActionEnabled(true);
        button3.addTouchEventListener(this.menuCallbackGetTack,this);
        button3.setName("3");
        button3.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*2,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button3);
        var line3=new cc.Sprite(res.Line_png);
        line3.x=225;
        line3.y=this.scrollView.getInnerContainerSize().height-45-65*2-button1.getContentSize().height/2;
        this.scrollView.addChild(line3);

        var button4=new ccui.Button();
        button4.setTitleText("你是手滑了吗?敢跟注我?");
        button4.setTitleFontSize(24);
        button4.setTouchEnabled(true);
        button4.setPressedActionEnabled(true);
        button4.addTouchEventListener(this.menuCallbackGetTack,this);
        button4.setName("4");
        button4.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*3,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button4);
        var line4=new cc.Sprite(res.Line_png);
        line4.x=225;
        line4.y=this.scrollView.getInnerContainerSize().height-45-65*3-button1.getContentSize().height/2;
        this.scrollView.addChild(line4);

        //var chatItem5=new cc.MenuItemFont("跟到底，有种都别停！",this.menuCallbackGetTack,this);
        var button5=new ccui.Button();
        button5.setTitleText("跟到底，有种都别停！");
        button5.setTitleFontSize(24);
        button5.setTouchEnabled(true);
        button5.setPressedActionEnabled(true);
        button5.addTouchEventListener(this.menuCallbackGetTack,this);
        button5.setName("5");
        button5.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*4,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button5);
        var line5=new cc.Sprite(res.Line_png);
        line5.x=225;
        line5.y=this.scrollView.getInnerContainerSize().height-45-65*4-button1.getContentSize().height/2;
        this.scrollView.addChild(line5);

        //var chatItem6=new cc.MenuItemFont("我全押，你敢跟吗?",this.menuCallbackGetTack,this);
        var button6=new ccui.Button();
        button6.setTitleText("我全押，你敢跟吗?");
        button6.setTitleFontSize(24);
        button6.setTouchEnabled(true);
        button6.setPressedActionEnabled(true);
        button6.addTouchEventListener(this.menuCallbackGetTack,this);
        button6.setName("6");
        button6.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*5,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button6);
        var line6=new cc.Sprite(res.Line_png);
        line6.x=225;
        line6.y=this.scrollView.getInnerContainerSize().height-45-65*5-button1.getContentSize().height/2;
        this.scrollView.addChild(line6);

        //var chatItem7=new cc.MenuItemFont("牌小就不要跟我玩！",this.menuCallbackGetTack,this);
        var button7=new ccui.Button();
        button7.setTitleText("牌小就不要跟我玩！");
        button7.setTitleFontSize(24);
        button7.setTouchEnabled(true);
        button7.setPressedActionEnabled(true);
        button7.addTouchEventListener(this.menuCallbackGetTack,this);
        button7.setName("7");
        button7.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*6,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button7);
        var line7=new cc.Sprite(res.Line_png);
        line7.x=225;
        line7.y=this.scrollView.getInnerContainerSize().height-45-65*6-button1.getContentSize().height/2;
        this.scrollView.addChild(line7);

        //var chatItem8=new cc.MenuItemFont("你敢上，我就敢跟，谁怕谁！",this.menuCallbackGetTack,this);
        var button8=new ccui.Button();
        button8.setTitleText("你敢上，我就敢跟，谁怕谁！");
        button8.setTitleFontSize(24);
        button8.setTouchEnabled(true);
        button8.setPressedActionEnabled(true);
        button8.addTouchEventListener(this.menuCallbackGetTack,this);
        button8.setName("8");
        button8.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*7,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button8);
        var line8=new cc.Sprite(res.Line_png);
        line8.x=225;
        line8.y=this.scrollView.getInnerContainerSize().height-45-65*7-button1.getContentSize().height/2;
        this.scrollView.addChild(line8);

        //var chatItem9=new cc.MenuItemFont("不要走，决战到天亮！",this.menuCallbackGetTack,this);
        var button9=new ccui.Button();
        button9.setTitleText("不要走，决战到天亮！");
        button9.setTitleFontSize(24);
        button9.setTouchEnabled(true);
        button9.setPressedActionEnabled(true);
        button9.addTouchEventListener(this.menuCallbackGetTack,this);
        button9.setName("9");
        button9.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*8,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button9);
        var line9=new cc.Sprite(res.Line_png);
        line9.x=225;
        line9.y=this.scrollView.getInnerContainerSize().height-45-65*8-button1.getContentSize().height/2;
        this.scrollView.addChild(line9);

        //var chatItem10=new cc.MenuItemFont("这局我赢定了！",this.menuCallbackGetTack,this);
        var button10=new ccui.Button();
        button10.setTitleText("这局我赢定了！");
        button10.setTitleFontSize(24);
        button10.setTouchEnabled(true);
        button10.setPressedActionEnabled(true);
        button10.addTouchEventListener(this.menuCallbackGetTack,this);
        button10.setName("10");
        button10.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*9,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button10);
        var line10=new cc.Sprite(res.Line_png);
        line10.x=225;
        line10.y=this.scrollView.getInnerContainerSize().height-45-65*9-button1.getContentSize().height/2;
        this.scrollView.addChild(line10);

        //var chatItem11=new cc.MenuItemFont("遇到我真是你的不幸！",this.menuCallbackGetTack,this);
        var button11=new ccui.Button();
        button11.setTitleText("遇到我真是你的不幸！");
        button11.setTitleFontSize(24);
        button11.setTouchEnabled(true);
        button11.setPressedActionEnabled(true);
        button11.addTouchEventListener(this.menuCallbackGetTack,this);
        button11.setName("11");
        button11.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*10,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button11);
        var line11=new cc.Sprite(res.Line_png);
        line11.x=225;
        line11.y=this.scrollView.getInnerContainerSize().height-45-65*10-button1.getContentSize().height/2;
        this.scrollView.addChild(line11);

        //var chatItem12=new cc.MenuItemFont("不好意思，我又赢了！",this.menuCallbackGetTack,this);
        var button12=new ccui.Button();
        button12.setTitleText("不好意思，我又赢了！");
        button12.setTitleFontSize(24);
        button12.setTouchEnabled(true);
        button12.setPressedActionEnabled(true);
        button12.addTouchEventListener(this.menuCallbackGetTack,this);
        button12.setName("12");
        button12.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*11,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button12);
        var line12=new cc.Sprite(res.Line_png);
        line12.x=225;
        line12.y=this.scrollView.getInnerContainerSize().height-45-65*11-button1.getContentSize().height/2;
        this.scrollView.addChild(line12);

        //var chatItem13=new cc.MenuItemFont("我要走了，下次再玩吧！",this.menuCallbackGetTack,this);
        var button13=new ccui.Button();
        button13.setTitleText("我要走了，下次再玩吧！");
        button13.setTitleFontSize(24);
        button13.setTouchEnabled(true);
        button13.setPressedActionEnabled(true);
        button13.addTouchEventListener(this.menuCallbackGetTack,this);
        button13.setName("13");
        button13.attr({
            x : 25,
            y : this.scrollView.getInnerContainerSize().height-45-65*12,
            anchorX : 0,
            anchorY : 0.5
        });
        this.scrollView.addChild(button13);
        var line13=new cc.Sprite(res.Line_png);
        line13.x=225;
        line13.y=this.scrollView.getInnerContainerSize().height-45-65*12-button1.getContentSize().height/2;
        this.scrollView.addChild(line13);

    },
    menuCallbackChatHistory:function(){
        this.faceMenuItem.setEnabled(true);
        this.chatHistoryMenuItem.setEnabled(false);
        this.tackMenuItem.setEnabled(true);
        if(this.scrollView!=null){
            this.scrollView.removeFromParent();
            this.scrollView=null;
        }
        //滚动框
        this.scrollView=new ccui.ScrollView();
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.setBounceEnabled(true);
        //this.scrollView.setBackGroundImage(res.CardBack_png);
        //this.scrollView.setBackGroundImageScale9Enabled(true);
        //listView.setContentSize(cc.size(chatBackground.getContentSize().width, chatBackground.getContentSize().height*2/3));
        this.scrollView.setContentSize(cc.size(450,420));
        this.scrollView.setInnerContainerSize(cc.size(450,700));
        this.scrollView.ignoreAnchorPointForPosition(false);
        this.scrollView.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView.setPosition(this.chatBackground.getContentSize().width/2,
            this.chatBackground.getContentSize().height/2-20);
        //this.listView.addEventListener(this.selectedItemEvent, this);
        this.scrollView.jumpToTop();
        this.chatBackground.addChild(this.scrollView);
    },
    menuCallbackSend:function(){
        var inputString=this.textField.getString();
        this.textField.setString("");
        this.textField.detachWithIME();
        console.log(inputString);
        if(inputString!="输入聊天内容..."&&inputString!=""&&inputString!=null){
            console.log("success....");
            g_dynamicTackString=inputString;
            pomelo.request('game.gameChatHandler.sendMes',{
                chatType:"DynamicTacking",
                position1:myselfPlayerPositionServer,
                position2:0,
                chatContent:g_dynamicTackString
            },function(data){
                console.log('----------+++++++++++----------'+JSON.stringify(data));
            });
            this.textField.attachWithIME();
        }
        else{
            this.textField.attachWithIME();
        }

    },
    menuCallbackGetFace:function(sender,type){
        if (ccui.Widget.TOUCH_ENDED ==type) {
            console.log("sender.getName():"+sender.getName());
            g_faceChatNumber=parseInt(sender.getName());
            pomelo.request('game.gameChatHandler.sendMes',{
                chatType:"Face",
                position1:myselfPlayerPositionServer,
                position2:0,
                chatContent:g_faceChatNumber
            },function(data){
                console.log('----------+++++++++++----------'+JSON.stringify(data));
            })
        }
    },
    menuCallbackGetTack:function(sender,type){
        if(ccui.Widget.TOUCH_ENDED==type){
            console.log("sender.getName():"+sender.getName());
            g_staticTackNumber=parseInt(sender.getName());
            pomelo.request('game.gameChatHandler.sendMes',{
                chatType:"StaticTacking",
                position1:myselfPlayerPositionServer,
                position2:0,
                chatContent:g_staticTackNumber
            },function(data){
                console.log('----------+++++++++++----------'+JSON.stringify(data));
            })
        }
    },
    textFieldEvent:function(sender,type){
        //switch (type) {
        //    case ccui.TextField.EVENT_ATTACH_WITH_IME:
        //        var textField = sender;
        //        this._topDisplayLabel.setString("attach with IME");
        //        if (!cc.sys.isNative)
        //        {
        //            var inputStr = window.prompt("请输入：");
        //            cc.log("你输入的内容是："+inputStr);
        //        }
        //        break;
    },
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});