/**
 * Created by MQN on 2016/4/14.
 */

var Bonus_Row = 4;
var freeBonusKey3 = 113;  //为113时可按，为223时按钮不可按
var freeBonusKey2 = 112;
var freeBonusKey1 = 111;
var freeBonusKey0 = 110;
//var freeBonusKey = 0;
var freeBonusDate = 1112;
//定点奖励层
var FreeBonusLayer = cc.Layer.extend({

    line:null,
    timeNode:null,
    buttonNode:null,
    space:null,
    count:null,
    size:null,
    dir:null,
    menuItem:null,
    getFreeBonusLayer:null,
    serverTime:null,
    bonusLs:null,
    bonusLsNode:null,
    bonusDateLs:null,
    dateNow:null,


    ctor:function () {

        this._super();

        this.size = cc.winSize;


        //背景
        this.background = new cc.Sprite(res.DingDianBg_png);
        this.background.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.background, 0);


        //返回按钮
        var closeItem = new cc.MenuItemImage(
            res.Back_png,
            res.Back_png,
            function () {
                //cc.director.runScene(new HelloWorldScene());
                cc.director.runScene(new MainScene());
            }, this);
        closeItem.attr({
            x:  50,
            y:  50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x = 0;
        closeMenu.y = 0;
        this.addChild(closeMenu, 1);

        this.bonusDateLs = cc.sys.localStorage;
        //this.bonusDateLs.setItem(freeBonusDate, "0");

        this.loadBonusMenu();

        //this.loadCurrentTime();

        return true;
    },

    loadBonusMenu:function(){
        var self = this;
        var nodeSize = new cc.Sprite(res.DingDian1_png);
        this.space = this.space ? this.space : nodeSize.width / 2;
        this.count = Bonus_Row;
        this.dir = 0;

        var startX = this.size.width / 2 - (this.count * nodeSize.width + (this.count - 1) * this.space) / 2 + nodeSize.width / 2;
        var startY = this.size.height / 2 -  (this.count * nodeSize.height + (this.count - 1) * this.space) / 2 + nodeSize.height / 2;

        //console.log("startPos>>" + startX + "," + startY);
        this.menuItem = [];
        this.bonusLs = [];
        for(var i = 0; i < Bonus_Row; i++){
            var x = (this.dir == FreeBonusScene.DIR_VERTICAL)   ? this.size.width/2 + 200 : startX + (nodeSize.width + this.space) * i;
            var y = (this.dir == FreeBonusScene.DIR_Horizontal) ? this.size.height/2 - 200 : startY + (nodeSize.height + this.space) * i;

            //console.log("menuPOS>>" + x +"," +y);
            this.buttonNode = new cc.MenuItemImage(
                res.DingDian1_png,
                res.DingDian1_png,
                res.DingDian2_png,
                this.buttonNodeCallback, this);
            this.buttonNode.setTag(i);
            this.menuItem.push(this.buttonNode);
            this.buttonNode.setPosition(x, y);

            this.line = new cc.Sprite(res.Line_png);
            this.line.x = this.size.width / 2;
            this.line.y = this.buttonNode.y;
            this.addChild(this.line, 1);

            this.timeNode = new cc.LabelTTF("0000", "黑体", 40);
            switch(i){
                case 0: this.timeNode.setString("21:30-22:30");
                    break;
                case 1: this.timeNode.setString("18:00-19:00");
                    break;
                case 2: this.timeNode.setString("12:30-13:30");
                    break;
                case 3: this.timeNode.setString("08:00-09:30");
                    break;
                default : break;
            }
            this.timeNode.setPosition(x - this.size.width / 4, y);
            this.addChild(this.timeNode, 1);

            this.bonusLsNode = cc.sys.localStorage;
            this.bonusLs.push(this.bonusLsNode);
        }

        var menu = new cc.Menu(this.menuItem);
        this.addChild(menu);
        menu.setPosition(0, 0);
        self.loadCurrentTime();
        //self.loadBonusMenuEnabled();

        console.log("-------------------------");
        console.log("freeBonusDate, this.dateNow>>" + this.bonusDateLs.getItem(freeBonusDate));
        console.log("freeBonusKey3>> " + this.bonusLs[3].getItem(freeBonusKey3));
        console.log("freeBonusKey2>> " + this.bonusLs[2].getItem(freeBonusKey2));
        console.log("freeBonusKey1>> " + this.bonusLs[1].getItem(freeBonusKey1));
        console.log("freeBonusKey0>> " + this.bonusLs[0].getItem(freeBonusKey0));

    },

    buttonNodeCallback:function(sender){
        var buttonNode = sender;
        buttonNode.setEnabled(false);
        var buttonNodeTag = buttonNode.getTag();
        //console.log("buttonNodeTag>>" + buttonNodeTag);
        Servers.timingReward(playerId, buttonNodeTag, function(data){
            console.log(JSON.stringify(data));
            coin = data.player.gold;
        });

        //提示层
        this.getFreeBonusLayer = new getFreeBonusLayer();
        this.getFreeBonusLayer.tips.x = 640;
        this.getFreeBonusLayer.tips.y = 360;
        this.getFreeBonusLayer.tips.setFontName("黑体");
        this.getFreeBonusLayer.tips.setOpacity(0);
        this.addChild(this.getFreeBonusLayer);

        switch(buttonNodeTag){
            case 3:
                this.bonusLs[3].setItem(freeBonusKey3, 223);
                this.getFreeBonusLayer.tips.setString("获得奖励金币X1000");
                break;
            case 2:
                this.bonusLs[2].setItem(freeBonusKey2, 222);
                this.getFreeBonusLayer.tips.setString("获得奖励金币X1000");
                break;
            case 1:
                this.bonusLs[1].setItem(freeBonusKey1, 221);
                this.getFreeBonusLayer.tips.setString("获得奖励金币X1000");
                break;
            case 0:
                this.bonusLs[0].setItem(freeBonusKey0, 220);
                this.getFreeBonusLayer.tips.setString("获得奖励金币X2000");
                break;
            default : break;
        }
        this.bonusDateLs.setItem(freeBonusDate, this.dateNow);
        console.log("freeBonusDate, this.dateNow>>" + this.bonusDateLs.getItem(freeBonusDate));
        console.log("freeBonusKey3>> " + this.bonusLs[3].getItem(freeBonusKey3));
        console.log("freeBonusKey2>> " + this.bonusLs[2].getItem(freeBonusKey2));
        console.log("freeBonusKey1>> " + this.bonusLs[1].getItem(freeBonusKey1));
        console.log("freeBonusKey0>> " + this.bonusLs[0].getItem(freeBonusKey0));
        this.getFreeBonusLayer.tips.runAction(cc.spawn(cc.scaleTo(0.5,1.5), cc.fadeIn(0.5)));
        this.scheduleOnce(function(){
            this.removeChild(this.getFreeBonusLayer);
        }, 1);
    },

    loadCurrentTime:function(){
        var self = this;
        //从服务器获取当前时间
        Servers.getServerTime(function(data){
            //self.loadBonusMenu(data);
            self.loadBonusMenuEnabled(data);
        });
    },

    loadBonusMenuEnabled:function(data){
        console.log("loadBonusMenuEnabled...");
        console.log("getServerTime>>" + JSON.stringify(data));
        var timeString = data.time;
        console.log("timeString>>" + timeString);
        this.serverTime = new Date(timeString);

        //var dateNow = this.serverTime.getFullYear() +":"+ this.serverTime.getMonth() +":"+ this.serverTime.getDate();
        var yyyy = this.serverTime.getFullYear();
        var mm = this.serverTime.getMonth() + 1;
        var dd = this.serverTime.getDate();
        mm = mm<10?"0"+mm:mm;
        dd = dd<10?"0"+dd:dd;
        this.dateNow = yyyy + "-" + mm + "-" + dd;

        //this.bonusDateLs.setItem(freeBonusDate, dateNow);

        console.log("this.bonusDateLs111>>" + this.bonusDateLs.getItem(freeBonusDate));
        var timeNow = (this.serverTime.getHours()+this.serverTime.getMinutes()/60).toFixed(2);

        console.log("timeNow>>" + timeNow);
        for(var i=0; i<4; i++){
            this.menuItem[i].setEnabled(false);
        }
        console.log("this.bonusDateLs222>>" + this.bonusDateLs.getItem(freeBonusDate));
        if(this.bonusDateLs.getItem(freeBonusDate)==null){

            this.bonusLs[3].setItem(freeBonusKey3, 113);
            this.bonusLs[2].setItem(freeBonusKey2, 112);
            this.bonusLs[1].setItem(freeBonusKey1, 111);
            this.bonusLs[0].setItem(freeBonusKey0, 110);
            if(timeNow>=8 && timeNow<=19){
                this.menuItem[3].setEnabled(true);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=12.5 && timeNow<=13.5){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(true);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=18 && timeNow<=19){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(true);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=21.5 && timeNow<=22.5){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(true);
            }
            console.log("======================");
            console.log("freeBonusDate, this.dateNow>>" + this.bonusDateLs.getItem(freeBonusDate));
            console.log("freeBonusKey3>> " + this.bonusLs[3].getItem(freeBonusKey3));
            console.log("freeBonusKey2>> " + this.bonusLs[2].getItem(freeBonusKey2));
            console.log("freeBonusKey1>> " + this.bonusLs[1].getItem(freeBonusKey1));
            console.log("freeBonusKey0>> " + this.bonusLs[0].getItem(freeBonusKey0));
            if(timeNow>=8 && timeNow<=19){
                this.menuItem[3].setEnabled(true);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=12.5 && timeNow<=13.5){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(true);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=18 && timeNow<=19){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(true);
                this.menuItem[0].setEnabled(false);
            }else if(timeNow>=21.5 && timeNow<=22.5){
                this.menuItem[3].setEnabled(false);
                this.menuItem[2].setEnabled(false);
                this.menuItem[1].setEnabled(false);
                this.menuItem[0].setEnabled(true);
        }else if(this.bonusDateLs.getItem(freeBonusDate)!=null){
                if(this.dateNow>this.bonusDateLs.getItem(freeBonusDate)){

                    this.bonusLs[3].setItem(freeBonusKey3, 113);
                    this.bonusLs[3].setItem(freeBonusKey2, 112);
                    this.bonusLs[1].setItem(freeBonusKey1, 111);
                    this.bonusLs[0].setItem(freeBonusKey0, 110);
                    if(timeNow>=8 && timeNow<=19){
                        this.menuItem[3].setEnabled(true);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=12.5 && timeNow<=13.5){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(true);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=18 && timeNow<=19){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(true);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=21.5 && timeNow<=22.5){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(true);
                    }
                }else if(this.dateNow<=this.bonusDateLs.getItem(freeBonusDate)){
                    if(timeNow>=8 && timeNow<=19 && this.bonusLs[3].getItem(freeBonusKey3)!=223){
                        this.menuItem[3].setEnabled(true);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=12.5 && timeNow<=13.5 && this.bonusLs[2].getItem(freeBonusKey2)!=222){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(true);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=18 && timeNow<=19 && this.bonusLs[1].getItem(freeBonusKey1)!=221){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(true);
                        this.menuItem[0].setEnabled(false);
                    }else if(timeNow>=21.5 && timeNow<=22.5 && this.bonusLs[0].getItem(freeBonusKey0)!=220){
                        this.menuItem[3].setEnabled(false);
                        this.menuItem[2].setEnabled(false);
                        this.menuItem[1].setEnabled(false);
                        this.menuItem[0].setEnabled(true);
                    }
                }

            }
        }
    }


});

var FreeBonusScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FreeBonusLayer();
        this.addChild(layer);

    }
});

FreeBonusScene.DIR_VERTICAL = 0;
FreeBonusScene.DIR_Horizontal = 1;