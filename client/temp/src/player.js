/**
 * Created by guowanfu on 2016/2/25.
 */
/**
 * Created by guowanfu on 2016/2/25.
 */
var Players=cc.Node.extend({
    id:null,
    labelId:null,
    //玩家手中的牌
    myCards:null,
    //玩家的位置
    playerPosition:null,
    //手机图片
    spritePhotoMobile:null,
    //玩家照片
    spritePhotoSelf:null,
    //服务器位置
    positionServer:null,
    //是否有权限
    isPower:null,
    //状态精灵精灵（看牌放弃公用）
    spriteState:null,
    //是否看牌
    checkCard:false,
    //是否弃牌
    abandon:false,
    //定时器
    counterTimer:null,
    //比牌失败提示精灵
    loserSprite:null,
    ctor:function(id,positionServer,isPower){
        this._super();
        this.id=id;
        this.positionServer=positionServer;
        this.isPower=isPower;
        this.labelId=new cc.LabelTTF(this.id,"Arial",25);
        this.labelId.setColor(cc.color(160,82,45));
        if(this.id==uid){
            this.spritePhotoMobile=new cc.Sprite(res.MobileMy_jpg);
        }
        else{
            this.spritePhotoMobile=new cc.Sprite(res.Mobile_jpg);
        }

        this.spritePhotoSelf=new cc.Sprite(res.Man_jpg);

        if(this.id==uid){
            this.spritePhotoSelf.setPosition(this.spritePhotoMobile.x+this.spritePhotoSelf.getContentSize().width/2+10,
                this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2+4);

            var moneyPicture=new cc.Sprite(res.MoneyPicture_jpg);
            moneyPicture.setPosition(this.spritePhotoMobile.x+this.spritePhotoSelf.getContentSize().width+this.spritePhotoSelf.getContentSize().width/2,
                this.spritePhotoMobile.y+moneyPicture.getContentSize().height);
            this.labelId.setPosition(this.spritePhotoMobile.x+this.spritePhotoSelf.getContentSize().width+this.spritePhotoSelf.getContentSize().width/2,
                this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height-20);
            this.spritePhotoMobile.addChild(moneyPicture);
            this.spritePhotoMobile.addChild(this.labelId);
        }else{
            this.spritePhotoSelf.setPosition(this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
            this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2+20);
            var moneyPicture=new cc.Sprite(res.MoneyPicture_jpg);
            moneyPicture.setPosition(this.spritePhotoMobile.x+moneyPicture.getContentSize().width/2,
                this.spritePhotoMobile.y+moneyPicture.getContentSize().width/2+5);
            this.labelId.setPosition(this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
            this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height-15);
            this.spritePhotoMobile.addChild(moneyPicture);
            this.spritePhotoMobile.addChild(this.labelId);
        }
        //定时器
        this.counterTimer=new CounterTimer(this.id);
        if(this.id==uid){
            this.counterTimer.setCounterTimerPosition(
                cc.p(this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
                    this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2));
        }
        else{
            this.counterTimer.setCounterTimerPosition(
                cc.p(this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
                    this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2+25));
        }
        //this.counterTimer.startCounterTimer(50);

        this.loserSprite=new cc.Sprite(res.LoserSprite_png);
        this.loserSprite.setPosition(
            this.spritePhotoMobile.x+this.spritePhotoMobile.getContentSize().width/2,
            this.spritePhotoMobile.y+this.spritePhotoMobile.getContentSize().height/2
        );

        this.spritePhotoMobile.addChild(this.spritePhotoSelf);
        this.spritePhotoMobile.addChild(this.counterTimer);
        this.spritePhotoMobile.addChild(this.loserSprite);
        this.loserSprite.runAction(cc.sequence(cc.hide()));
        this.addChild(this.spritePhotoMobile);
        this.initPlayerCards();


    },
    initPlayerCards:function(){
        this.myCards=new Array();
        for(var i=0;i<3;i++){
            var card=new Card();
            this.addChild(card);
            this.myCards.push(card);
        }
    },
    addSpriteState:function(){
        this.spriteState.setPosition(this.myCards[1].spriteBack.getPositionX(),
            this.myCards[1].spriteBack.getPositionY()+g_dealCardBack.getContentSize().height/2+
            this.spriteState.getContentSize().height/2+5);
        this.addChild(this.spriteState);
    }
});