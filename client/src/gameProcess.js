/**
 * Created by wuningjian on 2/23/16.
 */
var game_route = "game.gameHandler.game_process";//游戏处理路由
function game_ready(){
    pomelo.request(game_route,{
        process:"ready",
        param:"null"
    },function(data){
        console.log(data.msg);

    });
}

function game_follow(){
    pomelo.request(game_route,{
        process:"follow",
        location:myselfPlayerPositionServer
    },function(data){
        console.log(data.msg);

    });
}


function game_open(){
    pomelo.request(game_route,{
        process:"open",
        location:myselfPlayerPositionServer
    },function(data){
        console.log(data.msg);

    });
}

function game_throw(){
    pomelo.request(game_route,{
        process:"throw",
        location:myselfPlayerPositionServer
    },function(data){
        console.log(data.msg);

    });
}

function game_allin(){
    console.log("all in");
    console.log(myselfPlayerPositionServer);
    pomelo.request(game_route,{
        process:"allin",
        location:myselfPlayerPositionServer,
        param:"null"
    },function(data){
        console.log(data.msg);

    });
}

function game_bipai(){
    pomelo.request(game_route,{
        process:"bipai",
        location1:1,
        location2:2
    },function(data){
        cc.log(JSON.stringify(data));
    });
}

function game_follow_always(){
    pomelo.request(game_route,{
        process:"null",
        param:"null"
    },function(data){
        cc.log(JSON.stringify(data));

    });
}

function game_get_roomInfo(){
    pomelo.request(game_route,{
        process:"getRoomInfo"
    },function(data){
        cc.log(JSON.stringify(data));
    });
}