/**
 * Created by guowanfu on 2016/4/15.
 */
var RankingLayer=cc.Layer.extend({
    //排行背景
    mainBackground:null,
    //按钮选择背景
    rankSelectMenuBackground:null,
    //存放排行记录背景
    storeMessageBackground:null,
    //排行按钮菜单项
    todayPayMenuItem:null,
    yesterdayPayMenuItem:null,
    yesterdayComeInMenuItem:null,
    moneyMenuItem:null,
    giftMenuItem:null,

    //记录信息头
    head:null,
    //存放信息的滑动容器
    scrollView_rankMessage:null,
    //个人排行信息背景
    myselfMessageBackground:null,

    //排行榜数据（暂时代替服务器数据）
    playerArray:null,
    //个人在排行耪中的信息条记录
    myselfMessage:null,
    ctor:function(){
        this._super();
        this.playerArray=[ ["舞动莫言苦","21","3282802"],
                           ["林夕金库代言","12","388389929"],
                           ["乖乖流氓兔","99","6549889"],
                           ["受伤的小兔子","53","888821767"],
                           ["帅哥哥的银","88","8888383"]];
        //0代表为上榜，其他表示排名
        this.myselfMessage=[6,"潇湘夜雨","97","666666"];
        this.initBackground();
        this.initStoreRankMessageBackgroundAndWarnLabel();
        //第一次进入排行榜默认进入礼物排行榜
        this.menuCallbackSelectGift();

    },
    //初始化排行榜背景
    initBackground:function(){
        var size=cc.director.getWinSize();
        this.mainBackground=new cc.Sprite(res.RankingMainBackground_png);
        this.mainBackground.setPosition(size.width/2,size.height/2);
        this.addChild(this.mainBackground);

        this.rankSelectMenuBackground=new cc.Sprite(res.Rank_select_menuBackground_png);
        this.rankSelectMenuBackground.attr({
            x:this.mainBackground.getContentSize().width/2,
            y:this.mainBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.mainBackground.addChild(this.rankSelectMenuBackground);

        //初始化排行榜按钮和分割线条
        this.initRankMenu();
    },
    //初始化排行榜按钮和分割线条
    initRankMenu:function(){
        /*添加线条*/
        //线条1
        var lineSprite1=new cc.Sprite(res.Rank_line_png);
        lineSprite1.attr({
            x:150,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(lineSprite1);
        //线条2
        var lineSprite2=new cc.Sprite(res.Rank_line_png);
        lineSprite2.attr({
            x:150+230,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(lineSprite2);
        //线条3
        var lineSprite3=new cc.Sprite(res.Rank_line_png);
        lineSprite3.attr({
            x:150+230+225,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(lineSprite3);
        //线条4
        var lineSprite4=new cc.Sprite(res.Rank_line_png);
        lineSprite4.attr({
            x:150+230+225*2,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(lineSprite4);
        //线条5
        var lineSprite5=new cc.Sprite(res.Rank_line_png);
        lineSprite5.attr({
            x:150+230+225*2+180,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(lineSprite5);

        //返回按钮
        var backMenuItemSprite1=new cc.Sprite(res.BackHallFromRank_png);
        var backMenuItemSprite2=new cc.Sprite(res.BackHallFromRank_png);
        var backMenuItemSprite3=new cc.Sprite(res.BackHallFromRank_png);
        var backMenuItem=new cc.MenuItemSprite(backMenuItemSprite1,backMenuItemSprite2,backMenuItemSprite3,
            this.menuCallbackBackHall,this);
        var backMenu=new cc.Menu(backMenuItem);
        backMenu.attr({
            x: backMenuItemSprite1.getContentSize().width*2,
            y: this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(backMenu);

        //当日充值耪按钮
        var TodayPayMenuItemSprite1=new cc.Sprite(res.Today_pay_png);
        var TodayPayMenuItemSprite2=new cc.Sprite(res.Today_pay_png);
        var TodayPayMenuItemSprite3=new cc.Sprite(res.Today_pay_png);
        this.todayPayMenuItem=new cc.MenuItemSprite(TodayPayMenuItemSprite1,TodayPayMenuItemSprite2,TodayPayMenuItemSprite3,
            this.menuCallbackTodayPay,this);

        //昨日充值耪按钮
        var yesterdayPayMenuItemSprite1=new cc.Sprite(res.Yesterday_pay_png);
        var yesterdayPayMenuItemSprite2=new cc.Sprite(res.Yesterday_pay_png);
        var yesterdayPayMenuItemSprite3=new cc.Sprite(res.Yesterday_pay_png);
        this.yesterdayPayMenuItem=new cc.MenuItemSprite(yesterdayPayMenuItemSprite1,yesterdayPayMenuItemSprite2,yesterdayPayMenuItemSprite3,
            this.menuCallbackYesterdayPay,this);

        //昨日赚金榜按钮
        var yesterdayComeInMenuItemSprite1=new cc.Sprite(res.Yesterday_comeIn_png);
        var yesterdayComeInMenuItemSprite2=new cc.Sprite(res.Yesterday_comeIn_png);
        var yesterdayComeInMenuItemSprite3=new cc.Sprite(res.Yesterday_comeIn_png);
        this.yesterdayComeInMenuItem=new cc.MenuItemSprite(yesterdayComeInMenuItemSprite1,yesterdayComeInMenuItemSprite2,yesterdayComeInMenuItemSprite3,
            this.menuCallbackYesterdayComeIn,this);

        //财富榜按钮
        var moneyMenuItemSprite1=new cc.Sprite(res.Money_rank_png);
        var moneyMenuItemSprite2=new cc.Sprite(res.Money_rank_png);
        var moneyMenuItemSprite3=new cc.Sprite(res.Money_rank_png);
        this.moneyMenuItem=new cc.MenuItemSprite(moneyMenuItemSprite1,moneyMenuItemSprite2,moneyMenuItemSprite3,
            this.menuCallbackMoney,this);

        var giftMenuItemSprite1=new cc.Sprite(res.Gift_rank_png);
        var giftMenuItemSprite2=new cc.Sprite(res.Gift_rank_png);
        var giftMenuItemSprite3=new cc.Sprite(res.Gift_rank_png);
        this.giftMenuItem=new cc.MenuItemSprite(giftMenuItemSprite1,giftMenuItemSprite2,giftMenuItemSprite3,
            this.menuCallbackSelectGift, this);

        //====
        var rankMenu=new cc.Menu(this.todayPayMenuItem,this.yesterdayPayMenuItem,
            this.yesterdayComeInMenuItem,this.moneyMenuItem,this.giftMenuItem);
        //rankMenu.x=0;
        //rankMenu.y=0;
        rankMenu.alignItemsHorizontallyWithPadding(75);
        rankMenu.attr({
            x:this.rankSelectMenuBackground.getContentSize().width/2+50,
            y:this.rankSelectMenuBackground.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.rankSelectMenuBackground.addChild(rankMenu);

    },
    //初始化存放排行信息记录的背景和祥光提醒信息
    initStoreRankMessageBackgroundAndWarnLabel:function(){
        //初始化提醒信息
        var warnLaBa=new cc.Sprite(res.Rank_warn_laBa_png);
        var warnLabel=new cc.LabelTTF("每天充值榜冠、亚、季军可以获得充值数100%、50%、20%的奖励，次日发放！",
            "Arial",25);
        warnLabel.attr({
            x:warnLaBa.getContentSize().width+30,
            y:warnLaBa.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        warnLaBa.addChild(warnLabel);
        warnLaBa.attr({
            x:50,
            y:this.mainBackground.getContentSize().height-
              this.rankSelectMenuBackground.getContentSize().height-20,
            anchorX:0.5,
            anchorY:1
        });
        this.mainBackground.addChild(warnLaBa);

        //初始化存放排行记录背景
        this.storeMessageBackground=new cc.Sprite(res.Rank_messageStore_png);
        this.storeMessageBackground.attr({
            x:this.mainBackground.getContentSize().width/2,
            y:this.mainBackground.getContentSize().height-120,
            anchorX:0.5,
            anchorY:1
        });
        this.mainBackground.addChild(this.storeMessageBackground);
    },
    //返回大厅回调函数
    menuCallbackBackHall:function(){
        cc.director.runScene(new cc.TransitionFade(1, new MainScene()));
    },
    //今日充值排行回调函数
    menuCallbackTodayPay:function(){
        //初始化个按钮的可见性
        this.todayPayMenuItem.setEnabled(false);
        this.yesterdayPayMenuItem.setEnabled(true);
        this.yesterdayComeInMenuItem.setEnabled(true);
        this.moneyMenuItem.setEnabled(true);
        this.giftMenuItem.setEnabled(true);
        //清除上个排行信息（如果存在）
        if(this.head!=null){
            this.head.removeFromParent();
            this.head=null;
        }
        if(this.scrollView_rankMessage!=null){
            this.scrollView_rankMessage.removeFromParent();
            this.scrollView_rankMessage=null;
        }
        if(this.myselfMessageBackground!=null){
            this.myselfMessageBackground.removeFromParent();
            this.myselfMessageBackground=null;
        }


        //向服务器发送请求，获取礼物排行信息，根据服务器返回的信息初始化礼物信息排行榜
        //初始化排行表头
        this.head=new cc.Sprite(res.Rank_messageHead_png);
        this.head.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:this.storeMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.storeMessageBackground.addChild(this.head);
        //添加信息项名称
        //排名标签
        var paiMingLabel=new cc.LabelTTF("排名","Arial",25);
        paiMingLabel.attr({
            x:50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(paiMingLabel);
        //昵称标签
        var  niChengLabel=new cc.LabelTTF("昵称","Arial",25);
        niChengLabel.attr({
            x:this.head.getContentSize().width/3-50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(niChengLabel);
        //等级标签
        var  dengJiLabel=new cc.LabelTTF("等级","Arial",25);
        dengJiLabel.attr({
            x:this.head.getContentSize().width*2/3-100,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(dengJiLabel);
        //充值金额标签
        var  caiFuLabel=new cc.LabelTTF("充值金额","Arial",25);
        caiFuLabel.attr({
            x:this.head.getContentSize().width-50-20,
            y:this.head.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        this.head.addChild(caiFuLabel);

        //初始化容器，并向容器中填装排行信息
        this.scrollView_rankMessage=new ccui.ScrollView();
        this.scrollView_rankMessage.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_rankMessage.setTouchEnabled(true);
        this.scrollView_rankMessage.setBounceEnabled(true);
        var scrollView_rankMessageHeight=
            this.storeMessageBackground.getContentSize().height-this.head.getContentSize().height;
        //console.log(this.head.getContentSize().height);
        var scrollView_rankMessageWidth=this.storeMessageBackground.getContentSize().width;
        this.scrollView_rankMessage.setContentSize(
            cc.size(scrollView_rankMessageWidth,scrollView_rankMessageHeight));
        this.scrollView_rankMessage.ignoreAnchorPointForPosition(false);
        this.scrollView_rankMessage.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_rankMessage.setPosition(this.storeMessageBackground.getContentSize().width/2,
            this.storeMessageBackground.getContentSize().height/2-this.head.getContentSize().height/2);
        //容器的大小
        var height=this.playerArray.length*120;
        if(height<=scrollView_rankMessageHeight){
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                scrollView_rankMessageHeight));
        }
        else{
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                height));
        }

        //开始添加数据
        for(var i=0;i<this.playerArray.length;i++){
            //添加纪录背景
            var messageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
            messageBackground.attr({
                x:scrollView_rankMessageWidth/2,
                y:this.scrollView_rankMessage.getInnerContainerSize().height-120*(i+1),
                anchorX:0.5,
                anchorY:0
            });
            this.scrollView_rankMessage.addChild(messageBackground);
            //添加排名精灵
            var paiMingSprite=null;
            if(i==0){
                paiMingSprite=new cc.Sprite(res.Rank_no1_png);
            }
            else{
                if(i==1){
                    paiMingSprite=new cc.Sprite(res.Rank_no2_png);
                }
                else{
                    if(i==2){
                        paiMingSprite=new cc.Sprite(res.Rank_no3_png);
                    }
                    else{
                        paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
                        var numberString=(i+1).toString();
                        var numberLabel=new cc.LabelTTF(numberString,"Arial",20);
                        numberLabel.attr({
                            x:paiMingSprite.getContentSize().width/2,
                            y:paiMingSprite.getContentSize().height/2,
                            anchorX:0.5,
                            anchorY:0.5
                        });
                        paiMingSprite.addChild(numberLabel);
                    }
                }
            }
            paiMingSprite.attr({
                x:30,
                y:messageBackground.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            messageBackground.addChild(paiMingSprite);

            //添加线条
            var lineSprite=new cc.Sprite(res.Rank_line_png);
            lineSprite.attr({
                x:paiMingSprite.getContentSize().width+30,
                y:paiMingSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            paiMingSprite.addChild(lineSprite);

            //添加头像按钮(目前同一为男头像)
            var photoSprite=new cc.Sprite(res.Rank_man_png);
            photoSprite.attr({
                x:lineSprite.getContentSize().width+40,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(photoSprite);
            var frameButton=new ccui.Button(res.Rank_photo_frame_png,res.Rank_photo_frame_png);
            frameButton.setTouchEnabled(true);
            frameButton.setPressedActionEnabled(true);
            var self=this;
            frameButton.addTouchEventListener(function(sender,type){
                if(ccui.Widget.TOUCH_ENDED ==type){
                    self.menuCallbackPersonalMessage(sender);
                }
            });
            frameButton.setName(this.playerArray[i][0]);
            frameButton.attr({
                    x:photoSprite.getContentSize().width/2,
                    y:photoSprite.getContentSize().height/2,
                    anchorX:0.5,
                    anchorY:0.5
                });
            photoSprite.addChild(frameButton);

            //添加昵称
            var niChengString=this.playerArray[i][0].toString();
            var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
            niChengLabel.attr({
                x:lineSprite.getContentSize().width+250,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(niChengLabel);

            //添加等级
            var dengJiString="Lv."+this.playerArray[i][1];
            var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
            dengJiLabel.attr({
                x:lineSprite.getContentSize().width+515,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(dengJiLabel);

            //添加金币项内容

            //var moneySprite=new cc.Sprite(res.Rank_money_png);
            //moneySprite.attr({
            //    x:lineSprite.getContentSize().width+730,
            //    y:lineSprite.getContentSize().height/2,
            //    anchorX:0.5,
            //    anchorY:0.5
            //});
            //lineSprite.addChild(moneySprite);
            var moneyLabel=new cc.LabelTTF(this.playerArray[i][2],"Arial",25);
            moneyLabel.attr({
                x:lineSprite.getContentSize().width+730+50,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(moneyLabel);
        }
        this.scrollView_rankMessage.jumpToTop();
        this.storeMessageBackground.addChild(this.scrollView_rankMessage);

        this.myselfMessage_pay();

        },
    //昨日充值排行回调函数
    menuCallbackYesterdayPay:function(){
        //初始化个按钮的可见性
        this.todayPayMenuItem.setEnabled(true);
        this.yesterdayPayMenuItem.setEnabled(false);
        this.yesterdayComeInMenuItem.setEnabled(true);
        this.moneyMenuItem.setEnabled(true);
        this.giftMenuItem.setEnabled(true);
        //清除上个排行信息（如果存在）
        if(this.head!=null){
            this.head.removeFromParent();
            this.head=null;
        }
        if(this.scrollView_rankMessage!=null){
            this.scrollView_rankMessage.removeFromParent();
            this.scrollView_rankMessage=null;
        }
        if(this.myselfMessageBackground!=null){
            this.myselfMessageBackground.removeFromParent();
            this.myselfMessageBackground=null;
        }



        //向服务器发送请求，获取礼物排行信息，根据服务器返回的信息初始化礼物信息排行榜
        //初始化排行表头
        this.head=new cc.Sprite(res.Rank_messageHead_png);
        this.head.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:this.storeMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.storeMessageBackground.addChild(this.head);
        //添加信息项名称
        //排名标签
        var paiMingLabel=new cc.LabelTTF("排名","Arial",25);
        paiMingLabel.attr({
            x:50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(paiMingLabel);
        //昵称标签
        var  niChengLabel=new cc.LabelTTF("昵称","Arial",25);
        niChengLabel.attr({
            x:this.head.getContentSize().width/3-50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(niChengLabel);
        //等级标签
        var  dengJiLabel=new cc.LabelTTF("等级","Arial",25);
        dengJiLabel.attr({
            x:this.head.getContentSize().width*2/3-100,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(dengJiLabel);
        //充值金额标签
        var  caiFuLabel=new cc.LabelTTF("充值金额","Arial",25);
        caiFuLabel.attr({
            x:this.head.getContentSize().width-50-20,
            y:this.head.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        this.head.addChild(caiFuLabel);


        //初始化容器，并向容器中填装排行信息
        this.scrollView_rankMessage=new ccui.ScrollView();
        this.scrollView_rankMessage.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_rankMessage.setTouchEnabled(true);
        this.scrollView_rankMessage.setBounceEnabled(true);
        var scrollView_rankMessageHeight=
            this.storeMessageBackground.getContentSize().height-this.head.getContentSize().height;
        //console.log(this.head.getContentSize().height);
        var scrollView_rankMessageWidth=this.storeMessageBackground.getContentSize().width;
        this.scrollView_rankMessage.setContentSize(
            cc.size(scrollView_rankMessageWidth,scrollView_rankMessageHeight));
        this.scrollView_rankMessage.ignoreAnchorPointForPosition(false);
        this.scrollView_rankMessage.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_rankMessage.setPosition(this.storeMessageBackground.getContentSize().width/2,
            this.storeMessageBackground.getContentSize().height/2-this.head.getContentSize().height/2);
        //容器的大小
        var height=this.playerArray.length*120;
        if(height<=scrollView_rankMessageHeight){
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                scrollView_rankMessageHeight));
        }
        else{
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                height));
        }

        //开始添加数据
        for(var i=0;i<this.playerArray.length;i++){
            //添加纪录背景
            var messageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
            messageBackground.attr({
                x:scrollView_rankMessageWidth/2,
                y:this.scrollView_rankMessage.getInnerContainerSize().height-120*(i+1),
                anchorX:0.5,
                anchorY:0
            });
            this.scrollView_rankMessage.addChild(messageBackground);
            //添加排名精灵
            var paiMingSprite=null;
            if(i==0){
                paiMingSprite=new cc.Sprite(res.Rank_no1_png);
            }
            else{
                if(i==1){
                    paiMingSprite=new cc.Sprite(res.Rank_no2_png);
                }
                else{
                    if(i==2){
                        paiMingSprite=new cc.Sprite(res.Rank_no3_png);
                    }
                    else{
                        paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
                        var numberString=(i+1).toString();
                        var numberLabel=new cc.LabelTTF(numberString,"Arial",20);
                        numberLabel.attr({
                            x:paiMingSprite.getContentSize().width/2,
                            y:paiMingSprite.getContentSize().height/2,
                            anchorX:0.5,
                            anchorY:0.5
                        });
                        paiMingSprite.addChild(numberLabel);
                    }
                }
            }
            paiMingSprite.attr({
                x:30,
                y:messageBackground.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            messageBackground.addChild(paiMingSprite);

            //添加线条
            var lineSprite=new cc.Sprite(res.Rank_line_png);
            lineSprite.attr({
                x:paiMingSprite.getContentSize().width+30,
                y:paiMingSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            paiMingSprite.addChild(lineSprite);

            //添加头像按钮(目前同一为男头像)
            var photoSprite=new cc.Sprite(res.Rank_man_png);
            photoSprite.attr({
                x:lineSprite.getContentSize().width+40,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(photoSprite);
            var frameButton=new ccui.Button(res.Rank_photo_frame_png,res.Rank_photo_frame_png);
            frameButton.setTouchEnabled(true);
            frameButton.setPressedActionEnabled(true);
            var self=this;
            frameButton.addTouchEventListener(function(sender,type){
                if(ccui.Widget.TOUCH_ENDED ==type){
                    self.menuCallbackPersonalMessage(sender);
                }
            });
            frameButton.setName(this.playerArray[i][0]);
            frameButton.attr({
                x:photoSprite.getContentSize().width/2,
                y:photoSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            photoSprite.addChild(frameButton);

            //var frame1=new cc.Sprite(res.Rank_photo_frame_png);
            //var frame2=new cc.Sprite(res.Rank_photo_frame_png);
            //var frame3=new cc.Sprite(res.Rank_photo_frame_png);
            //var menuItem=new cc.MenuItemSprite(frame1,frame2,frame3,this.menuCallbackPersonalMessage,this);
            //menuItem.setName(this.playerArray[i][0]);
            //var menu=new cc.Menu(menuItem);
            //menu.attr({
            //    x:photoSprite.getContentSize().width/2,
            //    y:photoSprite.getContentSize().height/2,
            //    anchorX:0.5,
            //    anchorY:0.5
            //});
            //photoSprite.addChild(menu);

            //添加昵称
            var niChengString=this.playerArray[i][0].toString();
            var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
            niChengLabel.attr({
                x:lineSprite.getContentSize().width+250,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(niChengLabel);

            //添加等级
            var dengJiString="Lv."+this.playerArray[i][1];
            var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
            dengJiLabel.attr({
                x:lineSprite.getContentSize().width+515,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(dengJiLabel);

            //添加金币项内容

            //var moneySprite=new cc.Sprite(res.Rank_money_png);
            //moneySprite.attr({
            //    x:lineSprite.getContentSize().width+730,
            //    y:lineSprite.getContentSize().height/2,
            //    anchorX:0.5,
            //    anchorY:0.5
            //});
            //lineSprite.addChild(moneySprite);
            var moneyLabel=new cc.LabelTTF(this.playerArray[i][2],"Arial",25);
            moneyLabel.attr({
                x:lineSprite.getContentSize().width+730+50,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(moneyLabel);

        }
        this.scrollView_rankMessage.jumpToTop();
        this.storeMessageBackground.addChild(this.scrollView_rankMessage);

        this.myselfMessage_pay();
    },
    //昨日赚取金币排行回调函数
    menuCallbackYesterdayComeIn:function(){
       //初始化个按钮的可见性
        this.todayPayMenuItem.setEnabled(true);
        this.yesterdayPayMenuItem.setEnabled(true);
        this.yesterdayComeInMenuItem.setEnabled(false);
        this.moneyMenuItem.setEnabled(true);
        this.giftMenuItem.setEnabled(true);
        //清除上个排行信息（如果存在）
        if(this.head!=null){
            this.head.removeFromParent();
            this.head=null;
        }
        if(this.scrollView_rankMessage!=null){
            this.scrollView_rankMessage.removeFromParent();
            this.scrollView_rankMessage=null;
        }
        if(this.myselfMessageBackground!=null){
            this.myselfMessageBackground.removeFromParent();
            this.myselfMessageBackground=null;
        }


        //向服务器发送请求，获取礼物排行信息，根据服务器返回的信息初始化礼物信息排行榜
        //初始化排行表头
        this.head=new cc.Sprite(res.Rank_messageHead_png);
        this.head.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:this.storeMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.storeMessageBackground.addChild(this.head);
        //添加信息项名称
        //排名标签
        var paiMingLabel=new cc.LabelTTF("排名","Arial",25);
        paiMingLabel.attr({
            x:50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(paiMingLabel);
        //昵称标签
        var  niChengLabel=new cc.LabelTTF("昵称","Arial",25);
        niChengLabel.attr({
            x:this.head.getContentSize().width/3-50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(niChengLabel);
        //等级标签
        var  dengJiLabel=new cc.LabelTTF("等级","Arial",25);
        dengJiLabel.attr({
            x:this.head.getContentSize().width*2/3-100,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(dengJiLabel);
        //昨日赚金数标签
        var  YesterdayComeInLabel=new cc.LabelTTF("昨日赚金数","Arial",25);
        YesterdayComeInLabel.attr({
            x:this.head.getContentSize().width-50,
            y:this.head.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        this.head.addChild(YesterdayComeInLabel);

        //初始化容器，并向容器中填装排行信息
        this.scrollView_rankMessage=new ccui.ScrollView();
        this.scrollView_rankMessage.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_rankMessage.setTouchEnabled(true);
        this.scrollView_rankMessage.setBounceEnabled(true);
        var scrollView_rankMessageHeight=
            this.storeMessageBackground.getContentSize().height-this.head.getContentSize().height;
        //console.log(this.head.getContentSize().height);
        var scrollView_rankMessageWidth=this.storeMessageBackground.getContentSize().width;
        this.scrollView_rankMessage.setContentSize(
            cc.size(scrollView_rankMessageWidth,scrollView_rankMessageHeight));
        this.scrollView_rankMessage.ignoreAnchorPointForPosition(false);
        this.scrollView_rankMessage.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_rankMessage.setPosition(this.storeMessageBackground.getContentSize().width/2,
            this.storeMessageBackground.getContentSize().height/2-this.head.getContentSize().height/2);
        //容器的大小
        var height=this.playerArray.length*120;
        if(height<=scrollView_rankMessageHeight){
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                scrollView_rankMessageHeight));
        }
        else{
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                height));
        }

        //开始添加数据
        for(var i=0;i<this.playerArray.length;i++){
            //添加纪录背景
            var messageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
            messageBackground.attr({
                x:scrollView_rankMessageWidth/2,
                y:this.scrollView_rankMessage.getInnerContainerSize().height-120*(i+1),
                anchorX:0.5,
                anchorY:0
            });
            this.scrollView_rankMessage.addChild(messageBackground);
            //添加排名精灵
            var paiMingSprite=null;
            if(i==0){
                paiMingSprite=new cc.Sprite(res.Rank_no1_png);
            }
            else{
                if(i==1){
                    paiMingSprite=new cc.Sprite(res.Rank_no2_png);
                }
                else{
                    if(i==2){
                        paiMingSprite=new cc.Sprite(res.Rank_no3_png);
                    }
                    else{
                        paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
                        var numberString=(i+1).toString();
                        var numberLabel=new cc.LabelTTF(numberString,"Arial",20);
                        numberLabel.attr({
                            x:paiMingSprite.getContentSize().width/2,
                            y:paiMingSprite.getContentSize().height/2,
                            anchorX:0.5,
                            anchorY:0.5
                        });
                        paiMingSprite.addChild(numberLabel);
                    }
                }
            }
            paiMingSprite.attr({
                x:30,
                y:messageBackground.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            messageBackground.addChild(paiMingSprite);

            //添加线条
            var lineSprite=new cc.Sprite(res.Rank_line_png);
            lineSprite.attr({
                x:paiMingSprite.getContentSize().width+30,
                y:paiMingSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            paiMingSprite.addChild(lineSprite);

            //添加头像按钮(目前同一为男头像)
            var photoSprite=new cc.Sprite(res.Rank_man_png);
            photoSprite.attr({
                x:lineSprite.getContentSize().width+40,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(photoSprite);
            var frameButton=new ccui.Button(res.Rank_photo_frame_png,res.Rank_photo_frame_png);
            frameButton.setTouchEnabled(true);
            frameButton.setPressedActionEnabled(true);
            var self=this;
            frameButton.addTouchEventListener(function(sender,type){
                if(ccui.Widget.TOUCH_ENDED ==type){
                    self.menuCallbackPersonalMessage(sender);
                }
            });
            frameButton.setName(this.playerArray[i][0]);
            frameButton.attr({
                x:photoSprite.getContentSize().width/2,
                y:photoSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            photoSprite.addChild(frameButton);

            //var frame1=new cc.Sprite(res.Rank_photo_frame_png);
            //var frame2=new cc.Sprite(res.Rank_photo_frame_png);
            //var frame3=new cc.Sprite(res.Rank_photo_frame_png);
            //var menuItem=new cc.MenuItemSprite(frame1,frame2,frame3,this.menuCallbackPersonalMessage,this);
            //menuItem.setName(this.playerArray[i][0]);
            //var menu=new cc.Menu(menuItem);
            //menu.attr({
            //    x:photoSprite.getContentSize().width/2,
            //    y:photoSprite.getContentSize().height/2,
            //    anchorX:0.5,
            //    anchorY:0.5
            //});
            //photoSprite.addChild(menu);

            //添加昵称
            var niChengString=this.playerArray[i][0].toString();
            var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
            niChengLabel.attr({
                x:lineSprite.getContentSize().width+250,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(niChengLabel);

            //添加等级
            var dengJiString="Lv."+this.playerArray[i][1];
            var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
            dengJiLabel.attr({
                x:lineSprite.getContentSize().width+515,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(dengJiLabel);

            //添加金币项内容
            var moneySprite=new cc.Sprite(res.Rank_money_png);
            moneySprite.attr({
                x:lineSprite.getContentSize().width+730,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(moneySprite);
            var moneyLabel=new cc.LabelTTF(this.playerArray[i][2],"Arial",25);
            moneyLabel.attr({
                x:moneySprite.getContentSize().width+50,
                y:moneySprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            moneySprite.addChild(moneyLabel);

        }
        this.scrollView_rankMessage.jumpToTop();
        this.storeMessageBackground.addChild(this.scrollView_rankMessage);

        this.myselfMessage_startPlay();
    },
    //财富排行回调函数
    menuCallbackMoney:function(){
        //初始化个按钮的可见性
        this.todayPayMenuItem.setEnabled(true);
        this.yesterdayPayMenuItem.setEnabled(true);
        this.yesterdayComeInMenuItem.setEnabled(true);
        this.moneyMenuItem.setEnabled(false);
        this.giftMenuItem.setEnabled(true);
        //清除上个排行信息（如果存在）
        if(this.head!=null){
            this.head.removeFromParent();
            this.head=null;
        }
        if(this.scrollView_rankMessage!=null){
            this.scrollView_rankMessage.removeFromParent();
            this.scrollView_rankMessage=null;
        }
        if(this.myselfMessageBackground!=null){
            this.myselfMessageBackground.removeFromParent();
            this.myselfMessageBackground=null;
        }



        //向服务器发送请求，获取礼物排行信息，根据服务器返回的信息初始化礼物信息排行榜
        //初始化排行表头
        this.head=new cc.Sprite(res.Rank_messageHead_png);
        this.head.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:this.storeMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.storeMessageBackground.addChild(this.head);
        //添加信息项名称
        //排名标签
        var paiMingLabel=new cc.LabelTTF("排名","Arial",25);
        paiMingLabel.attr({
            x:50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(paiMingLabel);
        //昵称标签
        var  niChengLabel=new cc.LabelTTF("昵称","Arial",25);
        niChengLabel.attr({
            x:this.head.getContentSize().width/3-50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(niChengLabel);
        //等级标签
        var  dengJiLabel=new cc.LabelTTF("等级","Arial",25);
        dengJiLabel.attr({
            x:this.head.getContentSize().width*2/3-100,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(dengJiLabel);
        //金币数标签
        var  caiFuLabel=new cc.LabelTTF("金币数","Arial",25);
        caiFuLabel.attr({
            x:this.head.getContentSize().width-50-20,
            y:this.head.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        this.head.addChild(caiFuLabel);


        //初始化容器，并向容器中填装排行信息
        this.scrollView_rankMessage=new ccui.ScrollView();
        this.scrollView_rankMessage.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_rankMessage.setTouchEnabled(true);
        this.scrollView_rankMessage.setBounceEnabled(true);
        var scrollView_rankMessageHeight=
            this.storeMessageBackground.getContentSize().height-this.head.getContentSize().height;
        //console.log(this.head.getContentSize().height);
        var scrollView_rankMessageWidth=this.storeMessageBackground.getContentSize().width;
        this.scrollView_rankMessage.setContentSize(
            cc.size(scrollView_rankMessageWidth,scrollView_rankMessageHeight));
        this.scrollView_rankMessage.ignoreAnchorPointForPosition(false);
        this.scrollView_rankMessage.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_rankMessage.setPosition(this.storeMessageBackground.getContentSize().width/2,
            this.storeMessageBackground.getContentSize().height/2-this.head.getContentSize().height/2);
        //容器的大小
        var height=this.playerArray.length*120;
        if(height<=scrollView_rankMessageHeight){
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                scrollView_rankMessageHeight));
        }
        else{
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                height));
        }

        //开始添加数据
        for(var i=0;i<this.playerArray.length;i++){
            //添加纪录背景
            var messageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
            messageBackground.attr({
                x:scrollView_rankMessageWidth/2,
                y:this.scrollView_rankMessage.getInnerContainerSize().height-120*(i+1),
                anchorX:0.5,
                anchorY:0
            });
            this.scrollView_rankMessage.addChild(messageBackground);
            //添加排名精灵
            var paiMingSprite=null;
            if(i==0){
                paiMingSprite=new cc.Sprite(res.Rank_no1_png);
            }
            else{
                if(i==1){
                    paiMingSprite=new cc.Sprite(res.Rank_no2_png);
                }
                else{
                    if(i==2){
                        paiMingSprite=new cc.Sprite(res.Rank_no3_png);
                    }
                    else{
                        paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
                        var numberString=(i+1).toString();
                        var numberLabel=new cc.LabelTTF(numberString,"Arial",20);
                        numberLabel.attr({
                            x:paiMingSprite.getContentSize().width/2,
                            y:paiMingSprite.getContentSize().height/2,
                            anchorX:0.5,
                            anchorY:0.5
                        });
                        paiMingSprite.addChild(numberLabel);
                    }
                }
            }
            paiMingSprite.attr({
                x:30,
                y:messageBackground.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            messageBackground.addChild(paiMingSprite);

            //添加线条
            var lineSprite=new cc.Sprite(res.Rank_line_png);
            lineSprite.attr({
                x:paiMingSprite.getContentSize().width+30,
                y:paiMingSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            paiMingSprite.addChild(lineSprite);

            //添加头像按钮(目前同一为男头像)
            var photoSprite=new cc.Sprite(res.Rank_man_png);
            photoSprite.attr({
                x:lineSprite.getContentSize().width+40,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(photoSprite);
            var frameButton=new ccui.Button(res.Rank_photo_frame_png,res.Rank_photo_frame_png);
            frameButton.setTouchEnabled(true);
            frameButton.setPressedActionEnabled(true);
            var self=this;
            frameButton.addTouchEventListener(function(sender,type){
                if(ccui.Widget.TOUCH_ENDED ==type){
                    self.menuCallbackPersonalMessage(sender);
                }
            });
            frameButton.setName(this.playerArray[i][0]);
            frameButton.attr({
                x:photoSprite.getContentSize().width/2,
                y:photoSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            photoSprite.addChild(frameButton);

            //添加昵称
            var niChengString=this.playerArray[i][0].toString();
            var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
            niChengLabel.attr({
                x:lineSprite.getContentSize().width+250,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(niChengLabel);

            //添加等级
            var dengJiString="Lv."+this.playerArray[i][1];
            var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
            dengJiLabel.attr({
                x:lineSprite.getContentSize().width+515,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(dengJiLabel);

            //添加金币项内容
            var moneySprite=new cc.Sprite(res.Rank_money_png);
            moneySprite.attr({
                x:lineSprite.getContentSize().width+730,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(moneySprite);
            var moneyLabel=new cc.LabelTTF(this.playerArray[i][2],"Arial",25);
            moneyLabel.attr({
                x:moneySprite.getContentSize().width+50,
                y:moneySprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            moneySprite.addChild(moneyLabel);

        }
        this.scrollView_rankMessage.jumpToTop();
        this.storeMessageBackground.addChild(this.scrollView_rankMessage);

        this.myselfMessage_startPlay();
    },
    //礼物排行回调函数
    menuCallbackSelectGift:function(){
        //初始化个按钮的可见性
        this.todayPayMenuItem.setEnabled(true);
        this.yesterdayPayMenuItem.setEnabled(true);
        this.yesterdayComeInMenuItem.setEnabled(true);
        this.moneyMenuItem.setEnabled(true);
        this.giftMenuItem.setEnabled(false);
        //清除上个排行信息（如果存在）
        if(this.head!=null){
            this.head.removeFromParent();
            this.head=null;
        }
        if(this.scrollView_rankMessage!=null){
            this.scrollView_rankMessage.removeFromParent();
            this.scrollView_rankMessage=null;
        }
        if(this.myselfMessageBackground!=null){
            this.myselfMessageBackground.removeFromParent();
            this.myselfMessageBackground=null;
        }



        //向服务器发送请求，获取礼物排行信息，根据服务器返回的信息初始化礼物信息排行榜
        //初始化排行表头
        this.head=new cc.Sprite(res.Rank_messageHead_png);
        this.head.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:this.storeMessageBackground.getContentSize().height,
            anchorX:0.5,
            anchorY:1
        });
        this.storeMessageBackground.addChild(this.head);
        //添加信息项名称
        //排名标签
        var paiMingLabel=new cc.LabelTTF("排名","Arial",25);
        paiMingLabel.attr({
            x:50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(paiMingLabel);
        //昵称标签
        var  niChengLabel=new cc.LabelTTF("昵称","Arial",25);
        niChengLabel.attr({
            x:this.head.getContentSize().width/3-50,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(niChengLabel);
        //等级标签
        var  dengJiLabel=new cc.LabelTTF("等级","Arial",25);
        dengJiLabel.attr({
            x:this.head.getContentSize().width*2/3-100,
            y:this.head.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.head.addChild(dengJiLabel);
        //礼物总价值
        var  liWuLabel=new cc.LabelTTF("礼物总价值","Arial",25);
        liWuLabel.attr({
            x:this.head.getContentSize().width-50,
            y:this.head.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        this.head.addChild(liWuLabel);

        //初始化容器，并向容器中填装排行信息
        this.scrollView_rankMessage=new ccui.ScrollView();
        this.scrollView_rankMessage.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView_rankMessage.setTouchEnabled(true);
        this.scrollView_rankMessage.setBounceEnabled(true);
        var scrollView_rankMessageHeight=
            this.storeMessageBackground.getContentSize().height-this.head.getContentSize().height;
        //console.log(this.head.getContentSize().height);
        var scrollView_rankMessageWidth=this.storeMessageBackground.getContentSize().width;
        this.scrollView_rankMessage.setContentSize(
            cc.size(scrollView_rankMessageWidth,scrollView_rankMessageHeight));
        this.scrollView_rankMessage.ignoreAnchorPointForPosition(false);
        this.scrollView_rankMessage.setAnchorPoint(cc.p(0.5,0.5));
        this.scrollView_rankMessage.setPosition(this.storeMessageBackground.getContentSize().width/2,
            this.storeMessageBackground.getContentSize().height/2-this.head.getContentSize().height/2);
        //容器的大小
        var height=this.playerArray.length*120;
        if(height<=scrollView_rankMessageHeight){
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
                scrollView_rankMessageHeight));
        }
        else{
            this.scrollView_rankMessage.setInnerContainerSize(cc.size(scrollView_rankMessageWidth,
            height));
        }

        //开始添加数据
        for(var i=0;i<this.playerArray.length;i++){
            //添加纪录背景
            var messageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
            messageBackground.attr({
                x:scrollView_rankMessageWidth/2,
                y:this.scrollView_rankMessage.getInnerContainerSize().height-120*(i+1),
                anchorX:0.5,
                anchorY:0
            });
            this.scrollView_rankMessage.addChild(messageBackground);
            //添加排名精灵
            var paiMingSprite=null;
            if(i==0){
                paiMingSprite=new cc.Sprite(res.Rank_no1_png);
            }
            else{
                if(i==1){
                    paiMingSprite=new cc.Sprite(res.Rank_no2_png);
                }
                else{
                    if(i==2){
                        paiMingSprite=new cc.Sprite(res.Rank_no3_png);
                    }
                    else{
                        paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
                        var numberString=(i+1).toString();
                        var numberLabel=new cc.LabelTTF(numberString,"Arial",20);
                        numberLabel.attr({
                            x:paiMingSprite.getContentSize().width/2,
                            y:paiMingSprite.getContentSize().height/2,
                            anchorX:0.5,
                            anchorY:0.5
                        });
                        paiMingSprite.addChild(numberLabel);
                    }
                }
            }
            paiMingSprite.attr({
                x:30,
                y:messageBackground.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            messageBackground.addChild(paiMingSprite);

            //添加线条
            var lineSprite=new cc.Sprite(res.Rank_line_png);
            lineSprite.attr({
                x:paiMingSprite.getContentSize().width+30,
                y:paiMingSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            paiMingSprite.addChild(lineSprite);

            //添加头像按钮(目前同一为男头像)
            var photoSprite=new cc.Sprite(res.Rank_man_png);
            photoSprite.attr({
                x:lineSprite.getContentSize().width+40,
                y:lineSprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            lineSprite.addChild(photoSprite);
            var frameButton=new ccui.Button(res.Rank_photo_frame_png,res.Rank_photo_frame_png);
            frameButton.setTouchEnabled(true);
            frameButton.setPressedActionEnabled(true);
            var self=this;
            frameButton.addTouchEventListener(function(sender,type){
                if(ccui.Widget.TOUCH_ENDED ==type){
                    self.menuCallbackPersonalMessage(sender);
                }
            });
            frameButton.setName(this.playerArray[i][0]);
            frameButton.attr({
                x:photoSprite.getContentSize().width/2,
                y:photoSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            photoSprite.addChild(frameButton);

            //添加昵称
            var niChengString=this.playerArray[i][0].toString();
            var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
            niChengLabel.attr({
                x:lineSprite.getContentSize().width+250,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(niChengLabel);

            //添加等级
            var dengJiString="Lv."+this.playerArray[i][1];
            var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
            dengJiLabel.attr({
                x:lineSprite.getContentSize().width+515,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(dengJiLabel);

            //添加金币项内容
            var moneySprite=new cc.Sprite(res.Rank_money_png);
            moneySprite.attr({
                x:lineSprite.getContentSize().width+730,
                y:lineSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            lineSprite.addChild(moneySprite);
            var moneyLabel=new cc.LabelTTF(this.playerArray[i][2],"Arial",25);
            moneyLabel.attr({
                x:moneySprite.getContentSize().width+50,
                y:moneySprite.getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            moneySprite.addChild(moneyLabel);

        }
        this.scrollView_rankMessage.jumpToTop();
        this.storeMessageBackground.addChild(this.scrollView_rankMessage);
    },
    //初始化个人排行信息函数（含有充值按钮）
    myselfMessage_pay:function(){
        //放置个人信息的背景
        this.myselfMessageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
        this.myselfMessageBackground.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:0,
            anchorX:0.5,
            anchorY:0.5
        });
        this.storeMessageBackground.addChild(this.myselfMessageBackground);

        //添加排名,0代表为上榜，其他表示排名
        var paiMingSprite=null;
        if(this.myselfMessage[0]==1){
            paiMingSprite=new cc.Sprite(res.Rank_no1_png);
        }
        if(this.myselfMessage[0]==2){
            paiMingSprite=new cc.Sprite(res.Rank_no2_png);
        }
        if(this.myselfMessage[0]==3){
            paiMingSprite=new cc.Sprite(res.Rank_no3_png);
        }
        if(this.myselfMessage[0]==0){
            paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
            var paiMingLabel=new cc.LabelTTF("未上榜","Arial",20);
            paiMingLabel.attr({
                x: paiMingSprite.getContentSize().width/2,
                y: paiMingSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            paiMingSprite.addChild(paiMingLabel);
        }
        if(this.myselfMessage[0]>3){
            paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
            var paiMingLabel=new cc.LabelTTF(this.myselfMessage[0].toString(),"Arial",20);
            paiMingLabel.attr({
                x: paiMingSprite.getContentSize().width/2,
                y: paiMingSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            paiMingSprite.addChild(paiMingLabel);
        }
        paiMingSprite.attr({
            x:30,
            y:this.myselfMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.myselfMessageBackground.addChild(paiMingSprite);
        //添加线条
        var lineSprite=new cc.Sprite(res.Rank_line_png);
        lineSprite.attr({
            x:paiMingSprite.getContentSize().width+30,
            y:paiMingSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        paiMingSprite.addChild(lineSprite);
        //添加头像
        var photoSprite=new cc.Sprite(res.Rank_man_png);
        photoSprite.attr({
            x:lineSprite.getContentSize().width+40,
            y:lineSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        lineSprite.addChild(photoSprite);
        var photoFrame=new cc.Sprite(res.Rank_photo_frame_png);
        photoFrame.attr({
            x:photoSprite.getContentSize().width/2,
            y:photoSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        photoSprite.addChild(photoFrame);

        //添加昵称
        var niChengString=this.myselfMessage[1].toString();
        var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
        niChengLabel.attr({
            x:lineSprite.getContentSize().width+250,
            y:lineSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        lineSprite.addChild(niChengLabel);

        //添加等级
        var dengJiString="Lv."+this.myselfMessage[2];
        var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
        dengJiLabel.attr({
            x:lineSprite.getContentSize().width+515,
            y:lineSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        lineSprite.addChild(dengJiLabel);

        //添加充值按钮
        var payMenuItemSprite1=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var payMenuItemSprite2=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var payMenuItemSprite3=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var payMenuItemString1=new cc.Sprite(res.Rank_myselfMessagePayMenuString_png);
        var payMenuItemString2=new cc.Sprite(res.Rank_myselfMessagePayMenuString_png);
        var payMenuItemString3=new cc.Sprite(res.Rank_myselfMessagePayMenuString_png);
        payMenuItemString1.attr({
            x: payMenuItemSprite1.getContentSize().width/2,
            y: payMenuItemString1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        payMenuItemSprite1.addChild(payMenuItemString1);
        payMenuItemString2.attr({
            x: payMenuItemSprite2.getContentSize().width/2,
            y: payMenuItemString2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        payMenuItemSprite2.addChild(payMenuItemString2);
        payMenuItemString3.attr({
            x: payMenuItemSprite3.getContentSize().width/2,
            y: payMenuItemString3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        payMenuItemSprite3.addChild(payMenuItemString3);
        var payMenuItem=new cc.MenuItemSprite(payMenuItemSprite1,payMenuItemSprite2,payMenuItemSprite3,
            this.menuCallbackToPayNow,this);
        var payMenu=new cc.Menu(payMenuItem);
        payMenu.attr({
            x:lineSprite.getContentSize().width+730+payMenuItemString1.getContentSize().width,
            y:lineSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.myselfMessageBackground.addChild(payMenu);
    },
    //初始化个人排行信息函数（含有开始游戏按钮）
    myselfMessage_startPlay:function(){
        //放置个人信息的背景
        this.myselfMessageBackground=new cc.Sprite(res.Rank_a_messageBackground_png);
        this.myselfMessageBackground.attr({
            x:this.storeMessageBackground.getContentSize().width/2,
            y:0,
            anchorX:0.5,
            anchorY:0.5
        });
        this.storeMessageBackground.addChild(this.myselfMessageBackground);

        //添加排名,0代表为上榜，其他表示排名
        var paiMingSprite=null;
        if(this.myselfMessage[0]==1){
            paiMingSprite=new cc.Sprite(res.Rank_no1_png);
        }
        if(this.myselfMessage[0]==2){
            paiMingSprite=new cc.Sprite(res.Rank_no2_png);
        }
        if(this.myselfMessage[0]==3){
            paiMingSprite=new cc.Sprite(res.Rank_no3_png);
        }
        if(this.myselfMessage[0]==0){
            paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
            var paiMingLabel=new cc.LabelTTF("未上榜","Arial",20);
            paiMingLabel.attr({
                x: paiMingSprite.getContentSize().width/2,
                y: paiMingSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            paiMingSprite.addChild(paiMingLabel);
        }
        if(this.myselfMessage[0]>3){
            paiMingSprite=new cc.Sprite(res.Rank_noOther_png);
            var paiMingLabel=new cc.LabelTTF(this.myselfMessage[0].toString(),"Arial",20);
            paiMingLabel.attr({
                x: paiMingSprite.getContentSize().width/2,
                y: paiMingSprite.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            paiMingSprite.addChild(paiMingLabel);
        }
        paiMingSprite.attr({
            x:30,
            y:this.myselfMessageBackground.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.myselfMessageBackground.addChild(paiMingSprite);
        //添加线条
        var lineSprite=new cc.Sprite(res.Rank_line_png);
        lineSprite.attr({
            x:paiMingSprite.getContentSize().width+30,
            y:paiMingSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        paiMingSprite.addChild(lineSprite);
        //添加头像
        var photoSprite=new cc.Sprite(res.Rank_man_png);
        photoSprite.attr({
            x:lineSprite.getContentSize().width+40,
            y:lineSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        lineSprite.addChild(photoSprite);
        var photoFrame=new cc.Sprite(res.Rank_photo_frame_png);
        photoFrame.attr({
            x:photoSprite.getContentSize().width/2,
            y:photoSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        photoSprite.addChild(photoFrame);

        //添加昵称
        var niChengString=this.myselfMessage[1].toString();
        var niChengLabel=new cc.LabelTTF(niChengString,"Arial",25);
        niChengLabel.attr({
            x:lineSprite.getContentSize().width+250,
            y:lineSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        lineSprite.addChild(niChengLabel);

        //添加等级
        var dengJiString="Lv."+this.myselfMessage[2];
        var dengJiLabel=new cc.LabelTTF(dengJiString,"Arial",25);
        dengJiLabel.attr({
            x:lineSprite.getContentSize().width+515,
            y:lineSprite.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        lineSprite.addChild(dengJiLabel);

        //添加开始游戏
        var startMenuItemSprite1=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var startMenuItemSprite2=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var startMenuItemSprite3=new cc.Sprite(res.Rank_myselfMessageMenu_png);
        var startMenuItemString1=new cc.Sprite(res.Rank_myselfMessageStartMenuString_png);
        var startMenuItemString2=new cc.Sprite(res.Rank_myselfMessageStartMenuString_png);
        var startMenuItemString3=new cc.Sprite(res.Rank_myselfMessageStartMenuString_png);
        startMenuItemString1.attr({
            x: startMenuItemSprite1.getContentSize().width/2,
            y: startMenuItemString1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        startMenuItemSprite1.addChild(startMenuItemString1);
        startMenuItemString2.attr({
            x: startMenuItemSprite2.getContentSize().width/2,
            y: startMenuItemString2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        startMenuItemSprite2.addChild(startMenuItemString2);
        startMenuItemString3.attr({
            x: startMenuItemSprite3.getContentSize().width/2,
            y: startMenuItemString3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        startMenuItemSprite3.addChild(startMenuItemString3);
        var startMenuItem=new cc.MenuItemSprite(startMenuItemSprite1,startMenuItemSprite2,startMenuItemSprite3,
            this.menuCallbackToStartNow,this);
        var startMenu=new cc.Menu(startMenuItem);
        startMenu.attr({
            x:lineSprite.getContentSize().width+730+startMenuItemString1.getContentSize().width,
            y:lineSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        this.myselfMessageBackground.addChild(startMenu);
    },
    //点击排行榜上玩家的头像时弹出该玩家的个人信息按钮回调函数
    menuCallbackPersonalMessage:function(sender){
            console.log(sender.getName()+"的个人信息！！！！");
            var layerPersonalMessage=new PopUpRankingPersonalMessageLayer();
            this.addChild(layerPersonalMessage,15);
    },
    //点击充值按钮的回调函数
    menuCallbackToPayNow:function(){
        console.log("进入充值选择界面!!!!!!!");
        var buyDiamondSelectLayer=new PopUpBuyDiamondSelectLayer();
        this.addChild(buyDiamondSelectLayer,15);
    },
    //点击开始游戏按钮的回调函数
    menuCallbackToStartNow:function(){
        loadGameScene(uid);
    }
});
var RankingScene=cc.Scene.extend({
    onEnter: function () {
        this._super();
        var rankingLayer = new RankingLayer();
        this.addChild(rankingLayer);

    }
});