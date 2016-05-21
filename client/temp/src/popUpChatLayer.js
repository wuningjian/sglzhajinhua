/**
 * Created by guowanfu on 2016/3/29.
 */
var PopUpChatLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,
    listView:null,
    chatBackground:null,
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
        var faceMenuItem=new cc.MenuItemSprite(faceMenuItemSprite1,faceMenuItemSprite2,faceMenuItemSprite3,
        this.menuCallbackFace,this);

        //聊天按钮
        var tackMenuItemSprite1=new cc.Sprite(res.TackingItem2_png);
        var tackMenuItemSprite2=new cc.Sprite(res.TackingItem1_png);
        var tackMenuItemSprite3=new cc.Sprite(res.TackingItem1_png);
        var tackMenuItem=new cc.MenuItemSprite(tackMenuItemSprite1,tackMenuItemSprite2,tackMenuItemSprite3,
        this.menuCallbackTacking,this);

        //聊天历史按钮
        var chatHistoryMenuItemSprite1=new cc.Sprite(res.ChatHistoryItem2_png);
        var chatHistoryMenuItemSprite2=new cc.Sprite(res.ChatHistoryItem1_png);
        var chatHistoryMenuItemSprite3=new cc.Sprite(res.ChatHistoryItem1_png);
        var chatHistoryMenuItem=new cc.MenuItemSprite(chatHistoryMenuItemSprite1,chatHistoryMenuItemSprite2,chatHistoryMenuItemSprite3,
        this.menuCallbackChatHistory,this);

        var chatMenu=new cc.Menu(faceMenuItem,tackMenuItem,chatHistoryMenuItem);
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

        this.chatBackground.setPosition(size.width/2,size.height/2);
        //this.chatBackground.getContentSize().width/2,this.spriteSelectBack.getContentSize().height-this.chatBackground.getContentSize().height/2
        this.spriteSelectBack.addChild(this.chatBackground,1);
        this.chatBackground.setName("chatBackground");

        //滚动框
        this.listView=new ccui.ScrollView();
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        this.listView.setBackGroundImage(res.CardBack_png);
        this.listView.setBackGroundImageScale9Enabled(true);
        //listView.setContentSize(cc.size(chatBackground.getContentSize().width, chatBackground.getContentSize().height*2/3));
        this.listView.setContentSize(cc.size(300,400));
        this.listView.ignoreAnchorPointForPosition(false);
        this.listView.setAnchorPoint(cc.p(0,0));
        this.listView.setPosition(0,0);
        //this.listView.addEventListener(this.selectedItemEvent, this);
        this.chatBackground.addChild(this.listView);
        this.listView.setInnerContainerSize(cc.size(300,1000));
        //this.listView.jumpToTop();

        //var default_label =new cc.LabelTTF("第0关","Arial",24);
        //var default_item = new ccui.Layout();
        //default_item.setTouchEnabled(true);
        //default_item.setContentSize(cc.size(300,50));
        //default_item.width = this.listView.width;
        ////default_label.setPosition(default_item.getContentSize().width/2,default_item.getContentSize().height/2);
        //default_item.addChild(default_label);
        //this.listView.setItemModel(default_item);

        for (var i = 0; i < 10; i++) {
            //this.listView.pushBackDefaultItem();
            var lblMenu=new cc.LabelTTF("第"+(i+1)+"关","Arial",24);
            lblMenu.x = 150;
            lblMenu.y = this.listView.getInnerContainerSize().height-600- 50 * i;
            var lblLayer=new ccui.Layout();
            lblLayer.width = this.listView.width;
            lblLayer.addChild(lblMenu);
            this.listView.addChild(lblLayer);
            //this.listView.insertCustomItem(lblLayer);
        }
        // 设置所有item重力方向
        //this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);


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
        cc.eventManager.addListener(this.m_touchListener1,this.chatBackground);
    },
    menuCallbackFace:function(){
        this.spriteSelectBack.getChildByName("chatBackground");
    },
    menuCallbackTacking:function(){

    },
    menuCallbackChatHistory:function(){

    },
    menuCallbackSend:function(){

    },
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    },
    selectedItemEvent:function(sender,type){
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;
            default:
                break;
        }
    }
});