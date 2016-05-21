/**
 * Created by MQN on 2016/4/29.
 */

var FeedbackLayer = cc.Layer.extend({

    size:null,
    fbBg:null,
    editbox:null,
    label:null,

    ctor:function () {

        this._super();


        this.size = cc.winSize;

        this.scheduleUpdate();

        this.background = new cc.Sprite(res.DingDianBg_png);
        this.background.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.background, 0);


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

        //反馈背景
        this.fbBg = new cc.Sprite(res.FeedbackBg_png);
        this.fbBg.x = this.size.width/2;
        this.fbBg.y = this.size.height/2;
        this.addChild(this.fbBg, 2);

        var input = new cc.LabelTTF("请输入您的意见和建议:", "黑体", 30);
        input.x = 200;
        input.y = 600;
        this.fbBg.addChild(input);

        //输入框
        var normal9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var press9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var disabled9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        this.editbox=new cc.EditBox(cc.size(7000,300),normal9SpriteBg,press9SpriteBg,disabled9SpriteBg);
        this.editbox.x=-2000;
        this.editbox.y=400;
        this.editbox.setFontSize(30);
        this.editbox.setPlaceHolder("请输入您的意见和建议");
        this.editbox.setMaxLength(140);
        this.editbox.setFontColor(cc.color(255,255,255,100));
        this.fbBg.addChild(this.editbox, 1);


        //文本显示
        this.label = new cc.LabelTTF("0000", "黑体", 30);
        this.label.x = 500;
        this.label.y = 300;
        this.label.setDimensions(600, 400);
        this.fbBg.addChild(this.label, 2);



        //确定按钮
        var yesItem = new cc.MenuItemImage(
            res.Yes1_png,
            res.Yes2_png,
            res.Yes1_png,
            function () {

                var feedback = this.editbox.getString();
                console.log("feedback>>"+feedback);

                Servers.feedback(playerId, 0, feedback, function(data){
                    console.log(JSON.stringify(data));
                });

                var tips = new cc.LabelTTF("我们已收到您的反馈，会在第一时间处理，谢谢！", "黑体", 30);
                tips.x = 500;
                tips.y = 200;
                tips.setFontFillColor(cc.color.RED);
                this.fbBg.addChild(tips, 3);
                this.scheduleOnce(function(){
                    this.fbBg.removeChild(tips);
                }, 2);

            }, this);
        yesItem.attr({
            x: 640,
            y: 100
        });
        var yesMenu = new cc.Menu(yesItem);
        yesMenu.x = 0;
        yesMenu.y = 0;
        this.fbBg.addChild(yesMenu, 1);

        return true;
    },

    update:function(dt){
        this.label.setString(this.editbox.getString());
        //console.log(this.editbox.getString().length);
        //if(this.editbox.getString().length>140){
        //    this.label.setString(this.label.getString());
        //}
    }


});

var FeedbackScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FeedbackLayer();
        this.addChild(layer);

    }
});

