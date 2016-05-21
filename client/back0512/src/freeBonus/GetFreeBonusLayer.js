/**
 * Created by MQN on 2016/4/15.
 */


var getFreeBonusLayer = cc.Layer.extend({

    tips:null,
    ctor:function(){
        this._super();
        var touchListener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){
                return true;
            }
        };
        cc.eventManager.addListener(touchListener, this);
        this.tips = new cc.LabelTTF("0000", "黑体", 40);
        this.tips.setFontFillColor(cc.color(255, 255, 0));
        this.addChild(this.tips, 1);

    }
});