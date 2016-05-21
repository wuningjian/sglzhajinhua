/**
 * Created by guowanfu on 2016/4/20.
 */
var PopUpBuyDiamondSelectLayer=PopUp.extend({
    m_touchListener:null,
    m_touchListener1:null,
    spriteSelectBack:null,

    //购买钻石的主背景
    buyDiamondBackground:null,
    //钻石和人民币兑换购买等式背景
    buyDiamondMenuBackground:null,
    //钻石价格级别
    diamondValueLevel:null,
    ctor:function(){
        this._super(cc.color(0,0,0,255),1256,800);
        this.setCascadeOpacityEnabled(true);
        this.setOpacity(255*(0.25));
        this.diamondValueLevel=[5,10,30,50,100,500,1000,2000];
        this.initSelectLayerBackground();
        this.initDiamondFaceExchangeAndMenu();
    },
    //初始化界面背景
    initSelectLayerBackground:function(){
        var size=cc.director.getWinSize();
        //初始化透明背景
        this.spriteSelectBack=new cc.Sprite(res.SelectBack_png);
        this.spriteSelectBack.setPosition(size.width/2,size.height/2);
        this.addChild(this.spriteSelectBack);

        //初始化购买钻石背景
        this.buyDiamondBackground=new cc.Sprite(res.BuyDiamond_buyDiamondBackground_png);
        this.buyDiamondBackground.setPosition(this.spriteSelectBack.getContentSize().width/2,
            this.spriteSelectBack.getContentSize().height/2);
        this.spriteSelectBack.addChild(this.buyDiamondBackground);

        //添加监听
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
                    console.log("结束！！！！返回！！！！");
                    this.destoty();
                    this.removeFromParent();
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.m_touchListener1,this.buyDiamondBackground);

        //添加花纹
        var leftFlower=new cc.Sprite(res.BuyDiamond_back_flowerLeft_png);
        var rightFlower=new cc.Sprite(res.BuyDiamond_back_flowerRight_png);
        leftFlower.setPosition(this.buyDiamondBackground.getContentSize().width/3,
            this.buyDiamondBackground.getContentSize().height-leftFlower.getContentSize().height/2-30);
        this.buyDiamondBackground.addChild(leftFlower);
        rightFlower.setPosition(this.buyDiamondBackground.getContentSize().width*2/3,
            this.buyDiamondBackground.getContentSize().height-rightFlower.getContentSize().height/2-30);
        this.buyDiamondBackground.addChild(rightFlower);
        //添加主题标签
        var titleLabel=new cc.LabelTTF("购买钻石","Arial",35);
        titleLabel.setPosition(this.buyDiamondBackground.getContentSize().width/2,
            this.buyDiamondBackground.getContentSize().height-titleLabel.getContentSize().height/2-35);
        this.buyDiamondBackground.addChild(titleLabel);

        //添加按钮背景
        this.buyDiamondMenuBackground= new Array();
        var buyDiamondMenuBackground1=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground2=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground3=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground4=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground5=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground6=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground7=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        var buyDiamondMenuBackground8=new cc.Sprite(res.BuyDiamond_menuBackground_png);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground1);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground2);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground3);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground4);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground5);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground6);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground7);
        this.buyDiamondMenuBackground.push(buyDiamondMenuBackground8);

        buyDiamondMenuBackground1.attr({
            x:this.buyDiamondBackground.getContentSize().width/4,
            y:this.buyDiamondBackground.getContentSize().height-
              buyDiamondMenuBackground1.getContentSize().height-30,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground1);
        buyDiamondMenuBackground2.attr({
            x:this.buyDiamondBackground.getContentSize().width/4*3,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground2.getContentSize().height-30,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground2);
        buyDiamondMenuBackground3.attr({
            x:this.buyDiamondBackground.getContentSize().width/4,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground1.getContentSize().height*2-30-10,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground3);
        buyDiamondMenuBackground4.attr({
            x:this.buyDiamondBackground.getContentSize().width/4*3,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground2.getContentSize().height*2-30-10,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground4);
        buyDiamondMenuBackground5.attr({
            x:this.buyDiamondBackground.getContentSize().width/4,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground1.getContentSize().height*3-30-10*2,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground5);
        buyDiamondMenuBackground6.attr({
            x:this.buyDiamondBackground.getContentSize().width/4*3,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground2.getContentSize().height*3-30-10*2,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground6);
        buyDiamondMenuBackground7.attr({
            x:this.buyDiamondBackground.getContentSize().width/4,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground1.getContentSize().height*4-30-10*3,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground7);
        buyDiamondMenuBackground8.attr({
            x:this.buyDiamondBackground.getContentSize().width/4*3,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground2.getContentSize().height*4-30-10*3,
            anchorX:0.5,
            anchorY:1
        });
        this.buyDiamondBackground.addChild(buyDiamondMenuBackground8);

        //添加横线
        var line_horizontal=new cc.Sprite(res.BuyDiamond_line_horizontal_png);
        line_horizontal.attr({
            x:this.buyDiamondBackground.getContentSize().width/2,
            y:this.buyDiamondBackground.getContentSize().height-
            buyDiamondMenuBackground2.getContentSize().height*5-30-13*4,
            anchorX:0.5,
            anchorY:0.5
        });
        this.buyDiamondBackground.addChild(line_horizontal);

        //添加提示
        var warnString="温馨提示: 支付宝、微信、充值有以下优惠:\n" +
            "1.单笔充值10元以上可额外获得10%的钻石；\n" +
            "2.单笔充值100元以上可额外获得15%的钻石；\n" +
            "3.单笔充值500元以上可额外获得20%的钻石。";
        var warnLabel=new cc.LabelTTF(warnString,"Arial",20);
        warnLabel.attr({
            x:line_horizontal.getContentSize().width/2,
            y:-7,
            anchorX:0.5,
            anchorY:1
        });
        line_horizontal.addChild(warnLabel);
    },
    //初始化钻石面值兑换等式项和按钮
    initDiamondFaceExchangeAndMenu:function(){
        //背景划分线条
        for(var i=0;i<this.buyDiamondMenuBackground.length;i++){
            var lineSprite=new cc.Sprite(res.BuyDiamond_line_png);
            lineSprite.setPosition(this.buyDiamondMenuBackground[i].getContentSize().width/7*4,
                this.buyDiamondMenuBackground[i].getContentSize().height/2);
            this.buyDiamondMenuBackground[i].addChild(lineSprite);
        }
        for(var i=0;i<this.buyDiamondMenuBackground.length;i++){
            var diamondSprite=new cc.Sprite(res.BuyDiamond_diamond_png);
            var valueString=this.diamondValueLevel[i].toString()+"钻石";
            var diamondLabel=new cc.LabelTTF(valueString,"Arial",20);
            diamondLabel.attr({
                x:diamondSprite.getContentSize().width+15,
                y:diamondSprite.getContentSize().width/2,
                anchorX:0,
                anchorY:0.5
            });
            diamondSprite.addChild(diamondLabel);
            diamondLabel.setColor(cc.color(220,20,60));
            diamondSprite.attr({
                x:10,
                y:this.buyDiamondMenuBackground[i].getContentSize().height/2,
                anchorX:0,
                anchorY:0.5
            });
            this.buyDiamondMenuBackground[i].addChild(diamondSprite);
            var menuItemSprite1=new cc.Sprite(res.BuyDiamond_faceValueMenu_png);
            var menuItemSprite2=new cc.Sprite(res.BuyDiamond_faceValueMenu_png);
            var menuItemSprite3=new cc.Sprite(res.BuyDiamond_faceValueMenu_png);
            var moneyString=this.diamondValueLevel[i].toString()+"元";
            var menuItemLabel1=new cc.LabelTTF(moneyString,"Arial",25);
            var menuItemLabel2=new cc.LabelTTF(moneyString,"Arial",25);
            var menuItemLabel3=new cc.LabelTTF(moneyString,"Arial",25);
            menuItemLabel1.setColor(cc.color(220,20,60));
            menuItemLabel2.setColor(cc.color(220,20,60));
            menuItemLabel3.setColor(cc.color(220,20,60));
            menuItemLabel1.attr({
                x:menuItemSprite1.getContentSize().width/2,
                y:menuItemSprite1.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            menuItemLabel2.attr({
                x:menuItemSprite2.getContentSize().width/2,
                y:menuItemSprite2.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            menuItemLabel3.attr({
                x:menuItemSprite3.getContentSize().width/2,
                y:menuItemSprite3.getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            menuItemSprite1.addChild(menuItemLabel1);
            menuItemSprite2.addChild(menuItemLabel2);
            menuItemSprite3.addChild(menuItemLabel3);
            var menuItem=new cc.MenuItemSprite(menuItemSprite1,menuItemSprite2,menuItemSprite3,
                this.menuCallbackToPay,this);
            menuItem.setName(this.diamondValueLevel[i].toString());
            var menu=new cc.Menu(menuItem);
            menu.attr({
                x:this.buyDiamondMenuBackground[i].getContentSize().width/14*11,
                y:this.buyDiamondMenuBackground[i].getContentSize().height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            this.buyDiamondMenuBackground[i].addChild(menu);
        }

    },
    //选择充值面值按钮时调用的回调函数
    menuCallbackToPay:function(sender){
        console.log("需要付费(RMB):"+sender.getName()+"元！");
    },
    //销毁监听
    destoty:function(){
        this._super();
        cc.eventManager.removeListener(this.m_touchListener1);
    }
});