/**
 * Created by MQN on 2016/3/31.
 */

//编辑个性签名层
var editSigLayer = cc.Layer.extend({

    editbox:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;


        //设置为触摸吞噬
        var touchListener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){
                return true;
            }
        };
        cc.eventManager.addListener(touchListener, this);

        //文本输入框editbox
        var normal9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var press9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        var disabled9SpriteBg=new cc.Scale9Sprite(res.LobbyCoin2_png);
        this.editbox=new cc.EditBox(cc.size(500,50),normal9SpriteBg,press9SpriteBg,disabled9SpriteBg);
        this.editbox.x=640;
        this.editbox.y=400;
        this.editbox.setFontSize(30);
        this.editbox.setPlaceHolder("输入签名");
        this.editbox.setMaxLength(30);
        this.editbox.setFontColor(cc.color(255,255,255,100));
        this.addChild(this.editbox, 1);
        //this.scheduleOnce(function(){
        //    console.log("editbox>>" + editbox.getString());
        //}, 5);


    }
});
