/**
 * Created by guowanfu on 2016/3/16.
 */
var PopUp=cc.LayerColor.extend({
    m_touchListener:null,
    ctor:function(){
        this._super(cc.color(0,0,0,225),1256,800);
        this.m_touchListener=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event){
                return true;
            }
        });
        cc.eventManager.addListener(this.m_touchListener,this);
    },
    destoty:function(){
        cc.eventManager.removeListener(this.m_touchListener);
    }
});