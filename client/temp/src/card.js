/**
 * Created by guowanfu on 2016/3/15.
 */
var Card = cc.Node.extend({
    //牌的正面精灵，最好改成洗牌的时候初始化
    sprite : null,
    //牌的背面精灵，最好改成洗牌的时候初始化
    spriteBack:null,
    suit : null,
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
    }
});