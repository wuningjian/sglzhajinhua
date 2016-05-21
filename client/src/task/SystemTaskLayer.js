/**
 * Created by MQN on 2016/4/25.
 */

var systemTaskNum = 18;

var sysTaskKey0 = 1141;
var sysTaskKey1 = 1142;
var sysTaskKey2 = 1143;
var sysTaskKey3 = 1144;
var sysTaskKey4 = 1145;
var sysTaskKey5 = 1146;
var sysTaskKey6 = 1147;
var sysTaskKey7 = 1148;
var sysTaskKey8 = 1149;
var sysTaskKey9 = 1150;
var sysTaskKey10 = 1151;
var sysTaskKey11 = 1152;
var sysTaskKey12 = 1153;
var sysTaskKey13 = 1154;
var sysTaskKey14 = 1155;
var sysTaskKey15 = 1156;
var sysTaskKey16 = 1157;
var sysTaskKey17 = 1158;


var systemTaskLayer = cc.Layer.extend({

    size:null,
    listView:null,

    button:null,
    btn:null,
    systemTaskTTF:null,
    sysTaskTTF:null,
    playTimes:null,
    winTimes:null,
    recharge:null,
    baozi:null,
    tonghuashun:null,
    jinhua:null,
    min235:null,
    coinRank30:null,
    rechargeRank50:null,
    uploadAvatar:null,
    expLevel:null,
    sendExpression:null,
    vip:null,
    levelUp:null,
    levelDown:null,

    progress:null,
    progressA:null,

    systemTaskLs:null,
    sysTaskLs:null,

    finishNum:null,

    ctor:function () {
        this._super();
        this.size = cc.winSize;
        this.recharge = recharge;
        this.playTimes = playTimes;
        this.winTimes = winTimes;
        this.baozi = baozi;
        this.tonghuashun = tonghuashun;
        this.jinhua = jinhua;
        this.min235 = min235;
        this.coinRank30 = coinRank30;
        this.rechargeRank50 = rechargeRank50;
        this.uploadAvatar = uploadAvatar;
        this.expLevel = expLevel;
        this.sendExpression = sendExpression;
        this.vip = vip;
        this.levelUp = levelUp;
        this.levelDown = levelDown;

        this.listView = new ccui.ScrollView();
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        this.listView.setContentSize(cc.size(1000, 500));
        this.listView.x = this.size.width/2;
        this.listView.y = this.size.height/2;
        this.listView.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(this.listView);
        this.listView.setInnerContainerSize(cc.size(960, 80*systemTaskNum));

        //加载信息
        this.loadItem();


        this.listView.jumpToTop();
    },

    loadItem:function(){

        var testBtn = new ccui.Button();
        testBtn.loadTextures(
            res.MTBack_png,
            res.MTBack_png,
            res.MTBack_png
        );
        testBtn.setPosition(this.listView.width/2, this.listView.height/2 + 300);
        testBtn.addTouchEventListener(this.testCallback, this);
        //this.listView.addChild(testBtn, 0);


        this.btn = [];
        this.sysTaskTTF = [];
        this.progressA = [];
        this.sysTaskLs = [];
        for(var i =0; i < systemTaskNum; i++){



            //任务之间的分割线
            var line = new cc.Sprite(res.TaskLine_png);
            line.x = this.listView.width/2;
            line.y = this.listView.getInnerContainerSize().height -20 - (i+1)*80;

            //每一条任务
            this.systemTaskTTF = new cc.LabelTTF("0000", "黑体", 24);
            this.systemTaskTTF.x = this.listView.width/2 - 400;
            this.systemTaskTTF.y = this.listView.getInnerContainerSize().height + 25 - (i+1)*80;
            this.systemTaskTTF.setDimensions(400, 50);
            this.systemTaskTTF.setTag("S1"+i);
            this.sysTaskTTF.push(this.systemTaskTTF);
            this.systemTaskTTF.setAnchorPoint(0, 0.5);
            console.log("this.systemTaskTTF.setTag>>" + this.systemTaskTTF.getTag());

            //任务完成度显示
            this.progress = new cc.LabelTTF("0000", "黑体", 30);
            this.progress.x = this.systemTaskTTF.x + 500;
            this.progress.y = this.systemTaskTTF.y;
            this.progressA.push(this.progress);
            this.progress.setTag("S2" + i);
            console.log("this.progress.setTag>>" + this.progress.getTag());
           // console.log(this.progressA[i].y);

            //任务对应按钮
            this.button = new ccui.Button();
            this.button.loadTextures(
                res.Can_png,
                res.Cannot_png,
                res.Cannot_png
            );
            this.button.setPosition(this.systemTaskTTF.x + 700, this.systemTaskTTF.y);
            this.button.setEnabled(false);
            this.button.setBright(false);
            this.button.addTouchEventListener(
                this.sysTaskRewardCallback, this);
            this.button.setTag(1041+i);
            this.btn.push(this.button);
            console.log("this.button.setTag" + this.button.getTag());

            //每一个btn对应一个ls
            this.systemTaskLs = cc.sys.localStorage;
            this.sysTaskLs.push(this.systemTaskLs);


            switch(i){
                case 0 :
                    this.systemTaskTTF.setString("累计充值50元，奖励1800金币");
                    this.progress.setString(this.recharge+"/50");
                    break;
                case 1 :
                    this.systemTaskTTF.setString("累计充值500元，奖励180000金币");
                    this.progress.setString(this.recharge+"/500");
                    break;
                case 2 :
                    this.systemTaskTTF.setString("累计充值5000元，奖励180万金币");
                    this.progress.setString(this.recharge+"/5000");
                    break;
                case 3 :
                    this.systemTaskTTF.setString("累计充值20000元，奖励880万金币");
                    this.progress.setString(this.recharge+"/20000");
                    break;
                case 4 :
                    this.systemTaskTTF.setString("玩牌100局，奖励5000金币，220经验");
                    this.progress.setString(this.playTimes+"/100");
                    break;
                case 5 :
                    this.systemTaskTTF.setString("赢牌100局，奖励50000金币，888经验");
                    this.progress.setString(this.winTimes+"/100");
                    break;
                case 6 :
                    this.systemTaskTTF.setString("升官加爵，奖励668金币，100经验");
                    this.progress.setString(this.levelUp+"/1");
                    break;
                case 7 :
                    this.systemTaskTTF.setString("遭遇贬谪，奖励520金币，50经验值");
                    this.progress.setString(this.levelDown+"/1");
                    break;
                case 8 :
                    this.systemTaskTTF.setString("玩牌获得豹子1次，奖励20000金币，300经验");
                    this.progress.setString(this.baozi+"/1");
                    break;
                case 9 :
                    this.systemTaskTTF.setString("玩牌获得同花顺1次，奖励12000金币，150经验");
                    this.progress.setString(this.tonghuashun+"/1");
                    break;
                case 10 :
                    this.systemTaskTTF.setString("玩牌获得金花1次，奖励1000金币，100经验");
                    this.progress.setString(this.jinhua+"/1");
                    break;
                case 11 :
                    this.systemTaskTTF.setString("玩牌获得最小牌235，奖励235金币，50经验");
                    this.progress.setString(this.min235+"/1");
                    break;
                case 12 :
                    this.systemTaskTTF.setString("昨日赚金榜第一30次，奖励30万金币");
                    this.progress.setString(this.coinRank30+"/30");
                    break;
                case 13 :
                    this.systemTaskTTF.setString("昨日充值榜第一50次，奖励80万金币");
                    this.progress.setString(this.rechargeRank50+"/50");
                    break;
                case 14 :
                    this.systemTaskTTF.setString("上传个人靓照为头像，奖励2000金币，50经验");
                    this.progress.setString(this.uploadAvatar+"/1");
                    break;
                case 15 :
                    this.systemTaskTTF.setString("官至二品大员，奖励120万金币，10000经验");
                    this.progress.setString(this.expLevel+"/15");
                    break;
                case 16 :
                    this.systemTaskTTF.setString("发送动态表情1000次，扣100金币，奖励500经验");
                    this.progress.setString(this.sendExpression+"/1000");
                    break;
                case 17 :
                    this.systemTaskTTF.setString("成为VIP3玩家，奖励8888金币");
                    this.progress.setString(this.vip+"/3");
                    break;
                default: break;

            }

            //任务完成状态


            this.listView.addChild(this.button);
            this.listView.addChild(this.systemTaskTTF);
            this.listView.addChild(this.progress);
            this.listView.addChild(line);


        }

        //对任务进行判断
        if(this.recharge >= 50){
            this.btn[0].setEnabled(true);
            this.btn[0].setBright(true);
            for(var x=4; x<systemTaskNum; x++){
                this.btn[x].setEnabled(true);
                this.btn[x].setBright(true);
            }
            if(this.recharge >= 500){
                this.btn[1].setEnabled(true);
                this.btn[1].setBright(true);
                if(this.recharge >= 5000){
                    this.btn[2].setEnabled(true);
                    this.btn[2].setBright(true);
                    if(recharge >= 20000){
                        this.btn[3].setEnabled(true);
                        this.btn[3].setBright(true);
                    }
                }
            }
        }

        //对是否领过该奖励进行判断
        console.log("systemTaskLs>>" + this.sysTaskLs[0].getItem(sysTaskKey0));
        console.log("systemTaskLs>>" + this.sysTaskLs[1].getItem(sysTaskKey1));
        console.log("systemTaskLs>>" + this.sysTaskLs[2].getItem(sysTaskKey2));
        console.log("systemTaskLs>>" + this.sysTaskLs[3].getItem(sysTaskKey3));

        //获取已领奖任务数
        for(var i=0; i<systemTaskNum; i++){
            this.finishNum = 0;
            if(this.sysTaskLs[0].getItem(sysTaskKey0)==1){
                this.finishNum++;
            }
            if(this.sysTaskLs[1].getItem(sysTaskKey1)==1){
                this.finishNum++;
            }
            if(this.sysTaskLs[2].getItem(sysTaskKey2)==1){
                this.finishNum++;
            }
            if(this.sysTaskLs[3].getItem(sysTaskKey3)==1){
                this.finishNum++;
            }
            console.log("this.finishNum>>" + this.finishNum);

        }

        for(var j=0; j<systemTaskNum; j++){
            switch(j){
                case 0:
                    if(this.sysTaskLs[0].getItem(sysTaskKey0) == 1){
                        this.setFinish(j);
                    }
                    break;
                case 1:
                    if(this.sysTaskLs[1].getItem(sysTaskKey1) == 1){
                        this.setFinish(j);
                    }
                    break;
                case 2:
                    if(this.sysTaskLs[2].getItem(sysTaskKey2) == 1){
                        this.setFinish(j);
                    }
                    break;
                case 3:
                    if(this.sysTaskLs[3].getItem(sysTaskKey3) == 1){
                        this.setFinish(j);
                    }
                    break;
                default : break;

            }
        }


    },

    //testCallback:function(sender, type){
    //    switch (type) {
    //        case ccui.Widget.TOUCH_BEGAN:
    //        {
    //
    //            break;
    //        }
    //        case ccui.Widget.TOUCH_MOVED:
    //        {
    //            console.log("move...");
    //            break;
    //        }
    //        case ccui.Widget.TOUCH_ENDED:
    //        {
    //
    //        }
    //    }
    //},

    setFinish:function(j){
        this.btn[j].setEnabled(false);
        this.btn[j].setBright(false);

        //已完成任务后面的每一个任务依次往上移动
        for(var i=systemTaskNum-1; i>j; i--){
            //var tempY = this.sysTaskTTF[i].y;
            //this.sysTaskTTF[i].y = this.sysTaskTTF[i+1].y;
            //this.sysTaskTTF[i+1].y = tempY;
            this.sysTaskTTF[i].y = this.sysTaskTTF[i-1].y;
            this.progressA[i].y = this.progressA[i-1].y;
            this.btn[i].y = this.btn[i-1].y;
        }
        this.listView.removeChild(this.btn[j]);
        this.listView.removeChild(this.sysTaskTTF[j]);
        this.listView.removeChild(this.progressA[j]);
        //var sysFinish = new cc.Sprite(res.Finish_png);
        //this.progressA[j].y = this.progressA[systemTaskNum-1].y + (this.finishNum-1)*100;
        //this.sysTaskTTF[j].y = this.progressA[j].y;
        //sysFinish.x = this.progressA[j].x + 200;
        //sysFinish.y = this.progressA[j].y;
        //this.listView.addChild(sysFinish);
    },

    sysTaskRewardCallback:function(sender, type){

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
                console.log("sysTaskRewardCallback");
                var rewardTag = sender.getTag();
                console.log("rewardTag>>"+ rewardTag);
                //this.btn[rewardTag-"S0"].setTouchEnabled(false);
                sender.setEnabled(false);
                sender.setBright(false);
                var finish = new cc.Sprite(res.Finish_png);
                finish.x = sender.x;
                finish.y = sender.y;
                this.listView.addChild(finish);
                this.listView.removeChild(sender);


                Servers.finishTask(playerId, rewardTag, function(data){
                    console.log("finishTask");
                    console.log("Servers.finishTask>>" + JSON.stringify(data));
                });

                switch(rewardTag-1041){
                    case 0:
                        this.sysTaskLs[0].setItem(sysTaskKey0, 1);
                        break;
                    case 1:
                        this.sysTaskLs[1].setItem(sysTaskKey1, 1);
                        break;
                    case 2:
                        this.sysTaskLs[2].setItem(sysTaskKey2, 1);
                        break;
                    case 3:
                        this.sysTaskLs[3].setItem(sysTaskKey3, 1);
                        break;
                }

                break;
            }
        }

    }
});