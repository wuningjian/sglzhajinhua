/**
 * Created by MQN on 2016/4/22.
 */

var TaskLayer = cc.Layer.extend({

    size:null,
    background:null,
    taskBg:null,
    everydayTaskMu:null,
    everydayTaskMenu:null,
    everydayTask:null,
    systemTaskMu:null,
    systemTaskMenu:null,
    systemTask:null,

    ctor:function () {

        this._super();
        this.size = cc.winSize;

        //加载背景和任务按钮
        this.loadTaskMenu();


        //关闭按钮
        var closeItem = new cc.MenuItemImage(
            res.Back_png,
            res.Back_png,
            function () {
                cc.director.runScene(new HelloWorldScene());
            }, this);
        closeItem.attr({
            x: 50,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x = 0;
        closeMenu.y = 0;
        this.addChild(closeMenu, 1);


        return true;
    },

    loadTaskMenu:function(){
        //总背景
        this.background = new cc.Sprite(res.DingDianBg_png);
        this.background.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.background, 0);

        //每日任务按钮
        this.everydayTaskMenu = new cc.MenuItemImage(
            res.TaskNormal_png,
            res.TaskSelected_png,
            res.TaskSelected_png,
            this.everydayTaskCallback,
            this
        );
        this.everydayTaskMu = new cc.Menu(this.everydayTaskMenu);
        this.everydayTaskMu.x = this.size.width/2 - 540;
        this.everydayTaskMu.y = this.size.height/2 + 200;
        this.addChild(this.everydayTaskMu, 2);
        //每日任务四个字
        this.everydayTask = new cc.LabelTTF("每日任务", "黑体", 30);
        this.everydayTask.setDimensions(40, 150);
        this.everydayTask.x = this.everydayTaskMu.x + 10;
        this.everydayTask.y = this.everydayTaskMu.y - 10;
        this.addChild(this.everydayTask, 3);


        //系统任务按钮
        this.systemTaskMenu = new cc.MenuItemImage(
            res.TaskNormal_png,
            res.TaskSelected_png,
            res.TaskSelected_png,
            this.systemTaskCallback,
            this
        );
        this.systemMu = new cc.Menu(this.systemTaskMenu);
        this.systemMu.x = this.size.width/2 - 540;
        this.systemMu.y = this.everydayTaskMu.y - 200;
        this.addChild(this.systemMu, 2);
        //系统任务四个字
        this.systemTask = new cc.LabelTTF("系统任务", "黑体", 30);
        this.systemTask.setDimensions(40, 150);
        this.systemTask.x = this.systemMu.x + 10;
        this.systemTask.y = this.systemMu.y - 10;
        this.addChild(this.systemTask, 3);

        this.systemTaskMenu.setEnabled(true);
        this.everydayTaskMenu.setEnabled(false);

        //默认为每日任务
        this.everydayTaskLayer = new everydayTaskLayer();
        this.addChild(this.everydayTaskLayer, 2);

        //任务背景
        this.taskBg = new cc.Sprite(res.TaskBg_png);
        this.taskBg.x = this.size.width / 2;
        this.taskBg.y = this.size.height / 2;
        this.addChild(this.taskBg, 1);


    },

    //每日任务回调函数
    everydayTaskCallback:function(){
        this.systemTaskMenu.setEnabled(true);
        this.everydayTaskMenu.setEnabled(false);

        this.removeChild(this.systemTaskLayer);
        this.everydayTaskLayer = new everydayTaskLayer();
        this.addChild(this.everydayTaskLayer, 2);
    },

    //系统任务回调函数
    systemTaskCallback:function(){
        this.systemTaskMenu.setEnabled(false);
        this.everydayTaskMenu.setEnabled(true);

        this.removeChild(this.everydayTaskLayer);
        this.systemTaskLayer = new systemTaskLayer();
        this.addChild(this.systemTaskLayer, 4);
    }

});

var TaskScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TaskLayer();
        this.addChild(layer);

    }
});
