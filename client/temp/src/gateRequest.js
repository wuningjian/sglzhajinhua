/**
 * Created by wuningjian on 2/22/16.
 */

var LOGIN_ERROR = "There is no server to log in, please wait.";
var DUPLICATE_ERROR = "This name has been used.";
//var username = "wuningjian";
//var g_key='playerData';
var g_playerData=new Array();
var g_roomData=new Array();

//客户端请求连接服务器
function queryEntry(uid) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: server_host,
        port: 3014,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid
        }, function(data) {
            pomelo.disconnect();
            if(data.code === 500) {
                showError(LOGIN_ERROR);
                return;
            }
            pomelo.init({
                host: data.host,
                port: data.port,
                log: true
            }, function() {
                //var route = "game.enterGRoomHandler.enter";
                var route = "connector.entryHandler.enter";
                pomelo.request(route, {
                    username: uid,
                    rid: "888"
                }, function(data) {
                    if(data.error) {showError(DUPLICATE_ERROR);}
                    pomelo.request(game_route,{
                        process:"getRoomInfo"
                    },function(data1){
                    //根据类型处理，保存数据
                        if(data1 instanceof  Object){

                        }
                        else{
                            var uersString=JSON.parse(data1);
                            var userArgs=uersString['args'];
                            data1=userArgs[0];
                        }
                        //玩家的信息
                        var playerName1=data1["location1"];
                        if(playerName1!="null"){
                            var player=new Array();
                            var chP=playerName1.indexOf("*");
                            playerName1=playerName1.substring(0,chP);
                            player.push(playerName1);
                            player.push(1);
                            player.push(data1["is_game_1"]);
                            g_playerData.push(player);
                        }
                        var playerName2=data1["location2"];
                        if(playerName2!="null"){
                            var player=new Array();
                            var chP=playerName2.indexOf("*");
                            playerName2=playerName2.substring(0,chP);
                            player.push(playerName2);
                            player.push(2);
                            player.push(data1["is_game_2"]);
                            g_playerData.push(player);
                        }
                        var playerName3=data1["location3"];
                        if(playerName3!="null"){
                            var player=new Array();
                            var chP=playerName3.indexOf("*");
                            playerName3=playerName3.substring(0,chP);
                            player.push(playerName3);
                            player.push(3);
                            player.push(data1["is_game_3"]);
                            g_playerData.push(player);
                        }
                        var playerName4=data1["location4"];
                        if(playerName4!="null"){
                            var player=new Array();
                            var chP=playerName4.indexOf("*");
                            playerName4=playerName4.substring(0,chP);
                            player.push(playerName4);
                            player.push(4);
                            player.push(data1["is_game_4"]);
                            g_playerData.push(player);
                        }
                        var playerName5=data1["location5"];
                        if(playerName5!="null"){
                            var player=new Array();
                            var chP=playerName5.indexOf("*");
                            playerName5=playerName5.substring(0,chP);
                            player.push(playerName5);
                            player.push(5);
                            player.push(data1["is_game_5"]);
                            g_playerData.push(player);
                        }

                        //房间的信息
                        g_roomData.push(data1["current_chip"]);
                        g_roomData.push(data1["all_chip"]);
                        g_roomData.push(data1["round"]);
                        g_roomData.push(data1["room_num"]);
                        g_roomData.push(data1["player_num"]);
                        g_roomData.push(data1["is_gaming"]);
                        g_roomData.push(data1["current_player"]);

                        cc.log(JSON.stringify(data1));
                        cc.director.runScene(new gameScene());
                    });
                });
            });
        });
    });
}

//客户端向服务器发送消息（必须在已连接的情况下）
function chatSend() {
    var route = "chat.chatHandler.send";
    var target = "*";
    pomelo.request(route, {
        rid: "001",
        content: "test",
        from: uid,
        target: target
    }, function(data) {
        cc.log("data3:"+data);
        cc.log("json.stringify(data3):"+JSON.stringify(data));
    });
}

//输出错误日志
function showError(err){
    console.log(err);
}


