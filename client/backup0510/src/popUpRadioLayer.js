/**
 * Created by guowanfu on 2016/4/7.
 */
var g_sendMessageToWorldChannel=null;
//var g_recordRadio=false;
var PopUpRadioLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,
    radioBackground:null,
    //世界频道按钮
    worldMenuItem:null,
    //好友频道按钮
    friendMenuItem:null,
    //公会频道按钮
    gongHuiMenuItem:null,

    //以下为世界频道内容项
    //广播信息滑块窗口
    scrollView_worldChannel:null,
    scrollView_worldChannelHeight:null,
    //尾部精灵，用于存放输入框、发送按钮等
    hailSprite_worldChannel:null,
    //输入文本
    textField_worldChannel:null,
    //广播字符串标签数组
    radioMessageLabelArray:null,

    //滚动窗口滚动的文本
    text_came:null,


    //以下为好友频道内容项（未实现） menuCallbackFriendChannel:function()


    //以下为公会频道内容项（未实现） menuCallbackGongHuiChannel:function()
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0));
        this.initRadioBackgroundAndContent();
        this.initChannelSelectMenu();
        this.menuCallbackWorldChannel();
        this.pomelo_on();
        //g_recordRadio=true;
    },
    //初始化广播主背景
    initRadioBackgroundAndContent:function(){
        var size=cc.director.getWinSize();
        //初始化透明背景
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack);

        //初始化广播背景
        this.radioBackground=new cc.Sprite(res.RadioBackground_png);
        this.radioBackground.attr({
            x: this.spriteSelectBack.getContentSize().width/2,
            y:this.spriteSelectBack.getContentSize().height/2-50,
            anchorX:0.5,
            anchorY:0.5
        });
        this.spriteSelectBack.addChild(this.radioBackground);

        //添加监听
        this.textListener=cc.EventListener.create({
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
                    //需要删除this.scrollView_worldChannel的孩子节点，
                    // 否则再次进入，会出现重复添加的错误
                    //this.scrollView_worldChannel.removeAllChildren();
                    //this.scrollView_worldChannel=null;
                    pomelo.removeListener('onActBroadcast',a_function);
                    pomelo.removeListener('onUserBroadcast',b_function);
                    this.destoty();
                    this.removeAllChildren();
                    this.removeFromParent();
                    //g_recordRadio=false;
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.textListener,this.radioBackground);
    },
    //初始化各个频道按钮，供玩家选择切换
    initChannelSelectMenu:function(){
        //添加放置按钮的精灵头条
        var headSprite=new cc.Sprite(res.TitleBoar_png);
        headSprite.attr({
            x:this.radioBackground.getContentSize().width/2,
            y:this.radioBackground.getContentSize().height-headSprite.getContentSize().height-12,
            anchorX:0.5,
            anchorY:0
        });
        this.radioBackground.addChild(headSprite);

        //往HeadSprite添加按钮
        //世界频道按钮
        var worldMenuItemSprite1=new cc.Sprite(res.MenuWorldString_png);
        var worldMenuItemSprite2=new cc.Sprite(res.MenuBackground_png);
        worldMenuItemSprite2.setAnchorPoint(cc.p(0.5,0.5));
        var worldMenuItemSpriteString2=new cc.Sprite(res.MenuWorldString_png);
        worldMenuItemSpriteString2.attr({
            x:worldMenuItemSprite2.getContentSize().width/2,
            y:worldMenuItemSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        worldMenuItemSprite2.addChild(worldMenuItemSpriteString2);
        var worldMenuItemSprite3=new cc.Sprite(res.MenuBackground_png);
        var worldMenuItemSpriteString3=new cc.Sprite(res.MenuWorldString_png);
        worldMenuItemSpriteString3.attr({
            x:worldMenuItemSprite3.getContentSize().width/2,
            y:worldMenuItemSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        worldMenuItemSprite3.addChild(worldMenuItemSpriteString3);
        this.worldMenuItem=new cc.MenuItemSprite(worldMenuItemSprite1,worldMenuItemSprite2,worldMenuItemSprite3,
            this.menuCallbackWorldChannel,this);

        //好友频道按钮
        var friendMenuItemSprite1=new cc.Sprite(res.MenuFriendString_png);
        var friendMenuItemSprite2=new cc.Sprite(res.MenuBackground_png);
        var friendMenuItemSpriteString2=new cc.Sprite(res.MenuFriendString_png);
        friendMenuItemSpriteString2.attr({
            x:friendMenuItemSprite2.getContentSize().width/2,
            y:friendMenuItemSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        friendMenuItemSprite2.addChild(friendMenuItemSpriteString2);
        var friendMenuItemSprite3=new cc.Sprite(res.MenuBackground_png);
        var friendMenuItemSpriteString3=new cc.Sprite(res.MenuFriendString_png);
        friendMenuItemSpriteString3.attr({
            x:friendMenuItemSprite3.getContentSize().width/2,
            y:friendMenuItemSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        friendMenuItemSprite3.addChild(friendMenuItemSpriteString3);
        this.friendMenuItem=new cc.MenuItemSprite(friendMenuItemSprite1,friendMenuItemSprite2,friendMenuItemSprite3,
            this.menuCallbackFriendChannel,this);

        //公会频道按钮
        var gongHuiMenuItemSprite1=new cc.Sprite(res.MenuGongHuiString_png);
        var gongHuiMenuItemSprite2=new cc.Sprite(res.MenuBackground_png);
        var gongHuiMenuItemSpriteString2=new cc.Sprite(res.MenuGongHuiString_png);
        gongHuiMenuItemSpriteString2.attr({
            x:gongHuiMenuItemSprite2.getContentSize().width/2,
            y:gongHuiMenuItemSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gongHuiMenuItemSprite2.addChild(gongHuiMenuItemSpriteString2);
        var gongHuiMenuItemSprite3=new cc.Sprite(res.MenuBackground_png);
        var gongHuiMenuItemSpriteString3=new cc.Sprite(res.MenuGongHuiString_png);
        gongHuiMenuItemSpriteString3.attr({
            x:gongHuiMenuItemSprite3.getContentSize().width/2,
            y:gongHuiMenuItemSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        gongHuiMenuItemSprite3.addChild(gongHuiMenuItemSpriteString3);
        this.gongHuiMenuItem=new cc.MenuItemSprite(gongHuiMenuItemSprite1,gongHuiMenuItemSprite2,gongHuiMenuItemSprite3,
            this.menuCallbackGongHuiChannel,this);

        var allChannelMenu=new cc.Menu(this.worldMenuItem,this.friendMenuItem,this.gongHuiMenuItem);
        allChannelMenu.attr({
            x: headSprite.getContentSize().width/2,
            y: headSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        allChannelMenu.alignItemsHorizontallyWithPadding(100);
        headSprite.addChild(allChannelMenu);
    },
    //世界频道按钮回调函数，初始化世界频道所有内容
    menuCallbackWorldChannel:function(){
        this.worldMenuItem.setEnabled(false);
        this.friendMenuItem.setEnabled(true);
        this.gongHuiMenuItem.setEnabled(true);
        //删除朋友频道和公会频道在背景上的对象内容（如果存在）

        this.radioMessageLabelArray=new Array();

        //添加放置输入框、发送按钮的尾部条形精灵
        this.hailSprite_worldChannel=new cc.Sprite(res.TitleBoar_png);
        this.hailSprite_worldChannel.attr({
            x:this.radioBackground.getContentSize().width/2,
            y:15,
            anchorX:0.5,
            anchorY:0
        });
        this.radioBackground.addChild(this.hailSprite_worldChannel);

        //发送按钮
        var sendItemSprite1=new cc.Sprite(res.RadioSendItem_png);
        var sendItemSprite2=new cc.Sprite(res.RadioSendItem_png);
        var sendItemSprite3=new cc.Sprite(res.RadioSendItem_png);
        var sendMenuItem=new cc.MenuItemSprite(sendItemSprite1,sendItemSprite2,sendItemSprite3,
            this.menuCallbackSendMessageToWorld,this);
        var sendMenu=new cc.Menu(sendMenuItem);
        sendMenu.attr({
            x:this.hailSprite_worldChannel.getContentSize().width-sendItemSprite1.getContentSize().width/2,
            y:this.hailSprite_worldChannel.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.hailSprite_worldChannel.addChild(sendMenu);

        /*输入框和背景*/
          //背景
        var inputTxtBoar=new cc.Sprite(res.InputTxtBoarWorldChannel_png);
        var hornSprite=new cc.Sprite(res.Horn_png);
        hornSprite.attr({
            x:10,
            y:inputTxtBoar.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        inputTxtBoar.addChild(hornSprite);
        inputTxtBoar.attr({
            x:0,
            y:this.hailSprite_worldChannel.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.hailSprite_worldChannel.addChild(inputTxtBoar);

          //输入文本
        this.textField_worldChannel=new ccui.TextField("输入需要广播的内容...","Arial", 25);
        this.textField_worldChannel.setContentSize(
            cc.size(inputTxtBoar.getContentSize().width*2/3,inputTxtBoar.getContentSize().height));
        this.textField_worldChannel.setTouchAreaEnabled(true);
        this.textField_worldChannel.setTouchSize(
            cc.size(inputTxtBoar.getContentSize().width*2/3,inputTxtBoar.getContentSize().height));
        this.textField_worldChannel.setTouchEnabled(true);
        this.textField_worldChannel.addEventListener(this.touchWorldRadioInputCallback);
        //this.textField_worldChannel.swallowTouches=true;
        this.textField_worldChannel.attr({
            x:60,
            y:inputTxtBoar.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        inputTxtBoar.addChild(this.textField_worldChannel);

        //根据数组g_radioMessageArray中字符串，初始化标签，并添加到数组g_radioMessageLabelArray中
        //一行最多几个字符
        var lineWord=30;
        //字符的大小
        var frontSize=30;
        for(var i=0;i<g_radioMessageArray.length;i++){
            var lineItem=0;
            lineItem=g_radioMessageArray[i].length/lineWord;
            if(g_radioMessageArray[i].length%lineWord!=0){
                lineItem++;
            }
            var string=g_radioMessageArray[i];
            var string1="";
            for(var j= 1;j<lineItem;j++){
                string1=string1+string.substring(0,lineWord)+"\n";
                string=string.substring(lineWord);
            }
            string1=string1+string;
            var label=new cc.LabelTTF(string1,"Arial",frontSize);
            this.radioMessageLabelArray.push(label);

        }

        //聊天内容显示窗口
        this.scrollView_worldChannel=new ccui.ScrollView();
        this.scrollView_worldChannel.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_worldChannel.setTouchEnabled(true);
        this.scrollView_worldChannel.setBounceEnabled(true);
        this.scrollView_worldChannelHeight=
            this.radioBackground.getContentSize().height-this.hailSprite_worldChannel.getContentSize().height*2-20;
        this.scrollView_worldChannel.setContentSize(cc.size(this.radioBackground.getContentSize().width-20,
            this.scrollView_worldChannelHeight));
        this.scrollView_worldChannel.ignoreAnchorPointForPosition(false);
        this.scrollView_worldChannel.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_worldChannel.setPosition(this.radioBackground.getContentSize().width/2,
            this.radioBackground.getContentSize().height/2);
        //聊天窗口容器的Height
        var scrollViewHeight=0;
        //每条记录之间的间隔
        var messageSpace=30;
        for(var i=0;i<this.radioMessageLabelArray.length;i++){
            scrollViewHeight=scrollViewHeight+this.radioMessageLabelArray[i].getContentSize().height+messageSpace;
            //console.log("message"+i+":"+this.radioMessageLabelArray[i].getContentSize().height);
         }
        //初始化容器大小
        if( scrollViewHeight>(this.radioBackground.getContentSize().height-
            this.hailSprite_worldChannel.getContentSize().height*2-20)){
           this.scrollView_worldChannel.setInnerContainerSize(
               cc.size(this.radioBackground.getContentSize().width-20, scrollViewHeight))
         }
        else{
           this.scrollView_worldChannel.setInnerContainerSize(
            cc.size(
                   this.radioBackground.getContentSize().width-20,
                   this.radioBackground.getContentSize().height-
                   this.hailSprite_worldChannel.getContentSize().height*2-20)
          );
        }
        //向容器中加入广播信息记录
        for(var i= 0,messageHeight=0;i<this.radioMessageLabelArray.length;i++){
            this.radioMessageLabelArray[i].attr({
                x:this.scrollView_worldChannel.width/2,
                y:this.scrollView_worldChannel.getInnerContainerSize().height-messageSpace*(i+1)-messageHeight,
                anchorX:0.5,
                anchorY:1
            });
            messageHeight=messageHeight+this.radioMessageLabelArray[i].getContentSize().height;
            console.log(this.radioMessageLabelArray[i].getContentSize().height);
            this.scrollView_worldChannel.addChild(this.radioMessageLabelArray[i]);

        }

        this.radioBackground.addChild(this.scrollView_worldChannel);
        this.scrollView_worldChannel.jumpToBottom();
    },
    //好友频道按钮回调函数，初始化好友频道所有内容
    menuCallbackFriendChannel:function(){

    },
    //公会频道按钮回调函数，初始化公会频道所有内容
    menuCallbackGongHuiChannel:function(){

    },
    //向世界频道发送按钮回调函数
    menuCallbackSendMessageToWorld:function(){
        var inputString=this.textField_worldChannel.getString();
        //console.log(inputString);
        if(inputString!=""&&inputString!=null){
            //向服务器发送信息
            g_sendMessageToWorldChannel=inputString;
            pomelo.request('broadcast.broadcastHandler.sendMes',{
                content:g_sendMessageToWorldChannel
            },function(data){
                cc.log('--------=========----------'+JSON.stringify(data));
            });
            this.textField_worldChannel.setString("");
            this.textField_worldChannel.setPlaceHolder("输入需要广播的内容...");
        }
        else{
            console.log("发送的内容不能为空！！！！！");
            //this.textField_worldChannel.detachWithIME();
        }
    },
    //世界频道输入文本触摸回调函数
    touchWorldRadioInputCallback:function(sender,type){
        var textField_worldChannel=sender;
        //console.log(sender.getString());
        //console.log("dd");
        switch (type){
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                console.log(0);
                textField_worldChannel.setPlaceHolder("");
                textField_worldChannel.attachWithIME();
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                console.log(1);
                textField_worldChannel.setPlaceHolder("输入需要广播的内容...");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT    :
                console.log(2);
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                console.log(3);
                break;
            case ccui.TextField.RENDERER_ZORDER      :
                console.log(-1);
                break;
            default                                  :
                console.log("error type touchWorldRadioCallback:function()");
                break;
        }
    },
    //模拟广播文本滚动效果,此函数在gameScene.js中执行
    sendAndReceive:function(inputString,color){
        //将广播字符串压入广播字符串记录数组，保存起来
        //最多保存的广播记录数，暂时定为15条
        var recordMax=15;
        //记录数组超过15条，先删除最先进入的一条
        if(g_radioMessageArray.length>recordMax){
            g_radioMessageArray.splice(0,1);
            g_radioMessageArray.push(inputString);
        }
        else{
            g_radioMessageArray.push(inputString);
        }

        //移除现在广播窗口的文本（如果存在）
        if(this.text_came!=null){
            this.text_came.stopAllActions();
            var temporary=this.text_came;
            this.text_came=null;
            temporary.runAction(cc.sequence(cc.moveBy(0.5,0,50),cc.hide(),cc.callFunc(function(){
                temporary.removeFromParent();
                temporary=null;
            })));
        }
        //加入新的广播信息
        this.text_came = new cc.LabelTTF(inputString,"Arial",30);
        console.log('text width:'+this.text_came.width);
        this.text_came.setColor(color?color:cc.color.BLUE);
        this.text_came.attr({
           x:700,
           y:0,
           anchorX:0,
           anchorY:0
        });
        console.log("g_cliper.getContentSize().width:"+g_cliper.getContentSize().width);
        g_cliper.addChild(this.text_came);
        //向左滚动动画
        this.text_came.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.001,0,0),cc.callFunc(function(){
            this.text_came.x=this.text_came.x-2;
            if(this.text_came.x<=-this.text_came.getContentSize().width){
                this.text_came.stopAllActions();
                this.text_came.removeFromParent();
                this.text_came=null;
                console.log("end........")
            }
        }.bind(this)))));

        //在世界频道窗口中更新信息
        this.updateWorldChanelWindowMessage(inputString);
    },
    //世界频道界面信息更新刷新
    updateWorldChanelWindowMessage:function(inputString){
        //聊天窗口容器的Height
        var scrollViewHeight=0;
        //每条记录之间的间隔
        var messageSpace=30;
        //根据传来的字符串创建标签
        var lineWord=30;
        var frontSize=30;
        var recordMax=15;
        var lineItem=0;
        lineItem=inputString.length/lineWord;
        if(inputString.length/lineWord!=0){
            lineItem++;
        }
        var string=inputString;
        var string1="";
        for(var j= 1;j<lineItem;j++){
            string1=string1+string.substring(0,lineWord)+"\n";
            string=string.substring(lineWord);
        }
        string1=string1+string;
        var label=new cc.LabelTTF(string1,"Arial",frontSize);

        console.log("this.scrollView_worldChannel.getScrollY():"+
            this.scrollView_worldChannel.getInnerContainer().getPosition().y);

        //根据数组this.radioMessageLabelArray是否超标,更新世界频道信息
        //超记录时
        if(this.radioMessageLabelArray.length>recordMax){
            var firstLabelHeight=this.radioMessageLabelArray[0].getContentSize().height;
            this.radioMessageLabelArray[0].removeFromParent();
            this.radioMessageLabelArray.splice(0,1);
            this.radioMessageLabelArray.push(label);
            for(var i=0;i<this.radioMessageLabelArray.length;i++){
                scrollViewHeight=scrollViewHeight+this.radioMessageLabelArray[i].getContentSize().height+messageSpace;
                //console.log("message"+i+":"+this.radioMessageLabelArray[i].getContentSize().height);
        }
            label.attr({
                x: this.scrollView_worldChannel.width/2,
                y: this.scrollView_worldChannel.getInnerContainerSize().height-(
                    scrollViewHeight+firstLabelHeight+messageSpace-label.getContentSize().height
                ),
                anchorX:0.5,
                anchorY:1
            });
            this.scrollView_worldChannel.addChild(label);

            //新加入记录，造成容器空间不足时
            if(this.scrollView_worldChannel.getInnerContainerSize().height<scrollViewHeight){
                var off=scrollViewHeight-this.scrollView_worldChannel.getInnerContainerSize().height;
                this.scrollView_worldChannel.setInnerContainerSize(
                    cc.size(this.radioBackground.getContentSize().width-20, scrollViewHeight)
                );
                for(var i=0;i<this.radioMessageLabelArray.length;i++){
                    this.radioMessageLabelArray[i].y=this.radioMessageLabelArray[i].y+firstLabelHeight+messageSpace+off;

                    //this.radioMessageLabelArray[i].runAction(
                    //    cc.sequence(cc.moveBy(0.0,0,firstLabelHeight+messageSpace+off)));
                }
                this.scrollView_worldChannel.jumpToBottom();
            }
            //新加入记录，造成空间浪费
            else{
                //如果容器的高不是最小，则减小容器体积
                if(this.scrollView_worldChannel.getInnerContainerSize().height>scrollViewHeight){
                    var off=this.scrollView_worldChannel.getInnerContainerSize().height-scrollViewHeight;
                    this.scrollView_worldChannel.setInnerContainerSize(
                        cc.size(this.radioBackground.getContentSize().width-20, scrollViewHeight)
                    );
                    for(var i=0;i<this.radioMessageLabelArray.length;i++){
                        this.radioMessageLabelArray[i].y=this.radioMessageLabelArray[i].y+firstLabelHeight+messageSpace-off;
                        //this.radioMessageLabelArray[i].runAction(
                        //    cc.sequence(cc.moveBy(0.0,0,firstLabelHeight+messageSpace-off)));
                    }
                }
                this.scrollView_worldChannel.jumpToBottom();
            }

        }
        //不超记录
        else{
            this.radioMessageLabelArray.push(label);
            for(var i=0;i<this.radioMessageLabelArray.length;i++){
                scrollViewHeight=scrollViewHeight+this.radioMessageLabelArray[i].getContentSize().height+messageSpace;
                //console.log("message"+i+":"+this.radioMessageLabelArray[i].getContentSize().height);
            }
            label.attr({
                x: this.scrollView_worldChannel.width/2,
                y: this.scrollView_worldChannel.getInnerContainerSize().height-(
                    scrollViewHeight-label.getContentSize().height
                ),
                anchorX:0.5,
                anchorY:1
            });
            this.scrollView_worldChannel.addChild(label);
            //当前容器已经不能装下本条记录信息，需要扩容，并移动记录
            if(this.scrollView_worldChannel.getInnerContainerSize().height<scrollViewHeight){
                //扩容
                this.scrollView_worldChannel.setInnerContainerSize(
                    cc.size(this.radioBackground.getContentSize().width-20, scrollViewHeight));
                //移动记录
                for(var i=0;i<this.radioMessageLabelArray.length;i++){
                    this.radioMessageLabelArray[i].y=this.radioMessageLabelArray[i].y+
                        label.getContentSize().height+messageSpace;
                    //this.radioMessageLabelArray[i].runAction(
                    //    cc.sequence(cc.moveBy(0.0,0,label.getContentSize().height+messageSpace)));
                }
                //this.scrollView_worldChannel.jumpToBottom();
            }
            this.scrollView_worldChannel.jumpToBottom();

        }
        this.scrollView_worldChannelHeight=scrollViewHeight;
    },
    //开启监听来自服务器的世界频道信息的接口
    pomelo_on:function(){
        pomelo.on('onActBroadcast',a_function = function(data){
            console.log("onActBroadcast: TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
            console.log("onActBroadcast:"+data);

            this.updateWorldChanelWindowMessage(data);

        }.bind(this));
        pomelo.on('onUserBroadcast',b_function=function(data){
            console.log("onUserBroadcast: TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
            console.log("onUserBroadcast:"+JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var string=data["content"];

            this.updateWorldChanelWindowMessage(string);

        }.bind(this));
    },
    //注销监听（注销界面层，并非来自服务器）
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});