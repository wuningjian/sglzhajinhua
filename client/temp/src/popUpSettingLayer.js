/**
 * Created by guowanfu on 2016/3/23.
 */
var PopUpSettingLayer=PopUp.extend({
    spriteSelectBack:null,
    m_touchListener:null,
    m_touchListener1:null,
    m_touchListener2:null,
    settingBackSprite:null,
    ctor:function() {
        this._super(cc.color(0, 0, 0, 255), 1256, 800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255 *(0.5));
        var size = cc.director.getWinSize();

        this.spriteSelectBack = new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.runAction(cc.scaleTo(0.1, 1.5, 1.5));
        this.spriteSelectBack.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.spriteSelectBack);

        //this.initSettingSurface();
        this.initSettingSurface();

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
                    this.removeFromParent();
                    console.log("clink background return");
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.spriteSelectBack);
        this.m_touchListener2=cc.EventListener.create({
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
                    console.log("Select button to setting game,please.....");
                }
                else{
                    this.destoty();
                    this.removeFromParent();
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener2,this.settingBackSprite);
    },
    initSettingSurface:function(){
        var size=cc.director.getWinSize();
        this.settingBackSprite=new cc.Sprite(res.SettingBack_png);

        //添加花
        var flowerLeft=new cc.Sprite(res.SettingBack_flowerLeft_png);
        var flowerRight=new cc.Sprite(res.SettingBack_flowerRight_png);
        flowerLeft.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height-50
        );
        flowerRight.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4*3,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height-50
        );
        this.settingBackSprite.addChild(flowerLeft);
        this.settingBackSprite.addChild(flowerRight);

        //添加关闭按钮
        var closeSprite1=new cc.Sprite(res.SettingBack_closeButton_png);
        var closeSprite2=new cc.Sprite(res.SettingBack_closeButton_png);
        var closeSprite3=new cc.Sprite(res.SettingBack_closeButton_png);
        var closeMenuItem=new cc.MenuItemSprite(closeSprite1,closeSprite2,closeSprite3,this.menuCloseCallback,this);
        var closeMenu=new cc.Menu(closeMenuItem);
        closeMenu.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width-closeSprite1.getContentSize().width/2;
        closeMenu.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height-closeSprite1.getContentSize().height/2;
        this.settingBackSprite.addChild(closeMenu);

        //添加设置标题标签
        var labelTop=new cc.LabelTTF("设置","Arial",40);
        labelTop.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/2;
        labelTop.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height-50;
        this.settingBackSprite.addChild(labelTop);

        //添加音乐设置开关
        var labelMusic=new cc.LabelTTF("音乐","Arial",30);
        labelMusic.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4;
        labelMusic.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2+70;
        this.settingBackSprite.addChild(labelMusic);
        var musicOpenSpriteItem1=new cc.Sprite(res.SettingOpen_png);
        var musicOpenSpriteItem2=new cc.Sprite(res.SettingOpen_png);
        var musicCloseSpriteItem1=new cc.Sprite(res.SettingClose_png);
        var musicCloseSpriteItem2=new cc.Sprite(res.SettingClose_png);
        var musicOpenMenuItem=new cc.MenuItemSprite(musicOpenSpriteItem1,musicOpenSpriteItem2);
        var musicCloseMenuItem=new cc.MenuItemSprite(musicCloseSpriteItem1,musicCloseSpriteItem2);
        var musicToggleMenuItem=new cc.MenuItemToggle(musicOpenMenuItem,musicCloseMenuItem,this.menuMusicSettingCallback,this);
        var musicToggleMenu=new cc.Menu(musicToggleMenuItem);
        musicToggleMenu.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4*3,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2+70
        );
        this.settingBackSprite.addChild(musicToggleMenu);

        //添加音效设置开关
        var labelSound=new cc.LabelTTF("音效","Arial",30);
        labelSound.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4;
        labelSound.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2+20;
        this.settingBackSprite.addChild(labelSound);
        var soundOpenSpriteItem1=new cc.Sprite(res.SettingOpen_png);
        var soundOpenSpriteItem2=new cc.Sprite(res.SettingOpen_png);
        var soundCloseSpriteItem1=new cc.Sprite(res.SettingClose_png);
        var soundCloseSpriteItem2=new cc.Sprite(res.SettingClose_png);
        var soundOpenMenuItem=new cc.MenuItemSprite(soundOpenSpriteItem1,soundOpenSpriteItem2);
        var soundCloseMenuItem=new cc.MenuItemSprite(soundCloseSpriteItem1,soundCloseSpriteItem2);
        var soundToggleMenuItem=new cc.MenuItemToggle(soundOpenMenuItem,soundCloseMenuItem,this.menuSoundSettingCallback,this);
        var soundToggleMenu=new cc.Menu(soundToggleMenuItem);
        soundToggleMenu.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4*3,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2+20
        );
        this.settingBackSprite.addChild(soundToggleMenu);

        //添加聊天设置开关
        var labelChat=new cc.LabelTTF("聊天","Arial",30);
        labelChat.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4;
        labelChat.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2-30;
        this.settingBackSprite.addChild(labelChat);
        var chatOpenSpriteItem1=new cc.Sprite(res.SettingOpen_png);
        var chatOpenSpriteItem2=new cc.Sprite(res.SettingOpen_png);
        var chatCloseSpriteItem1=new cc.Sprite(res.SettingClose_png);
        var chatCloseSpriteItem2=new cc.Sprite(res.SettingClose_png);
        var chatOpenMenuItem=new cc.MenuItemSprite(chatOpenSpriteItem1,chatOpenSpriteItem2);
        var chatCloseMenuItem=new cc.MenuItemSprite(chatCloseSpriteItem1,chatCloseSpriteItem2);
        var chatToggleMenuItem=new cc.MenuItemToggle(chatOpenMenuItem,chatCloseMenuItem,this.menuChatSettingCallback,this);
        var chatToggleMenu=new cc.Menu(chatToggleMenuItem);
        chatToggleMenu.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4*3,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2-30
        );
        this.settingBackSprite.addChild(chatToggleMenu);

        //添加震动设置开关
        var labelShock=new cc.LabelTTF("震动","Arial",30);
        labelShock.x=this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4;
        labelShock.y=this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2-80;
        this.settingBackSprite.addChild(labelShock);
        var shockOpenSpriteItem1=new cc.Sprite(res.SettingOpen_png);
        var shockOpenSpriteItem2=new cc.Sprite(res.SettingOpen_png);
        var shockCloseSpriteItem1=new cc.Sprite(res.SettingClose_png);
        var shockCloseSpriteItem2=new cc.Sprite(res.SettingClose_png);
        var shockOpenMenuItem=new cc.MenuItemSprite(shockOpenSpriteItem1,shockOpenSpriteItem2);
        var shockCloseMenuItem=new cc.MenuItemSprite(shockCloseSpriteItem1,shockCloseSpriteItem2);
        var shockToggleMenuItem=new cc.MenuItemToggle(shockOpenMenuItem,shockCloseMenuItem,this.menuShockSettingCallback,this);
        var shockToggleMenu=new cc.Menu(shockToggleMenuItem);
        shockToggleMenu.setPosition(
            this.settingBackSprite.getPositionX()+this.settingBackSprite.getContentSize().width/4*3,
            this.settingBackSprite.getPositionY()+this.settingBackSprite.getContentSize().height/2-80
        );
        this.settingBackSprite.addChild(shockToggleMenu);

        this.settingBackSprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.settingBackSprite);
    },
    menuCloseCallback:function(){
        console.log("running menuCloseCallback:function()");
        this.destoty();
        this.removeFromParent();
    },
    menuMusicSettingCallback:function(){

    },
    menuSoundSettingCallback:function(){

    },
    menuChatSettingCallback:function(){

    },
    menuShockSettingCallback:function(){

    },
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
        cc.eventManager.removeListener(this.m_touchListener2);
    }
});