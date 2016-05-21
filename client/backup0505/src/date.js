/**
 * Created by MQN on 2016/3/2.
 */

now = new Date();
//var now = "";
////从服务器获取当前时间，Date()
//pomelo.request(game_route,{
//    process:"getTime",
//    param:"null"
//}, function(dateNow){
//    now = JSON.stringify(dateNow);
//});

//从已获取的时间里得到日期
function getDate(){

    var yyyy = this.now.getFullYear();
    var mm = now.getMonth() + 1;
    var dd = now.getDate();
    mm = mm<10?"0"+mm:mm;
    dd = dd<10?"0"+dd:dd;
    var date = yyyy + "-" + mm + "-" + dd;

    return date;
}

//从已获取的时间里得到time
function getTime(){

    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    hour = hour<10?"0"+hour:hour;
    minute = minute<10?"0"+minute:minute;
    second = second<10?"0"+second:second;

    //var time = hour+":"+minute+":"+second;
    var time = hour+":"+minute;
    return time;
}