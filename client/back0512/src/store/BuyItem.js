/**
 * Created by MQN on 2016/4/12.
 * 暂时无用
 */

var BuyItem = BuyItem || {};


/**
 * 购买换牌卡
 * @param itemTag
 * @param cb
 */
BuyItem.buyExchangeCard = function(itemTag){
    var tag = itemTag.getTag();
    var playerId = playerId;

    switch (tag){
        case 0: //换牌卡礼包

            break;
        case 1:
        case 2:

            break;
        default: break;

    }
}

/**
 * 购买礼物
 * @param itemTag
 * @param cb
 */
BuyItem.buyGifts = function(strTips, itemTag){
    var self = this;
    var tag = itemTag.getTag();
    var playerId = playerId;
    var tips = strTips;

    switch (tag){
        case 3:     //购买巧克力

            //购买成功提示
            tips.setString("获得巧克力X1");
            return tips;
            //console.log("tag>>" + tag);
            break;
        case 10:    //购买戒指

            break;
        case 11:    //购买车

            break;
        case 12:    //购买房子

            break;
        case 13:    //购买飞机
            break;
        default: break;
    }
}

/**
 * 购买金币
 * @param itemTag
 * @param cb
 */
BuyItem.buyCoin = function(itemTag){
    var tag = itemTag;
    var playerId = playerId;
    switch (tag){
        case 20:    //购买50000金币

            break;
        case 21:    //购买100000金币

            break;
        case 22:    //购买300000金币

            break;
        case 23:    //购买500000金币

            break;
        case 100:    //购买1000000金币

            break;
        case 101:    //购买5000000金币

            break;
        case 102:    //购买10000000金币

            break;
        case 103:    //购买20000000金币
            break;
    }
}

/**
 * 购买钻石
 * @param itemTag
 * @param cb
 */
BuyItem.buyDiamonds = function(itemTag){
    var tag = itemTag;
    var playerId = playerId;
    switch(tag){
        case 110:   //购买5钻石

            break;
        case 111:   //购买10钻石

            break;
        case 112:   //购买30钻石

            break;
        case 113:   //购买50钻石

            break;
        case 120:   //购买100钻石

            break;
        case 121:   //购买500钻石

            break;
        case 122:   //购买1000钻石

            break;
        case 123:   //购买2000钻石

            break;
    }
}