document.onreadystatechange = function(){
    if(document.readyState=='loaded' || document.readyState=='complete'){
        $('html').css({'display':'block'});
    }
}
setTimeout(() => {
    $(document).ready(function(){
        // $('.hambu').each(function(e){console.log(this)})
        count = 0;
        gameover = false;
        speed = 5;
        speed2 = 10;
        moveright = false;
        moveleft = false;
        moveup = false;
        movedown = false;
        score = 0;
       $(document).on('keydown',function(e){
            if(gameover == false){
                key = e.keyCode;
                if(moveleft == false && key == 37){
                    moveleft = requestAnimationFrame(left);
                }
                else if(moveright == false && key == 39){
                    moveright = requestAnimationFrame(right);
                }
            }
        })
        $(document).on('keyup',function(e){
            if(gameover == false){
                key = e.keyCode;
                if(key == 37){
                    cancelAnimationFrame(moveleft);
                    moveleft = false;
                }
                else if(key == 39){
                    cancelAnimationFrame(moveright);
                    moveright = false;
                }
                else if(key == 32){
                    speed2++;
                }
            }
        })
        function left(){
            if(gameover == false && parseInt($('.player').css('left')) > 40){
                $('.player').css({'left':parseInt($('.player').css('left')) - speed2})
                moveleft = requestAnimationFrame(left);
            }
        }
        function right(){
            if(gameover == false && parseInt($('.player').css('left')) <= parseInt($('.game').width()) - parseInt($('.player').width()) + 20){
                $('.player').css({'left':parseInt($('.player').css('left')) + speed2})
                moveright = requestAnimationFrame(right);
            }
        }
        anim = requestAnimationFrame(animat);
    
        function animat(){
            if(gameover == false){
                if(collision($('.player'),$('.hambu').eq(0)) || collision($('.player'),$('.hambu').eq(1)) || collision($('.player'),$('.hambu').eq(2))){
                    // next()
                }
                // console.log(12)
                mn = [];
                $('.hambu').each(function(e){mn.push($(this).position().top)})
                a = mn.indexOf(Math.max(...mn));
                b = $('.hambu').eq(a).position().left;
                $('.player').animate({'left': Math.floor(b) + 40},10);
                // console.log(Math.floor(b),$('.player').css('left') + 70);
                $('.scores').text(score);
                // console.log(score);
                score++;
                if(score % 500 == 0){
                    // speed++;
                    // speed2++;
                    if (score % 1500 == 0){
                        // speed2++;
                    }
                }
                rolling($('.hambu').eq(0))
                rolling($('.hambu').eq(1))
                rolling($('.hambu').eq(2))
                requestAnimationFrame(animat);
                
            }
        }
        function rolling(a){
            x = Math.random() * (parseInt($('.game').width()) - parseInt($('.hambu').width()));
            if(count < 3){
                a.css({'left': x})
                // bool = false;
                count++;
                // console.log(count)
            }
            a.css({'top': parseInt(a.css('top')) + speed})
            if(parseInt(a.css('bottom')) < 0){
                // a.css({'top' : -100})
                a.css({'left': x})
            }
        }
        function collision($div1, $div2) {
            if(gameover == true) return false;
            if($div2.css('top').split('px')[0] > parseInt($('.game').outerHeight()) - 114){
                stopplay();
            }
            var x1 = $div1.offset().left;
            var y1 = $div1.offset().top;
            var h1 = $div1.outerHeight(true);
            var w1 = $div1.outerWidth(true);
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = $div2.offset().left;
            var y2 = $div2.offset().top;
            var h2 = $div2.outerHeight(true);
            var w2 = $div2.outerWidth(true);
            var b2 = y2 + h2;
            var r2 = x2 + w2;
    
            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
            $div2.css({'top':-100});
            x = Math.random() * (parseInt($('.game').width()) - parseInt($('.hambu').width()));
            
            $div2.css({'top': parseInt($div2.css('top')) + speed})
            // if(parseInt($div2.css('bottom')) < 0){
                // a.css({'top' : -100})
                $div2.css({'left': x})
            // }
            // console.log(12)
        }
        function stopplay(){
            gameover = true;
            // alert(12);
            $('.game').html('<div class="restart">Restart</div>');
            $('.restart').click(
                function(){
                    location.reload();
                })
        }
        // function next(a){
        //     console.log(this);
        // }
    })
},1000)
