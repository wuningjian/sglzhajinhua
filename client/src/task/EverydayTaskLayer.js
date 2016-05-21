/**
 * Created by MQN on 2016/4/22.
 */
var everydayTaskNum = 6;
var eveTaskKey0 = 1101;
var eveTaskKey1 = 1102;
var eveTaskKey2 = 1103;
var eveTaskKey3 = 1104;
var eveTaskKey4 = 1105;
var eveTaskKey5 = 1106;

var everydayTaskLayer = cc.Layer.extend({

    size:null,
    listView:null,

    lblLayer:null,
    lblLayerA:null,

    everydayTaskTTF:null,
    everydayTaskTTFA:null,

    everydayPlay:null,
    everydayWin:null,
    everydayExchange:null,
    everydayAllIn:null,
    everydayFinish:null,
    everydayLoginTimes:null,
    everydaySpeaker:null,

    progress:null,
    progressA:null,

    button:null,
    buttonA:null,

    eveTaskLs:null,
    eveTaskLsA:null,

    ctor:function () {
        this._super();
        this.size = cc.winSize;

        this.everydayPlay = everydayPlay;
        this.everydayWin = everydayWin;
        this.everydayExchange = everydayExchange;
        this.everydayAllIn = everydayAllIn;
        this.everydaySpeaker = everydaySpeaker;
        this.everydayFinish = 0;

        // Create the list view
        this.listView = new ccui.ListView();
        // set list view ex direction
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        //this.listView.setBackGroundImage(res.TaskBg_png);
        //this.listView.setBackGroundImageScale9Enabled(true);
        this.listView.setContentSize(cc.size(1000, 500));
        this.listView.setAnchorPoint(0.5, 0.5);
        this.listView.x = this.size.width/2;
        this.listView.y = this.size.height/2;
        //this.listView.setPosition(0, 0);
        //this.listView.addEventListener(this.selectedItemEvent, this);
        this.addChild(this.listView);

        var default_item = new ccui.Layout();
        default_item.setTouchEnabled(true);
        default_item.setContentSize(cc.size(1000, 1));
        default_item.width = this.listView.width;
        // set model
        this.listView.setItemModel(default_item);

        for (var i = 0; i < everydayTaskNum; i++) {
            this.listView.pushBackDefaultItem();
        }

        this.everydayTaskTTFA = [];
        this.lblLayerA = [];
        this.progressA = [];
        this.buttonA = [];
        this.eveTaskLsA = [];
        for(var i=0; i<everydayTaskNum; i++){
            //每一条layout
            this.lblLayer = new ccui.Layout();
            this.lblLayerA.push(this.lblLayer);
            this.listView.insertCustomItem(this.lblLayer);

            //每一条任务
            this.everydayTaskTTF = new cc.LabelTTF("每日任务"+i, "黑体", 24);
            this.everydayTaskTTF.setContentSize(cc.size(400,50));
            this.everydayTaskTTF.setAnchorPoint(0, 0.5);
            this.everydayTaskTTF.x= this.listView.width/2 - 400;
            this.everydayTaskTTF.y=80*-1*i - 50;
            this.everydayTaskTTFA.push(this.everydayTaskTTF);
            this.lblLayer.addChild(this.everydayTaskTTF);
            //this.listView.pushBackCustomItem(this.lblLayer);



            //任务之间的分割线
            var line = new cc.Sprite(res.TaskLine_png);
            line.x = this.listView.width/2;
            line.y = 80*-1*i - 100;
            this.lblLayer.addChild(line);

            //任务完成情况
            this.progress = new cc.LabelTTF("0000", "黑体", 30);
            this.progress.x = this.everydayTaskTTF.x + 500;
            this.progress.y = this.everydayTaskTTF.y ;
            this.progressA.push(this.progress);
            this.lblLayer.addChild(this.progress);

            //任务对应按钮
            this.button = new ccui.Button();
            this.button.loadTextures(
                res.Can_png,
                res.Cannot_png,
                res.Cannot_png
            );
            this.button.setPosition(this.progress.x+200, this.progress.y-10);
            this.button.setTag(1001+i);
            this.buttonA.push(this.button);
            this.lblLayer.addChild(this.button);
            this.button.setEnabled(false);
            this.button.setBright(false);
            this.button.addTouchEventListener(
                this.eveTaskRewardCallback, this);
            console.log("this.button.setTag>>" +  this.button.getTag());

            //每条任务对应一个LS
            this.eveTaskLs = cc.sys.localStorage;
            this.eveTaskLsA.push(this.eveTaskLs);

            //任务信息
            switch(i){
                case 0 :
                    this.everydayTaskTTF.setString("任意场玩牌8局,奖励1000金币");
                    this.progress.setString(this.everydayPlay+"/8");
                    break;
                case 1 :
                    this.everydayTaskTTF.setString("任意场赢牌8局，奖励2000金币");
                    this.progress.setString(this.everydayWin+"/8");
                    break;
                case 2 :
                    this.everydayTaskTTF.setString("使用换牌卡3次奖励1200金币");
                    this.progress.setString(this.everydayExchange+"/3");
                    break;
                case 3 :
                    this.everydayTaskTTF.setString("全押1次，奖励1800金币");
                    this.progress.setString(this.everydayAllIn+"/1");
                    break;
                case 4 :
                    this.everydayTaskTTF.setString("发送大喇叭10次，奖励10000金币");
                    this.progress.setString(this.everydaySpeaker+"/10");
                    break;
                case 5 :
                    this.everydayTaskTTF.setString("完成所有每日任务，奖励1800金币");
                    this.progress.setString(this.everydaySpeaker+"/5");
                    break;
            }


        }
        // set all items layout gravity
        this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

        //对任务进行判断
        //每天首次登陆，重置LS
        if(this.everydayLoginTimes == 1){
            this.eveTaskLsA[0].setItem(eveTaskKey0, 0);
            this.eveTaskLsA[1].setItem(eveTaskKey1, 0);
            this.eveTaskLsA[2].setItem(eveTaskKey2, 0);
            this.eveTaskLsA[3].setItem(eveTaskKey3, 0);
            this.eveTaskLsA[4].setItem(eveTaskKey4, 0);
            this.eveTaskLsA[5].setItem(eveTaskKey5, 0);
        }
        if(this.everydayPlay >= 8){//完成任务
            if(this.eveTaskLsA[0].getItem(eveTaskKey0) != 1){//未领奖励
                this.buttonA[0].setEnabled(true);
                this.buttonA[0].setBright(true);
            }else if(this.eveTaskLsA[0].getItem(eveTaskKey0) == 1){//已领过奖励
                this.setFinish(0);
            }

            this.everydayFinish++;
        }
        if(this.everydayWin >= 8){//完成任务
            if(this.eveTaskLsA[1].getItem(eveTaskKey1) != 1){//未领奖励
                this.buttonA[1].setEnabled(true);
                this.buttonA[1].setBright(true);
            }else if(this.eveTaskLsA[0].getItem(eveTaskKey1) == 1){//已领过奖励
                this.setFinish(1);
            }
            this.everydayFinish++;
        }
        if(this.everydayExchange >= 3){//完成任务
            if(this.eveTaskLsA[2].getItem(eveTaskKey2) != 1){//未领奖励
                this.buttonA[2].setEnabled(true);
                this.buttonA[2].setBright(true);
            }else if(this.eveTaskLsA[2].getItem(eveTaskKey2) == 1){//已领过奖励
                this.setFinish(2);
            }
            this.everydayFinish++;
        }
        if(this.everydayAllIn >= 1){//完成任务
            if(this.eveTaskLsA[3].getItem(eveTaskKey3) != 1){//未领奖励
                this.buttonA[3].setEnabled(true);
                this.buttonA[3].setBright(true);
            }else if(this.eveTaskLsA[3].getItem(eveTaskKey3) == 1){//已领过奖励
                this.setFinish(3);
            }
            this.everydayFinish++;
        }
        if(this.everydaySpeaker >= 10){//完成任务
            if(this.eveTaskLsA[4].getItem(eveTaskKey4) != 1){//未领奖励
                this.buttonA[4].setEnabled(true);
                this.buttonA[4].setBright(true);
            }else if(this.eveTaskLsA[4].getItem(eveTaskKey4) == 1){//已领过奖励
                this.setFinish(4);
            }
            this.everydayFinish++;
        }
        if(this.everydayFinish == 5){//完成任务
            if(this.eveTaskLsA[5].getItem(eveTaskKey5) != 1){//未领奖励
                this.buttonA[5].setEnabled(true);
                this.buttonA[5].setBright(true);
            }else if(this.eveTaskLsA[5].getItem(eveTaskKey5) == 1){//已领过奖励
                this.setFinish(5);
            }
        }
        this.progress.setString(this.everydayFinish+"/5");

        //this.listView.jumpToTop();
        //this.listView.pushBackCustomItem(this.lblLayer);

    },

    eveTaskRewardCallback:function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
            {
                break;
            }
            case ccui.Widget.TOUCH_MOVED:
            {
                break;
            }
            case ccui.Widget.TOUCH_ENDED:
            {
                //var playerId = playerId;
                console.log("eveTaskRewardCallback");
                var rewardTag = sender.getTag();
                console.log("rewardTag>>"+ rewardTag);

                this.buttonA[rewardTag-1001].setEnabled(false);
                this.buttonA[rewardTag-1001].setBright(false);
                var finish = new cc.Sprite(res.Finish_png);
                finish.x = sender.x;
                finish.y = sender.y;
                this.lblLayerA[rewardTag-1001].addChild(finish);
                this.lblLayerA[rewardTag-1001].removeChildByTag(rewardTag);
                //console.log("add finish img");
                //console.log("remove button");

                Servers.finishTask(playerId, rewardTag, function(data){
                    console.log("finishTask");
                    console.log("Servers.finishTask>>" + JSON.stringify(data));
                });

                switch(rewardTag-1001){
                    case 0:
                        this.eveTaskLsA[0].setItem(eveTaskKey0, 1);
                        break;
                    case 1:
                        this.eveTaskLsA[1].setItem(eveTaskKey1, 1);
                        break;
                    case 2:
                        this.eveTaskLsA[2].setItem(eveTaskKey2, 1);
                        break;
                    case 3:
                        this.eveTaskLsA[3].setItem(eveTaskKey3, 1);
                        break;
                    case 4:
                        this.eveTaskLsA[4].setItem(eveTaskKey4, 1);
                        break;

                }

                break;
            }
        }
    },

    setFinish:function(j){
        this.buttonA[j].setEnabled(false);
        this.buttonA[j].setBright(false);
        var finish = new cc.Sprite(res.Finish_png);
        finish.x = this.everydayTaskTTFA[j].x + 700;
        finish.y = this.everydayTaskTTFA[j].y;
        this.lblLayerA[j].addChild(finish);
        this.lblLayerA[j].removeChild(this.buttonA[j]);
    },

    selectedItemEvent: function (sender, type) {
        cc.log("selectedItemEvent");
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                var rewardTag = sender.getTag();
                console.log("rewardTag>>"+ rewardTag);
                this.lblLayer.removeChild(sender);
                //this.btn[rewardTag-"S0"].setTouchEnabled(false);
                //this.buttonA[rewardTag-1001].setEnabled(false);
                //this.buttonA[rewardTag-1001].setBright(false);
                var finish = new cc.Sprite(res.Finish_png);
                finish.x = sender.x;
                finish.y = sender.y;
                this.lblLayer.addChild(finish, 2);
                console.log("add finish img");

                console.log("remove button");
                break;

            default:
                break;
        }
    }
});