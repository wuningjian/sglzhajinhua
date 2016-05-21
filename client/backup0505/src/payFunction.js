/**
 * Created by ningjian on 2016/4/29.
 */

//通过支付订购中心调用alipay
function alipay (sender){
    console.log("enter onPostPay");
    var timeStamp;
    var appId;
    var appSec;
    // 客户端订单信息
    var price = '0.01';
    var outOrderNo = '';
    var userId = '';
    var quantity = '';

    var paymodeId = '7';
    var channelId = '16042905';
    var bankId = 'ALIPAY';
    var isOnly = "true";
    pomelo.request('sign.signHandler.get_timestamp',{},function(data){
        console.log("sing.signHandler.get_timestamp callback");
        console.log(JSON.stringify(data));
        timeStamp = data.timeStamp;
        //获得了时间戳
        pomelo.request('sign.signHandler.get_appId_appSec',{
            payInfo:'pay'
        },function(data1){
            console.log("sing.signHandler.get_appId_appSec callback");
            console.log(JSON.stringify(data1));
            appId = data1.appId;
            appSec = data1.appSec;

            var dataxxtea = "paymodeId=" + paymodeId + "&price=" + price
                + "&timeStamp=" + timeStamp + "&channelId=" + channelId
                + "&outOrderNo=" + outOrderNo + "&userId=" + userId
                + "&isOnly=" + isOnly + "&quantity=" + quantity
                + "&bankId=" + bankId;
            //进行XXTea加密
            //var param = XXTEA.encryptToBase64(dataxxtea, appSec);
            //进行3des加密
            var param = encrypt_string(appSec,dataxxtea);
            //param是进行过xxtea加密以后获得的
            pomelo.request('sign.signHandler.get_sign_url',{
                param:param
            },function(data3){
                console.log("sing.signHandler.get_sign_url callback");
                console.log(JSON.stringify(data3));
                var xhr = new XMLHttpRequest();
                //var PAY_URL="http://vip.189.cn/oc/front/api/general/pay";
                xhr.open("POST",data3.PAY_URL);
                xhr.send(data3.post_data);
                xhr.onreadystatechange=function(){
                    console.log("xhr.readyState:"+xhr.readyState);
                    console.log("xhr.status:"+xhr.status);
                    if(xhr.readyState&&xhr.status==200){
                        var response = xhr.responseText;
                        console.log("xhr.responseText:"+response);
                    }
                };
            });
        });
    });
}