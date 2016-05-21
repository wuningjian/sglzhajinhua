/**
 * Created by MQN on 2016/3/8.
 */
var LOGIN_ERROR = "There is no server to log in, please wait.";
var DUPLICATE_ERROR = "This name has been used.";
function qiandaoQueryEntry(uid, rid) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: server_host,
        port: 3014,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid,
            rid: rid
        }, function(data) {
            pomelo.disconnect();
            if(data.code === 500) {
                showError(LOGIN_ERROR);
                return;
            }
            //callback(data.host, data.port);
            //link connector-server
            pomelo.init({
                host: data.host,
                port: data.port,
                log: true
            }, function() {
                var route = "connector.entryHandler.enter";
                pomelo.request(route, {
                    username: uid,
                    rid: rid
                }, function(data) {
                    if(data.error) {
                        showError(DUPLICATE_ERROR);
                        console.log("uid:" + uid);
                        //return;
                    }
                    console.log(JSON.stringify(data));
                });
            });
        });
    });
}