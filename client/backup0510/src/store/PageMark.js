/**
 * Created by MQN on 2016/4/7.
 */

var PageMark = cc.Node.extend({
    normalImg   : null,     // 图片[普通状态]
    selectedImg : null,     // 图片[高亮状态]
    dir         : 0,        // 方向[0:水平, 1:竖直]
    count       : 0,        // 个数[标签]
    space       : 0,        // 间距[标签卡槽之间]
    markPos     : [],       // 点集[标签卡槽坐标点集合]
    mark        : null,     // 标签
    ctor : function(params){
        this._super();
        // 加载[配置]
        this.loadConfig(params);
        // 加载[自身初始化]
        this.loadInit();
        // 加载[标签]
        this.loadMark();
        return true;
    },
    loadConfig : function(params){
        cc.assert(
            params !== undefined &&
            params.normalImg &&
            params.selectedImg &&
            params.count,
            "params is null");

        this.normalImg = params.normalImg;
        this.selectedImg = params.selectedImg;
        this.dir = params.dir || PageMark.DIR_Horizontal;
        this.count = params.count || 0;

        var tmpWidth2 = new cc.Sprite(this.normalImg).width / 2;
        this.space = params.space ? params.space + tmpWidth2 : tmpWidth2;
    },
    loadInit : function(){
        var nodeSize = new cc.Sprite(this.normalImg);

        //确定起始的位置
        var startX = -(this.count * nodeSize.width + (this.count - 1) * this.space) / 2 + nodeSize.width / 2;
        var startY = -(this.count * nodeSize.height + (this.count - 1) * this.space) / 2 + nodeSize.height / 2;
        //console.log("startPos>>" + startX + "  " +startY);

        for (var i = 0; i < this.count; i++){
            var x = (this.dir == PageMark.DIR_VERTICAL)   ? 0 : startX + (nodeSize.width + this.space) * i;
            var y = (this.dir == PageMark.DIR_Horizontal) ? 0 : startY + (nodeSize.height + this.space) * i;
            var pos = cc.p(x, y);
            this.markPos.push(pos);

            var node = new cc.Sprite(this.normalImg);
            this.addChild(node);
            node.setPosition(pos);
            //console.log("pos>>" + pos.x + "  " + pos.y);
        }
    },
    loadMark : function(){
        this.mark = new cc.Sprite(this.selectedImg);
        this.addChild(this.mark);
        this.mark.setPosition(this.markPos[0]);
    },
    onChangeIndex : function(index){
        this.mark.setPosition(this.markPos[index]);
    }
});

PageMark.DIR_Horizontal = 0;
PageMark.DIR_VERTICAL = 1;