/**
 * Created by MQN on 2016/3/31.
 */

var avatarInfoTag = 0;
var qiandaoKey = 0;

//大厅信息层
var lobbyInfoLayer = cc.Layer.extend({
    avatar:null,

    qiandaoMu:null,
    qiandaoMenuItem:null,

    storeMu:null,
    storeMenuItem:null,

    freeBonusMu:null,
    freeBonusMenuItem:null,

    taskMu:null,
    taskMenuItem:null,


    feedbackMenuItem:null,

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
        this.qiandaoMu.x = 150;
        this.qiandaoMu.y = 40;
        this.addChild(this.qiandaoMu, 1);

        console.log("continueLoginDaysNew>>" + continueLoginDaysNew);
        console.log("continueLoginDays>>" + this.ls.getItem(qiandaoKey));
        if(continueLoginDaysNew == this.ls.getItem(qiandaoKey)){
            this.qiandaoMenuItem.setEnabled(false);
        }else if(continueLoginDaysNew != this.ls.getItem(qiandaoKey)){
            this.qiandaoMenuItem.setEnabled(true);
        }

        //商店按钮
        this.storeMenuItem = new cc.MenuItemImage(
            res.Store_png,
            res.Store_png,
            this.storeCallback, this);
        this.storeMu = new cc.Menu(this.storeMenuItem);
        this.storeMu.x = size.width/2 - 300;
        this.storeMu.y = size.height/2 - 320;
        this.addChild(this.storeMu, 1);

        //免费奖励（定点奖励）按钮
        this.freeBonusMenuItem = new cc.MenuItemImage(
            res.FreeBonus_png,
            res.FreeBonus_png,
            this.freeBonusCallback, this);
        this.freeBonusMu = new cc.Menu(this.freeBonusMenuItem);
        this.freeBonusMu.x = this.storeMu.x + 150;
        this.freeBonusMu.y = this.storeMu.y;
        this.addChild(this.freeBonusMu, 1);

        //活动按钮
        this.activityMenuItem = new cc.MenuItemImage(
            res.Activity_png,
            res.Activity_png,
            this.activityCallback, this);
        this.activityMu = new cc.Menu(this.activityMenuItem);
        this.activityMu.x = this.freeBonusMu.x + 150;
        this.activityMu.y = this.freeBonusMu.y;
        this.addChild(this.activityMu, 1);

        //摇钱树按钮
        this.moneyTreeMenuItem = new cc.MenuItemImage(
            res.MoneyTree_png,
            res.MoneyTree_png,
            this.moneyTreeCallback, this);
        this.moneyTreeMu = new cc.Menu(this.moneyTreeMenuItem);
        this.moneyTreeMu.x = this.activityMu.x + 150;
        this.moneyTreeMu.y = this.activityMu.y;
        this.addChild(this.moneyTreeMu, 1);

        //任务按钮
        this.taskMenuItem = new cc.MenuItemImage(
            res.Task_png,
            res.Task_png,
            this.taskCallback, this);
        this.taskMu = new cc.Menu(this.taskMenuItem);
        this.taskMu.x = this.moneyTreeMu.x + 150;
        this.taskMu.y = this.moneyTreeMu.y;
        this.addChild(this.taskMu, 1);

        //反馈按钮
        this.feedbackMenuItem = new ccui.Button();
        this.feedbackMenuItem.loadTextures(
            res.Feedback_png,
            res.Feedback_png,
            res.Feedback_png
        );
        this.feedbackMenuItem.setEnabled(true);
        this.feedbackMenuItem.x = this.taskMu.x + 150;
        this.feedbackMenuItem.y = this.taskMu.y;
        this.addChild(this.feedbackMenuItem, 1);
        this.feedbackMenuItem.addTouchEventListener(
            this.feedbackCallback, this
        );



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
                //cc.director.runScene(new HelloWorldScene());
                cc.director.runScene(new MainScene());
                backMenu.setVisible(false);
                this.infoLayer.removeChild(this.avatarLayer);

            },this);
        var backMenu = new cc.Menu(backBtn);
        backMenu.x = 100;
        backMenu.y = 60;
        this.addChild(backMenu, 4);
    },

    //商店回调函数，跳转至商城页面
    storeCallback:function(){
        cc.director.runScene(new cc.TransitionFade(0.5, new StoreScene()));
    },

    //免费奖励回调函数，跳转至定点奖励页面
    freeBonusCallback:function(){
        cc.director.runScene(new FreeBonusScene());
    },

    //活动按钮回调函数，跳转至活动页面（VIP领奖）
    activityCallback:function(){
        cc.director.runScene(new VipRewardScene());
    },

    //摇钱树回调函数，跳转至摇钱树页面
    moneyTreeCallback:function(){
        cc.director.runScene(new MoneyTreeScene());
    },

    //任务按钮回调函数，跳转至任务页面
    taskCallback:function(){
        cc.director.runScene(new TaskScene());
    },

    //反馈按钮回调函数，跳转至反馈界面
    feedbackCallback:function(){
        cc.director.runScene(new FeedbackScene());
    }

});
