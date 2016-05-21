/**
 * Created by guowanfu on 2016/3/25.
 */
var Player_cards=cc.Node.extend({
    id:null,
    //玩家手中的牌
    myCards:null,
    //玩家的位置
    playerPosition:null,
    //服务器位置
    positionServer:null,
    ctor:function(id,playerPosition,positionServer){
        this._super();

        this.id=id;
        this.playerPosition=playerPosition;
        this.positionServer=positionServer;
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
    setCardSpriteAddChildOrder:function(){
        if(this.playerPosition>=2&&this.playerPosition<=3){
            this.addChild(this.myCards[2].sprite);
            this.addChild(this.myCards[1].sprite);
            this.addChild(this.myCards[0].sprite);
        }
        else{
            this.addChild(this.myCards[0].sprite);
            this.addChild(this.myCards[1].sprite);
            this.addChild(this.myCards[2].sprite);

        }
    }
});