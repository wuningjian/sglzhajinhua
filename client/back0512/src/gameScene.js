/**
 * Created by wuningjian on 2/23/16.
 */
////扑克牌背面
//var g_dealCardBack=new cc.Sprite(res.CardBack_png);
//g_dealCardBack.retain();
////筹码精灵
//var g_countSprite=new cc.Sprite(res.Chips_Test_png);
//g_countSprite.retain();
//
////存放加注选择筹码按钮的精灵
//var g_spritePlaceJiaZhuMenuSelect=null;
////监听触摸器，用于监听存放加注筹码按钮精灵g_spritePlaceJiaZhuMenuSelect
//var g_jiaZhu_touchListener=null;
////加注的大小
//var g_AddChipSize=null;
//
////比牌选择界面的按钮和提示精灵
//var g_menuBiPaiSelect=null;
//var g_biPaiRing=null;
////向服务器发送比牌玩家位置的变量
//var g_playerPositionServer1=null;
//var g_playerPositionServer2=null;
////临时全局变量，比牌玩家的数组下标,actionBiPai:function（）中
//var g_biPaiPlayerIndexOf1=new Array(2);
//var g_biPaiPlayerIndexOf2=new Array(2);
//
//
////玩家自己的服务器位置
//var myselfPlayerPositionServer=null;
////比牌失败者的位置,pomelo_on:function
//var g_loserPositionServer=null;
//
////广播信息记录数组，最多50条信息记录,假设现在只有四条记录
//var g_radioMessageArray=new Array();
//g_radioMessageArray.push("我来了，小子！");
////g_radioMessageArray.push("我来了，傻子！教科书上的亏损对了上次看电视什么的查看，" +
////    "是今年春节首款触控技术课程数控机床你看，" +
////    "数控机床看世界杯常客说不出口就是看，活生生，死翘翘！");
////g_radioMessageArray.push("我来了，嘎子！");
////g_radioMessageArray.push("我来了，愣子！觉得是健康瘦身疗程瘦了开车开了四年四十，" +
////    "设计理论考试承诺书来看你的内裤穿上看了，" +
////    "思考拿出来空间的快乐杀杀杀杀杀杀杀杀杀，" +
////    "就哭了咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩吗");
////g_radioMessageArray.push("三月的陌上，春光渐盛。我独坐在三月的窗下，" +
////    "依着经年的脉络，追寻那年桃花烁烁的足迹。" +
////    "只是时光太匆匆，我已来不及拾捡，" +
////    "那些属于城南的旧事早已散落成一地风干的花瓣，" +
////    "幽幽地散发着岁月的沉香,陌上的春色已然葱茏，" +
////    "街边的柳色青了又青，南归的燕子已在檐角欢呼，" +
////    "桃花也在枝头初绽嫣红。推开窗户，我的窗前又落下了昨夜春风来过的痕迹，" +
////    "相信窗台上那几页不知从何处飞来的，更不知是谁家孩子的旧画稿定是不会骗我的。" +
////    "伸手，触摸不到红尘的温暖。低眉，兀自清欢，在尘埃里独自花开花落." +
////    "午后的阳光，暖暖地洒在窗下，一直照进我的心里。我静倚着春天的门楣，" +
////    "安静地解读着一本老旧泛黄的诗集。如果有来生，要做一棵树，站成永恒。" +
////    "没有悲欢的姿势，一半在尘土里安详，一半在风里飞扬；一半洒落荫凉，" +
////    "一半沐浴阳光。非常沉默、非常骄傲。从不依靠、从不寻找。如果有来生，" +
////    "要做一只鸟，飞越永恒，没有迷途的苦恼。东方有火红的希望，南方有温暖的巢床" +
////    "，向西逐退残阳，向北唤醒芬芳。如果有来生，希望每次相遇，都能化为永恒。" +
////    "读三毛的诗，总是能给我一种强大的支撑。常常想，象她那样的奇女子，" +
////    "究竟走过了怎样的荒凉，才能这般彻悟通透啊！可是，我不会迷恋她，" +
////    "她只是个传说。我依然会好好地做自己，如她那样非常沉默，亦非常骄");
////g_radioMessageArray.push("吉萨喀喀喀喀喀喀喀喀喀");
//
////换牌的花色和点数
//var g_exchangeCardSuit=null;
//var g_exchangeCardRank=null;
////广播文字滚动窗口
//var g_cliper=new cc.ClippingNode();
//g_cliper.retain();
////广播信息记录最多保存数
//var g_recordMax=15;

