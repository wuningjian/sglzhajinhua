var MainLayer = cc.Layer.extend({
    background: null,
    qiandaoMu: null,
    qiandaoMenuItem: null,
    qiandaoLabel: null,
    yesMu: null,
    //prizeUI:null,
    ctor: function () {

        this._super();

        //pomeloChat();
        //进入游戏就要确定唯一的用户id
        //var uid = "wu";

        var size = cc.winSize;


        this.background = new cc.Sprite(res.Bg_png);
        this.background.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.background, 0);


        //“炸金花”按钮
        var gameItem = new cc.MenuItemImage(
            res.Classic_png,
            res.Classic_png,
            function () {
                this.entryGame();
                //queryEntry(uid, rid);
                //this.removeChild(this.prizeUI);
                //chatSend();
            }, this);

        gameItem.attr({
            x: 640,
            y: 360,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var gameMenu = new cc.Menu(gameItem);
        gameMenu.x   = 0;
        gameMenu.y   = 0;
        this.background.addChild(gameMenu, 1);

        //关闭按钮
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                //cc.director.end();
            }, this);
        closeItem.attr({
            x: size.width - 50,
            y: size.height - 50,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var closeMenu = new cc.Menu(closeItem);
        closeMenu.x   = 0;
        closeMenu.y   = 0;
        this.addChild(closeMenu, 1);

        //添加“用户信息”层
        this.lobbyInfoUI = new lobbyInfoLayer();
        this.addChild(this.lobbyInfoUI, 3);

        return true;
    },

    entryGame: function () {
        loadGameScene(playerId);

        //var route = 'gate.gateHandler.queryEntry';
        //pomelo.init({
        //    host: '127.0.0.1',
        //    port: 3014,
        //    log: true
        //}, function() {
        //    pomelo.request(route, {
        //        uid: uid
        //    }, function(data) {
        //        pomelo.disconnect();
        //        if(data.code === 500) {
        //            showError(LOGIN_ERROR);
        //            return;
        //        }
        //        pomelo.init({
        //            host: data.host,
        //            port: data.port,
        //            log: true
        //        }, function(){
        //            var route = 'connector.';
        //            pomelo.request(route,{
        //                process:"ready",
        //                name:'test'
        //            },function(data){
        //
        //            });
        //        });
        //    });
        //});
    }

});

var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);

    }
});