function loadGameScene(uid){
    var route = "connector.entryHandler.enter";
    pomelo.request(route, {
        username: uid,
        rid: "888"
    }, function(data) {
        if(data.error) {showError(DUPLICATE_ERROR);}
        pomelo.request(game_route,{
            process:"getRoomInfo"
        },function(data1){
            //根据类型处理，保存数据
            if(data1 instanceof  Object){

            }
            else{
                var uersString=JSON.parse(data1);
                var userArgs=uersString['args'];
                data1=userArgs[0];
            }
            //玩家的信息
            var playerName1=data1["location1"];
            if(playerName1!="null"){
                var player=new Array();
                var chP=playerName1.indexOf("*");
                playerName1=playerName1.substring(0,chP);
                player.push(playerName1);
                player.push(1);
                player.push(data1["is_game_1"]);
                g_playerData.push(player);
            }
            var playerName2=data1["location2"];
            if(playerName2!="null"){
                var player=new Array();
                var chP=playerName2.indexOf("*");
                playerName2=playerName2.substring(0,chP);
                player.push(playerName2);
                player.push(2);
                player.push(data1["is_game_2"]);
                g_playerData.push(player);
            }
            var playerName3=data1["location3"];
            if(playerName3!="null"){
                var player=new Array();
                var chP=playerName3.indexOf("*");
                playerName3=playerName3.substring(0,chP);
                player.push(playerName3);
                player.push(3);
                player.push(data1["is_game_3"]);
                g_playerData.push(player);
            }
            var playerName4=data1["location4"];
            if(playerName4!="null"){
                var player=new Array();
                var chP=playerName4.indexOf("*");
                playerName4=playerName4.substring(0,chP);
                player.push(playerName4);
                player.push(4);
                player.push(data1["is_game_4"]);
                g_playerData.push(player);
            }
            var playerName5=data1["location5"];
            if(playerName5!="null"){
                var player=new Array();
                var chP=playerName5.indexOf("*");
                playerName5=playerName5.substring(0,chP);
                player.push(playerName5);
                player.push(5);
                player.push(data1["is_game_5"]);
                g_playerData.push(player);
            }

            //房间的信息
            g_roomData.push(data1["current_chip"]);
            g_roomData.push(data1["all_chip"]);
            g_roomData.push(data1["round"]);
            g_roomData.push(data1["room_num"]);
            g_roomData.push(data1["player_num"]);
            g_roomData.push(data1["is_gaming"]);
            g_roomData.push(data1["current_player"]);

            cc.log(JSON.stringify(data1));
            cc.director.runScene(new gameScene());
        });
    });
}
//var pomeloChat = function() {
//    var route = 'gate.gateHandler.queryEntry';
//    var uid = "uid";//
//    var rid = "rid";//聊天室id
//    var username = "username";
//
//    // pomelo.init(params, cb)
//    // 是客户端的第一次调用，params中应该指出要连接的服务器的ip和端口号，cb会在连接成功后进行回调
//    pomelo.init({
//        host: "127.0.0.1",
//        port: 3014,
//        log: true
//    }, function() {
//        // pomelo.request(route, msg, cb)
//        // 请求服务，route为服务端的路由，格式为"..", msg为请求的内容，cb会响应回来后的回调
//        pomelo.request(route, {
//            uid: uid
//        }, function(data) {    //data是指从服务器传递过来的数据消息
//            cc.log("data1:"+data);
//            cc.log("json.stringify(data1):"+JSON.stringify(data));
//            pomelo.disconnect();  //断开gate服务器，连接connector服务器
//            pomelo.init({
//                host: data.host,
//                port: data.port,
//                log: true
//            }, function() {
//                var route = "connector.entryHandler.enter";
//                pomelo.request(route, {
//                    username: username,
//                    rid: rid
//                }, function(data) {
//                    cc.log("data2:"+data);
//                    cc.log("json.stringify(data2):"+JSON.stringify(data));
//                    chatSend();
//                });
//            });
//        });
//    });
//
//    function chatSend() {
//        var route = "chat.chatHandler.send";
//        var target = "*";
//        var msg = "msg";
//        pomelo.request(route, {
//            rid: rid,
//            content: msg,
//            from: username,
//            target: target
//        }, function(data) {
//            cc.log("data3:"+data);
//            cc.log("json.stringify(data3):"+JSON.stringify(data));
//        });
//    }
//};