var gameLayer = cc.Layer.extend({

    backSprite:null,
    backSpriteHead:null,
    //玩牌操作按钮菜单选项
    biPaiMenuItem :null,
    kaiPaiMenuItem:null,
    qiPaiMenuItem:null,
    jiaZhuMenuItem:null,
    quanXiaMenuItem:null,
    genZhuMenuItem:null,
    genDaoDiMenuItem:null,
    //存放其他按钮选项的按钮菜单
    otherMenu:null,


    //换牌按钮菜单项
    exchangeCardMenuItem:null,
    //换牌监听
    exchangeCardListener:null,
    //每张牌上绑定的提醒精灵
    cardBindSprite1:null,
    cardBindSprite2:null,
    cardBindSprite3:null,
    //每张牌精灵引用
    cardSprite1:null,
    cardSprite2:null,
    cardSprite3:null,
    //三张牌的花色和点数
    card1_suit:null,
    card1_rank:null,
    card2_suit:null,
    card2_rank:null,
    card3_suit:null,
    card3_rank:null,
    //花牌的次数
    exchangeNumber:0,


    players:null,
    players_noPower:null,
    //参与过本牌局的玩家
    involvementPlayer_Cards:null,
    //playerIndexOf:null,
    playerPositionServer:null,
    playerPositionClient:1,
    //是否开启了跟到底模式
    follow_always:null,

    //滚动字幕窗口成员
    cliper:null,
    drawNode:null,

    //场次级别
    level:null,
    //本场次级别对应的金币级别数组
    betArray:null,
    //用于存放金币精灵的数组
    betPhotoArray:null,
    //当前赌注
    bet:null,
    //当前总赌注
    sumBet:null,
    //当前回合数
    countFlowing:null,
    //房间号
    roomNum:null,
    //玩家数
    playerNum:null,
    //当前房间状态,是否属于游戏状态，
    roomState:null,
    //当前获得权限的玩家位置（服务器位置）
    currentGetPowerPlayerPosition:null,
    //当前房间是否属于属于全押状态,用于判断：如果房间已经属于全押状态，再次出现全押状态时，产生比牌
    allInState:null,
    //当前房间状态是否属于比牌状态，用于判断：如果属于比牌状态，当服务器发送获胜数据，
    //客户端需要等待一定时间，在执行获取金币动作
    comparableState:null,
    //发牌动作的轮次
    count:null,
    //加注选择界面
    layerJiaZhuSelect:null,
    //设置界面
    layerSetting:null,
    //返回选择界面
    layerBack:null,
    //聊天界面
    layerChat:null,
    //互动界面
    layerInteraction:null,
    //广播界面
    layerRadio:null,
    //开始发牌的位置，默认为1
    startDealCardPosition:null,
    startDealCardPosition1:null,
    //是否属于发牌发牌动作中
    dealCardState:null,

    //比牌时间计算器
    progressBoardBiPaiTime:null,

    //牌局开始时，判断玩家自己的牌是否已经到达，用于判断在pomelo.onFapai()之前pomelo.onshow()是否以及运行
    myselfCardsReach:null,
    myselfCards:null,

    //房间信息显示标签
    labelBet:null,
    labelSumBet:null,
    labelCountFlowing:null,

    //用于存放广播窗口的背景
    radioMenuBackground:null,
    //当前广播滚动的文本
    text_came:null,

    ctor:function(){
        this._super();
        //this.retainNumber();
        this.players=new Array();
        //this.players.retain()
        this.players_noPower=new Array();
        this.involvementPlayer_Cards=new Array();
        this.myselfCards=new Array();

        this.count=0;
        this.startDealCardPosition=1;
        this.startDealCardPosition1=this.startDealCardPosition;

        this.level="chuJi";
        this.betArray=[100,300,500,800,1000];
        this.betPhotoArray=new Array();
        this.comparableState=false;
        this.allInState=false;
        this.myselfCardsReach=false;
        this.follow_always=false;
        this.dealCardState=false;

        this.bet=g_roomData[0];
        this.bet=this.betArray[0]; //临时
        this.sumBet=g_roomData[1];
        this.countFlowing=g_roomData[2];
        this.roomNum=g_roomData[3];
        this.playerNum=g_roomData[4];
        this.roomState=g_roomData[5];
        this.currentGetPowerPlayerPosition=g_roomData[6];

        this.initGameBackground();

        this.initPlayersAndPlayer_noPower();

        this.initMenu();
        this.initPropMenu();
        this.initRadioDisplayTxtCliper();
        this.initOtherMenu();
        this.initMenuItemVisibleAfterComeInRoom();
        for(var i=0;i<g_playerData.length;i++){
            console.log("rrrrr");
            console.log(g_playerData[i][0]);
            console.log(g_playerData[i][1]);
            console.log(g_playerData[i][2]);
            console.log("rrrrr");
        }
        console.log("player_Length:"+this.players.length+"  "+this.players_noPower.length);
        console.log("g_roomData.length:"+g_roomData.length);
        this.initPlayers();
        if(this.roomState==1){
            this.initIsGamePlayerCardsPositionAndOtherMessage();
            this.initInvolvementPlayer_Cards_SetPosition();
        }
        this.initCounterTimer();
        this.showRoomMessage();
        this.schedule(this.showRoomMessageUpdate,1.0/60,cc.REPEAT_FOREVER,0);
        this.pomelo_on();
        this.initPersonalMessageMenu();

    },
    //初始化游戏背景图片
    initGameBackground:function(){
        var size = cc.director.getWinSize();

        //游戏大背景
        this.backSprite=new cc.Sprite(res.BackGround_jpg);
        this.backSprite.setPosition(size.width/2,size.height/2-35);
        this.addChild(this.backSprite);

        //游戏头部黑条背景
        this.backSpriteHead=new cc.Sprite(res.BackgroundHead_png);
        this.backSpriteHead.attr({
            x:this.backSprite.getContentSize().width/2,
            y:this.backSprite.getContentSize().height-10,
            anchorX:0.5,
            anchorY:0
        });
        this.backSprite.addChild(this.backSpriteHead);

        //游戏尾部桌面样式背景
        var backSpriteHail=new cc.Sprite(res.BackgroundHail_png);
        backSpriteHail.attr({
            x:this.backSprite.getContentSize().width/2,
            y:0,
            anchorX:0.5,
            anchorY:0
        });
        this.backSprite.addChild(backSpriteHail);

        //游戏logo水印背景
        var backLogo=new cc.Sprite(res.BackgroundLogo_png);
        backLogo.attr({
            x:this.backSprite.getContentSize().width/2,
            y:this.backSprite.getContentSize().height/2+80,
            anchorX:0.5,
            anchorY:0.5
        });
        this.backSprite.addChild(backLogo);

        //游戏场次水印背景
        var backLevel=new cc.Sprite(res.BackgroundLevel_png);
        backLevel.attr({
            x:backLogo.getContentSize().width,
            y:backLogo.getContentSize().height-20,
            anchorX:0,
            anchorY:0
        });
        backLogo.addChild(backLevel);

        g_dealCardBack.setPosition(size.width/2,size.height+g_dealCardBack.getContentSize().height/2);
        this.addChild(g_dealCardBack);
    },
    //初始化玩牌操作按钮
    initMenu:function(){
        var size = cc.director.getWinSize();

        //比牌
        var biPaiprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var biPaiprohibitSpriteString=new cc.Sprite(res.BiPaiString_png);
        biPaiprohibitSpriteString.setPosition(
            biPaiprohibitSprite.getPositionX()+biPaiprohibitSprite.getContentSize().width/2,
            biPaiprohibitSprite.getPositionY()+biPaiprohibitSprite.getContentSize().height/2
        );
        biPaiprohibitSprite.addChild(biPaiprohibitSpriteString);
        var biPaiSprite=new cc.Sprite(res.OpenPicture_png);
        var biPaiSpriteString=new cc.Sprite(res.BiPaiString_png);
        biPaiSpriteString.setPosition(
            biPaiSprite.getPositionX()+biPaiSprite.getContentSize().width/2,
            biPaiSprite.getPositionY()+biPaiSprite.getContentSize().height/2
        );
        biPaiSprite.addChild(biPaiSpriteString);
        var biPaiSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var biPaiSpriteStringCopy=new cc.Sprite(res.BiPaiString_png);
        biPaiSpriteStringCopy.setPosition(
            biPaiSpriteCopy.getPositionX()+biPaiSpriteCopy.getContentSize().width/2,
            biPaiSpriteCopy.getPositionY()+biPaiSpriteCopy.getContentSize().height/2
        );
        biPaiSpriteCopy.addChild(biPaiSpriteStringCopy);
        this.biPaiMenuItem=new cc.MenuItemSprite(biPaiSprite,biPaiSpriteCopy,biPaiprohibitSprite,
            this.menuCallbackBiPai,this);

        //看牌
        var kaiPaiprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var kaiPaiprohibitSpriteString=new cc.Sprite(res.KaiPaiString_png);
        kaiPaiprohibitSpriteString.setPosition(
            kaiPaiprohibitSprite.getPositionX()+kaiPaiprohibitSprite.getContentSize().width/2,
            kaiPaiprohibitSprite.getPositionY()+kaiPaiprohibitSprite.getContentSize().height/2
        );
        kaiPaiprohibitSprite.addChild(kaiPaiprohibitSpriteString);
        var kaiPaiSprite=new cc.Sprite(res.OpenPicture_png);
        var kaiPaiSpriteString=new cc.Sprite(res.KaiPaiString_png);
        kaiPaiSpriteString.setPosition(
            kaiPaiSprite.getPositionX()+kaiPaiSprite.getContentSize().width/2,
            kaiPaiSprite.getPositionY()+kaiPaiSprite.getContentSize().height/2
        );
        kaiPaiSprite.addChild(kaiPaiSpriteString);
        var kaiPaiSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var kaiPaiSpriteStringCopy=new cc.Sprite(res.KaiPaiString_png);
        kaiPaiSpriteStringCopy.setPosition(
            kaiPaiSpriteCopy.getPositionX()+kaiPaiSpriteCopy.getContentSize().width/2,
            kaiPaiSpriteCopy.getPositionY()+kaiPaiSpriteCopy.getContentSize().height/2
        );
        kaiPaiSpriteCopy.addChild(kaiPaiSpriteStringCopy);
        this.kaiPaiMenuItem=new cc.MenuItemSprite(kaiPaiSprite,kaiPaiSpriteCopy,kaiPaiprohibitSprite,
            this.menuCallbackKaiPai,this);

        //弃牌
        var qiPaiprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var qiPaiprohibitSpriteString=new cc.Sprite(res.QiPaiString_png);
        qiPaiprohibitSpriteString.setPosition(
            qiPaiprohibitSprite.getPositionX()+qiPaiprohibitSprite.getContentSize().width/2,
            qiPaiprohibitSprite.getPositionY()+qiPaiprohibitSprite.getContentSize().height/2
        );
        qiPaiprohibitSprite.addChild(qiPaiprohibitSpriteString);
        var qiPaiSprite=new cc.Sprite(res.OpenPicture_png);
        var qiPaiSpriteString=new cc.Sprite(res.QiPaiString_png);
        qiPaiSpriteString.setPosition(
            qiPaiSprite.getPositionX()+qiPaiSprite.getContentSize().width/2,
            qiPaiSprite.getPositionY()+qiPaiSprite.getContentSize().height/2
        );
        qiPaiSprite.addChild(qiPaiSpriteString);
        var qiPaiSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var qiPaiSpriteStringCopy=new cc.Sprite(res.QiPaiString_png);
        qiPaiSpriteStringCopy.setPosition(
            qiPaiSpriteCopy.getPositionX()+qiPaiSpriteCopy.getContentSize().width/2,
            qiPaiSpriteCopy.getPositionY()+qiPaiSpriteCopy.getContentSize().height/2
        );
        qiPaiSpriteCopy.addChild(qiPaiSpriteStringCopy);
        this.qiPaiMenuItem=new cc.MenuItemSprite(qiPaiSprite,qiPaiSpriteCopy,qiPaiprohibitSprite,
            function(){
                game_throw();

            },this);

        //加注
        var jiaZhuprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var jiaZhuprohibitSpriteString=new cc.Sprite(res.JiaZhuString_png);
        jiaZhuprohibitSpriteString.setPosition(
            jiaZhuprohibitSprite.getPositionX()+jiaZhuprohibitSprite.getContentSize().width/2,
            jiaZhuprohibitSprite.getPositionY()+jiaZhuprohibitSprite.getContentSize().height/2
        );
        jiaZhuprohibitSprite.addChild(jiaZhuprohibitSpriteString);
        //var jiaZhudownSprite=new cc.Sprite(res.Down_png);
        var jiaZhuSprite=new cc.Sprite(res.OpenPicture_png);
        var jiaZhuSpriteString=new cc.Sprite(res.JiaZhuString_png);
        jiaZhuSpriteString.setPosition(
            jiaZhuSprite.getPositionX()+jiaZhuSprite.getContentSize().width/2,
            jiaZhuSprite.getPositionY()+jiaZhuSprite.getContentSize().height/2
        );
        jiaZhuSprite.addChild(jiaZhuSpriteString);
        var jiaZhuSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var jiaZhuSpriteStringCopy=new cc.Sprite(res.JiaZhuString_png);
        jiaZhuSpriteStringCopy.setPosition(
            jiaZhuSpriteCopy.getPositionX()+jiaZhuSpriteCopy.getContentSize().width/2,
            jiaZhuSpriteCopy.getPositionY()+jiaZhuSpriteCopy.getContentSize().height/2
        );
        jiaZhuSpriteCopy.addChild(jiaZhuSpriteStringCopy);
        this.jiaZhuMenuItem=new cc.MenuItemSprite(jiaZhuSprite,jiaZhuSpriteCopy,jiaZhuprohibitSprite,
            this.menuCallbackJiaZhu,this);

        //全押
        var quanXiaprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var quanXiaprohibitSpriteString=new cc.Sprite(res.QuanYaString_png);
        quanXiaprohibitSpriteString.setPosition(
            quanXiaprohibitSprite.getPositionX()+quanXiaprohibitSprite.getContentSize().width/2,
            quanXiaprohibitSprite.getPositionY()+quanXiaprohibitSprite.getContentSize().height/2
        );
        quanXiaprohibitSprite.addChild(quanXiaprohibitSpriteString);
        //var quanXiadownSprite=new cc.Sprite(res.Down_png);
        var quanXiaSprite=new cc.Sprite(res.OpenPicture_png);
        var quanXiaSpriteString=new cc.Sprite(res.QuanYaString_png);
        quanXiaSpriteString.setPosition(
            quanXiaSprite.getPositionX()+quanXiaSprite.getContentSize().width/2,
            quanXiaSprite.getPositionY()+quanXiaSprite.getContentSize().height/2
        );
        quanXiaSprite.addChild(quanXiaSpriteString);
        var quanXiaSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var quanXiaSpriteStringCopy=new cc.Sprite(res.QuanYaString_png);
        quanXiaSpriteStringCopy.setPosition(
            quanXiaSpriteCopy.getPositionX()+quanXiaSpriteCopy.getContentSize().width/2,
            quanXiaSpriteCopy.getPositionY()+quanXiaSpriteCopy.getContentSize().height/2
        );
        quanXiaSpriteCopy.addChild(quanXiaSpriteStringCopy);
        this.quanXiaMenuItem=new cc.MenuItemSprite(quanXiaSprite,quanXiaSpriteCopy,quanXiaprohibitSprite,
            function(){
                game_allin();

            },this);

        //跟注
        var genZhuprohibitSprite=new cc.Sprite(res.ProhibitPicture_png);
        var genZhuprohibitSpriteString=new cc.Sprite(res.GenZhuString_png);
        genZhuprohibitSpriteString.setPosition(
            genZhuprohibitSprite.getPositionX()+genZhuprohibitSprite.getContentSize().width/2,
            genZhuprohibitSprite.getPositionY()+genZhuprohibitSprite.getContentSize().height/2
        );
        genZhuprohibitSprite.addChild(genZhuprohibitSpriteString);
        var genZhuSprite=new cc.Sprite(res.OpenPicture_png);
        var genZhuSpriteString=new cc.Sprite(res.GenZhuString_png);
        genZhuSpriteString.setPosition(
            genZhuSprite.getPositionX()+genZhuSprite.getContentSize().width/2,
            genZhuSprite.getPositionY()+genZhuSprite.getContentSize().height/2
        );
        genZhuSprite.addChild(genZhuSpriteString);
        var genZhuSpriteCopy=new cc.Sprite(res.OpenPicture_png);
        var genZhuSpriteStringCopy=new cc.Sprite(res.GenZhuString_png);
        genZhuSpriteStringCopy.setPosition(
            genZhuSpriteCopy.getPositionX()+genZhuSpriteCopy.getContentSize().width/2,
            genZhuSpriteCopy.getPositionY()+genZhuSpriteCopy.getContentSize().height/2
        );
        genZhuSpriteCopy.addChild(genZhuSpriteStringCopy);
        this.genZhuMenuItem=new cc.MenuItemSprite(genZhuSprite,genZhuSpriteCopy,genZhuprohibitSprite,function(){
            game_follow();

        },this);



        /*跟到底开关this.genDaoDiMenuItem*/
        //开关开启状态初始化
        var GenDaoDiOnSprite=new cc.Sprite(res.GenDaoDi1_png);
        var GenDaoDiOnSprite1=new cc.Sprite(res.GenDaoDi2_png);
        var GenDaoDiOnSprite2=new cc.Sprite(res.GenDaoDi3_png);
        GenDaoDiOnSprite1.setPosition(GenDaoDiOnSprite.getPositionX()+GenDaoDiOnSprite.getContentSize().width/6,
            GenDaoDiOnSprite.getPositionY()+GenDaoDiOnSprite.getContentSize().height/2);
        GenDaoDiOnSprite2.setPosition(GenDaoDiOnSprite.getPositionX()+GenDaoDiOnSprite.getContentSize().width*7/12,
            GenDaoDiOnSprite.getPositionY()+GenDaoDiOnSprite.getContentSize().height/2);
        GenDaoDiOnSprite.addChild(GenDaoDiOnSprite1);
        GenDaoDiOnSprite.addChild(GenDaoDiOnSprite2);
        var GenDaoDiOnSpriteCopy=new cc.Sprite(res.GenDaoDi1_png);
        var GenDaoDiOnSprite1Copy=new cc.Sprite(res.GenDaoDi2_png);
        var GenDaoDiOnSprite2Copy=new cc.Sprite(res.GenDaoDi3_png);
        GenDaoDiOnSprite1Copy.setPosition(GenDaoDiOnSpriteCopy.getPositionX()+GenDaoDiOnSpriteCopy.getContentSize().width/6,
            GenDaoDiOnSpriteCopy.getPositionY()+GenDaoDiOnSpriteCopy.getContentSize().height/2);
        GenDaoDiOnSprite2Copy.setPosition(GenDaoDiOnSpriteCopy.getPositionX()+GenDaoDiOnSpriteCopy.getContentSize().width*7/12,
            GenDaoDiOnSpriteCopy.getPositionY()+GenDaoDiOnSpriteCopy.getContentSize().height/2);
        GenDaoDiOnSpriteCopy.addChild(GenDaoDiOnSprite1Copy);
        GenDaoDiOnSpriteCopy.addChild(GenDaoDiOnSprite2Copy);
        var GenDaoDiOnMenuItem=new cc.MenuItemSprite(GenDaoDiOnSprite,GenDaoDiOnSpriteCopy);
        //开关关闭状态初始化
        var GenDaoDiOfSprite=new cc.Sprite(res.GenDaoDi1_png);
        var GenDaoDiOfSprite1=new cc.Sprite(res.GenDaoDi3_png);
        GenDaoDiOfSprite1.setPosition(GenDaoDiOfSprite.getPositionX()+GenDaoDiOfSprite.getContentSize().width*7/12,
            GenDaoDiOfSprite.getPositionY()+GenDaoDiOfSprite.getContentSize().height/2);
        GenDaoDiOfSprite.addChild(GenDaoDiOfSprite1);
        var GenDaoDiOfSpriteCopy=new cc.Sprite(res.GenDaoDi1_png);
        var GenDaoDiOfSprite1Copy=new cc.Sprite(res.GenDaoDi3_png);
        GenDaoDiOfSprite1Copy.setPosition(GenDaoDiOfSpriteCopy.getPositionX()+GenDaoDiOfSpriteCopy.getContentSize().width*7/12,
            GenDaoDiOfSpriteCopy.getPositionY()+GenDaoDiOfSpriteCopy.getContentSize().height/2);
        GenDaoDiOfSpriteCopy.addChild(GenDaoDiOfSprite1Copy);
        var GenDaoDiOfMenuItem=new cc.MenuItemSprite(GenDaoDiOfSprite,GenDaoDiOfSpriteCopy);
        //创建开关
        this.genDaoDiMenuItem=new cc.MenuItemToggle(GenDaoDiOfMenuItem,GenDaoDiOnMenuItem,
            function(){
                this.menuCallbcak_follow_always();
            }.bind(this));

        this.mn=new cc.Menu(this.biPaiMenuItem,this.kaiPaiMenuItem,
            this.qiPaiMenuItem,this.jiaZhuMenuItem,this.quanXiaMenuItem,
            this.genZhuMenuItem,this.genDaoDiMenuItem);
        this.mn.x=size.width/2;
        this.mn.y=GenDaoDiOfSprite.getContentSize().height/2;
        this.mn.alignItemsHorizontallyWithPadding(0);
        //this.mn.getChildByName("biPaiMenuItem").setEnabled(false);
        //mn.alignItemsInColumns(7);
        this.addChild(this.mn,2);
    },
    initPropMenu:function(){
        var size=cc.director.getWinSize();
        //换牌按钮
        var exchangeCardMenuItemSprite1=new cc.Sprite(res.Exchange_png);
        var exchangeCardMenuItemSprite2=new cc.Sprite(res.Exchange_png);
        var exchangeCardMenuItemSprite3=new cc.Sprite(res.Exchange_png);
        var forbidSprite=new cc.Sprite(res.PropForbid_png);
        forbidSprite.attr({
            x:exchangeCardMenuItemSprite3.getContentSize().width/2,
            y:exchangeCardMenuItemSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        exchangeCardMenuItemSprite3.addChild(forbidSprite);
        this.exchangeCardMenuItem=new cc.MenuItemSprite(exchangeCardMenuItemSprite1,exchangeCardMenuItemSprite2,
            exchangeCardMenuItemSprite3,this.menuCallbackExchangeCard,this);

        var propMenu=new cc.Menu(this.exchangeCardMenuItem);
        propMenu.alignItemsHorizontallyWithPadding(0);
        propMenu.attr({
            x:size.width/4,
            y:size.height/4,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(propMenu);
    },
    initOtherMenu:function(){
        var size=cc.director.getWinSize();
        //设置按钮
        var settingSprite1=new cc.Sprite(res.SettingButton_png);
        var settingSprite2=new cc.Sprite(res.SettingButton_png);
        var settingSprite3=new cc.Sprite(res.SettingButton_png);
        var settingMenuItem=new cc.MenuItemSprite(settingSprite1,settingSprite2,settingSprite3,
            this.menuSettingCallback,this);
        settingMenuItem.x=this.backSpriteHead.getContentSize().width-50;
        settingMenuItem.y=this.backSpriteHead.getContentSize().height/2;

        //返回按钮
        var gameBackSprite1=new cc.Sprite(res.GameBack_png);
        var gameBackSprite2=new cc.Sprite(res.GameBack_png);
        var gameBackSprite3=new cc.Sprite(res.GameBack_png);
        var gameBackMenuItem=new cc.MenuItemSprite(gameBackSprite1,gameBackSprite2,gameBackSprite3,
            this.menuCallbackGameBack,this);
        gameBackMenuItem.x=40;
        gameBackMenuItem.y=this.backSpriteHead.getContentSize().height/2;

        //聊天按钮
        var chatMenuItemSprite1=new cc.Sprite(res.MenuComeInChat_png);
        var chatMenuItemSprite2=new cc.Sprite(res.MenuComeInChat_png);
        var chatMenuItemSprite3=new cc.Sprite(res.MenuComeInChat_png);
        var chatMenuItem=new cc.MenuItemSprite(chatMenuItemSprite1,chatMenuItemSprite2,chatMenuItemSprite3,
        this.menuCallbackGameChat,this);
        chatMenuItem.x=150;
        chatMenuItem.y=this.backSpriteHead.getContentSize().height/2;

        this.otherMenu=new cc.Menu(settingMenuItem,gameBackMenuItem,chatMenuItem);
        this.otherMenu.x=0;
        this.otherMenu.y=0;
        this.backSpriteHead.addChild(this.otherMenu,2);

        //广播按钮
        var radioMenuItemSprite1=new cc.Sprite(res.DisplayTxtBoar_png);
        var radio1=new cc.Sprite(res.Horn_png);
        radio1.attr({
            x:50,
            y:radioMenuItemSprite1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        radioMenuItemSprite1.addChild(radio1);
        var radioMenuItemSprite2=new cc.Sprite(res.DisplayTxtBoar_png);
        var radio2=new cc.Sprite(res.Horn_png);
        radio2.attr({
            x:50,
            y:radioMenuItemSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        radioMenuItemSprite2.addChild(radio2);
        var radioMenuItemSprite3=new cc.Sprite(res.DisplayTxtBoar_png);
        var radio3=new cc.Sprite(res.Horn_png);
        radio3.attr({
            x:50,
            y:radioMenuItemSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        radioMenuItemSprite3.addChild(radio3);
        var radioMenuItem=new cc.MenuItemSprite(radioMenuItemSprite1,radioMenuItemSprite2,radioMenuItemSprite3,
            this.menuCallbackRadio,this);
        radioMenuItem.x=size.width/2;
        radioMenuItem.y=size.height-radioMenuItemSprite1.getContentSize().height*3/2-10;
        var radioMenu=new cc.Menu(radioMenuItem);
        radioMenu.x=0;
        radioMenu.y=0;
        this.addChild(radioMenu);
    },
    initPersonalMessageMenu:function(){
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].id!=uid){
                var menuSprite1=new cc.Sprite(res.Mobile_jpg);
                var menuSprite2=new cc.Sprite(res.Mobile_jpg);
                var menuSprite3=new cc.Sprite(res.Mobile_jpg);
                var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
                menuItem.setName(this.players[i].playerPosition.toString());
                menuItem.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                var menu=new cc.Menu(menuItem);
                menu.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                this.players[i].spritePhotoMobile.addChild(menu);
                //var button=new ccui.Button(res.Mobile_jpg,res.Mobile_jpg);
                //button.setTouchEnabled(true);
                //button.setPressedActionEnabled(false);
                //button.addTouchEventListener(this.menuCallbackPersonalMessage);
                //button.setName(this.players[i].playerPosition.toString());
                //button.attr({
                //    x : 0,
                //    y : 0,
                //    anchorX : 0,
                //    anchorY : 0
                //});
            }
        }
        for(var i=0;i<this.players_noPower.length;i++){
            if(this.players_noPower[i].id!=uid){
                var menuSprite1=new cc.Sprite(res.Mobile_jpg);
                var menuSprite2=new cc.Sprite(res.Mobile_jpg);
                var menuSprite3=new cc.Sprite(res.Mobile_jpg);
                var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
                menuItem.setName(this.players_noPower[i].playerPosition.toString());
                menuItem.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                var menu=new cc.Menu(menuItem);
                menu.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                this.players_noPower[i].spritePhotoMobile.addChild(menu);
                //var button=new ccui.Button(res.Mobile_jpg,res.Mobile_jpg);
                //button.setTouchEnabled(true);
                //button.setPressedActionEnabled(false);
                //button.addTouchEventListener(this.menuCallbackPersonalMessage);
                //button.setName(this.players_noPower[i].playerPosition.toString());
                //button.attr({
                //    x : 0,
                //    y : 0,
                //    anchorX : 0,
                //    anchorY : 0
                //});
                //this.players_noPower[i].spritePhotoMobile.addChild(button);
            }
        }

    },
    initMenuItemVisibleAfterComeInRoom:function(){
        this.biPaiMenuItem.setEnabled(false);
        this.qiPaiMenuItem.setEnabled(false);
        this.kaiPaiMenuItem.setEnabled(false);
        this.jiaZhuMenuItem.setEnabled(false);
        this.quanXiaMenuItem.setEnabled(false);
        this.genZhuMenuItem.setEnabled(false);

        this.exchangeCardMenuItem.setEnabled(false);
    },
    initPlayersAndPlayer_noPower:function(){
        var myslf=-1;
        for(var i=0;i<g_playerData.length;i++){
            console.log(g_playerData[i][0]);
                if(this.roomState==1){
                    if(g_playerData[i][0]!=uid){
                        if(g_playerData[i][2]==0){
                            var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                            this.addChild(player,5);
                            this.players_noPower.push(player);

                        }
                        else{
                            var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                            this.addChild(player,5);
                            this.players.push(player);
                        }
                    }
                    else {
                        if(myslf==-1){
                            if(g_playerData[i][2]==0){
                                var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                                this.addChild(player,5);
                                this.players_noPower.push(player);
                                myslf=1;

                            }
                            else{
                                var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                                this.addChild(player,5);
                                this.players.push(player);
                                myslf=1;
                            }
                        }
                    }
                    }
                else{
                    if(g_playerData[i][0]!=uid){
                        var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                        this.addChild(player,5);
                        this.players.push(player);
                    }
                    else {
                        if(myslf==-1){
                            var player=new Players(g_playerData[i][0],g_playerData[i][1],g_playerData[i][2]);
                            this.addChild(player,5);
                            this.players.push(player);
                            myslf=1;
                        }
                    }

                }

        }

    },
    //初始化广播显示广播信息的窗口
    initRadioDisplayTxtCliper:function(){
        //背景
        var size=cc.director.getWinSize();
        this.radioMenuBackground=new cc.Sprite(res.DisplayTxtBoar_png);
        this.radioMenuBackground.x=size.width/2;
        this.radioMenuBackground.y=size.height-this.radioMenuBackground.getContentSize().height*3/2-10;
        this.addChild(this.radioMenuBackground);

        //初始化滚动字幕成员
        this.cliper=new cc.ClippingNode();
        this.drawNode = new cc.DrawNode();
        var nodeWidth=this.radioMenuBackground.getContentSize().width-20;
        var nodeHeight=this.radioMenuBackground.getContentSize().height;
        console.log("nodeWidth:"+nodeWidth);
        console.log("nodeHeight:"+nodeHeight);
        this.drawNode.drawRect(cc.p(0,0),cc.p(700,55),cc.color.WHITE);
        this.cliper.setStencil(this.drawNode);
        this.cliper.attr({
            x: 80,
            y: this.radioMenuBackground.getContentSize().height/2-15,
            anchorX:0.5,
            anchorY:0.5
        });
        this.radioMenuBackground.addChild(this.cliper);
    },
    pomelo_on:function(){
        pomelo.on('onReady',onReady_function=function(data){
            console.log(data.user+" is ready");

        }.bind(this));
        pomelo.on('onFollow',onFollow_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerName=data["user"];
            var allChips=data["all_chip"];
            this.sumBet=allChips;
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==playerName){
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error outside..................................... pomelo.on('onFollow')");
                return;
            }
            this.actionFollowBet(this.players[playerIndexOf].spritePhotoMobile.getPosition(),
                this.players[playerIndexOf].checkCard);


        }.bind(this));
        pomelo.on('onAddChip',onAddChip_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerName=data["user"];
            var bet=data["current_chip"];
            var sumBet=data["all_chip"];
            this.bet=bet;
            this.sumBet=sumBet;
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==playerName){
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log(" error outside.................................pomelo.on('onAddChip')");
                return;
            }
            this.actionAddBet(this.players[playerIndexOf].spritePhotoMobile.getPosition(),
                 this.players[playerIndexOf].checkCard);


        }.bind(this));
        pomelo.on('onAdd',onAdd_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            if(data["user"]!=uid){
                var player=null;
                    var playerName=data["user"];
                    var playerServer=data["position"];
                    var playerIsPower=0;
                    console.log("this.roomState:"+this.roomState);
                    if(this.roomState==0){
                        playerIsPower=1;
                        player=new Players(playerName,playerServer,playerIsPower);
                        this.addChild(player);
                        this.players.push(player);
                    }
                    else{
                        player=new Players(playerName,playerServer,playerIsPower);
                        this.addChild(player);
                        this.players_noPower.push(player);
                    }
                //确定新加入玩家的客户端位置
                if(player.positionServer>this.playerPositionServer){
                    player.playerPosition=this.playerPositionClient+
                        (player.positionServer-this.playerPositionServer);
                }
                else{
                    player.playerPosition=this.playerPositionClient+
                        (5-this.playerPositionServer)+player.positionServer;
                }
                console.log("playerPOsition:"+player.playerPosition);
                var size=cc.director.getWinSize();
                switch (player.playerPosition){
                    case 1:
                        player.spritePhotoMobile.setPosition(
                            size.width/2,
                            player.spritePhotoMobile.getContentSize().height/2+80);
                        break;
                    case 2:
                        player.spritePhotoMobile.setPosition(
                            size.width-player.spritePhotoMobile.getContentSize().width/2-5,
                            player.spritePhotoMobile.getContentSize().height/2+100);
                        break;
                    case 3:
                        player.spritePhotoMobile.setPosition(
                            size.width-player.spritePhotoMobile.getContentSize().width/2-5,
                            size.height-player.spritePhotoMobile.getContentSize().height/2-100);
                        break;
                    case 4:
                        player.spritePhotoMobile.setPosition(
                            player.spritePhotoMobile.getContentSize().width/2+5,
                            size.height-player.spritePhotoMobile.getContentSize().height/2-100);
                        break;
                    case 5:
                        player.spritePhotoMobile.setPosition(
                            player.spritePhotoMobile.getContentSize().width/2+5,
                            player.spritePhotoMobile.getContentSize().height/2+100);
                        break;
                    default :break;
                }

                //为新加入的玩家头像添加个人信息按钮
                var menuSprite1=new cc.Sprite(res.Mobile_jpg);
                var menuSprite2=new cc.Sprite(res.Mobile_jpg);
                var menuSprite3=new cc.Sprite(res.Mobile_jpg);
                var menuItem=new cc.MenuItemSprite(menuSprite1,menuSprite2,menuSprite3,this.menuCallbackPersonalMessage,this);
                menuItem.setName(player.playerPosition.toString());
                menuItem.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                var menu=new cc.Menu(menuItem);
                menu.attr({
                    x : 0,
                    y : 0,
                    anchorX : 0,
                    anchorY : 0
                });
                player.spritePhotoMobile.addChild(menu);
                //var button=new ccui.Button(res.Mobile_jpg,res.Mobile_jpg);
                //button.setTouchEnabled(true);
                //button.setPressedActionEnabled(false);
                //button.addTouchEventListener(this.menuCallbackPersonalMessage,this);
                //button.setName(player.playerPosition.toString());
                //button.attr({
                //    x : 0,
                //    y : 0,
                //    anchorX : 0,
                //    anchorY : 0
                //});
                //player.spritePhotoMobile.addChild(button);
                //玩家数量加1
                this.playerNum++;
            }


        }.bind(this));
        pomelo.on('onOpen',onOpen_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerName=data["user"];
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==playerName){
                    this.players[i].checkCard=true;
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error outside............... pomelo.on('onOpen')")
                return;
            }
            if(playerName==uid){
                //翻牌动作
                for(var j=0;j<3;j++){
                    var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                    var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
                    var backSpawn=cc.spawn(backCardSeq,backCamera);
                    var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                    var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
                    var frontSpawn=cc.spawn(frontSeq,frontCamera);
                    this.players[playerIndexOf].myCards[j].spriteBack.runAction(backSpawn);
                    this.players[playerIndexOf].myCards[j].sprite.runAction(frontSpawn);
                }
                this.kaiPaiMenuItem.setEnabled(false);

                this.exchangeCardMenuItem.setEnabled(true);
            }
            //重置定时器
            if(this.players[playerIndexOf].positionServer==this.currentGetPowerPlayerPosition){
                this.players[playerIndexOf].counterTimer.stopCounterTimer();
                this.players[playerIndexOf].counterTimer.startCounterTimer();
            }
            //提示看牌
            if(this.players[playerIndexOf].spriteState!=null){
                this.players[playerIndexOf].spriteState.removeFromParent();
            }
            this.players[playerIndexOf].spriteState=new cc.Sprite(res.CheckCard_png);
            this.players[playerIndexOf].addSpriteState();


        }.bind(this));
        pomelo.on('onThrow',onThrow_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerName=data["user"];
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==playerName){
                    this.players[i].abandon=true;
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error outside......................pomelo.on('onThrow')");
                return;
            }
            if(playerName==uid){
                this.biPaiMenuItem.setEnabled(false);
                this.qiPaiMenuItem.setEnabled(false);
                this.kaiPaiMenuItem.setEnabled(false);
                this.jiaZhuMenuItem.setEnabled(false);
                this.quanXiaMenuItem.setEnabled(false);
                this.genZhuMenuItem.setEnabled(false);

                this.exchangeCardMenuItem.setEnabled(false);
                //如果属于开启换牌状态，则取消换牌状态
                if(this.exchangeCardListener!=null){
                    cc.eventManager.removeListener(this.exchangeCardListener);
                    this.exchangeCardListener=null;
                    this.cardSprite1=null;
                    this.cardSprite2=null;
                    this.cardSprite3=null;
                    this.cardBindSprite1.removeFromParent();
                    this.cardBindSprite2.removeFromParent();
                    this.cardBindSprite3.removeFromParent();
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;
                }
            }
            //提示弃牌
            if(this.players[playerIndexOf].spriteState!=null){
                this.players[playerIndexOf].spriteState.removeFromParent();
            }
            this.players[playerIndexOf].spriteState=new cc.Sprite(res.Abandon_png);
            this.players[playerIndexOf].addSpriteState();
            this.players[playerIndexOf].abandon=true;
            //this.players[playerIndexOf].isPower=0;

            //将玩家移到player_noPower数组
            this.players_noPower.push(this.players[playerIndexOf]);
            this.players.splice(playerIndexOf,1);
            console.log("this.players:"+this.players.length);


        }.bind(this));
        pomelo.on('onBipai',onBipai_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var winnerPositionServer=data["winner"];

            var playerPositionServer1=data["position1"];
            var playerPositionServer2=data["position2"];

            var loserPositionServer=null;
            if(playerPositionServer1==winnerPositionServer){
                loserPositionServer=playerPositionServer2;
            }
            else{
                loserPositionServer=playerPositionServer1;
            }
            g_loserPositionServer=loserPositionServer;
            console.log("loserPositionServer:"+loserPositionServer);

            //置房间状态为比牌状态并定时重置回来
            this.comparableState=true;
            var delayCompare=new cc.DelayTime(4.8);
            var callbackSetRoomStateCompare=cc.callFunc(this.setRoomStateCompare,this);
            this.runAction(cc.sequence(delayCompare,callbackSetRoomStateCompare));

            //停止当前定时器进度条
            if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
                var myself=false;
                if(myself==false){
                    for(var i=0;i<this.players.length;i++){
                        if(this.players[i].positionServer==this.currentGetPowerPlayerPosition){
                            this.players[i].counterTimer.stopCounterTimer();
                            myself=true;
                            break;
                        }
                    }
                }
                if(myself==false){
                    for(var i=0;i<this.players_noPower.length;i++){
                        if(this.players_noPower[i].positionServer==this.currentGetPowerPlayerPosition){
                            this.players_noPower[i].counterTimer.stopCounterTimer();
                            myself=true;
                            break;
                        }
                    }
                }
                if(myself==false){
                    console.log("No find Rotation");
                }
            }
            else{
                console.log("No start Rotation");
            }

            //和自己相关的比牌时，为避免影响比牌的动作动画，先关闭开牌和弃牌按钮，比牌完毕再通过回调函数回复
            if(playerPositionServer1==this.playerPositionServer||playerPositionServer2==this.playerPositionServer){
                //如果已经进入换牌状态，则取消换牌状态
                if(this.exchangeCardListener!=null){
                    cc.eventManager.removeListener(this.exchangeCardListener);
                    this.exchangeCardListener=null;
                    this.cardSprite1=null;
                    this.cardSprite2=null;
                    this.cardSprite3=null;
                    this.cardBindSprite1.removeFromParent();
                    this.cardBindSprite2.removeFromParent();
                    this.cardBindSprite3.removeFromParent();
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;
                }

                if(playerPositionServer1==this.playerPositionServer){
                    this.biPaiMenuItem.setEnabled(false);
                    this.jiaZhuMenuItem.setEnabled(false);
                    this.quanXiaMenuItem.setEnabled(false);
                    this.genZhuMenuItem.setEnabled(false);
                }
                if(this.kaiPaiMenuItem.isEnabled()==true){
                    this.kaiPaiMenuItem.setEnabled(false);
                    this.qiPaiMenuItem.setEnabled(false);
                    if(this.playerPositionServer==winnerPositionServer&&this.players.length>2){
                        var delay=new cc.DelayTime(4.8);
                        var callbackSetKaiPaiQiPaiMenuItem=cc.callFunc(this.SetKaiPaiQiPaiMenuItem,this);
                        this.runAction(cc.sequence(delay,callbackSetKaiPaiQiPaiMenuItem));
                    }
                }
                else {
                    if(this.qiPaiMenuItem.isEnabled()==true){
                        this.qiPaiMenuItem.setEnabled(false);
                        if(this.playerPositionServer==winnerPositionServer&&this.players.length>2){
                            var delay=new cc.DelayTime(4.8);
                            var callbackSetQiPaiMenuItem=cc.callFunc(this.SetQiPaiMenuItem,this);
                            this.runAction(cc.sequence(delay,callbackSetQiPaiMenuItem));
                        }
                    }
                }

                if(this.exchangeCardMenuItem.isEnabled()==true){
                    this.exchangeCardMenuItem.setEnabled(false);
                    if(this.playerPositionServer==winnerPositionServer&&this.players.length>2){
                        var delay=new cc.DelayTime(4.8);
                        var callbackSetExchangeMenuItem=cc.callFunc(this.exchangeMenuItem,this);
                        this.runAction(cc.sequence(delay,callbackSetExchangeMenuItem));
                    }
                }
            }

            //初始化比牌时间计算器
            if(this.progressBoardBiPaiTime==null){
                this.progressBoardBiPaiTime=new cc.ProgressTimer(null);
                this.progressBoardBiPaiTime.setPercentage(0);
                var ac=new cc.ProgressTo(4.8,100);
                this.progressBoardBiPaiTime.runAction(ac);
                this.addChild(this.progressBoardBiPaiTime);
            }
            else{
                this.progressBoardBiPaiTime.removeFromParent();
                this.progressBoardBiPaiTime=new cc.ProgressTimer(null);
                this.progressBoardBiPaiTime.setPercentage(0);
                var ac=new cc.ProgressTo(4.8,100);
                this.progressBoardBiPaiTime.runAction(ac);
                this.addChild(this.progressBoardBiPaiTime);
            }


            //如果是全押状态下，则不发起跟注动作
            if(this.allInState==false){
                //发起比牌的玩家执行跟注动作
                var findStartMan=false;
                if(findStartMan==false){
                    for(var i=0;i<this.players.length;i++){
                        if(this.players[i].positionServer==playerPositionServer1){
                            if(this.players[i].checkCard==false){
                                this.sumBet=this.sumBet+this.bet;
                            }
                            else{
                                this.sumBet=this.sumBet+this.bet*2;
                            }
                            this.actionAddBet(this.players[i].spritePhotoMobile.getPosition(),
                                this.players[i].checkCard);
                            findStartMan=true;
                            break;
                        }
                    }
                }
                if(findStartMan==false){
                    for(var i=0;i<this.players_noPower.length;i++){
                        if(this.players_noPower[i].positionServer==playerPositionServer1){
                            if(this.players_noPower[i].checkCard==false){
                                this.sumBet=this.sumBet+this.bet;
                            }
                            else{
                                this.sumBet=this.sumBet+this.bet*2;
                            }
                            this.actionAddBet(this.players_noPower[i].spritePhotoMobile.getPosition(),
                                this.players_noPower[i].checkCard);
                            findStartMan=true;
                            break;
                        }
                    }
                }
                if(findStartMan==false){
                    console.log("error: 找不到发起比牌的玩家........outside..pomelo.on('onBipai')");
                    return;
                }
            }
            else{
                console.log("发起全押比牌！！！！");
            }

            //执行比牌动画
            this.actionBiPai(playerPositionServer1,playerPositionServer2,loserPositionServer);
        }.bind(this));
        pomelo.on('onAllin',onAllin_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            //进行全押操作的玩家位置
            var playerPositionString=data["location"];
            var playerPosition=parseInt(playerPositionString);
            //玩家全押数额
            var allChip_player=data["current_chip"];
            //全押后桌面上总数额
            var allChip_desk=data["all_chip"];
            this.sumBet=allChip_desk;
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==playerPosition){
                    playerIndexOf=i;
                    console.log("this.players[playerIndexOf].positionServer:"+this.players[playerIndexOf].positionServer);
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error outside............................................pomelo.on('onAllin')");
                return;
            }

            //不属于全押状态，则置为全押状态，仅执行全押动作
            if(this.allInState==false){
                //防止轮换指令先于全押指令先到达造成按钮可见性初始化出现逻辑错误，故再次初始化按钮
                if(this.players[playerIndexOf].positionServer!=this.playerPositionServer){
                    for(var i=0;i<this.players.length;i++){
                        if(this.players[i].positionServer==this.playerPositionServer){
                            this.biPaiMenuItem.setEnabled(false);
                            this.jiaZhuMenuItem.setEnabled(false);
                            this.quanXiaMenuItem.setEnabled(true);
                            this.genZhuMenuItem.setEnabled(false);
                        }
                    }
                }
                this.allInState=true;
                console.log("this.players[playerIndexOf].positionServer:"+this.players[playerIndexOf].positionServer);
                this.actionAllInBet(this.players[playerIndexOf].spritePhotoMobile.getPosition(),allChip_player);

            }
            //属于全押状态，执行全押动作外还要执行比牌动作
            else{
                console.log("this.players[playerIndexOf].positionServer:"+this.players[playerIndexOf].positionServer);
                this.actionAllInBet(this.players[playerIndexOf].spritePhotoMobile.getPosition(),allChip_player);
                //请求比牌
                if(this.playerPositionServer==playerPosition){
                    if (this.players[0].positionServer == this.playerPositionServer) {
                        g_playerPositionServer1 = this.players[0].positionServer;
                        g_playerPositionServer2 = this.players[1].positionServer;
                    }
                    else {
                        g_playerPositionServer1 = this.players[1].positionServer;
                        g_playerPositionServer2 = this.players[0].positionServer;
                    }
                    console.log("------------allin bipai-----------");
                    pomelo.request(game_route, {
                        process: "bipai",
                        location1: g_playerPositionServer1,
                        location2: g_playerPositionServer2
                    }, function (data) {
                        cc.log(JSON.stringify(data));
                    });
                }
            }

        }.bind(this));
        pomelo.on('onLeave',onLeave_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerName=data["user"];
            console.log("player_Length:"+this.players.length+"  "+this.players_noPower.length);
            var isFind=false;
            if(isFind==false){
                for(var i=0;i<this.players.length;i++){
                    if(this.players[i].id==playerName){
                        this.players[i].removeFromParent();
                        this.players.splice(i,1);
                        isFind=true;
                    }
                }
            }
            if(isFind==false){
                for(var i=0;i<this.players_noPower.length;i++){
                    if(this.players_noPower[i].id==playerName){
                        this.players_noPower[i].removeFromParent();
                        this.players_noPower.splice(i,1);
                        isFind=true;
                    }
                }
            }
            console.log("player_Length1:"+this.players.length+"  "+this.players_noPower.length);
            //玩家数量减1
            this.playerNum--;

        }.bind(this));
        pomelo.on('onEnd',onEnd_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var playerPositionServer=data["winner"];
            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==playerPositionServer){
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error outside.........................pomelo.on('onEnd')");
                return;
            }
            //关闭换牌按钮
            this.exchangeCardMenuItem.setEnabled(false);
            //如果属于开启换牌状态，则取消换牌状态
            if(this.exchangeCardListener!=null){
                cc.eventManager.removeListener(this.exchangeCardListener);
                this.exchangeCardListener=null;
                this.cardSprite1=null;
                this.cardSprite2=null;
                this.cardSprite3=null;
                this.cardBindSprite1.removeFromParent();
                this.cardBindSprite2.removeFromParent();
                this.cardBindSprite3.removeFromParent();
                this.cardBindSprite1=null;
                this.cardBindSprite1=null;
                this.cardBindSprite1=null;
            }

            //如果房间属于比牌状态，需要等到比牌动作完成才执行获取金币动作
            if(this.comparableState==true){
                var compareTime=4.8-this.progressBoardBiPaiTime.getPercentage()/100*4.8;
                var waitGetBetTime=new cc.DelayTime(compareTime);
                var callbackActionWinnerGetBet=
                    cc.callFunc(this.actionWinnerGetBet,this,
                        this.players[playerIndexOf].spritePhotoMobile.getPosition());
                this.runAction(cc.sequence(waitGetBetTime,callbackActionWinnerGetBet));
                console.log("compareTime:"+compareTime);
                console.log("room is comparing...........................................");
            }
            else{
                this.actionWinnerGetBet(null,this.players[playerIndexOf].spritePhotoMobile.getPosition());
            }
            //
            this.myselfCardsReach=false;


        }.bind(this));
        pomelo.on('onFapai',onFapai_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var instruction_faPai=data["msg"];
            var rotationPlayerPositionServer=data["location"];
            if(instruction_faPai=="fapaile!"){
                /*更新房间状态和玩家信息*/
                /*更新房间信息*/
                //将数组player_noPower中的数据移动到player中
                console.log("this.players.length:"+this.players.length);
                console.log("this.players_noPower.length:"+this.players_noPower.length);
                for(var i=0;i<this.players_noPower.length;i++){
                    this.players.push(this.players_noPower[i]);
                }
                this.players_noPower.splice(0);
                this.players_noPower=new Array();
                console.log("this.players.length:"+this.players.length);
                console.log("this.players_noPower.length:"+this.players_noPower.length);
                //更新房间状态
                this.roomState=1;
                this.dealCardState=true;
                this.bet=this.betArray[0];
                this.sumBet=0;
                this.countFlowing=0;
                this.allInState=false;
                //开始轮换的位置
                this.currentGetPowerPlayerPosition=rotationPlayerPositionServer;
                //初始化跟到底开关
                this.genDaoDiMenuItem.setSelectedIndex(0);
                this.follow_always=false;

                //重置换牌次数
                this.exchangeNumber=0;


                //更新筹码精灵数组betPhotoArray
                for(var i=0;i<this.betPhotoArray.length;i++){
                    this.betPhotoArray[i].removeFromParent();
                }
                this.betPhotoArray.length=0;

                /*更新玩家信息*/
                for(var i=0;i<this.players.length;i++){
                    //清除玩家手中上一局的牌，
                    if(this.players[i].myCards!=null){
                        this.players[i].myCards[0].removeFromParent();
                        this.players[i].myCards[1].removeFromParent();
                        this.players[i].myCards[2].removeFromParent();
                        this.players[i].myCards.length=0;
                        this.players[i].myCards=null;
                    }
                    //清除玩家状态提示
                    if(this.players[i].spriteState!=null){
                        this.players[i].spriteState.removeFromParent();
                        this.players[i].spriteState=null;
                    }
                }
                /*初始化玩家手中的牌（背面），权限isPower,开牌checkCard弃牌abandon,失败提示精灵loserSprite*/
                for(var i=0;i<this.players.length;i++){
                    this.players[i].initPlayerCards();
                    this.players[i].isPower=1;
                    this.players[i].checkCard=false;
                    this.players[i].abandon=false;
                    this.players[i].loserSprite.runAction(cc.sequence(cc.hide()));
                }

                //清除上一局参与人员及其牌数组involvementPlayer_Cards
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    this.involvementPlayer_Cards[i].removeFromParent(true);
                }
                this.involvementPlayer_Cards.splice(0);
                this.involvementPlayer_Cards=new Array();
                //将本局参与人员及其牌存放到involvementPlayer_Cards数组中
                for(var i=0;i<this.players.length;i++){
                        var player_Card=new Player_cards(this.players[i].id,this.players[i].playerPosition,this.players[i].positionServer);
                        this.addChild(player_Card);
                        player_Card.myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
                        player_Card.myCards[1].spriteBack.runAction(cc.sequence(cc.hide()));
                        player_Card.myCards[2].spriteBack.runAction(cc.sequence(cc.hide()));
                        this.involvementPlayer_Cards.push(player_Card);
                }
                //将数组involvementPlayer_Cards中的牌背面spriteBack确定位置
                this.initInvolvementPlayer_Cards_SetPosition();

                //判断玩家自己的牌是否已经到达
                if(this.myselfCardsReach==true){
                    var size=cc.director.getWinSize();
                    var myself=false;
                    if(myself==false){
                        for(var i=0;i<this.players.length;i++){
                            if(this.players[i].id==uid){
                                this.players[i].myCards[0].initCardSprite(parseInt(this.myselfCards[0][0]),parseInt(this.myselfCards[0][1]));
                                this.players[i].myCards[1].initCardSprite(parseInt(this.myselfCards[1][0]),parseInt(this.myselfCards[1][1]));
                                this.players[i].myCards[2].initCardSprite(parseInt(this.myselfCards[2][0]),parseInt(this.myselfCards[2][1]));
                                this.players[i].myCards[0].sprite.setPosition(
                                    this.players[i].spritePhotoMobile.getPositionX()-
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(0),
                                    this.players[i].spritePhotoMobile.getPositionY()+
                                    this.players[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                //this.addChild(this.players[i].myCards[0].sprite,1);
                                this.players[i].myCards[1].sprite.setPosition(
                                    this.players[i].spritePhotoMobile.getPositionX()-
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(1),
                                    this.players[i].spritePhotoMobile.getPositionY()+
                                    this.players[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                //this.addChild(this.players[i].myCards[1].sprite,1);
                                this.players[i].myCards[2].sprite.setPosition(
                                    this.players[i].spritePhotoMobile.getPositionX()-
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(2),
                                    this.players[i].spritePhotoMobile.getPositionY()+
                                    this.players[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                //this.addChild(this.players[i].myCards[2].sprite,1);
                                myself=true;
                                break;
                            }
                        }
                    }
                    if(myself==false){
                        for(var i=0;i<this.players_noPower.length;i++){
                            if(this.players_noPower[i].id==uid){
                                this.players_noPower[i].myCards[0].initCardSprite(parseInt(this.myselfCards[0][0]),parseInt(this.myselfCards[0][1]));
                                this.players_noPower[i].myCards[1].initCardSprite(parseInt(this.myselfCards[1][0]),parseInt(this.myselfCards[1][1]));
                                this.players_noPower[i].myCards[2].initCardSprite(parseInt(this.myselfCards[2][0]),parseInt(this.myselfCards[2][1]));
                                this.players_noPower[i].myCards[0].sprite.setPosition(
                                    this.players_noPower[i].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(0),
                                    this.players_noPower[i].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.players_noPower[i].myCards[1].sprite.setPosition(
                                    this.players_noPower[i].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(1),
                                    this.players_noPower[i].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.players_noPower[i].myCards[2].sprite.setPosition(
                                    this.players_noPower[i].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(2),
                                    this.players_noPower[i].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                myself=true;
                                break;
                            }
                        }
                    }
                    this.myselfCardsReach=false;
                }

                //pomelo.request(game_route,{
                //    process:"getRoomInfo"
                //},function(data1){
                //    console.log(JSON.stringify(data1));
                //    console.log("begin.......out:::"+this.bet);
                //}.bind(this));

                //玩家下底注动作
                for(var i=0;i<this.players.length;i++){
                    this.sumBet=this.sumBet+this.bet;
                    this.actionBottomBet(this.players[i].spritePhotoMobile.getPosition());
                }
                //给玩家发牌动作，由于服务器还没有给开始发牌位置信息，目前默认为从客户端位置最小的开始发牌
                var size=cc.director.getWinSize();
                var acMoveDown=cc.moveTo(0.5,cc.p(size.width/2,size.height));
                var callFuncActionDealCard=cc.callFunc(this.actionDealCards,this);
                g_dealCardBack.runAction(cc.sequence(new cc.EaseOut(acMoveDown,20),callFuncActionDealCard));

            }
        }.bind(this));
        pomelo.on('onShoupai',onShoupai_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            //初始化myselfCards数组
            this.myselfCards.splice(0);
            this.myselfCards=new Array();

            var cardType=data["paixing"];
            this.myselfCards=new Array();
            var suit1=cardType["s1"];
            var rank1=cardType["p1"];
            var card1=new Array();
            card1.push(suit1);
            card1.push(rank1);
            this.myselfCards.push(card1);
            var suit2=cardType["s2"];
            var rank2=cardType["p2"];
            var card2=new Array();
            card2.push(suit2);
            card2.push(rank2);
            this.myselfCards.push(card2);
            var suit3=cardType["s3"];
            var rank3=cardType["p3"];
            var card3=new Array();
            card3.push(suit3);
            card3.push(rank3);
            this.myselfCards.push(card3);


            //初始化玩家自己的正面牌并放好位置
            var size=cc.director.getWinSize();
            var myself=false;
            if(myself==false){
                for(var i=0;i<this.players.length;i++){
                    if(this.players[i].id==uid){
                        this.players[i].myCards[0].initCardSprite(parseInt(suit1),parseInt(rank1));
                        this.players[i].myCards[1].initCardSprite(parseInt(suit2),parseInt(rank2));
                        this.players[i].myCards[2].initCardSprite(parseInt(suit3),parseInt(rank3));
                        this.players[i].myCards[0].sprite.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(0),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        //this.addChild(this.players[i].myCards[0].sprite,1);
                        this.players[i].myCards[1].sprite.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(1),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        //this.addChild(this.players[i].myCards[1].sprite,1);
                        this.players[i].myCards[2].sprite.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(2),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        //this.addChild(this.players[i].myCards[2].sprite,1);
                        myself=true;
                        break;
                    }
                }
            }
            if(myself==false){
                for(var i=0;i<this.players_noPower.length;i++){
                    if(this.players_noPower[i].id==uid){
                        this.players_noPower[i].myCards[0].initCardSprite(parseInt(suit1),parseInt(rank1));
                        this.players_noPower[i].myCards[1].initCardSprite(parseInt(suit2),parseInt(rank2));
                        this.players_noPower[i].myCards[2].initCardSprite(parseInt(suit3),parseInt(rank3));
                        this.players_noPower[i].myCards[0].sprite.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(0),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players_noPower[i].myCards[1].sprite.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(1),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players_noPower[i].myCards[2].sprite.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(2),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        myself=true;
                        break;
                    }
                }
            }
            this.myselfCardsReach=true;

        }.bind(this));
        pomelo.on('onChangePlayer',onChangePlayer_function=function(data){
            console.log(JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var rotationPlayerPositionServer=data["location"];
            //暂停当前玩家定时器,并初始化玩家按钮定时器
            var myself=false;
            if(myself==false&&this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
                for(var i=0;i<this.players.length;i++){
                    if(this.players[i].positionServer==this.currentGetPowerPlayerPosition){
                        if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
                            if(this.currentGetPowerPlayerPosition==this.playerPositionServer){
                                this.biPaiMenuItem.setEnabled(false);
                                this.jiaZhuMenuItem.setEnabled(false);
                                this.quanXiaMenuItem.setEnabled(false);
                                this.genZhuMenuItem.setEnabled(false);
                            }
                            this.players[i].counterTimer.stopCounterTimer();
                            myself=true;
                            break;
                        }
                    }
                }
            }
            if(myself==false&&this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
                for(var i=0;i<this.players_noPower.length;i++){
                    if(this.players_noPower[i].positionServer==this.currentGetPowerPlayerPosition){
                        if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
                            if(this.currentGetPowerPlayerPosition==this.playerPositionServer){
                                this.biPaiMenuItem.setEnabled(false);
                                this.jiaZhuMenuItem.setEnabled(false);
                                this.quanXiaMenuItem.setEnabled(false);
                                this.genZhuMenuItem.setEnabled(false);
                            }
                            this.players_noPower[i].counterTimer.stopCounterTimer();
                            myself=true;
                            break;
                        }
                    }
                }
            }
            if(myself==false){
                console.log("No found last one position of counterTimer ");
            }
            //开启轮换到的玩家
            if(this.players.length>=2) {
                this.currentGetPowerPlayerPosition = rotationPlayerPositionServer;
                var rotationPlayerIndexOf = -1;
                for (var i = 0; i < this.players.length; i++) {
                    if (this.players[i].positionServer == rotationPlayerPositionServer) {
                        if (rotationPlayerPositionServer == this.playerPositionServer) {
                            if(this.allInState==false){
                                this.biPaiMenuItem.setEnabled(true);
                                this.jiaZhuMenuItem.setEnabled(true);
                                this.quanXiaMenuItem.setEnabled(true);
                                this.genZhuMenuItem.setEnabled(true);
                            }
                            else{
                                this.quanXiaMenuItem.setEnabled(true);
                            }

                        }
                        rotationPlayerIndexOf = i;
                        break;
                    }
                }
                if (rotationPlayerIndexOf == -1) {
                    console.log("error outside........................................pomelo.on('onChangePlayer')");
                    return;
                }
                this.players[rotationPlayerIndexOf].counterTimer.startCounterTimer();
                //如果跟到底开启了，发送跟注请求
                if( this.allInState==false&&
                    this.follow_always==true&&
                    this.roomState==1&&
                    rotationPlayerPositionServer==this.playerPositionServer){
                    pomelo.request(game_route,{
                        process:"follow",
                        location:myselfPlayerPositionServer
                    },function(data){
                        console.log(data.msg);

                    });
                }
            }

        }.bind(this));
        pomelo.on('onEndPai',onEndPai_function=function(data){
            console.log("onEndPai:"+JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            //获胜者的牌型
            var winnerCardType=data["winner_pai"];
            //位置1的牌型
            var cardString1=data["location1"];
            if(cardString1!=null&&cardString1!="null"&&this.playerPositionServer!=1){
                console.log("location1。。。");
                cardString1=JSON.parse(cardString1);
                var suit1=cardString1["s1"];
                var rank1=cardString1["p1"];
                var suit2=cardString1["s2"];
                var rank2=cardString1["p2"];
                var suit3=cardString1["s3"];
                var rank3=cardString1["p3"];
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    if(this.involvementPlayer_Cards[i].positionServer==1){
                        this.involvementPlayer_Cards[i].myCards[0].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit1),parseInt(rank1));
                        this.involvementPlayer_Cards[i].myCards[1].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit2),parseInt(rank2));
                        this.involvementPlayer_Cards[i].myCards[2].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit3),parseInt(rank3));
                        this.involvementPlayer_Cards[i].setCardSpriteAddChildOrder();
                        break;
                    }
                }
            }
            //位置2的牌型
            var cardString2=data["location2"];
            if(cardString2!=null&&cardString2!="null"&&this.playerPositionServer!=2){
                console.log("location2。。。");
                cardString2=JSON.parse(cardString2);
                var suit1=cardString2["s1"];
                var rank1=cardString2["p1"];
                var suit2=cardString2["s2"];
                var rank2=cardString2["p2"];
                var suit3=cardString2["s3"];
                var rank3=cardString2["p3"];
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    if(this.involvementPlayer_Cards[i].positionServer==2){
                        this.involvementPlayer_Cards[i].myCards[0].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit1),parseInt(rank1));
                        this.involvementPlayer_Cards[i].myCards[1].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit2),parseInt(rank2));
                        this.involvementPlayer_Cards[i].myCards[2].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit3),parseInt(rank3));
                        this.involvementPlayer_Cards[i].setCardSpriteAddChildOrder();
                        break;
                    }
                }
            }
            //位置3的牌型
            var cardString3=data["location3"];
            if(cardString3!=null&&cardString3!="null"&&this.playerPositionServer!=3){
                console.log("location3。。。");
                cardString3=JSON.parse(cardString3);
                var suit1=cardString3["s1"];
                var rank1=cardString3["p1"];
                var suit2=cardString3["s2"];
                var rank2=cardString3["p2"];
                var suit3=cardString3["s3"];
                var rank3=cardString3["p3"];
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    if(this.involvementPlayer_Cards[i].positionServer==3){
                        this.involvementPlayer_Cards[i].myCards[0].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit1),parseInt(rank1));
                        this.involvementPlayer_Cards[i].myCards[1].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit2),parseInt(rank2));
                        this.involvementPlayer_Cards[i].myCards[2].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit3),parseInt(rank3));
                        this.involvementPlayer_Cards[i].setCardSpriteAddChildOrder();
                        break;
                    }
                }
            }
            //位置4的牌型
            var cardString4=data["location4"];
            if(cardString4!=null&&cardString4!="null"&&this.playerPositionServer!=4){
                console.log("location4。。。");
                cardString4=JSON.parse(cardString4);
                var suit1=cardString4["s1"];
                var rank1=cardString4["p1"];
                var suit2=cardString4["s2"];
                var rank2=cardString4["p2"];
                var suit3=cardString4["s3"];
                var rank3=cardString4["p3"];
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    if(this.involvementPlayer_Cards[i].positionServer==4){
                        this.involvementPlayer_Cards[i].myCards[0].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit1),parseInt(rank1));
                        this.involvementPlayer_Cards[i].myCards[1].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit2),parseInt(rank2));
                        this.involvementPlayer_Cards[i].myCards[2].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit3),parseInt(rank3));
                        this.involvementPlayer_Cards[i].setCardSpriteAddChildOrder();
                        break;
                    }
                }
            }
            //位置5的牌型
            var cardString5=data["location5"];
            if(cardString5!=null&&cardString5!="null"&&this.playerPositionServer!=5){
                console.log("location5。。。");
                cardString5=JSON.parse(cardString5);
                var suit1=cardString5["s1"];
                var rank1=cardString5["p1"];
                var suit2=cardString5["s2"];
                var rank2=cardString5["p2"];
                var suit3=cardString5["s3"];
                var rank3=cardString5["p3"];
                for(var i=0;i<this.involvementPlayer_Cards.length;i++){
                    if(this.involvementPlayer_Cards[i].positionServer==5){
                        this.involvementPlayer_Cards[i].myCards[0].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit1),parseInt(rank1));
                        this.involvementPlayer_Cards[i].myCards[1].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit2),parseInt(rank2));
                        this.involvementPlayer_Cards[i].myCards[2].setCardSpritePosition(this.involvementPlayer_Cards[i].playerPosition,parseInt(suit3),parseInt(rank3));
                        this.involvementPlayer_Cards[i].setCardSpriteAddChildOrder();
                        break;
                    }
                }
            }

            /*打开所有牌的*/
            //如果房间属于比牌状态，需要等到比牌动作完成才执行打开所有牌的动作
            if(this.comparableState==true){
                var compareTime=1.5+4.8-this.progressBoardBiPaiTime.getPercentage()/100*4.8;
                var waitGetBetTime=new cc.DelayTime(compareTime);
                var callbackOpenAllCard=cc.callFunc(this.openAllCard,this,winnerCardType);
                this.runAction(cc.sequence(waitGetBetTime,callbackOpenAllCard));
                console.log("compareTime:"+compareTime);
                console.log("room is comparing...........................................");
            }
            else{
                this.openAllCard(null,winnerCardType);
            }
        }.bind(this));
        pomelo.on('onInit',onInit_function=function(data){
            //console.log("onInit-------------------------------"+data);
            console.log(JSON.stringify(data));

        }.bind(this));
        pomelo.on('onChatInGame',onChatInGame_function=function(data){
            console.log("onChatInGame"+JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var chatType=data["chatType"];
            var position1=data["position1"];
            var position2=data["position2"];
            var chatContent=data["chatContent"];
            console.log("chatType:"+chatType);
            switch (chatType){
                case           "Face":
                    console.log("Enter Face!");
                    this.sendAFace(position1,chatContent);
                    break;
                case  "StaticTacking":
                    console.log("Enter StaticTacking!");
                    this.sendAStaticTack(position1,chatContent);
                    break;
                case "DynamicTacking":
                    console.log("Enter DynamicTacking!");
                    this.sendDynamicTack(position1,chatContent);
                    break;
                case    "Interaction":
                    console.log("Enter Interaction!");
                    this.sendInteractionFace(position1,position2,chatContent);
                    break;
                default              :
                    console.log("No chat");
                    break;
            }
        }.bind(this));
        pomelo.on('onActBroadcast',onActBroadcast_function=function(data){
            console.log("onActBroadcast:"+data);
            this.radioMessageScroll(data,cc.color(220,20,60));

        }.bind(this));
        pomelo.on('onUserBroadcast',onUserBroadcast_function=function(data){
            console.log("onUserBroadcast:"+JSON.stringify(data));
            if(data instanceof Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            var string=data["content"];
            this.radioMessageScroll(string,cc.color(220,20,60));

        }.bind(this));

    },
    initPlayers:function(){
        var size=cc.director.getWinSize();

        //寻找玩家自己，确定自己的服务器位置和客户端位置
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].id==uid){
                this.playerPositionServer=this.players[i].positionServer;
                myselfPlayerPositionServer=this.playerPositionServer;
                this.players[i].playerPosition=this.playerPositionClient;
            }
        }
        for(var i=0;i<this.players_noPower.length;i++){
            if(this.players_noPower[i].id==uid){
                this.playerPositionServer=this.players_noPower[i].positionServer;
                myselfPlayerPositionServer=this.playerPositionServer;
                this.players_noPower[i].playerPosition=this.playerPositionClient;
            }
        }
        //根据玩家自己的位置确定其他玩家的客户端位置
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].id!=uid){
                if(this.players[i].positionServer>this.playerPositionServer){
                    this.players[i].playerPosition=this.playerPositionClient+
                        (this.players[i].positionServer-this.playerPositionServer);
                }
                else{
                    this.players[i].playerPosition=this.playerPositionClient+
                        (5-this.playerPositionServer)+this.players[i].positionServer;
                }
                console.log("playerPosition:"+this.players[i].playerPosition);
            }
        }
        for(var i=0;i<this.players_noPower.length;i++){
            if(this.players_noPower[i].id!=uid){
                if(this.players_noPower[i].positionServer>this.playerPositionServer){
                    this.players_noPower[i].playerPosition=this.playerPositionClient+
                        (this.players_noPower[i].positionServer-this.playerPositionServer);
                }
                else{
                    this.players_noPower[i].playerPosition=this.playerPositionClient+
                        (5-this.playerPositionServer)+this.players_noPower[i].positionServer;
                }
                console.log("playerPosition--:"+this.players_noPower[i].playerPosition);
            }
        }
        //根据客户端位置信息确定显示所有玩家的位置
        for(var i=0;i<this.players.length;i++){
            switch (this.players[i].playerPosition){
                case 1:
                    this.players[i].spritePhotoMobile.setPosition(
                        size.width/2,
                        this.players[i].spritePhotoMobile.getContentSize().height/2+80);
                    break;
                case 2:
                    this.players[i].spritePhotoMobile.setPosition(
                        size.width-this.players[i].spritePhotoMobile.getContentSize().width/2-5,
                        this.players[i].spritePhotoMobile.getContentSize().height/2+100);
                    break;
                case 3:
                    this.players[i].spritePhotoMobile.setPosition(
                        size.width-this.players[i].spritePhotoMobile.getContentSize().width/2-5,
                        size.height-this.players[i].spritePhotoMobile.getContentSize().height/2-100);
                    break;
                case 4:
                    this.players[i].spritePhotoMobile.setPosition(
                        this.players[i].spritePhotoMobile.getContentSize().width/2+5,
                        size.height-this.players[i].spritePhotoMobile.getContentSize().height/2-100);
                    break;
                case 5:
                    this.players[i].spritePhotoMobile.setPosition(
                        this.players[i].spritePhotoMobile.getContentSize().width/2+5,
                        this.players[i].spritePhotoMobile.getContentSize().height/2+100);
                    break;
                default :break;
            }
        }
        for(var i=0;i<this.players_noPower.length;i++){
            switch (this.players_noPower[i].playerPosition){
                case 1:
                    this.players_noPower[i].spritePhotoMobile.setPosition(
                        size.width/2,
                        this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+80);
                    break;
                case 2:
                    this.players_noPower[i].spritePhotoMobile.setPosition(
                        size.width-this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-5,
                        this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+100);
                    break;
                case 3:
                    this.players_noPower[i].spritePhotoMobile.setPosition(
                        size.width-this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-5,
                        size.height-this.players_noPower[i].spritePhotoMobile.getContentSize().height/2-100);
                    break;
                case 4:
                    this.players_noPower[i].spritePhotoMobile.setPosition(
                        this.players_noPower[i].spritePhotoMobile.getContentSize().width/2+5,
                        size.height-this.players_noPower[i].spritePhotoMobile.getContentSize().height/2-100);
                    break;
                case 5:
                    this.players_noPower[i].spritePhotoMobile.setPosition(
                        this.players_noPower[i].spritePhotoMobile.getContentSize().width/2+5,
                        this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+100);
                    break;
                default :break;
            }
        }
        //var playerDataString=cc.sys.localStorage.getItem(g_key);
        //var playerDataObject=JSON.parse(playerDataString);
        //var playerData=playerDataObject['users'];
        //var playerArray=new Array();
        //for(var i=0;i<playerData.length;i++){
        //    var player=playerData[i];
        //    console.log("player:"+player);
        //    playerArray.push(player);
        //}
        //cc.sys.localStorage.removeItem(g_key);
        //console.log("playerArray.length:"+playerArray.length);
    },
    //玩家进入房间时，初始化参与本牌局的玩家手中牌的位置
    initIsGamePlayerCardsPositionAndOtherMessage:function(){
        var size=cc.director.getWinSize();
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].isPower==1){
                switch (this.players[i].playerPosition){
                    case 1:
                        this.players[i].myCards[0].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(0),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players[i].myCards[1].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(1),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players[i].myCards[2].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(2),
                            this.players[i].spritePhotoMobile.getPositionY()+
                            this.players[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        break;
                    case 2:
                        this.players[i].myCards[0].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(0)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[1].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(1)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[2].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(2)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 3:
                        this.players[i].myCards[0].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(0)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[1].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(1)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[2].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()-
                            this.players[i].spritePhotoMobile.getContentSize().width-10-(2)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 4:
                        this.players[i].myCards[0].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(0)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[1].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(1)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[2].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(2)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 5:
                        this.players[i].myCards[0].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(0)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[1].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(1)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        this.players[i].myCards[2].spriteBack.setPosition(
                            this.players[i].spritePhotoMobile.getPositionX()+
                            this.players[i].spritePhotoMobile.getContentSize().width+10+(2)*30,
                            this.players[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    default :
                        break;
                }
                var playerCard=new Player_cards(this.players[i].id,this.players[i].playerPosition,this.players[i].positionServer);
                this.addChild(playerCard,1);
                playerCard.myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
                playerCard.myCards[1].spriteBack.runAction(cc.sequence(cc.hide()));
                playerCard.myCards[2].spriteBack.runAction(cc.sequence(cc.hide()));
                this.involvementPlayer_Cards.push(playerCard);
                //this.players[i].myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
            }
        }
        for(var i=0;i<this.players_noPower.length;i++){
            if(this.players_noPower[i].isPower==1){
                switch (this.players_noPower[i].playerPosition){
                    case 1:
                        this.players_noPower[i].myCards[0].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(0),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players_noPower[i].myCards[1].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(1),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        this.players_noPower[i].myCards[2].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players_noPower[i].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(2),
                            this.players_noPower[i].spritePhotoMobile.getPositionY()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10
                        );
                        break;
                    case 2:
                        this.players_noPower[i].myCards[0].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(0)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[1].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(1)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[2].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(2)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 3:
                        this.players_noPower[i].myCards[0].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(0)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[1].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(1)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[2].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()-
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width-10-(2)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 4:
                        this.players_noPower[i].myCards[0].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(0)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[1].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(1)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[2].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(2)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    case 5:
                        this.players_noPower[i].myCards[0].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(0)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[1].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(1)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        this.players_noPower[i].myCards[2].spriteBack.setPosition(
                            this.players_noPower[i].spritePhotoMobile.getPositionX()+
                            this.players_noPower[i].spritePhotoMobile.getContentSize().width+10+(2)*30,
                            this.players_noPower[i].spritePhotoMobile.getPositionY()
                        );
                        break;
                    default :
                        break;
                }
                var playerCard=new Player_cards(this.players_noPower[i].id,this.players_noPower[i].playerPosition,this.players_noPower[i].positionServer);
                this.addChild(playerCard,1);
                playerCard.myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
                playerCard.myCards[1].spriteBack.runAction(cc.sequence(cc.hide()));
                playerCard.myCards[2].spriteBack.runAction(cc.sequence(cc.hide()));
                this.involvementPlayer_Cards.push(playerCard);
                //this.players_noPower[i].myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
            }
        }
        //this.involvementPlayer[0].myCards[0].spriteBack.setPosition(size.width/2,size.height/2);
    },
    //保存各个玩家手中的牌，用于在牌局结束时翻开玩家手中的牌
    initInvolvementPlayer_Cards_SetPosition:function(){
        for(var i=0;i<this.involvementPlayer_Cards.length;i++){
            var myself=false;
            if(myself==false){
                for(var j=0;j<this.players.length;j++){
                    if(this.players[j].playerPosition==
                        this.involvementPlayer_Cards[i].playerPosition){
                        switch (this.involvementPlayer_Cards[i].playerPosition){
                            case 1:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(0),
                                    this.players[j].spritePhotoMobile.getPositionY()+
                                    this.players[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(1),
                                    this.players[j].spritePhotoMobile.getPositionY()+
                                    this.players[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(2),
                                    this.players[j].spritePhotoMobile.getPositionY()+
                                    this.players[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                break;
                            case 2:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(0)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(1)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(2)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 3:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(0)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(1)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()-
                                    this.players[j].spritePhotoMobile.getContentSize().width-10-(2)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 4:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(0)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(1)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(2)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 5:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(0)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(1)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players[j].spritePhotoMobile.getPositionX()+
                                    this.players[j].spritePhotoMobile.getContentSize().width+10+(2)*30,
                                    this.players[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            default :
                                break;
                        }
                        myself=true;
                        break;
                    }
                }
            }
            if(myself==false){
                for(var j=0;j<this.players_noPower.length;j++){
                    if(this.players_noPower[j].playerPosition==
                        this.involvementPlayer_Cards[i].playerPosition){
                        switch (this.involvementPlayer_Cards[i].playerPosition){
                            case 1:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(0),
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(1),
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)+
                                    (this.players_noPower[j].spritePhotoMobile.getContentSize().width/2-
                                    g_dealCardBack.getContentSize().width/2)*(2),
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().height/2+
                                    g_dealCardBack.getContentSize().height/2+10
                                );
                                break;
                            case 2:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(0)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(1)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(2)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 3:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(0)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(1)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()-
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width-10-(2)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 4:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(0)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(1)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(2)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            case 5:
                                this.involvementPlayer_Cards[i].myCards[0].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(0)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[1].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(1)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                this.involvementPlayer_Cards[i].myCards[2].spriteBack.setPosition(
                                    this.players_noPower[j].spritePhotoMobile.getPositionX()+
                                    this.players_noPower[j].spritePhotoMobile.getContentSize().width+10+(2)*30,
                                    this.players_noPower[j].spritePhotoMobile.getPositionY()
                                );
                                break;
                            default :
                                break;
                        }
                        myself=true;
                        break;
                    }
                }
            }
        }
    },
    actionBottomBet:function(playerPosition){
        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<this.betArray.length;j++){
            if(this.bet==this.betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
        if(countNumber==-1){
            console.log("error........outside actionBottomBet:function");
            return;
        }
        var counterSprite=new cc.Sprite("res/chips/chips"+countNumber+".png");
        var counterString=new cc.Sprite("res/chips/"+this.level+"String"+countNumber+".png");
        counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
            counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
        counterSprite.addChild(counterString);
        counterSprite.setPosition(playerPosition);
        this.addChild(counterSprite,10);
        this.betPhotoArray.push(counterSprite);
        var x=size.width/3+size.width/3*Math.random();
        var y=size.height/2+(size.height/2-50)*Math.random();
        var moveBet=cc.moveTo(0.3,cc.p(x,y));
        counterSprite.runAction(moveBet);
    },
    actionDealCards:function(){
        var size=cc.director.getWinSize();
        var isFind=false;
        var playerArrayPosition=-1;
        if(this.startDealCardPosition1==this.startDealCardPosition){this.count++}
        if(this.count>3){
            this.count=0;
            this.startDealCardPosition1=this.startDealCardPosition;
            this.dealCardState=false;
            var acMoveUp=cc.moveBy(0.5,cc.p(0,g_dealCardBack.getContentSize().height/2));
            var acMoveUp1=new cc.EaseIn(acMoveUp,10);
            var acInitMenuItemCallback=cc.callFunc(this.initMenuItemVisibleCallbackAfterDealCard,this);
            g_dealCardBack.runAction(cc.sequence(acMoveUp1, acInitMenuItemCallback));
            //开启第一个轮换位置
            this.startFirstRotationPosition();
            return;
        }
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].playerPosition==this.startDealCardPosition1){
                playerArrayPosition=i;
                isFind=true;
                break;
            }
        }
        if(isFind==true){
            this.startDealCardPosition1++;
            this.startDealCardPosition1=this.startDealCardPosition1%5;
            if(this.startDealCardPosition1==0){
                this.startDealCardPosition1=5;
            }
           if(playerArrayPosition==-1){
               console.log("outside error.......................actionDealCards:function()");
               return;
           }
            switch (this.players[playerArrayPosition].playerPosition){
                case 1:
                    //console.log("RR0");
                    var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
                    var acToCardPlayer=cc.moveTo(0.1,
                        cc.p(this.players[playerArrayPosition].spritePhotoMobile.getPositionX()-
                            (this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)+
                            (this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width/2-
                            g_dealCardBack.getContentSize().width/2)*(this.count-1),
                            this.players[playerArrayPosition].spritePhotoMobile.getPositionY()+
                            this.players[playerArrayPosition].spritePhotoMobile.getContentSize().height/2+
                            g_dealCardBack.getContentSize().height/2+10));
                    var callFunc=cc.callFunc(this.actionDealCards,this);
                    this.players[i].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
                    break;
                case 2:
                    //console.log("RR1");
                    var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
                    var acToCardPlayer=cc.moveTo(0.1,
                        cc.p(this.players[playerArrayPosition].spritePhotoMobile.getPositionX()-
                            this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width-10-(this.count-1)*30,
                            this.players[playerArrayPosition].spritePhotoMobile.getPositionY()));
                    var callFunc=cc.callFunc(this.actionDealCards,this);
                    this.players[playerArrayPosition].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
                    break;
                case 3:
                    //console.log("RR2");
                    var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
                    var acToCardPlayer=cc.moveTo(0.1,
                        cc.p(this.players[playerArrayPosition].spritePhotoMobile.getPositionX()-
                            this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width-10-(this.count-1)*30,
                            this.players[playerArrayPosition].spritePhotoMobile.getPositionY()));
                    var callFunc=cc.callFunc(this.actionDealCards,this);
                    this.players[playerArrayPosition].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
                    break;
                case 4:
                    //console.log("RR3");
                    var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
                    var acToCardPlayer=cc.moveTo(0.1,
                        cc.p(this.players[playerArrayPosition].spritePhotoMobile.getPositionX()+
                            this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width+10+(this.count-1)*30,
                            this.players[playerArrayPosition].spritePhotoMobile.getPositionY()));
                    var callFunc=cc.callFunc(this.actionDealCards,this);
                    this.players[playerArrayPosition].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
                    break;
                case 5:
                    //console.log("RR4");
                    var acMoveDown1=cc.moveTo(0.1,cc.p(size.width/2,size.height));
                    var acToCardPlayer=cc.moveTo(0.1,
                        cc.p(this.players[playerArrayPosition].spritePhotoMobile.getPositionX()+
                            this.players[playerArrayPosition].spritePhotoMobile.getContentSize().width+10+(this.count-1)*30,
                            this.players[playerArrayPosition].spritePhotoMobile.getPositionY()));
                    var callFunc=cc.callFunc(this.actionDealCards,this);
                    this.players[playerArrayPosition].myCards[this.count-1].spriteBack.runAction(cc.sequence(acMoveDown1,acToCardPlayer,callFunc));
                    break;
                default :break;
            }
        }
        else{
            this.startDealCardPosition1++;
            this.startDealCardPosition1=this.startDealCardPosition1%5;
            if(this.startDealCardPosition1==0){
                this.startDealCardPosition1=5;
            }
            this.actionDealCards();
        }

    },
    initMenuItemVisibleCallbackAfterDealCard:function(){
        //this.biPaiMenuItem.setEnabled(false);
        this.qiPaiMenuItem.setEnabled(true);
        this.kaiPaiMenuItem.setEnabled(true);
        //this.jiaZhuMenuItem.setEnabled(false);
        //this.quanXiaMenuItem.setEnabled(false);
        //this.genZhuMenuItem.setEnabled(false);
    },
    actionFollowBet:function(playerPosition,isCheckCard){
        //var chipCount=parseInt(allChips/this.bet);
        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<this.betArray.length;j++){
            if(this.bet==this.betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
        if(countNumber==-1){
            console.log("error........outside actionFollowBet:function");
            return;
        }
        var chipNum=1;
        if(isCheckCard==true){
            chipNum=2;
        }
        while(chipNum>0){
            var counterSprite=new cc.Sprite("res/chips/chips"+countNumber+".png");
            var counterString=new cc.Sprite("res/chips/"+this.level+"String"+countNumber+".png");
            counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
                counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
            counterSprite.addChild(counterString);
            counterSprite.setPosition(playerPosition);
            this.addChild(counterSprite,10);
            this.betPhotoArray.push(counterSprite);
            var x=size.width/3+size.width/3*Math.random();
            var y=size.height/2+(size.height/2-50)*Math.random();
            var moveBet=cc.moveTo(0.3,cc.p(x,y));
            counterSprite.runAction(moveBet);

            //this.sumBet=this.sumBet+this.bet;
            chipNum--;
        }
    },
    menuCallbackJiaZhu:function(){
        g_spritePlaceJiaZhuMenuSelect=new cc.Sprite(res.JiaZhuSprite);
        //g_spritePlaceJiaZhuMenuSelect.retain();
        this.addChild(g_spritePlaceJiaZhuMenuSelect,20);
        this.layerJiaZhuSelect=new PopUpJiaZhuSelect();
        this.addChild(this.layerJiaZhuSelect,15);
        this.setJiaZhuMenuSelect();
        this.addListenerTo_g_spritePlaceJiaZhuMenuSelect();
    },
    setJiaZhuMenuSelect:function(){
        //按钮初始化
        var size=cc.director.getWinSize();
        //var countSprite=new cc.Sprite(res.Chips_png);
        //第一级别按钮初始化
        var usablePicture=new cc.Sprite(res.Chips1_png);
        var usableString=new cc.Sprite(res.ChuJiString_png1);
        usableString.setPosition(usablePicture.getPositionX()+usablePicture.getContentSize().width/2,
            usablePicture.getPositionY()+usablePicture.getContentSize().height/2);
        usablePicture.addChild(usableString);

        var usablePicture1=new cc.Sprite(res.Chips1_png);
        var usableString1=new cc.Sprite(res.ChuJiString_png1);
        usableString1.setPosition(usablePicture1.getPositionX()+usablePicture1.getContentSize().width/2,
            usablePicture1.getPositionY()+usablePicture1.getContentSize().height/2);
        usablePicture1.addChild(usableString1);

        var unusablePicture=new cc.Sprite(res.Chips1_png);
        var unusableString=new cc.Sprite(res.ChuJiString_png1);
        var unusableProhibit=new cc.Sprite(res.ChipsProhibit_png);
        unusableString.setPosition(unusablePicture.getPositionX()+unusablePicture.getContentSize().width/2,
            unusablePicture.getPositionY()+unusablePicture.getContentSize().height/2);
        unusableProhibit.setPosition(unusablePicture.getPositionX()+unusablePicture.getContentSize().width/2,
            unusablePicture.getPositionY()+unusablePicture.getContentSize().height/2);
        unusablePicture.addChild(unusableString);
        unusablePicture.addChild(unusableProhibit);

        //第二级别按钮初始化
        var usablePicture_1=new cc.Sprite(res.Chips2_png);
        var usableString_1=new cc.Sprite(res.ChuJiString_png2);
        usableString_1.setPosition(usablePicture_1.getPositionX()+usablePicture_1.getContentSize().width/2,
            usablePicture_1.getPositionY()+usablePicture_1.getContentSize().height/2);
        usablePicture_1.addChild(usableString_1);

        var usablePicture1_1=new cc.Sprite(res.Chips2_png);
        var usableString1_1=new cc.Sprite(res.ChuJiString_png2);
        usableString1_1.setPosition(usablePicture1_1.getPositionX()+usablePicture1_1.getContentSize().width/2,
            usablePicture1_1.getPositionY()+usablePicture1_1.getContentSize().height/2);
        usablePicture1_1.addChild(usableString1_1);

        var unusablePicture_1=new cc.Sprite(res.Chips2_png);
        var unusableString_1=new cc.Sprite(res.ChuJiString_png2);
        var unusableProhibit_1=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_1.setPosition(unusablePicture_1.getPositionX()+unusablePicture_1.getContentSize().width/2,
            unusablePicture_1.getPositionY()+unusablePicture_1.getContentSize().height/2);
        unusableProhibit_1.setPosition(unusablePicture_1.getPositionX()+unusablePicture_1.getContentSize().width/2,
            unusablePicture_1.getPositionY()+unusablePicture_1.getContentSize().height/2);
        unusablePicture_1.addChild(unusableString_1);
        unusablePicture_1.addChild(unusableProhibit_1);

        //第三级别按钮初始化
        var usablePicture_2=new cc.Sprite(res.Chips3_png);
        var usableString_2=new cc.Sprite(res.ChuJiString_png3);
        usableString_2.setPosition(usablePicture_2.getPositionX()+usablePicture_2.getContentSize().width/2,
            usablePicture_2.getPositionY()+usablePicture_2.getContentSize().height/2);
        usablePicture_2.addChild(usableString_2);

        var usablePicture1_2=new cc.Sprite(res.Chips3_png);
        var usableString1_2=new cc.Sprite(res.ChuJiString_png3);
        usableString1_2.setPosition(usablePicture1_2.getPositionX()+usablePicture1_2.getContentSize().width/2,
            usablePicture1_2.getPositionY()+usablePicture1_2.getContentSize().height/2);
        usablePicture1_2.addChild(usableString1_2);

        var unusablePicture_2=new cc.Sprite(res.Chips3_png);
        var unusableString_2=new cc.Sprite(res.ChuJiString_png3);
        var unusableProhibit_2=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_2.setPosition(unusablePicture_2.getPositionX()+unusablePicture_2.getContentSize().width/2,
            unusablePicture_2.getPositionY()+unusablePicture_2.getContentSize().height/2);
        unusableProhibit_2.setPosition(unusablePicture_2.getPositionX()+unusablePicture_2.getContentSize().width/2,
            unusablePicture_2.getPositionY()+unusablePicture_2.getContentSize().height/2);
        unusablePicture_2.addChild(unusableString_2);
        unusablePicture_2.addChild(unusableProhibit_2);

        //第四级别按钮初始化
        var usablePicture_3=new cc.Sprite(res.Chips4_png);
        var usableString_3=new cc.Sprite(res.ChuJiString_png4);
        usableString_3.setPosition(usablePicture_3.getPositionX()+usablePicture_3.getContentSize().width/2,
            usablePicture_3.getPositionY()+usablePicture_3.getContentSize().height/2);
        usablePicture_3.addChild(usableString_3);

        var usablePicture1_3=new cc.Sprite(res.Chips4_png);
        var usableString1_3=new cc.Sprite(res.ChuJiString_png4);
        usableString1_3.setPosition(usablePicture1_3.getPositionX()+usablePicture1_3.getContentSize().width/2,
            usablePicture1_3.getPositionY()+usablePicture1_3.getContentSize().height/2);
        usablePicture1_3.addChild(usableString1_3);

        var unusablePicture_3=new cc.Sprite(res.Chips4_png);
        var unusableString_3=new cc.Sprite(res.ChuJiString_png4);
        var unusableProhibit_3=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_3.setPosition(unusablePicture_3.getPositionX()+unusablePicture_3.getContentSize().width/2,
            unusablePicture_3.getPositionY()+unusablePicture_3.getContentSize().height/2);
        unusableProhibit_3.setPosition(unusablePicture_3.getPositionX()+unusablePicture_3.getContentSize().width/2,
            unusablePicture_3.getPositionY()+unusablePicture_3.getContentSize().height/2);
        unusablePicture_3.addChild(unusableString_3);
        unusablePicture_3.addChild(unusableProhibit_3);

        //第五级别按钮初始化
        var usablePicture_4=new cc.Sprite(res.Chips5_png);
        var usableString_4=new cc.Sprite(res.ChuJiString_png5);
        usableString_4.setPosition(usablePicture_4.getPositionX()+usablePicture_4.getContentSize().width/2,
            usablePicture_4.getPositionY()+usablePicture_4.getContentSize().height/2);
        usablePicture_4.addChild(usableString_4);

        var usablePicture1_4=new cc.Sprite(res.Chips5_png);
        var usableString1_4=new cc.Sprite(res.ChuJiString_png5);
        usableString1_4.setPosition(usablePicture1_4.getPositionX()+usablePicture1_4.getContentSize().width/2,
            usablePicture1_4.getPositionY()+usablePicture1_4.getContentSize().height/2);
        usablePicture1_4.addChild(usableString1_4);

        var unusablePicture_4=new cc.Sprite(res.Chips5_png);
        var unusableString_4=new cc.Sprite(res.ChuJiString_png5);
        var unusableProhibit_4=new cc.Sprite(res.ChipsProhibit_png);
        unusableString_4.setPosition(unusablePicture_4.getPositionX()+unusablePicture_4.getContentSize().width/2,
            unusablePicture_4.getPositionY()+unusablePicture_4.getContentSize().height/2);
        unusableProhibit_4.setPosition(unusablePicture_4.getPositionX()+unusablePicture_4.getContentSize().width/2,
            unusablePicture_4.getPositionY()+unusablePicture_4.getContentSize().height/2);
        unusablePicture_4.addChild(unusableString_4);
        unusablePicture_4.addChild(unusableProhibit_4);


        var firstJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture,usablePicture1,unusablePicture,
            this.game_add,this);
        firstJiaZhuMenuItem.setName("first");
        var secondJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_1,usablePicture1_1,unusablePicture_1,
            this.game_add,this);
        secondJiaZhuMenuItem.setName("second");
        var thirdJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_2,usablePicture1_2,unusablePicture_2,
            this.game_add,this);
        thirdJiaZhuMenuItem.setName("third");
        var fourthJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_3,usablePicture1_3,unusablePicture_3,
            this.game_add,this);
        fourthJiaZhuMenuItem.setName("fourth");
        var fifthJiaZhuMenuItem=new cc.MenuItemSprite(usablePicture_4,usablePicture1_4,unusablePicture_4,
                this.game_add,this);
        fifthJiaZhuMenuItem.setName("fifth");
        //初始化各个加注按钮的属性

        //var isCheckCard=1;
        //if(this.players[this.playerIndexOf].checkCard==true){
        //    isCheckCard=2;
        //}
        //var following=this.bet*isCheckCard;
        //if(this.betArray[0]<=this.bet||this.players[this.playerIndexOf].inMoney<following){
        //    firstJiaZhuMenuItem.setEnabled(false);
        //}
        //if(this.betArray[1]<=this.bet||this.players[this.playerIndexOf].inMoney<following){
        //    secondJiaZhuMenuItem.setEnabled(false);
        //}
        //if(this.betArray[2]<=this.bet||this.players[this.playerIndexOf].inMoney<following){
        //    thirdJiaZhuMenuItem.setEnabled(false);
        //}
        //if(this.betArray[3]<=this.bet||this.players[this.playerIndexOf].inMoney<following){
        //    fourthJiaZhuMenuItem.setEnabled(false);
        //}
        //if(this.betArray[4]<=this.bet||this.players[this.playerIndexOf].inMoney<following){
        //    fifthJiaZhuMenuItem.setEnabled(false);
        //}

        var jiaZhuMenu=new cc.Menu(firstJiaZhuMenuItem,secondJiaZhuMenuItem,thirdJiaZhuMenuItem,fourthJiaZhuMenuItem,fifthJiaZhuMenuItem);
        jiaZhuMenu.alignItemsHorizontallyWithPadding(10);
        jiaZhuMenu.x=g_spritePlaceJiaZhuMenuSelect.getContentSize().width/2;
        jiaZhuMenu.y=g_spritePlaceJiaZhuMenuSelect.getContentSize().height/2;
        //this.addChild(jiaZhuMenu,5);
        g_spritePlaceJiaZhuMenuSelect.addChild(jiaZhuMenu);
        g_spritePlaceJiaZhuMenuSelect.setPosition(size.width/2,this.genDaoDiMenuItem.getContentSize().height+
            g_spritePlaceJiaZhuMenuSelect.getContentSize().height/2);

    },
    game_add:function(sender){
        console.log("clink menuItem is: "+sender.getName());
        this.layerJiaZhuSelect.removeFromParent();
        cc.eventManager.removeListener(g_jiaZhu_touchListener);
        g_spritePlaceJiaZhuMenuSelect.removeFromParent();
        //g_spritePlaceJiaZhuMenuSelect.release();
        this.layerJiaZhuSelect=null;
        g_spritePlaceJiaZhuMenuSelect=null;
    switch (sender.getName()){
        case  "first":
            g_AddChipSize=this.betArray[0];
            console.log("g_AddChipSize:"+g_AddChipSize);
            break;
        case "second":
            g_AddChipSize=this.betArray[1];
            console.log("g_AddChipSize:"+g_AddChipSize);
            break;
        case  "third":
            g_AddChipSize=this.betArray[2];
            console.log("g_AddChipSize:"+g_AddChipSize);
            break;
        case "fourth":
            g_AddChipSize=this.betArray[3];
            console.log("g_AddChipSize:"+g_AddChipSize);
            break;
        case  "fifth":
            g_AddChipSize=this.betArray[4];
            console.log("g_AddChipSize:"+g_AddChipSize);
            break;
        default      :
            break;
    }
    pomelo.request(game_route,{
        process:"add",
        add_chip:g_AddChipSize,
        location:myselfPlayerPositionServer
    },function(data){
        console.log(data.msg);

    });
},
    addListenerTo_g_spritePlaceJiaZhuMenuSelect:function(){
        g_jiaZhu_touchListener=new cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,
            onTouchBegan: function(){
                return true;
            }.bind(this),
            onTouchEnded:function(touch,event){
                var target=event.getCurrentTarget();
                var local=target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    console.log("Select the available buttons,please.......");
                }
                else{
                    this.layerJiaZhuSelect.removeFromParent();
                    cc.eventManager.removeListener(g_jiaZhu_touchListener);
                    g_spritePlaceJiaZhuMenuSelect.removeFromParent();
                    this.layerJiaZhuSelect=null;
                    g_spritePlaceJiaZhuMenuSelect=null;
                }
            }.bind(this)
        });
        cc.eventManager.addListener(g_jiaZhu_touchListener,g_spritePlaceJiaZhuMenuSelect);
    },
    actionAddBet:function(playerPosition,isCheckCard){
        var size=cc.director.getWinSize();
        var countNumber=-1;
        for(var j=0;j<this.betArray.length;j++){
            if(this.bet==this.betArray[j]){
                j++;
                countNumber=j;
                break;
            }
        }
        if(countNumber==-1){
            console.log("error........outside actionAddBet:function");
            return;
        }
        var chipNum=1;
        if(isCheckCard==true){
            chipNum=2;
        }
        while(chipNum>0){
            var counterSprite=new cc.Sprite("res/chips/chips"+countNumber+".png");
            var counterString=new cc.Sprite("res/chips/"+this.level+"String"+countNumber+".png");
            counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
                counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
            counterSprite.addChild(counterString);
            counterSprite.setPosition(playerPosition);
            this.addChild(counterSprite,10);
            this.betPhotoArray.push(counterSprite);
            var x=size.width/3+size.width/3*Math.random();
            var y=size.height/2+(size.height/2-50)*Math.random();
            var moveBet=cc.moveTo(0.3,cc.p(x,y));
            counterSprite.runAction(moveBet);

            //this.sumBet=this.sumBet+this.bet;
            chipNum--;
        }
    },
    menuCallbackKaiPai:function(){
        var myself=false;
        if(myself==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==uid){
                    if(this.players[i].myCards[0].sprite!=null){
                        pomelo.request(game_route,{
                            process:"open",
                            location:myselfPlayerPositionServer
                        },function(data){
                            console.log(data.msg);

                        });
                    }
                    else{
                        console.log("error:front sprite of card had not been initialized,you can not open the card.....menuCallbackKaiPai:function()");
                        return;
                    }
                    myself=true;
                    break;
                }
            }
        }
        if(myself==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].id==uid){
                    if(this.players_noPower[i].myCards[0].sprite!=null){
                        pomelo.request(game_route,{
                            process:"open",
                            location:myselfPlayerPositionServer
                        },function(data){
                            console.log(data.msg);

                        });
                    }
                    else{
                        console.log("error:front sprite of card had not been initialized,you can not open the card.....menuCallbackKaiPai:function()");
                        return;
                    }
                    myself=true;
                    break;
                }
            }
        }

    },
    menuCallbackBiPai:function() {
        if (this.players.length >= 2) {
            if (this.players.length == 2) {
            this.biPaiMenuItem.setEnabled(false);
            this.jiaZhuMenuItem.setEnabled(false);
            this.quanXiaMenuItem.setEnabled(false);
            this.genZhuMenuItem.setEnabled(false);

            if (this.players[0].positionServer == this.playerPositionServer) {
                g_playerPositionServer1 = this.players[0].positionServer;
                g_playerPositionServer2 = this.players[1].positionServer;
            }
            else {
                g_playerPositionServer1 = this.players[1].positionServer;
                g_playerPositionServer2 = this.players[0].positionServer;
            }

            pomelo.request(game_route, {
                process: "bipai",
                location1: g_playerPositionServer1,
                location2: g_playerPositionServer2
            }, function (data) {
                cc.log(JSON.stringify(data));
            });
        }
            else {
                g_menuBiPaiSelect = new cc.Menu();
                g_menuBiPaiSelect.x = 0;
                g_menuBiPaiSelect.y = 0;
                g_biPaiRing = new Array();

                this.addChild(g_menuBiPaiSelect, 20);
                this.layerBiPaiSelect = new PopUpBiPaiSelect();
                this.addChild(this.layerBiPaiSelect, 15);
                this.biPaiSelectGUI();
            }
        }
    },
    biPaiSelectGUI:function(){
        var size=cc.director.getWinSize();
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].id!=uid){
                var ring=new cc.Sprite(res.Ring_png);
                var biString=new cc.Sprite(res.BiString_png);
                var biString1=new cc.Sprite(res.BiString_png);
                var biString2=new cc.Sprite(res.BiString_png);
                var biMenuItem=new cc.MenuItemSprite(biString,biString1,biString2,this.getAndSetPlayerPosition,this);
                this.addChild(ring,4);
                g_biPaiRing.push(ring);
                var ringSmallAction=cc.scaleTo(0.5,0.5,0.5);
                var ringBigAction=cc.scaleTo(0.5,2,2);
                var ringSeqAction=cc.sequence(ringSmallAction,ringBigAction);
                var ringRepeatAction=cc.repeatForever(ringSeqAction);
                ring.runAction(ringRepeatAction);
                switch (this.players[i].playerPosition){
                    case 2:
                        biMenuItem.x=size.width-100;
                        biMenuItem.y=200;
                        biMenuItem.setName(this.players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(size.width-100,200);
                        break;
                    case 3:
                        biMenuItem.x=size.width-100;
                        biMenuItem.y=size.height-200;
                        biMenuItem.setName(this.players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(size.width-100,size.height-200);
                        break;
                    case 4:
                        biMenuItem.x=100;
                        biMenuItem.y=size.height-200;
                        biMenuItem.setName(this.players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(100,size.height-200);
                        break;
                    case 5:
                        biMenuItem.x=100;
                        biMenuItem.y=200;
                        biMenuItem.setName(this.players[i].positionServer);
                        g_menuBiPaiSelect.addChild(biMenuItem);
                        ring.setPosition(100,200);
                        break;
                    default:
                        break;

                }
            }
        }
    },
    getAndSetPlayerPosition:function(sender){
        console.log("选择的比牌的玩家位置.........................."+sender.getName());
        //
        this.layerBiPaiSelect.destoty();
        g_menuBiPaiSelect.removeFromParent();
        this.layerBiPaiSelect.removeFromParent();
        for(var i=0;i<g_biPaiRing.length;i++){
            g_biPaiRing[i].removeFromParent();
        }
        g_menuBiPaiSelect=null;
        g_biPaiRing.length=0;
        this.layerBiPaiSelect=null;
        //获取比牌玩家的服务器位置
        g_playerPositionServer1=this.playerPositionServer;
        g_playerPositionServer2=parseInt(sender.getName());
        var biPaiPlayerIndexOf1=-1;
        var biPaiPlayerIndexOf2=-1;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer==g_playerPositionServer1){
                biPaiPlayerIndexOf1=i;
            }
            if(this.players[i].positionServer==g_playerPositionServer2){
                biPaiPlayerIndexOf2=i;
            }
        }
        if(biPaiPlayerIndexOf1!=-1&&biPaiPlayerIndexOf2!=-1){
            this.biPaiMenuItem.setEnabled(false);
            this.jiaZhuMenuItem.setEnabled(false);
            this.quanXiaMenuItem.setEnabled(false);
            this.genZhuMenuItem.setEnabled(false);
            pomelo.request(game_route,{
                process:"bipai",
                location1:g_playerPositionServer1,
                location2:g_playerPositionServer2
            },function(data){
                cc.log(JSON.stringify(data));
            });
        }
        else{
            console.log("No power to compare, because the opposite side or yourself have no power");
        }
    },
    actionBiPai:function(playerPositionServer1,playerPositionServer2,loserPositionServer){
        var size=cc.director.getWinSize();
        //随机确定比牌位置
        g_biPaiPlayerIndexOf1[0]=playerPositionServer1;
        g_biPaiPlayerIndexOf2[0]=playerPositionServer2;
        if(parseInt(Math.random()*10)<5){
            g_biPaiPlayerIndexOf1[1]=1;
            g_biPaiPlayerIndexOf2[1]=2;
        }
        else{
            g_biPaiPlayerIndexOf1[1]=2;
            g_biPaiPlayerIndexOf2[1]=1;
        }

        var playerIndexOf1=-1;
        var playerIndexOf2=-1;
        //和自己有关比牌动画表现
        if(this.playerPositionServer==playerPositionServer1||this.playerPositionServer==playerPositionServer2){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==playerPositionServer1){
                    if(this.players[i].positionServer==this.playerPositionServer){
                        playerIndexOf1=i;//自己的坐标
                    }
                    else{
                        playerIndexOf2=i;//别人的坐标
                    }
                }
                if(this.players[i].positionServer==playerPositionServer2){
                    if(this.players[i].positionServer==this.playerPositionServer){
                        playerIndexOf1=i;//自己的坐标
                    }
                    else{
                        playerIndexOf2=i;//别人的坐标
                    }
                }
            }

            //playerIndexOf1=this.playerIndexOf;
            //g_biPaiPlayerIndexOf1=playerIndexOf1;
            //if(this.players[this.playerIndexOf].id==playerId1){
            //    for(var i=0;i<this.players.length;i++){
            //        if(this.players[i].id==playerId2){
            //            playerIndexOf2=i;
            //            g_biPaiPlayerIndexOf2=playerIndexOf2;
            //            break;
            //        }
            //    }
            //}else{
            //    for(var i=0;i<this.players.length;i++){
            //        if(this.players[i].id==playerId1){
            //            playerIndexOf2=i;
            //            g_biPaiPlayerIndexOf2=playerIndexOf2;
            //            break;
            //        }
            //    }
            //}

            if(playerIndexOf1==-1||playerIndexOf2==-1){
                console.log("error........没有找到比牌对象");
                return;
            }

            //获取三张牌的位置，供以后用
            var cardPosition=new Array(3);
            cardPosition[0]=this.players[playerIndexOf1].myCards[0].spriteBack.getPosition();
            cardPosition[1]=this.players[playerIndexOf1].myCards[1].spriteBack.getPosition();
            cardPosition[2]=this.players[playerIndexOf1].myCards[2].spriteBack.getPosition();
            var cardPositionOther=new Array(3);
            cardPositionOther[0]=this.players[playerIndexOf2].myCards[0].spriteBack.getPosition();
            cardPositionOther[1]=this.players[playerIndexOf2].myCards[1].spriteBack.getPosition();
            cardPositionOther[2]=this.players[playerIndexOf2].myCards[2].spriteBack.getPosition();
            //如果看牌了，比牌时的动画表现
            if(this.players[playerIndexOf1].checkCard==true){
                //自己的动画表现
                for(var j=0;j<3;j++){
                    //关牌动作
                    var frontSeq=cc.sequence(cc.delayTime(0.9),cc.hide());
                    var frontCamera=cc.orbitCamera(0.9,1,0,0,-90,0,0);
                    var frontSpawn=cc.spawn(frontSeq,frontCamera);
                    var backCardSeq=cc.sequence(cc.delayTime(0.9),cc.show());
                    var backCamera=cc.orbitCamera(1.2,1,0,0,-360,0,0);
                    var backSpawn=cc.spawn(backCardSeq,backCamera);

                    //整理牌的间距动作
                    //var zhengLiJianJu=null;
                    //if(j==2){
                    //    zhengLiJianJu=cc.moveBy(1.3,cc.p(0,0));
                    //}else{
                    //    zhengLiJianJu=cc.moveBy(1.3,cc.p(g_dealCardBack.getContentSize().width/4*3*(2-j),0));
                    //}
                    //var zhengLiJianJu1=null;
                    //if(j==2){
                    //    zhengLiJianJu1=cc.moveBy(1.3,cc.p(0,0));
                    //}else{
                    //    zhengLiJianJu1=cc.moveBy(1.3,cc.p(g_dealCardBack.getContentSize().width/4*3*(2-j),0));
                    //}

                    //移动到比牌位置动作
                    var moveToBiPaiPosition=null;
                    var moveToBiPaiPosition1=null;
                    if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                        if(g_biPaiPlayerIndexOf1[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                            moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                            moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ (30*(2-j)-50),size.height/2));
                        }
                    }
                    else{
                        if(g_biPaiPlayerIndexOf2[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                            moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                            moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ (30*(2-j)-50),size.height/2));
                        }
                    }


                    //前半段整合动作
                    var frontCombinationAction_=cc.spawn(frontSpawn,moveToBiPaiPosition);
                    var backCombinationAction_=cc.spawn(backSpawn,moveToBiPaiPosition1);

                    //移动到原来的位置
                    var moveToOriginPosition=cc.moveTo(1.5,cardPosition[j]);
                    var moveToOriginPosition1=cc.moveTo(1.5,cardPosition[j]);
                    //翻牌动作
                    var backCardSeq1=cc.sequence(cc.delayTime(1),cc.hide());
                    var backCamera1=cc.orbitCamera(1,1,0,0,-90,0,0);
                    var backSpawn1=cc.spawn(backCardSeq1,backCamera1);

                    var frontSeq1=cc.sequence(cc.delayTime(1),cc.show());
                    var frontCamera1=cc.orbitCamera(1.25,1,0,0,-360,0,0);
                    var frontSpawn1=cc.spawn(frontSeq1,frontCamera1);

                    //后半段动作组合
                    var _frontCombinationAction=cc.spawn(moveToOriginPosition,frontSpawn1);
                    var _backCombinationAction=cc.spawn(moveToOriginPosition1,backSpawn1);

                    var _seqBack=cc.sequence(backCombinationAction_,cc.delayTime(2),_backCombinationAction);
                    var _seqFront=cc.sequence(frontCombinationAction_,cc.delayTime(2),_frontCombinationAction);

                    this.players[playerIndexOf1].myCards[j].sprite.runAction(_seqFront);
                    this.players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
                }
                //对方的动画表现
                for(var j=0;j<3;j++){
                    //移动到比牌的位置
                    var moveToBiPaiPosition=null;
                    if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                        if(g_biPaiPlayerIndexOf2[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }
                    else{
                        if(g_biPaiPlayerIndexOf1[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }

                    //移动到原来的位置
                    var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther[j]);

                    var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

                    this.players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
                }
            }
            //没有看牌时，比牌的动画表现
            else{
                //自己的动画表现
                for(var j=0;j<3;j++){

                    //移动到比牌位置动作
                    var moveToBiPaiPosition=null;
                    //var moveToBiPaiPosition1=cc.moveTo(1.3,cc.p(size.width/2+150+ 30*(2-j),size.height/2));
                    if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                        if(g_biPaiPlayerIndexOf1[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }
                    else{
                        if(g_biPaiPlayerIndexOf2[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }
                    //移动到原来的位置
                    var moveToOriginPosition=cc.moveTo(1.5,cardPosition[j]);
                    //var moveToOriginPosition1=cc.moveTo(1.5,cardPosition[j]);

                    //var _seqFront=cc.sequence(moveToBiPaiPosition1,cc.delayTime(2),moveToOriginPosition1);
                    var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

                    //this.players[playerIndexOf1].myCards[j].sprite.runAction(_seqFront);
                    this.players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
                }
                //对方的动画表现
                for(var j=0;j<3;j++){
                    //移动到比牌的位置
                    var moveToBiPaiPosition=null;
                    if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                        if(g_biPaiPlayerIndexOf2[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }
                    else{
                        if(g_biPaiPlayerIndexOf1[1]==1){
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                        }
                        else{
                            moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                        }
                    }
                    //移动到原来的位置
                    var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther[j]);

                    var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

                    this.players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
                }
            }
        }

        //和自己无关的比牌动画表现
        else{
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==playerPositionServer1){
                    playerIndexOf1=i;
                }
                if(this.players[i].positionServer==playerPositionServer2){
                    playerIndexOf2=i;
                }
            }
            if(playerIndexOf1==-1||playerIndexOf2==-1){
                console.log("error........没有找到比牌对象");
                return;
            }
            //获取三张牌的位置，供以后用
            var cardPositionOther1=new Array(3);
            cardPositionOther1[0]=this.players[playerIndexOf1].myCards[0].spriteBack.getPosition();
            cardPositionOther1[1]=this.players[playerIndexOf1].myCards[1].spriteBack.getPosition();
            cardPositionOther1[2]=this.players[playerIndexOf1].myCards[2].spriteBack.getPosition();
            var cardPositionOther2=new Array(3);
            cardPositionOther2[0]=this.players[playerIndexOf2].myCards[0].spriteBack.getPosition();
            cardPositionOther2[1]=this.players[playerIndexOf2].myCards[1].spriteBack.getPosition();
            cardPositionOther2[2]=this.players[playerIndexOf2].myCards[2].spriteBack.getPosition();
            //一个玩家的比牌动画表现
            for(var j=0;j<3;j++){
                //移动牌到比牌的位置
                var moveToBiPaiPosition=null;
                if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                    if(g_biPaiPlayerIndexOf1[1]==1){
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                    }
                    else{
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                    }
                }
                else{
                    if(g_biPaiPlayerIndexOf2[1]==1){
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                    }
                    else{
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                    }
                }
                //移动到原来的位置
                var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther1[j]);

                var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

                this.players[playerIndexOf1].myCards[j].spriteBack.runAction(_seqBack);
            }

            //另一个玩家比牌动画表现
            for(var j=0; j<3;j++){
                //移动牌到比牌的位置
                var moveToBiPaiPosition=null;
                if(this.players[playerIndexOf1].positionServer==g_biPaiPlayerIndexOf1[0]){
                    if(g_biPaiPlayerIndexOf2[1]==1){
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                    }
                    else{
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                    }
                }
                else{
                    if(g_biPaiPlayerIndexOf1[1]==1){
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2-120- (30*(2-j)),size.height/2));
                    }
                    else{
                        moveToBiPaiPosition=cc.moveTo(1.3,cc.p(size.width/2+150+(30*(2-j))-50,size.height/2));
                    }
                }
                //移动到原来的位置
                var moveToOriginPosition=cc.moveTo(1.5,cardPositionOther2[j]);

                var _seqBack=cc.sequence(moveToBiPaiPosition,cc.delayTime(2),moveToOriginPosition);

                this.players[playerIndexOf2].myCards[j].spriteBack.runAction(_seqBack);
            }

        }

        /*添加比牌的背景和闪电动画*/
        var waitTime=new cc.DelayTime(1.3);
        var setBiPaiBackgroundCallback=cc.callFunc(this.setBiPaiBackground,this,loserPositionServer);
        this.runAction(cc.sequence(waitTime,setBiPaiBackgroundCallback));

        /*回调提示比牌失败者*/
        var displayWaitTime=new cc.DelayTime(4.8);
        var setDisplayLoserCallback=cc.callFunc(this.displayLoser,this,loserPositionServer);
        this.runAction(cc.sequence(displayWaitTime,setDisplayLoserCallback));
    },
    setBiPaiBackground:function(my_this, loserPositionServer){
        var playerIndexOf1=-1;
        var playerIndexOf2=-1;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer==g_biPaiPlayerIndexOf1[0]){
                playerIndexOf1=i;
            }
            if(this.players[i].positionServer==g_biPaiPlayerIndexOf2[0]){
                playerIndexOf2=i;
            }
        }
        if(playerIndexOf1==-1||playerIndexOf2==-1){
            console.log("error outside..................................setBiPaiBackground:function");
            return;
        }
        //比牌背景
        var size=cc.director.getWinSize();
        var vsBack=new cc.Sprite(res.VsBack_png);
        var vs=new cc.Sprite(res.Vs_png);
        //用户头像（目前没有找到好的办法，只能直接使用资源）
        var playerPhoto1=new cc.Sprite(res.Man_jpg);
        var playerPhoto2=new cc.Sprite(res.Woman_jpg);
        var labelPlayerId1=new cc.LabelTTF(this.players[playerIndexOf1].id,"Arial",38);
        var labelPlayerId2=new cc.LabelTTF(this.players[playerIndexOf2].id,"Arial",38);
        labelPlayerId1.setColor(cc.color(160,82,45));
        labelPlayerId2.setColor(cc.color(160,82,45));
        labelPlayerId1.x=playerPhoto1.getPositionX()+playerPhoto1.getContentSize().width/2;
        labelPlayerId1.y=playerPhoto1.getPositionY()+playerPhoto1.getContentSize().height/2;
        labelPlayerId2.x=playerPhoto2.getPositionX()+playerPhoto2.getContentSize().width/2;
        labelPlayerId2.y=playerPhoto2.getPositionY()+playerPhoto2.getContentSize().height/2;
        playerPhoto1.addChild(labelPlayerId1);
        playerPhoto2.addChild(labelPlayerId2);
        vs.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/2,
            vsBack.getPositionY()+vsBack.getContentSize().height/2);
        if(g_biPaiPlayerIndexOf1[1]==1){
            playerPhoto1.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
            playerPhoto2.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4*3,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
        }
        else{
            playerPhoto1.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4*3,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
            playerPhoto2.setPosition(vsBack.getPositionX()+vsBack.getContentSize().width/4,
                vsBack.getPositionY()+vsBack.getContentSize().height/4*3);
        }
        vsBack.addChild(vs);
        vsBack.addChild(playerPhoto1);
        vsBack.addChild(playerPhoto2);
        vsBack.setPosition(size.width/2,size.height/5*3);
        this.addChild(vsBack,15);

        //比牌闪电动画
        //var frameCache=cc.spriteFrameCache;
        //frameCache.addSpriteFrames(res.BiPaiAnimation_plist,res.BiPaiAnimation_png);
        var biPaiAnimation=new cc.Animation();
        for(var i=1;i<4;i++){
            var frameName="bp"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            biPaiAnimation.addSpriteFrame(spriteFrame);
        }
        biPaiAnimation.setDelayPerUnit(0.15);
        biPaiAnimation.setRestoreOriginalFrame(true);
        biPaiAnimation.setLoops(5);
        var biPaiAction=cc.animate(biPaiAnimation);
        var runSprite=new cc.Sprite("#bp1.png");
        runSprite.setPosition(size.width/2,size.height/2);
        this.addChild(runSprite,20);
        //还需要添加电击失败者动画，目前没有资源



        runSprite.runAction(cc.sequence(cc.delayTime(2.0),cc.hide()));
        vsBack.runAction(cc.sequence(cc.delayTime(2.0),cc.hide()));
        runSprite.runAction(biPaiAction);

        //需要在此处将失败者移到player_noPower数组中
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer==loserPositionServer){
                this.players_noPower.push(this.players[i]);
                this.players.splice(i,1);
                break;
            }
        }
        console.log("loserPositionServer:"+loserPositionServer);
        console.log("this.players.length:"+this.players.length);
    },
    displayLoser:function(mythis,loserPositionServer){
        var find=false;
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==loserPositionServer){
                    this.players_noPower[i].loserSprite.runAction(cc.sequence(cc.show()));
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==loserPositionServer){
                    this.players[i].loserSprite.runAction(cc.sequence(cc.show()));
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            console.log("No find the loser to display loserSprite.............displayLoser:function()");
            return;
        }
    },
    SetKaiPaiQiPaiMenuItem:function(){
        this.kaiPaiMenuItem.setEnabled(true);
        this.qiPaiMenuItem.setEnabled(true);

    },
    SetQiPaiMenuItem:function(){
        this.qiPaiMenuItem.setEnabled(true);
    },
    exchangeMenuItem:function(){
        console.log("....................exchangeMenuItem:function()");
        if(this.exchangeNumber<3&&this.players.length>=2){
            this.exchangeCardMenuItem.setEnabled(true);
        }
    },
    setRoomStateCompare:function(){
        this.comparableState=false;
    },
    actionAllInBet:function(playerPosition,allChips){
        var size=cc.director.getWinSize();
        var chipNum=allChips/this.betArray[4]+1;
        while(chipNum>0){
            var counterSprite=new cc.Sprite("res/chips/chips"+5+".png");
            var counterString=new cc.Sprite("res/chips/"+this.level+"String"+5+".png");
            counterString.setPosition(counterSprite.getPositionX()+g_countSprite.getContentSize().width/2,
                counterSprite.getPositionY()+g_countSprite.getContentSize().height/2);
            counterSprite.addChild(counterString);
            counterSprite.setPosition(playerPosition);
            this.addChild(counterSprite,10);
            this.betPhotoArray.push(counterSprite);
            var x=size.width/3+size.width/3*Math.random();
            var y=size.height/2+(size.height/2-50)*Math.random();
            var moveBet=cc.moveTo(0.3,cc.p(x,y));
            counterSprite.runAction(moveBet);

            //this.sumBet=this.sumBet+this.bet;
            chipNum--;
        }

    },
    actionWinnerGetBet:function(my_this,playerPosition){
        for(var j in this.betPhotoArray){
            var getBetAction=  cc.moveTo(1.0, cc.p(playerPosition));
            this.betPhotoArray[j].runAction(cc.sequence(getBetAction,cc.hide()));
        }
        //置按钮为不可点击
        this.biPaiMenuItem.setEnabled(false);
        this.qiPaiMenuItem.setEnabled(false);
        this.kaiPaiMenuItem.setEnabled(false);
        this.jiaZhuMenuItem.setEnabled(false);
        this.quanXiaMenuItem.setEnabled(false);
        this.genZhuMenuItem.setEnabled(false);
        //关闭定时器
        var find=false;
        if(find==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==this.currentGetPowerPlayerPosition){
                    this.players[i].counterTimer.stopCounterTimer();
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==this.currentGetPowerPlayerPosition){
                    this.players_noPower[i].counterTimer.stopCounterTimer();
                    find=true;
                    break;
                }
            }
        }

        //初始化房间状态为非游戏状态
        this.roomState=0;
    },
    openAllCard:function(mythis,winnerCardType){
        //打开自己的牌
        var myself=false;
        if(myself==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==this.playerPositionServer){
                    if(this.players[i].checkCard==false&&this.players[i].isPower==1){
                        for(var j=0;j<3;j++){
                            var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                            var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
                            var backSpawn=cc.spawn(backCardSeq,backCamera);
                            var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                            var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
                            var frontSpawn=cc.spawn(frontSeq,frontCamera);
                            this.players[i].myCards[j].spriteBack.runAction(backSpawn);
                            this.players[i].myCards[j].sprite.runAction(frontSpawn);
                        }
                    }
                    myself=true;
                    break;
                }
            }
        }
        if(myself==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==this.playerPositionServer){
                    if(this.players_noPower[i].checkCard==false&&this.players_noPower[i].isPower==1){
                        for(var j=0;j<3;j++){
                            var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                            var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
                            var backSpawn=cc.spawn(backCardSeq,backCamera);
                            var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                            var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
                            var frontSpawn=cc.spawn(frontSeq,frontCamera);
                            this.players_noPower[i].myCards[j].spriteBack.runAction(backSpawn);
                            this.players_noPower[i].myCards[j].sprite.runAction(frontSpawn);
                        }
                    }
                    myself=true;
                    break;
                }
            }
        }

        /*---打开其他玩家的牌--*/
        //显示其他玩家保存在数组involvementPlayer_Cards中的牌的背面
        for(var i=0;i<this.involvementPlayer_Cards.length;i++){
            if(this.involvementPlayer_Cards[i].positionServer!=this.playerPositionServer){
                this.involvementPlayer_Cards[i].myCards[0].spriteBack.runAction(cc.sequence(cc.show()));
                this.involvementPlayer_Cards[i].myCards[1].spriteBack.runAction(cc.sequence(cc.show()));
                this.involvementPlayer_Cards[i].myCards[2].spriteBack.runAction(cc.sequence(cc.show()));
            }
        }
        //隐藏其他玩家手中牌的背面（数组players）
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer!=this.playerPositionServer){
                this.players[i].myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
                this.players[i].myCards[1].spriteBack.runAction(cc.sequence(cc.hide()));
                this.players[i].myCards[2].spriteBack.runAction(cc.sequence(cc.hide()));
            }
        }
        //隐藏其他玩家手中牌的背面（players_noPower）
        for(var i=0;i<this.players_noPower.length;i++){
            if(this.players_noPower[i].positionServer!=this.playerPositionServer){
                this.players_noPower[i].myCards[0].spriteBack.runAction(cc.sequence(cc.hide()));
                this.players_noPower[i].myCards[1].spriteBack.runAction(cc.sequence(cc.hide()));
                this.players_noPower[i].myCards[2].spriteBack.runAction(cc.sequence(cc.hide()));
            }
        }
        //打开保存在数组involvementPlayer_Cards中的其他玩家的牌
        for(var i=0;i<this.involvementPlayer_Cards.length;i++){
            console.log(this.involvementPlayer_Cards[i].id);
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRR");
            if(this.involvementPlayer_Cards[i].positionServer!=this.playerPositionServer){
                if(this.involvementPlayer_Cards[i].playerPosition>=2&&
                    this.involvementPlayer_Cards[i].playerPosition<=3){
                    for(var j=0;j<3;j++){
                        var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                        var backCamera=cc.orbitCamera(0.45,1,0,0,90,0,0);
                        var backSpawn=cc.spawn(backCardSeq,backCamera);
                        var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                        var frontCamera=cc.orbitCamera(0.6,1,0,0,360,0,0);
                        var frontSpawn=cc.spawn(frontSeq,frontCamera);
                        this.involvementPlayer_Cards[i].myCards[j].spriteBack.runAction(backSpawn);
                        this.involvementPlayer_Cards[i].myCards[j].sprite.runAction(frontSpawn);
                    }
                }
                else{
                    for(var j=0;j<3;j++){
                        var backCardSeq=cc.sequence(cc.delayTime(0.45),cc.hide());
                        var backCamera=cc.orbitCamera(0.45,1,0,0,-90,0,0);
                        var backSpawn=cc.spawn(backCardSeq,backCamera);
                        var frontSeq=cc.sequence(cc.delayTime(0.45),cc.show());
                        var frontCamera=cc.orbitCamera(0.6,1,0,0,-360,0,0);
                        var frontSpawn=cc.spawn(frontSeq,frontCamera);
                        console.log("HHHHHHHHHHHHHHHHHH:"+this.involvementPlayer_Cards[i].positionServer);
                        console.log("J:"+j);
                        this.involvementPlayer_Cards[i].myCards[j].spriteBack.runAction(backSpawn);
                        this.involvementPlayer_Cards[i].myCards[j].sprite.runAction(frontSpawn);
                    }
                }
            }
        }

        //牌局结束的庆祝动画
        this.actionCongratulation(winnerCardType);
    },
    actionCongratulation:function(winnerCardType){
        console.log("获胜者的牌型："+winnerCardType);
        switch (winnerCardType){
            case 1:
                console.log("散牌动画！！！！！");
                break;
            case 2:
                console.log("对子动画！！！！！");
                break;
            case 3:
                console.log("顺子动画！！！！！");
                break;
            case 4:
                console.log("金花动画！！！！！");
                break;
            case 5:
                console.log("豹子动画！！！！！");
                break;
            default :
                console.log("不存在此牌型或动画！！！！！");
                break;
        }
    },
    //显示房间的底注、总注、回合
    showRoomMessage:function(){
        //单注
        var betSprite=new cc.Sprite(res.Bet_png);
        betSprite.attr({
            x:this.backSpriteHead.getContentSize().width/3-100,
            y:this.backSpriteHead.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.backSpriteHead.addChild(betSprite);

        var betString=this.bet;
        this.labelBet=new cc.LabelTTF(betString,"Arial",25);
        this.labelBet.setColor(cc.color(160,82,45));
        this.labelBet.attr({
            x: betSprite.getContentSize().width+15,
            y: betSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        betSprite.addChild(this.labelBet);

        //总注
        var sumBetSprite=new cc.Sprite(res.SumBet_png);
        sumBetSprite.attr({
            x:this.backSpriteHead.getContentSize().width/2-100,
            y:this.backSpriteHead.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.backSpriteHead.addChild(sumBetSprite);

        var sumBetSpriteFrame=new cc.Sprite(res.SumBetFrame_png);
        sumBetSpriteFrame.attr({
            x:sumBetSprite.getContentSize().width+10,
            y:sumBetSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        sumBetSprite.addChild(sumBetSpriteFrame);

        var sumBetString=this.sumBet;
        this.labelSumBet=new cc.LabelTTF(sumBetString,"Arial",25);
        this.labelSumBet.setColor(cc.color(160,82,45));
        this.labelSumBet.attr({
            x:sumBetSpriteFrame.getContentSize().width-10,
            y:sumBetSpriteFrame.getContentSize().height/2,
            anchorX:1,
            anchorY:0.5
        });
        sumBetSpriteFrame.addChild(this.labelSumBet,2);

        //回合
        var roundSprite=new cc.Sprite(res.Round_png);
        roundSprite.attr({
            x:this.backSpriteHead.getContentSize().width*2/3+100,
            y:this.backSpriteHead.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.backSpriteHead.addChild(roundSprite);

        var countFlowingString=this.countFlowing+"/20";
        this.labelCountFlowing=new cc.LabelTTF(countFlowingString,"Arial",25);
        this.labelCountFlowing.setColor(cc.color(135,206,250));
        this.labelCountFlowing.attr({
            x: betSprite.getContentSize().width+15,
            y: betSprite.getContentSize().height/2,
            anchorX:0,
            anchorY:0.5
        });
        roundSprite.addChild(this.labelCountFlowing,2);
    },
    //刷新房间的底注、总注、回合
    showRoomMessageUpdate:function(){
        var betString=this.bet;
        this.labelBet.setString(betString);

        var sumBetString=this.sumBet;
        this.labelSumBet.setString(sumBetString);

        var countFlowingString=this.countFlowing+"/20";
        this.labelCountFlowing.setString(countFlowingString);
    },
    initCounterTimer:function(){
        if(this.currentGetPowerPlayerPosition!=0&&this.currentGetPowerPlayerPosition!=null){
            var myself=false;
            if(myself==false){
                for(var i=0;i<this.players.length;i++){
                    if(this.players[i].positionServer==this.currentGetPowerPlayerPosition){
                        this.players[i].counterTimer.startCounterTimer();
                        myself=true;
                        break;
                    }
                }
            }
            if(myself==false){
                for(var i=0;i<this.players_noPower.length;i++){
                    if(this.players_noPower[i].positionServer==this.currentGetPowerPlayerPosition){
                        this.players_noPower[i].counterTimer.startCounterTimer();
                        myself=true;
                        break;
                    }
                }
            }
        }
        else{
            console.log("No start Rotation");
        }
    },
    startFirstRotationPosition:function(){
        var rotationPlayerIndexOf=-1;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer==this.currentGetPowerPlayerPosition){
                rotationPlayerIndexOf=i;
                break;
            }
        }
        if(rotationPlayerIndexOf==-1){
            console.log("error outside........................................pomelo.on('onChangePlayer')");
            return;
        }
        if(this.currentGetPowerPlayerPosition==this.playerPositionServer){
            this.biPaiMenuItem.setEnabled(true);
            this.jiaZhuMenuItem.setEnabled(true);
            this.quanXiaMenuItem.setEnabled(true);
            this.genZhuMenuItem.setEnabled(true);
        }
        else{
            this.biPaiMenuItem.setEnabled(false);
            this.jiaZhuMenuItem.setEnabled(false);
            this.quanXiaMenuItem.setEnabled(false);
            this.genZhuMenuItem.setEnabled(false);
        }
        this.players[rotationPlayerIndexOf].counterTimer.startCounterTimer();

        if(this.allInState==false&&
            this.follow_always==true&&
            this.roomState==1&&
            this.dealCardState==false&&
            this.currentGetPowerPlayerPosition==this.playerPositionServer){
            pomelo.request(game_route,{
                process:"follow",
                location:myselfPlayerPositionServer
            },function(data){
                console.log(data.msg);

            });
        }
    },
    menuCallbcak_follow_always:function(){
        this.follow_always=!this.follow_always;
        console.log("this.follow_always:"+this.follow_always);
        if(this.follow_always==true&&
                this.allInState==false&&
                this.roomState==1&&
                this.dealCardState==false&&
                this.playerPositionServer==this.currentGetPowerPlayerPosition){
            pomelo.request(game_route,{
                process:"follow",
                location:myselfPlayerPositionServer
            },function(data){
                console.log(data.msg);

            });
        }
    },

    //========================================================
    //根据服务器信息展示个人表情
    sendAFace:function(position,faceNumber){
        //在玩家数组中查找玩家
        console.log("摆动sendAFace:function");
        var find=false;
        if(find==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==position){
                    console.log("摆动起来！！！！！");
                    var faceSprite=new cc.Sprite("res/chat/face/"+faceNumber.toString()+".png");
                    faceSprite.setPosition(this.players[i].spritePhotoMobile.getPosition());
                    this.addChild(faceSprite,10);
                    //上下摆动动作

                    var upAction=cc.moveBy(0.5,cc.p(0,20));
                    var downAction=cc.moveBy(0.5,cc.p(0,-20));
                    var seqAction=cc.sequence(upAction,downAction);
                    var repeatUqDownAction=cc.repeat(seqAction,3);
                    faceSprite.runAction(cc.sequence(repeatUqDownAction,cc.hide(),cc.callFunc(function(){
                        faceSprite.removeFromParent();
                        console.log("faceSprite.removeFromParent()");
                    })));
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==position){
                    var faceSprite=new cc.Sprite("res/chat/face/"+faceNumber.toString()+".png");
                    faceSprite.setPosition(this.players_noPower[i].spritePhotoMobile.getPosition());
                    this.addChild(faceSprite,10);
                    //上下摆动动作
                    var upAction=cc.moveBy(0.5,cc.p(0,20));
                    var downAction=cc.moveBy(0.5,cc.p(0,-20));
                    var seqAction=cc.sequence(upAction,downAction);
                    var repeatUqDownAction=cc.repeat(seqAction,3);
                    faceSprite.runAction(cc.sequence(repeatUqDownAction,cc.hide(),cc.callFunc(function(){
                        faceSprite.removeFromParent();
                        console.log("faceSprite.removeFromParent()");
                    })));
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            console.log("error: No found player who send a face!..................sendAFace:function");
            return;
        }

    },
    //根据服务器信息展示个人静态聊天信息和对应的语音
    sendAStaticTack:function(position,staticTackNumber){
        //
        var find=false;
        if(find==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==position){
                    var chatString=g_staticTackStringArray[parseInt(staticTackNumber)-1];
                    switch (this.players[i].playerPosition){
                        case 1:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:-15,
                                y:this.players[i].spritePhotoMobile.getContentSize().height,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


                            break;
                        case 2:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 3:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 4:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players[i].spritePhotoMobile.getContentSize().width,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players[i].spritePhotoMobile.getContentSize().width,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==position){
                    var chatString=g_staticTackStringArray[parseInt(staticTackNumber)-1];
                    switch (this.players_noPower[i].playerPosition){
                        case 1:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:-15,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


                            break;
                        case 2:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 3:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 4:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(chatString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            console.log("error: No found player who send a face!..................sendAStaticTack:function");
            return;
        }

    },
    //根据服务器信息展示个人动态聊天信息
    sendDynamicTack:function(position,dynamicTackString){
        var find=false;
        if(find==false){
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].positionServer==position){
                    //根据发送信息的玩家位置确定信息位置
                    switch (this.players[i].playerPosition){
                        case 1:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:-15,
                                y:this.players[i].spritePhotoMobile.getContentSize().height,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


                            break;
                        case 2:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 3:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 4:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                           //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players[i].spritePhotoMobile.getContentSize().width,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players[i].spritePhotoMobile.getContentSize().width,
                                y:this.players[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==position){
                    switch (this.players_noPower[i].playerPosition){
                        case 1:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:-15,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));


                            break;
                        case 2:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 3:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:0,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:1,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var hailOrbit=cc.orbitCamera(0,1,0,0,180,0,0);
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headMove=cc.moveBy(0,(labelStringHeadBackSprite.getContentSize().width*1/bigY),0);
                            var hailMove=cc.moveBy(0,(-labelStringHailBackSprite.getContentSize().width*1/bigY),0);
                            var headSpawn=cc.spawn(headOrbit,headScale,headMove);
                            var hailSpawn=cc.spawn(hailOrbit,hailScale,hailMove);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 4:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        case 5:
                            //聊天文本显示的背景（分三段背景，头部，中间，尾部）
                            var labelStringMidBackSprite=new cc.Sprite(res.ChatTextBackgroundMid_png);
                            var labelStringHeadBackSprite=new cc.Sprite(res.ChatTextBackgroundHead_png);
                            var labelStringHailBackSprite=new cc.Sprite(res.ChatTextBackgroundHail_png);
                            var labelString=new cc.LabelTTF(dynamicTackString,"Arial",30);
                            //拼接三段背景（头部，中间，尾部）和文本背景，显示并定时消失
                            labelStringMidBackSprite.attr({
                                x:this.players_noPower[i].spritePhotoMobile.getContentSize().width,
                                y:this.players_noPower[i].spritePhotoMobile.getContentSize().height+5,
                                anchorX:0,
                                anchorY:0
                            });
                            this.players_noPower[i].spritePhotoMobile.addChild(labelStringMidBackSprite);
                            labelString.attr({
                                x:labelStringMidBackSprite.getContentSize().width/2,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0.5,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelString);
                            labelStringHeadBackSprite.attr({
                                x:0,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:1,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHeadBackSprite);
                            labelStringHailBackSprite.attr({
                                x:labelStringMidBackSprite.getContentSize().width,
                                y:labelStringMidBackSprite.getContentSize().height/2,
                                anchorX:0,
                                anchorY:0.5
                            });
                            labelStringMidBackSprite.addChild(labelStringHailBackSprite);
                            var bigY=labelString.getContentSize().width*1.0000/labelStringMidBackSprite.getContentSize().width;
                            var big=cc.scaleTo(0,bigY,1);
                            labelStringMidBackSprite.runAction(cc.sequence(big,new cc.DelayTime(3),cc.hide(),cc.callFunc(function(){
                                labelStringMidBackSprite.removeFromParent();
                            })));
                            labelString.runAction(cc.sequence(cc.scaleTo(0,1/bigY,1)));
                            var headScale=cc.scaleTo(0,1/bigY,1);
                            var hailScale=cc.scaleTo(0,1/bigY,1);
                            var headSpawn=cc.spawn(headScale);
                            var hailSpawn=cc.spawn(hailScale);
                            labelStringHeadBackSprite.runAction(cc.sequence(headSpawn));
                            labelStringHailBackSprite.runAction(cc.sequence(hailSpawn));

                            break;
                        default :
                            break;
                    }
                    find=true;
                    break;
                }
            }
        }
        if(find==false){
            console.log("error: No found player who send a face!..................sendDynamicTack:function");
            return;
        }
    },
    //根据服务器信息展示互动表情及其动画
    sendInteractionFace:function(position1,position2,interactionFaceNumber){
        var playerPosition1=null;
        var playerPosition2=null;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].positionServer==position1&&playerPosition1==null){
                playerPosition1=this.players[i].spritePhotoMobile.getPosition();
            }
            if(this.players[i].positionServer==position2&&playerPosition2==null){
                playerPosition2=
                    this.players[i].spritePhotoMobile.convertToWorldSpace(
                        this.players[i].spritePhotoSelf.getPosition());
            }
        }
        if(playerPosition1==null||playerPosition2==null){
            for(var i=0;i<this.players_noPower.length;i++){
                if(this.players_noPower[i].positionServer==position1&&playerPosition1==null){
                    playerPosition1=this.players_noPower[i].spritePhotoMobile.getPosition();
                }
                if(this.players_noPower[i].positionServer==position2&&playerPosition2==null){
                    playerPosition2=
                        this.players_noPower[i].spritePhotoMobile.convertToWorldSpace(
                            this.players_noPower[i].spritePhotoSelf.getPosition());
                }
            }
        }
        if(playerPosition1==null||playerPosition2==null){
            console.log("error: No found the players who interact");
            return;
        }
        console.log("playerPosition1:"+playerPosition1);
        console.log("playerPosition2:"+playerPosition2);
        switch (parseInt(interactionFaceNumber)){
            case 1:
                this.sendFlower(playerPosition1,playerPosition2);
                break;
            case 2:
                this.sendCheers(playerPosition1,playerPosition2);
                break;
            case 3:
                this.sendKiss(playerPosition1,playerPosition2);
                break;
            case 4:
                this.sendEgg(playerPosition1,playerPosition2);
                break;
            case 5:
                this.sendShoe(playerPosition1,playerPosition2);
                break;
            case 6:
                this.sendBomb(playerPosition1,playerPosition2);
                break;
            default :
                break;

        }

    },
    //送花动画
    sendFlower:function(playerPosition1,playerPosition2){
        var sendFlowerAnimation=new cc.Animation();
        for(var i=1;i<=20;i++){
            var frameName="flower"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendFlowerAnimation.addSpriteFrame(spriteFrame);

        }
        sendFlowerAnimation.setDelayPerUnit(0.15);
        sendFlowerAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendFlowerAction=cc.animate(sendFlowerAnimation);
        var runSprite=new cc.Sprite("#flower1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendFlowerAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));

    },
    //送赞动画
    sendCheers:function(playerPosition1,playerPosition2){
        var sendCheersAnimation=new cc.Animation();
        for(var i=1;i<=16;i++){
            var frameName="cheers"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendCheersAnimation.addSpriteFrame(spriteFrame);
        }
        sendCheersAnimation.setDelayPerUnit(0.15);
        sendCheersAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendCheersAction=cc.animate(sendCheersAnimation);
        var runSprite=new cc.Sprite("#cheers1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendCheersAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //送吻动画
    sendKiss:function(playerPosition1,playerPosition2){
        var sendKissAnimation=new cc.Animation();
        for(var i=1;i<=25;i++){
            var frameName="kiss"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendKissAnimation.addSpriteFrame(spriteFrame);
        }
        sendKissAnimation.setDelayPerUnit(0.15);
        sendKissAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendKissAction=cc.animate(sendKissAnimation);
        var runSprite=new cc.Sprite("#kiss1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(1,playerPosition2);
        runSprite.runAction(cc.sequence(move,sendKissAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //仍鸡蛋动画
    sendEgg:function(playerPosition1,playerPosition2){
        var sendEggAnimation=new cc.Animation();
        for(var i=1;i<=16;i++){
            var frameName="egg"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendEggAnimation.addSpriteFrame(spriteFrame);
        }
        sendEggAnimation.setDelayPerUnit(0.15);
        sendEggAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendEggAction=cc.animate(sendEggAnimation);
        var runSprite=new cc.Sprite("#egg1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendEggAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //仍鞋动画
    sendShoe:function(playerPosition1,playerPosition2){
        var sendShoeAnimation=new cc.Animation();
        for(var i=1;i<=17;i++){
            var frameName="shoe"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendShoeAnimation.addSpriteFrame(spriteFrame);
        }
        sendShoeAnimation.setDelayPerUnit(0.15);
        sendShoeAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendShoeAction=cc.animate(sendShoeAnimation);
        var runSprite=new cc.Sprite("#shoe1.png");
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendShoeAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
    },
    //仍炸弹动画
    sendBomb:function(playerPosition1,playerPosition2){
        var sendBombAnimation=new cc.Animation();
        for(var i=1;i<=12;i++){
            var frameName="bomb"+i+".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
            sendBombAnimation.addSpriteFrame(spriteFrame);
        }
        sendBombAnimation.setDelayPerUnit(0.15);
        sendBombAnimation.setRestoreOriginalFrame(true);
        //sendFlowerAnimation.setLoops(1);
        var sendBombAction=cc.animate(sendBombAnimation);
        var runSprite=new cc.Sprite("#bomb1.png");
        runSprite.attr({
            anchorX:0.44,
            anchorY:0.43
        });
        runSprite.setPosition(playerPosition1);
        this.addChild(runSprite,5);
        var move=cc.moveTo(0.5,playerPosition2);
        var rotation=cc.rotateBy(0.5,360);
        //var repeat=cc.repeat(rotation,5);
        var spawn=cc.spawn(move,rotation);
        runSprite.runAction(cc.sequence(spawn,sendBombAction,cc.hide(),cc.callFunc(function(){
            runSprite.removeFromParent();
            console.log("runSprite.removeFromParent()");
        })));
   },

    menuSettingCallback:function(){
        console.log("enter menuSettingCallback:function(),please start setting");
        var layerSetting=new PopUpSettingLayer();
        this.addChild(layerSetting,20);
    },
    menuCallbackGameBack:function(){
        var layerBack=new PoPUpGameBackLayer();
        this.addChild(layerBack,20);
    },
    menuCallbackGameChat:function(){
        console.log("enter menuCallbackGameChat.....");
        var layerChat=new PopUpChatLayer();
        this.addChild(layerChat,20);
    },
    menuCallbackPersonalMessage:function(sender){
            console.log("sender.getName():"+sender.getName());
            var playerPosition=parseInt(sender.getName());
            var find=false;
            console.log("this.players.length:"+this.players[0]);
            if(find==false){
                for(var i=0;i<this.players.length;i++){
                    if(this.players[i].playerPosition==playerPosition){
                        //将玩家Id，玩家的服务器位置，玩家性别，玩家金币，玩家签名，玩家vip级别，玩家收到各个礼物的数量和玩家照片存储位置作为参数传入（目前数据不全）
                        var layerInteraction=new PopUpInteractionLayer(
                            this.players[i].id,
                            this.players[i].positionServer
                        );
                        this.addChild(layerInteraction,15);
                        find=true;
                        break;
                    }
                }
            }
            if(find==false){
                for(var i=0;i<this.players_noPower.length;i++){
                    if(this.players_noPower[i].playerPosition==playerPosition){
                        //将玩家Id，玩家的服务器位置，玩家性别，玩家金币，玩家签名，玩家vip级别，玩家收到各个礼物的数量和玩家照片存储位置作为参数传入（目前数据不全）
                        var layerInteraction=new PopUpInteractionLayer(
                            this.players_noPower[i].id,
                            this.players_noPower[i].positionServer
                        );
                        this.addChild(layerInteraction,15);
                        find=true;
                        break;
                    }
                }
            }
            if(find==false){
                console.log("error outside........menuCallbackPersonalMessage:function");
                return;
            }
    },
    menuCallbackRadio:function(){
        console.log("welcome coming menuCallbackRadio");
        var layerRadio=new PopUpRadioLayer();
        this.addChild(layerRadio,15);
    },

    //换牌道具按钮回调函数
    menuCallbackExchangeCard:function(){
        if(this.exchangeNumber>=3){
            console.log("换牌次数已达3次，在本牌局中不能再进行换牌操作");
            return;
        }
        //在玩家数组中查找自己
        var playerIndexOf=-1;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].id==uid){
                playerIndexOf=i;
                break;
            }
        }
        if(playerIndexOf==-1||this.players[playerIndexOf].myCards[0].sprite==null){
            console.log("error:player no power to exchange card!....." +
                ".outside...menuCallbackExchangeCard:function()");
            return;
        }

        //引用玩家三张牌的花色和点数
        this.card1_suit=this.players[playerIndexOf].myCards[0].suit;
        this.card1_rank=this.players[playerIndexOf].myCards[0].rank;
        this.card2_suit=this.players[playerIndexOf].myCards[1].suit;
        this.card2_rank=this.players[playerIndexOf].myCards[1].rank;
        this.card3_suit=this.players[playerIndexOf].myCards[2].suit;
        this.card3_rank=this.players[playerIndexOf].myCards[2].rank;

        //引用玩家三张牌的正面精灵，方便进行监听和其他操作
        this.cardSprite1=this.players[playerIndexOf].myCards[0].sprite;
        this.cardSprite2=this.players[playerIndexOf].myCards[1].sprite;
        this.cardSprite3=this.players[playerIndexOf].myCards[2].sprite;
        //给三张牌添加提醒精灵
        this.cardBindSprite1=new cc.Sprite(res.ExchangeCardWarnSprite_png);
        this.cardBindSprite1.attr({
            x:this.cardSprite1.getContentSize().width/2,
            y:this.cardSprite1.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.cardSprite1.addChild(this.cardBindSprite1);
        this.cardBindSprite2=new cc.Sprite(res.ExchangeCardWarnSprite_png);
        this.cardBindSprite2.attr({
            x:this.cardSprite2.getContentSize().width/2,
            y:this.cardSprite2.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.cardSprite2.addChild(this.cardBindSprite2);
        this.cardBindSprite3=new cc.Sprite(res.ExchangeCardWarnSprite_png);
        this.cardBindSprite3.attr({
            x:this.cardSprite3.getContentSize().width/2,
            y:this.cardSprite3.getContentSize().height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.cardSprite3.addChild(this.cardBindSprite3);
        //换牌选择提醒动作
        this.actionExchangeCardWarn();

        this.exchangeCardListener=cc.EventListener.create({
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

                var local2=this.cardSprite2.convertToNodeSpace(touch.getLocation());
                var rect2 = cc.rect(0, 0, s.width, s.height);

                var local3=this.cardSprite3.convertToNodeSpace(touch.getLocation());
                var rect3 = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, local)){
                    console.log("Yes:Card1");

                    //注销所有和换牌相关的信息
                    cc.eventManager.removeListener(this.exchangeCardListener);
                    this.exchangeCardListener=null;
                    this.cardSprite1=null;
                    this.cardSprite2=null;
                    this.cardSprite3=null;
                    this.cardBindSprite1.removeFromParent();
                    this.cardBindSprite2.removeFromParent();
                    this.cardBindSprite3.removeFromParent();
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;
                    this.cardBindSprite1=null;

                    if(g_exchangeCardSuit==null&&g_exchangeCardRank==null){
                        g_exchangeCardSuit=this.card1_suit;
                        g_exchangeCardRank=this.card1_rank;
                        //向服务器发送信息
                        this.exchangeCardRequest();
                    }
                }
                else{
                    if(cc.rectContainsPoint(rect2, local2)){
                        console.log("Yes:Card2");

                        //注销所有和换牌相关的信息
                        cc.eventManager.removeListener(this.exchangeCardListener);
                        this.exchangeCardListener=null;
                        this.cardSprite1=null;
                        this.cardSprite2=null;
                        this.cardSprite3=null;
                        this.cardBindSprite1.removeFromParent();
                        this.cardBindSprite2.removeFromParent();
                        this.cardBindSprite3.removeFromParent();
                        this.cardBindSprite1=null;
                        this.cardBindSprite1=null;
                        this.cardBindSprite1=null;
                        //向服务器发送信息
                        if(g_exchangeCardSuit==null&&g_exchangeCardRank==null){
                            g_exchangeCardSuit=this.card2_suit;
                            g_exchangeCardRank=this.card2_rank;
                            this.exchangeCardRequest();
                        }
                    }
                    else{
                        if(cc.rectContainsPoint(rect3, local3)){
                            console.log("Yes:Card3");

                            //注销所有和换牌相关的信息
                            cc.eventManager.removeListener(this.exchangeCardListener);
                            this.exchangeCardListener=null;
                            this.cardSprite1=null;
                            this.cardSprite2=null;
                            this.cardSprite3=null;
                            this.cardBindSprite1.removeFromParent();
                            this.cardBindSprite2.removeFromParent();
                            this.cardBindSprite3.removeFromParent();
                            this.cardBindSprite1=null;
                            this.cardBindSprite1=null;
                            this.cardBindSprite1=null;
                            //向服务器发送信息
                            if(g_exchangeCardSuit==null&&g_exchangeCardRank==null){
                                g_exchangeCardSuit=this.card3_suit;
                                g_exchangeCardRank=this.card3_rank;
                                this.exchangeCardRequest();
                            }
                        }
                        else{
                            //注销所有和换牌相关的信息
                            cc.eventManager.removeListener(this.exchangeCardListener);
                            this.exchangeCardListener=null;
                            this.cardSprite1=null;
                            this.cardSprite2=null;
                            this.cardSprite3=null;
                            this.cardBindSprite1.removeFromParent();
                            this.cardBindSprite2.removeFromParent();
                            this.cardBindSprite3.removeFromParent();
                            this.cardBindSprite1=null;
                            this.cardBindSprite1=null;
                            this.cardBindSprite1=null;
                            console.log("No card");
                        }
                    }
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.exchangeCardListener,this.cardSprite1);
    },
    //项服务器发送换牌数据，并返回数据进行换牌
    exchangeCardRequest:function(){
        pomelo.request(game_route,{
            process:"huanPai",
            location:myselfPlayerPositionServer,
            paiToChange:{p1:g_exchangeCardRank,s1:g_exchangeCardSuit}
        },
            function(data){
            cc.log('--------=========----------'+JSON.stringify(data));
            if(data instanceof  Object){

            }
            else{
                var jsonObj=JSON.parse(data);
                var args=jsonObj['args'];
                data=args[0];
            }
            //点数
            var exchangeCardRank=data["p1"];
            //花色
            var exchangeCardSuit=data["s1"];

            var playerIndexOf=-1;
            for(var i=0;i<this.players.length;i++){
                if(this.players[i].id==uid){
                    playerIndexOf=i;
                    break;
                }
            }
            if(playerIndexOf==-1){
                console.log("error:No fuond player who exchange card in players array......" +
                    "exchangeCardRequest:function()");
                return;
            }
            var exchangePlayer=false;
            for(var i=0;i<this.players[playerIndexOf].myCards.length;i++){
                if(this.players[playerIndexOf].myCards[i].rank==g_exchangeCardRank&&
                    this.players[playerIndexOf].myCards[i].suit==g_exchangeCardSuit){
                    this.players[playerIndexOf].myCards[i].exchangeCard(exchangeCardSuit,exchangeCardRank);
                    console.log("换牌成功！");
                    exchangePlayer=true;
                    break;
                }
            }
            g_exchangeCardRank=null;
            g_exchangeCardSuit=null;
            if(exchangePlayer==false){
                console.log("在数组players中找不到换牌的玩家，.....exchangeCardRequest()!");
                return;
            }
        }.bind(this));
    },
    //换牌选择提醒动作
    actionExchangeCardWarn:function(){
        var tintBy=cc.tintBy(1.5,0,0,200);
        var tintBy_reverse=tintBy.reverse();
        var seq=cc.sequence(tintBy,tintBy_reverse);
        var repeat=cc.repeatForever(seq);
        this.cardBindSprite1.runAction(repeat);

        var tintBy2=cc.tintBy(1.5,0,0,200);
        var tintBy_reverse2=tintBy2.reverse();
        var seq2=cc.sequence(tintBy2,tintBy_reverse2);
        var repeat2=cc.repeatForever(seq2);
        this.cardBindSprite2.runAction(repeat2);

        var tintBy3=cc.tintBy(1.5,0,0,200);
        var tintBy_reverse3=tintBy3.reverse();
        var seq3=cc.sequence(tintBy3,tintBy_reverse3);
        var repeat3=cc.repeatForever(seq3);
        this.cardBindSprite3.runAction(repeat3);
    },

    //广播窗口信息推送滚动
    radioMessageScroll:function(inputString,color){
        //将广播字符串压入广播字符串记录数组，保存起来
        //最多保存的广播记录数，暂时定为15条
        var recordMax=g_recordMax;
        //记录数组超过15条，先删除最先进入的一条
        if(g_radioMessageArray.length>recordMax){
            g_radioMessageArray.splice(0,1);
            g_radioMessageArray.push(inputString);
        }
        else{
            g_radioMessageArray.push(inputString);
        }

        //移除现在广播窗口的文本（如果存在）
        if(this.text_came!=null){
            this.text_came.stopAllActions();
            var temporary=this.text_came;
            this.text_came=null;
            temporary.runAction(cc.sequence(cc.moveBy(0.5,0,50),cc.hide(),cc.callFunc(function(){
                temporary.removeFromParent();
                temporary=null;
            })));
        }
        //加入新的广播信息
        this.text_came = new cc.LabelTTF(inputString,"Arial",30);
        console.log('text width:'+this.text_came.width);
        this.text_came.setColor(color?color:cc.color.BLUE);
        this.text_came.attr({
            x:700,
            y:0,
            anchorX:0,
            anchorY:0
        });
        console.log("this.cliper.getContentSize().width:"+this.cliper.getContentSize().width);
        this.cliper.addChild(this.text_came);
        //向左滚动动画
        this.text_came.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.001,0,0),cc.callFunc(function(){
            this.text_came.x=this.text_came.x-2.5;
            if(this.text_came.x<=-this.text_came.getContentSize().width){
                this.text_came.stopAllActions();
                this.text_came.removeFromParent();
                this.text_came=null;
                console.log("end........")
            }
        }.bind(this)))));
    },

    //手动保存必要资源在内存中，防止出现黑屏现象
    retainMember:function(){
        this.backSprite.retain();
        this.biPaiMenuItem.retain();
        this.kaiPaiMenuItem.retain();
        this.qiPaiMenuItem.retain();

        this.jiaZhuMenuItem.retain();
        this.quanXiaMenuItem.retain();
        this.genZhuMenuItem.retain();
        this.genDaoDiMenuItem.retain();
        this.otherMenu.retain();
        this.exchangeCardMenuItem.retain();
        this.exchangeCardListener.retain();
        this.cardBindSprite1.retain();
        this.cardBindSprite2.retain();
        this.cardBindSprite3.retain();
        this.cardSprite1.retain();
        this.cardSprite2.retain();
        this.cardSprite3.retain();
        this.card1_suit.retain();
        this.card1_rank.retain();
        this.card2_suit.retain();
        this.card2_rank.retain();
        this.card3_suit.retain();
        this.card3_rank.retain();
        this.exchangeNumber.retain();
        this.players.retain();
        this.players_noPower.retain();
        this.involvementPlayer_Cards.retain();
        this.playerPositionServer.retain();
        this.playerPositionClient.retain();
        this.follow_always.retain();
        this.drawNode.retain();
        this.level.retain();
        this.betArray.retain();
        this.betPhotoArray.retain();
        this.bet.retain();
        this.sumBet.retain();
        this.countFlowing.retain();
        this.roomNum.retain();
        this.playerNum.retain();
        this.roomState.retain();
        this.currentGetPowerPlayerPosition.retain();
        this.allInState.retain();
        this.comparableState.retain();
        //this.layerJiaZhuSelect.release();
        this.startDealCardPosition.retain();
        this.startDealCardPosition1.retain();
        this.dealCardState.retain();
        this.progressBoardBiPaiTime.retain();
        this.myselfCardsReach.retain();
        this.myselfCards.retain();
        this.labelBet.retain();
        this.labelSumBet.retain();
        this.labelCountFlowing.retain();
        this.radioMenuBackground.retain();
        this.qiPaiMenuItem.retain();
        this.text_came.retain();
    },
    //手动释放在内存中的资源
    releaseMember:function(){
        //g_dealCardBack.release();
        //g_countSprite.release();
        //g_cliper.release();
    },
    //注销广播监听接口
    pomelo_removeListener:function(){
        //pomelo.removeListener('onActBroadcast',a_function);
        pomelo.removeListener('onReady',onReady_function);
        pomelo.removeListener('onFollow',onFollow_function);
        pomelo.removeListener('onAddChip',onAddChip_function);
        pomelo.removeListener('onAdd',onAdd_function);
        pomelo.removeListener('onOpen',onOpen_function);
        pomelo.removeListener('onThrow',onThrow_function);
        pomelo.removeListener('onBipai',onBipai_function);
        pomelo.removeListener('onAllin',onAllin_function);
        pomelo.removeListener('onLeave',onLeave_function);
        pomelo.removeListener('onEnd',onEnd_function);
        pomelo.removeListener('onFapai',onFapai_function);
        pomelo.removeListener('onShoupai',onShoupai_function);
        pomelo.removeListener('onChangePlayer',onChangePlayer_function);
        pomelo.removeListener('onEndPai',onEndPai_function);
        pomelo.removeListener('onInit',onInit_function);
        pomelo.removeListener('onChatInGame',onChatInGame_function);
        pomelo.removeListener('onActBroadcast',onActBroadcast_function);
        pomelo.removeListener('onUserBroadcast',onUserBroadcast_function);
    },
    onExit:function(){
        this._super();
        g_dealCardBack.removeFromParent(true);
        g_countSprite.removeFromParent(true);
        g_playerData.splice(0);
        g_roomData.splice(0);
        //释放资源
        this.releaseMember();

        //this.backSprite.release();
        //this.biPaiMenuItem.release();
        //this.kaiPaiMenuItem.release();
        //this.qiPaiMenuItem.release();
        //
        //this.jiaZhuMenuItem.release();
        //this.quanXiaMenuItem.release();
        //this.genZhuMenuItem.release();
        //this.genDaoDiMenuItem.release();
        //this.otherMenu.release();
        //this.exchangeCardMenuItem.release();
        //this.exchangeCardListener.release();
        //this.cardBindSprite1.release();
        //this.cardBindSprite2.release();
        //this.cardBindSprite3.release();
        //this.cardSprite1.release();
        //this.cardSprite2.release();
        //this.cardSprite3.release();
        //this.card1_suit.release();
        //this.card1_rank.release();
        //this.card2_suit.release();
        //this.card2_rank.release();
        //this.card3_suit.release();
        //this.card3_rank.release();
        //this.exchangeNumber.release();
        //this.players.release();
        //this.players_noPower.release();
        //this.involvementPlayer_Cards.release();
        //this.playerPositionServer.release();
        //this.playerPositionClient.release();
        //this.follow_always.release();
        //this.drawNode.release();
        //this.level.release();
        //this.betArray.release();
        //this.betPhotoArray.release();
        //this.bet.release();
        //this.sumBet.release();
        //this.countFlowing.release();
        //this.roomNum.release();
        //this.playerNum.release();
        //this.roomState.release();
        //this.currentGetPowerPlayerPosition.release();
        //this.allInState.release();
        //this.comparableState.release();
        //this.startDealCardPosition.release();
        //this.startDealCardPosition1.release();
        //this.dealCardState.release();
        //this.progressBoardBiPaiTime.release();
        //this.myselfCardsReach.release();
        //this.myselfCards.release();
        //this.labelBet.release();
        //this.labelSumBet.release();
        //this.labelCountFlowing.release();
        //this.radioMenuBackground.release();
        //this.qiPaiMenuItem.release();
        //this.text_came.release();

        //注销监听接口
        this.pomelo_removeListener();

    },

    //music
    onEnterTransitionDidFinish:function(){
            this._super();
            cc.audioEngine.setEffectsVolume(0.5);
            cc.audioEngine.setMusicVolume(0.5);
            cc.audioEngine.playMusic(res_other.BackgroundMusic_ogg ,true);
            //cc.audioEngine.playMusic(res.Ttt ,true);
        },
    onExitTransitionDidStart:function(){
            this._super();
            cc.audioEngine.stopMusic()
        }
});

var gameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
});
