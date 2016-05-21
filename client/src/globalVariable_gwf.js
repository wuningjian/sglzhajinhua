/**
 * Created by guowanfu on 2016/5/3.
 */

/* gameScene.js*/

var server_host = "172.17.255.57";
//var server_host = "127.0.0.1";

//扑克牌背面
var g_dealCardBack=new cc.Sprite(res.CardBack_png);
g_dealCardBack.retain();
//筹码精灵
var g_countSprite=new cc.Sprite(res.Chips_Test_png);
g_countSprite.retain();
//存放加注选择筹码按钮的精灵
var g_spritePlaceJiaZhuMenuSelect=null;
//监听触摸器，用于监听存放加注筹码按钮精灵g_spritePlaceJiaZhuMenuSelect
var g_jiaZhu_touchListener=null;
//加注的大小
var g_AddChipSize=null;
//比牌选择界面的按钮和提示精灵
var g_menuBiPaiSelect=null;
var g_biPaiRing=null;
//向服务器发送比牌玩家位置的变量
var g_playerPositionServer1=null;
var g_playerPositionServer2=null;
//临时全局变量，比牌玩家的数组下标,actionBiPai:function（）中
var g_biPaiPlayerIndexOf1=new Array(2);
var g_biPaiPlayerIndexOf2=new Array(2);
//玩家自己的服务器位置
var myselfPlayerPositionServer=null;
//比牌失败者的位置,pomelo_on:function
var g_loserPositionServer=null;
//广播信息记录数组，最多50条信息记录,假设现在只有四条记录
var g_radioMessageArray=new Array();
g_radioMessageArray.push("我来了，小子！");

//g_radioMessageArray.push("我来了，傻子！教科书上的亏损对了上次看电视什么的查看，" +
//    "是今年春节首款触控技术课程数控机床你看，" +
//    "数控机床看世界杯常客说不出口就是看，活生生，死翘翘！");
//g_radioMessageArray.push("我来了，嘎子！");
//g_radioMessageArray.push("我来了，愣子！觉得是健康瘦身疗程瘦了开车开了四年四十，" +
//    "设计理论考试承诺书来看你的内裤穿上看了，" +
//    "思考拿出来空间的快乐杀杀杀杀杀杀杀杀杀，" +
//    "就哭了咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩吗");
//g_radioMessageArray.push("三月的陌上，春光渐盛。我独坐在三月的窗下，" +
//    "依着经年的脉络，追寻那年桃花烁烁的足迹。" +
//    "只是时光太匆匆，我已来不及拾捡，" +
//    "那些属于城南的旧事早已散落成一地风干的花瓣，" +
//    "幽幽地散发着岁月的沉香,陌上的春色已然葱茏，" +
//    "街边的柳色青了又青，南归的燕子已在檐角欢呼，" +
//    "桃花也在枝头初绽嫣红。推开窗户，我的窗前又落下了昨夜春风来过的痕迹，" +
//    "相信窗台上那几页不知从何处飞来的，更不知是谁家孩子的旧画稿定是不会骗我的。" +
//    "伸手，触摸不到红尘的温暖。低眉，兀自清欢，在尘埃里独自花开花落." +
//    "午后的阳光，暖暖地洒在窗下，一直照进我的心里。我静倚着春天的门楣，" +
//    "安静地解读着一本老旧泛黄的诗集。如果有来生，要做一棵树，站成永恒。" +
//    "没有悲欢的姿势，一半在尘土里安详，一半在风里飞扬；一半洒落荫凉，" +
//    "一半沐浴阳光。非常沉默、非常骄傲。从不依靠、从不寻找。如果有来生，" +
//    "要做一只鸟，飞越永恒，没有迷途的苦恼。东方有火红的希望，南方有温暖的巢床" +
//    "，向西逐退残阳，向北唤醒芬芳。如果有来生，希望每次相遇，都能化为永恒。" +
//    "读三毛的诗，总是能给我一种强大的支撑。常常想，象她那样的奇女子，" +
//    "究竟走过了怎样的荒凉，才能这般彻悟通透啊！可是，我不会迷恋她，" +
//    "她只是个传说。我依然会好好地做自己，如她那样非常沉默，亦非常骄");
//g_radioMessageArray.push("吉萨喀喀喀喀喀喀喀喀喀");

//换牌的花色和点数
var g_exchangeCardSuit=null;
var g_exchangeCardRank=null;
//广播文字滚动窗口
var g_cliper=new cc.ClippingNode();
g_cliper.retain();
//广播信息记录最多保存数
var g_recordMax=15;

/*popUpSettingLayer.js*/

//游戏设置全局变量
var g_music_key;
var g_sound_key;
var g_chat_key;
MUSIC_KEY="music_key";
SOUND_KEY="sound_key";
CHAT_KEY="chat_key";
BOOL={
    NO:"0",
    YES:"1"
};
