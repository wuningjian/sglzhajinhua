/**
 * Created by guowanfu on 2016/3/25.
 */
var PoPUpGameBackLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0));

        this.spriteSelectBack = new cc.Sprite(res.SelectBack_png);

        //初始化返回选择界面，并设置监听
        this.initGameBackPageAndSettingListener();

    },
    initGameBackPageAndSettingListener:function(){
        var size=cc.director.getWinSize();
        var gameBackPage=new cc.Sprite(res.GameBackPage_png);

        //返回大厅按钮菜单项
        var backToGameHallSprite1=new cc.Sprite(res.BackToGameHall_png);
        var backToGameHallString1=new cc.LabelTTF("大厅","Arial",30);
        backToGameHallString1.x=backToGameHallSprite1.x+backToGameHallSprite1.getContentSize().width*3;
        backToGameHallString1.y=backToGameHallSprite1.y+backToGameHallSprite1.getContentSize().height/2;
        backToGameHallSprite1.addChild(backToGameHallString1);
        var backToGameHallSprite2=new cc.Sprite(res.BackToGameHall_png);
        var backToGameHallString2=new cc.LabelTTF("大厅","Arial",30);
        backToGameHallString2.x=backToGameHallSprite2.x+backToGameHallSprite2.getContentSize().width*3;
        backToGameHallString2.y=backToGameHallSprite2.y+backToGameHallSprite2.getContentSize().height/2;
        backToGameHallSprite2.addChild(backToGameHallString2);
        var backToGameHallSprite3=new cc.Sprite(res.BackToGameHall_png);
        var backToGameHallString3=new cc.LabelTTF("大厅","Arial",30);
        backToGameHallString3.x=backToGameHallSprite3.x+backToGameHallSprite3.getContentSize().width*3;
        backToGameHallString3.y=backToGameHallSprite3.y+backToGameHallSprite3.getContentSize().height/2;
        backToGameHallSprite3.addChild(backToGameHallString3);
        var backToGameHallMenuItem=new cc.MenuItemSprite(backToGameHallSprite1,backToGameHallSprite2,
            backToGameHallSprite3,this.menuBackToGameHall,this);

        //进入其他房间按钮
        var enterOtherRoomSprite1=new cc.Sprite(res.EnterOtherRoom_png);
        var enterOtherRoomSprite2=new cc.Sprite(res.EnterOtherRoom_png);
        var enterOtherRoomSprite3=new cc.Sprite(res.EnterOtherRoom_png);
        var enterOtherRoomMenuItem=new cc.MenuItemSprite(enterOtherRoomSprite1,enterOtherRoomSprite2,
            enterOtherRoomSprite3,this.menuEnterOtherRoom,this);

        var backMenu=new cc.Menu(backToGameHallMenuItem,enterOtherRoomMenuItem);
        backMenu.alignItemsVerticallyWithPadding(20);
        backMenu.x=gameBackPage.getContentSize().width/4;
        backMenu.y=gameBackPage.getContentSize().height/2;
        gameBackPage.addChild(backMenu);
        gameBackPage.setPosition(gameBackPage.getContentSize().height/2,
            this.spriteSelectBack.getContentSize().height-gameBackPage.getContentSize().height/2);
        this.spriteSelectBack.addChild(gameBackPage);
        this.addChild(this.spriteSelectBack);
        this.spriteSelectBack.setPosition(size.width / 2, size.height / 2);

        //backToGameHallMenuItem.

        //触摸监听
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

                }
                else{
                    this.destoty();
                    this.removeFromParent();
                    console.log("clink background return");
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,gameBackPage);
    },
    menuBackToGameHall:function(){
        console.log("back to the game hall");
    },
    menuEnterOtherRoom:function(){
        console.log("enter other room");
    },
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});