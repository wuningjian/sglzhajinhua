/**
 * Created by guowanfu on 2016/3/16.
 */
/**
 * Created by guowanfu on 2016/2/29.
 */
var PopUpBiPaiSelect=PopUp.extend({
    spriteSelectBack:null,
    m_touchListener:null,
    m_touchListener1:null,
    //menu:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255 * 0.5);
        var size=cc.director.getWinSize();
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.runAction(cc.scaleTo(0.1,4,4));
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack,3);
        this.m_touchListener1=cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    this.destoty();
                    g_menuBiPaiSelect.removeFromParent();
                    this.removeFromParent();
                    for(var i=0;i<g_biPaiRing.length;i++){
                        g_biPaiRing[i].removeFromParent();
                    }
                    g_menuBiPaiSelect=null;
                    g_biPaiRing.length=0;
                    console.log("clink background return");
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.spriteSelectBack);
    },
    //biPai:function(){
    //    console.log("......................");
    //    this.destoty();
    //    this.removeFromParent();
    //},
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});