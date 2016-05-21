/**
 * Created by guowanfu on 2016/3/15.
 */
var Card = cc.Node.extend({
    //牌的正面精灵，最好改成洗牌的时候初始化
    sprite : null,
    //牌的背面精灵，最好改成洗牌的时候初始化
    spriteBack:null,
    //花色
    suit : null,
    //点数
    rank : null,
    ctor : function(){
        this._super();
        var size=cc.director.getWinSize();
        this.spriteBack=new cc.Sprite(res.CardBack_png);
        this.spriteBack.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
        this.addChild(this.spriteBack);
    },
    initCardSprite:function(suit,rank){
        var size=cc.director.getWinSize();
        this.suit=suit;
        this.rank=rank;
        var cardNumber=(this.rank-2)*4+this.suit;
        var strCard="res/cards/"+cardNumber+".png";
        this.sprite=new cc.Sprite(strCard);
        this.sprite.runAction(cc.hide());
        this.addChild(this.sprite);
    },
    setCardSpritePosition:function(positionClient,suit,rank){
        var size=cc.director.getWinSize();
        this.suit=suit;
        this.rank=rank;
        var cardNumber=(this.rank-2)*4+this.suit;
        var strCard="res/cards/"+cardNumber+".png";
        this.sprite=new cc.Sprite(strCard);
        this.sprite.runAction(cc.hide());
        //this.addChild(this.sprite);
        this.sprite.setPosition(this.spriteBack.getPosition());
    },
    //使用换牌道具时调用的换牌函数
    exchangeCard:function(suit,rank){
        var cardNumber=(rank-2)*4+suit;
        var strCard="res/cards/"+cardNumber+".png";
        var exchangeCardSprite=new cc.Sprite(strCard);
        var cardPosition=this.sprite.getPosition();
        this.sprite.removeFromParent();
        this.suit=suit;
        this.rank=rank;
        this.sprite=exchangeCardSprite;
        this.sprite.setPosition(cardPosition);
        this.addChild(this.sprite);
    }
});