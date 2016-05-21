/**
 * Created by MQN on 2016/4/6.
 */
//商城层
var StoreLayer = cc.Layer.extend({

    storeMainLayer:null,
    storeBg:null,
    ctor:function(){
        this._super();
        console.log("enter store");
        var size = cc.winSize;

        //背景
        this.storeBg = new cc.Sprite(res.StoreBg_png);
        this.storeBg.x = size.width/2;
        this.storeBg.y = size.height/2;
        this.addChild(this.storeBg, 1);

        this.loadStoreMainLayer();

        return true;
    },
    loadStoreMainLayer:function(){
        this.storeMainLayer = new SMainLayer();
        this.addChild(this.storeMainLayer, 2);
    }

});

var StoreScene = cc.Scene.extend({
   onEnter:function(){
       this._super();
       var storeLayer = new StoreLayer();
       this.addChild(storeLayer);
   }
});