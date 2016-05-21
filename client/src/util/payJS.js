var payJS = payJS||{};
payJS.javascriptMethod=function(param) {
	cc.log(param); // "hello world, javascript"
	cc.log("------------------------------------------");
	pomelo.request("payInfo.payInfoHandler.payMsg",{
        param:param
    },function(data){
        console.log(data.msg);
    });
}