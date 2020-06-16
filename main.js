//工具封装
//根据id获取元素
function $(id){
    return document.getElementById(id);
}
var clock = null;
var state = 0;
var speed = 4;
/*
* 初始化 init
*/
function init(){
    for(var i=0;i<4;i++){
        createrow();
    }
    //添加onclick事件
    $('main').onclick = function(ev){
        ev = ev || event
        judge(ev);
    }
    //定时器 每30毫秒调用一次move()
    clock = window.setInterval('move()',50);
}
//判断是否点击黑块
function judge(ev){
    if(state==3){
        alert('请刷新页面，重新开始游戏')
        return;
    }
    if(ev.target.className.indexOf('black')==-1){
        fail();
    }else{
        //点击目标元素 类名中包含black说明是黑块
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1;//定义pass属性，表示此行row的黑块已经被点击
        score();
    }
}
//游戏结束
function fail(){
    clearInterval(clock);
    state = 3;
    confirm('你的最终得分为'+parseInt($('score').innerHTML));
}
//创建div
function creatediv(className){
    var div = document.createElement('div');
    div.className = className;
    return div;
}
//创建一个<div class="row">并且有四个子节点<div class="cell">
function createrow(){
    var con = $('con');
    var row = creatediv('row');
    var arr = createcell();
 
    con.appendChild(row);
    for(var i=0;i<4;i++){
        row.appendChild(creatediv(arr[i]));
    }
    if(con.firstChild==null){
        con.appendChild(row);
    }else{
        con.insertBefore(row,con.firstChild);
    }
}
//创建一个类名的数组，其中一个为cell black，其余为cell
function createcell(){
    var temp = ['cell','cell','cell',];
    var i = Math.floor(Math.random()*4);
    temp[i] = 'cell black';
    return temp;
}
//移动黑色块
function move(){
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con,null)['top']);
    if(speed+top>0){
        top = 0;
    }else{
        top += speed;
    }
    con.style.top = top + 'px';
 
    if(top==0){
        createrow();
        con.style.top = '-100px';
        delrow();
    }else if(top==(-100+speed)){
        var rows = con.childNodes;
        if((rows.lenth==5)&&(rows[rows.length-1].pass!==1)){
            fail();
        }
    }
}
//加速函数
function speedup(){
    speed += 2;
    if(speed==20){
        alert('你超神了');
    }
}
//删除某行
function delrow(){
    var con = $('con');
    if(con.childNodes.length==6){
        con.removeChild(con.lastChild);
    }
}
//计分
function score(){
    var newscore = parseInt($('score').innerHTML)+1;
    $('score').innerHTML = newscore;
    if(newscore%10==0){
        speedup();
    }
}
document.querySelector('.start').addEventListener('click',init)