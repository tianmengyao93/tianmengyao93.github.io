/**
 * Created by Administrator on 2017/2/6.
 */
// JavaScript Document

$(function(){
    $('#fullpage').fullpage({
        verticalCentered:false,
        resize:false,
        navigation:true,
        navigationTooltips:['首页','技能�','作品','经验','致谢'],
        slidesNavigation:true,
        css3:true,
        continuousVertical:true
    });


    var oDiv = document.getElementById('wrap');
    var aDiv = oDiv.getElementsByTagName('div');
    var aA = oDiv.getElementsByTagName('a');

    var now = 0;
    var target;
    var onOff = true;

    setTimeout(function(){
        Tab(now);
    },200)

    for(var j=0;j<aA.length;j++){
        aA[j].className = 'hide';
        aA[j].onclick = function(e){
            e.cancelBubble = true;
            // e.stopPropagation();
        }
    }
    aA[0].className = 'active';
    for( var i=0; i<aDiv.length;i++){
        aDiv[i].index = i;
        aDiv[i].onclick = function(){
            //alert(this.index)
            for(var j=0;j<aA.length;j++){
                aA[j].className = 'hide';

            }
            aA[this.index].className = 'active';
            this.children[1].className = 'active';

            if(!onOff){
                return
            }

            onOff = false;
            target = this.index;

            if( target > now ){
                if( target - now <= 3) {
                    goNext();
                }else{
                    goPrev();
                }
            }else{
                if(target + 7 - now <= 3){
                    goNext();
                }else{
                    goPrev();
                }
            }
        }
    }


    function goNext(){//璋冪敤鍑芥暟浣垮浘鐗囧線涓嬩竴寮犲垏鎹�
        now ++;
        if(now > 6){
            now = 0;
        }
        Tab(now);
        if(now == target){//杩愬姩瀹屾垚
            onOff = true;
            return;
        }
        setTimeout(function(){
            goNext();
        },700)
    }

    function goPrev(){//璋冪敤鍑芥暟浣垮浘鐗囧線涓婁竴寮犲垏鎹�
        now --;
        if(now < 0){
            now = 6;
        }
        Tab(now);
        if(now == target){//杩愬姩瀹屾垚
            onOff = true;
            return;
        }
        setTimeout(function(){
            goPrev();
        },700)
    }

    function Tab(n){	// 鍥剧墖浣嶇疆
        for(var i=0;i<3;i++){
            var Left = n - 1 - i;
            if( Left<0){
                Left = Left + 7;
            }
            aDiv[Left].style.transform = 'translateX('+(-150*(i+1))+'px) translateZ('+(200-i*100)+'px) rotateY(30deg)';
            var Right = n + 1 + i;
            if( Right>6){
                Right = Right - 7;
            }
            aDiv[Right].style.transform = 'translateX('+(150*(i+1))+'px) translateZ('+(200-i*100)+'px) rotateY(-30deg)';
        }
        aDiv[n].style.transform = 'translateZ(300px)';
    }






});









